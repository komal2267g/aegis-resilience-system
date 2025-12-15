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

### 🏗️ How It Works (Internal Logic)

```mermaid
graph TD;
    Admin-->|Push Config| MainServer[Main Server Process];
    MainServer-->|1. ISOLATE| Worker[👷 Worker Sandbox];
    Worker-->|2. STRESS TEST| RAM{Memory Check};
    
    RAM-- Crash/Panic --> Reject[❌ REJECT Update];
    RAM-- Safe --> Apply[✅ APPLY Config];
    
    Reject-->|Signal| MainServer;
    Apply-->|Signal| MainServer;
    
    style Reject fill:#ffcccc,stroke:#ff0000
    style Apply fill:#ccffcc,stroke:#00ff00
Key Takeaway: If the Worker crashes (Memory Limit Exceeded), the Main Server remains 100% online. The outage is contained.
🚀 Key Engineering Features
Feature	Standard System	Aegis System
Validation Method	Static Syntax Check	Runtime Canary Analysis
Failure Impact	Total Server Crash	Zero Downtime (Only Sandbox dies)
Architecture	Monolithic State	Isolated Microservices
Blast Radius	Global	Contained to Single Process
📸 Proof of Resilience
✅ 1. Safe Deployment
When a normal configuration is pushed, the sandbox validates it, and the Main Server applies the update instantly.
![alt text](./screenshots/safe-deployment.png)
🛑 2. Attack Simulation (Crash Blocked)
When we inject a payload of 100,000 (Simulating the Cloudflare memory bug), the Worker Thread Crashes, but the System Blocks the Update.
![alt text](./screenshots/crash-prevention.png)
The terminal logs confirm the Main Server did not restart even though a fatal memory error occurred.
🛠️ Installation & Usage (Local Cloud)
You need Docker installed to run the full simulation (3 Nodes + 1 Load Balancer).
1. Clone the Repository
code
Bash
git clone https://github.com/komal2267g/aegis-resilience-system.git
cd aegis-resilience-system
2. Launch the Data Center
This spins up 3 replicas of the Aegis Server and 1 Nginx Load Balancer.
code
Bash
docker-compose up --build
3. Access Control Dashboard
Open your browser to:
👉 http://localhost:8080
4. Run Verification Tests
Safe Test: Enter 100 -> Result: Deployed ✅
Crash Test: Enter 100000 -> Result: Blocked 🛑
📂 Project Structure
code
Bash
aegis-guard/
├── docker-compose.yml   # Orchestrator (Simulates Kubernetes Pods)
├── Dockerfile           # Container Definition
├── nginx.conf           # Load Balancer Logic
├── server.js            # Main Control Plane (Express API)
├── worker.js            # The Sandbox (Isolation Logic)
├── public/              # Frontend Dashboard
└── README.md            # Documentation
👤 Author
Komal Chaurasiya
Infrastructure & DevOps Enthusiast
"A system that survives failure is more valuable than one that never fails."
