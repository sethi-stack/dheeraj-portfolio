# Cloud Native Architecture

Cloud native technologies empower organizations to build and run scalable applications in modern, dynamic environments such as public, private, and hybrid clouds.

## 1. Containerization (Docker)

### Concept
Packaging software into standardized units (containers) for development, shipment, and deployment.

### Benefits
- **Portability**: "Write once, run anywhere" (laptop, testing, production).
- **Isolation**: Each container has its own filesystem, CPU, memory, and process space.
- **Efficiency**: Lightweight compared to Virtual Machines (VMs) as they share the OS kernel.

### Best Practices
- **One Process Per Container**: Keep containers focused.
- **Immutability**: Don't patch running containers; rebuild and redeploy.
- **Small Images**: Use Alpine or Distroless base images to reduce attack surface and download time.

---

## 2. Orchestration (Kubernetes / K8s)

### Concept
Automating the deployment, scaling, and management of containerized applications.

### Key Components
- **Pod**: The smallest deployable unit (one or more containers).
- **Service**: An abstract way to expose an application running on a set of Pods.
- **Ingress**: Manages external access to the services (HTTP/HTTPS).
- **ConfigMap/Secret**: Decouples configuration from image content.

### Core Features
- **Self-healing**: Restarts failed containers, replaces and reschedules nodes.
- **Auto-scaling**: Horizontal Pod Autoscaler (HPA) scales based on CPU/Memory.
- **Rolling Updates**: Updates application with zero downtime.

---

## 3. Service Mesh (Istio, Linkerd)

### Concept
A dedicated infrastructure layer for facilitating service-to-service communications between microservices, often using a sidecar proxy.

### Capabilities
- **Traffic Management**: Canary deployments, A/B testing, circuit breaking, retries.
- **Security**: mTLS (mutual TLS) for encryption and identity between services.
- **Observability**: Automatic metrics, logs, and traces for all traffic.

### Trade-offs
- **Complexity**: Adds another layer of infrastructure to manage.
- **Latency**: Sidecar proxies add a small amount of latency to every call.

---

## 4. The 12-Factor App

A methodology for building software-as-a-service apps:

1.  **Codebase**: One codebase tracked in revision control, many deploys.
2.  **Dependencies**: Explicitly declare and isolate dependencies.
3.  **Config**: Store config in the environment.
4.  **Backing services**: Treat backing services as attached resources.
5.  **Build, release, run**: Strictly separate build and run stages.
6.  **Processes**: Execute the app as one or more stateless processes.
7.  **Port binding**: Export services via port binding.
8.  **Concurrency**: Scale out via the process model.
9.  **Disposability**: Maximize robustness with fast startup and graceful shutdown.
10. **Dev/prod parity**: Keep development, staging, and production as similar as possible.
11. **Logs**: Treat logs as event streams.
12. **Admin processes**: Run admin/management tasks as one-off processes.

---

## 5. Observability in Cloud Native

### The Three Pillars
1.  **Logs**: Discrete events (e.g., "Error connecting to DB").
    - *Tools*: ELK Stack, Fluentd, Loki.
2.  **Metrics**: Aggregated data over time (e.g., "CPU usage is 80%").
    - *Tools*: Prometheus, Grafana, Datadog.
3.  **Traces**: The journey of a request through distributed services.
    - *Tools*: Jaeger, Zipkin, OpenTelemetry.

### OpenTelemetry (OTel)
The industry standard for generating and collecting telemetry data. It provides a vendor-neutral implementation for metrics, logs, and traces.
