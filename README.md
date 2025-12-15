# 🛡️ Aegis: Fault-Tolerant Runtime Configuration Immunizer

![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)
![Tech](https://img.shields.io/badge/Node.js-Worker_Threads-green?style=for-the-badge)
![Infrastructure](https://img.shields.io/badge/Docker-Nginx_Load_Balancer-blue?style=for-the-badge)

> **"Systems shouldn't crash just because of a valid-syntax configuration."**  
> A self-healing distributed system architecture designed to prevent global cascading failures. Inspired by the **Cloudflare 2025 Outage**.

---

## ⚡ The Problem: Why Global Outages Happen?

On December 5, 2025, a massive outage occurred because a valid configuration file caused a **runtime memory overflow** when loaded into production. 

Traditional CI/CD pipelines failed to catch this because:
1.  ✅ Syntax was valid (JSON/YAML).
2.  ✅ Static Analysis passed.
3.  ❌ **Runtime constraints (Real Data Scale) were not tested.**

The result was a **Single Point of Failure** that crashed the entire control plane.

---


## 🛡️ The Solution: "Aegis Architecture"

**Aegis** changes the rule of deployment. It introduces a **Runtime Immunization Layer**. 

Instead of trusting configuration updates, the system acts as a biological immune system. It spawns a **Sacrificial Sandbox (Worker Thread)** to test the "virus" (new config) before letting it touch the main body (Production Server).

🏗️ How It Works (Internal Logic)
graph TD
    Admin["Admin / CI Pipeline"] -->|Push Config| MainServer["Main Server Process"]

    MainServer -->|1. Isolate Config| Worker["Worker Sandbox"]
    Worker -->|2. Stress Test| RAM{"Memory Check"}

    RAM -->|Crash / Panic| Reject["REJECT Update"]
    RAM -->|Safe| Apply["APPLY Config"]

    Reject -->|Failure Signal| MainServer
    Apply -->|Success Signal| MainServer

    style Reject fill:#ffcccc,stroke:#ff0000
    style Apply fill:#ccffcc,stroke:#00ff00


Key Takeaway:
If the Worker crashes due to memory overflow, the Main Server remains 100% online.
The outage is fully contained.

🚀 Key Engineering Features
Feature	Standard System	Aegis System
Validation Method	Static Syntax Check	Runtime Canary Analysis
Failure Impact	Total Server Crash	Zero Downtime
Architecture	Monolithic State	Isolated Microservices
Blast Radius	Global	Single Sandbox Process
📸 Proof of Resilience
✅ 1. Safe Deployment

When a normal configuration is pushed, the sandbox validates it and the Main Server applies the update instantly.

![Safe Deployment](./screenshots/safe-deployment.png)

🛑 2. Attack Simulation (Crash Blocked)

When a payload of 100000 is injected (simulating the Cloudflare memory bug), the Worker crashes — but the system blocks the update.

![Crash Prevention](./screenshots/crash-prevention.png)


📌 Important:
The terminal logs confirm that the Main Server never restarts, even though a fatal memory error occurs inside the sandbox.

🛠️ Installation & Usage (Local Cloud)
1️⃣ Clone the Repository
git clone https://github.com/komal2267g/aegis-resilience-system.git
cd aegis-resilience-system

2️⃣ Launch the Data Center
docker-compose up --build

3️⃣ Access Control Dashboard

👉 http://localhost:8080

4️⃣ Run Verification Tests

Safe Test: 100 → ✅ Deployed

Crash Test: 100000 → 🛑 Blocked

📂 Project Structure
aegis-guard/
├── docker-compose.yml   # Orchestrator (Simulates Kubernetes Pods)
├── Dockerfile           # Container Definition
├── nginx.conf           # Load Balancer Logic
├── server.js            # Main Control Plane (Express API)
├── worker.js            # Sandbox / Canary Isolation
├── public/              # Frontend Dashboard
└── README.md            # Documentation

👤 Author

Komal Chaurasiya
Infrastructure & DevOps Enthusiast

"A system that survives failure is more valuable than one that never fails."
