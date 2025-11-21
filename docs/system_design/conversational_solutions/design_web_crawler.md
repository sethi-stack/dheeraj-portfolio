# Design a Web Crawler

## 1. Requirements

### Functional
- **Crawl**: Start from seed URLs and traverse the web.
- **Extract**: Parse HTML and extract links.
- **Store**: Save content for indexing.

### Non-Functional
- **Scale**: Crawl billions of pages.
- **Politeness**: Don't overload servers.
- **Extensibility**: Support new content types.
- **Robustness**: Handle malformed HTML, 404s, infinite loops.

---

## 2. High-Level Design

### Components
1.  **Seed URLs**: Starting point.
2.  **URL Frontier**: Prioritizes and manages the queue of URLs to crawl.
3.  **HTML Downloader**: Fetches web pages (DNS resolution is key here).
4.  **Content Parser**: Validates and parses HTML.
5.  **Content Deduper**: Checks if content already exists (fingerprinting).
6.  **URL Extractor**: Finds new links.
7.  **URL Filter/Deduper**: Removes blacklisted/visited URLs.
8.  **Storage**: Stores metadata and content.

---

## 3. Deep Dive

### URL Frontier
- **Politeness**: Ensure we don't hit the same host too often.
    - Maintain a map: `Hostname -> Queue`.
    - Each queue has a delay/rate limit.
- **Priority**: Crawl important/frequently updated pages more often.
    - Separate queues for high vs. low priority.

### Distributed Crawling
- Hash URLs to assign them to different crawler workers.
- Use a distributed queue (Kafka/SQS) for the Frontier.

### Deduplication
- **Content**: Use SimHash or Rabin fingerprinting to detect near-duplicates.
- **URL**: Use a Bloom Filter for fast "is visited" checks.

### DNS Resolution
- DNS is a bottleneck.
- Maintain a custom, high-performance DNS cache.

### Robots.txt
- Respect `robots.txt`. Cache these rules to avoid fetching them for every URL.
