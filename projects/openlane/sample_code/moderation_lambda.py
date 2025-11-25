import json
import os
import boto3
import openai

# Initialize clients
kinesis = boto3.client('kinesis')
openai.api_key = os.getenv("OPENAI_API_KEY")

def lambda_handler(event, context):
    """
    Triggered by Kinesis stream of new comments.
    Moderates content using OpenAI and updates status.
    """
    for record in event['Records']:
        payload = json.loads(record['kinesis']['data'])
        comment_id = payload['commentId']
        text = payload['text']
        
        # 1. Moderate Content
        moderation_result = moderate_text(text)
        
        # 2. Publish Result Event
        publish_result(comment_id, moderation_result)
        
    return {'statusCode': 200}

def moderate_text(text):
    """
    Calls OpenAI to check for profanity, PII, or non-arbitrable content.
    """
    prompt = f"""
    Analyze the following comment for a B2B car auction site.
    Flag if it contains:
    1. Profanity or toxic language.
    2. PII (Phone numbers, emails).
    3. Claims about "undisclosed damage" (these must be arbitrated formally).
    
    Comment: "{text}"
    
    Return JSON: {{ "is_safe": boolean, "reason": string }}
    """
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            temperature=0
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"AI Error: {e}")
        # Fail open or closed based on policy? Here we fail closed (pending review)
        return {"is_safe": False, "reason": "AI_SERVICE_ERROR"}

def publish_result(comment_id, result):
    """
    Publishes the moderation verdict to a 'moderation-results' stream.
    Downstream services will update the DB and notify the frontend via WebSocket.
    """
    status = "APPROVED" if result['is_safe'] else "REJECTED"
    
    event = {
        "commentId": comment_id,
        "status": status,
        "reason": result.get('reason'),
        "timestamp": "..."
    }
    
    # In reality, push to SNS/SQS or another Kinesis stream
    print(f"Publishing event: {event}")
