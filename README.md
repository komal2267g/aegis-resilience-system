# 🛡️ Aegis: Fault-Tolerant Runtime Configuration Immunizer

![Status](https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge)
![Tech](https://img.shields.io/badge/Node.js-Worker_Threads-green?style=for-the-badge)
![Infrastructure](https://img.shields.io/badge/Docker-Nginx_Load_Balancer-blue?style=for-the-badge)

> **"Systems shouldn't crash just because of a valid-syntax configuration."**  
> A fault-tolerant, self-healing runtime protection system designed to prevent **global outages caused by bad configuration updates**.  
>  
> Inspired by the **Cloudflare Global Outage (December 2025)**.

---

## 📌 Real-World Background

On **December 5, 2025**, a large-scale production outage occurred when a **valid configuration file** triggered a **runtime memory overflow** after deployment.

What went wrong?

- ✔️ Configuration syntax was correct (JSON/YAML)
- ✔️ CI/CD static checks passed
- ❌ **Runtime behavior under real data scale was never tested**

This single configuration change caused the **entire control plane to crash**, taking multiple services offline.

---

## ⚡ Problem Statement

Traditional deployment pipelines focus on:

- Syntax validation  
- Linting  
- Static analysis  

But they **trust runtime behavior blindly**.

### ❌ Result:
A **Single Point of Failure** where:
- One bad config = full server crash
- Zero isolation
- Global blast radius

---

## 🛡️ Solution: Aegis Architecture

**Aegis** introduces a **Runtime Immunization Layer** between deployment and production.

Instead of directly applying configuration updates, Aegis:

- Treats every config as **potentially dangerous**
- Tests it in an **isolated sandbox**
- Applies it to production **only if it survives runtime stress**

Think of it like a **biological immune system**:
> The body survives because the virus is tested before it spreads.

---

## 🧠 How Aegis Works (Simple Explanation)

1. **Admin / CI Pipeline** pushes a new configuration
2. **Main Server** does NOT apply it immediately
3. The config is sent to a **Worker Sandbox**
4. The sandbox:
   - Loads the config
   - Simulates real memory pressure
5. Based on the result:
   - ❌ Crash → Update rejected
   - ✅ Safe → Update applied
6. **Main Server never crashes**, even if the sandbox dies

---

## 🔐 Key Safety Guarantee

> **If the sandbox crashes due to memory overflow, the production server remains 100% online.**

Outage is **fully contained**.

---

## 🚀 Key Engineering Features

| Feature | Standard System | Aegis System |
|------|----------------|--------------|
| Validation Method | Static Syntax Check | Runtime Canary Analysis |
| Failure Impact | Total Server Crash | Zero Downtime |
| Architecture | Monolithic State | Isolated Processes |
| Blast Radius | Global | Single Sandbox |
| Recovery | Manual Restart | Automatic Rejection |

---

## 📸 Proof of Resilience

### ✅ Safe Deployment
When a normal configuration is pushed:
- Sandbox validates it successfully
- Main Server applies it instantly

📷 `./screenshots/safe-deployment.png`

---

### 🛑 Attack Simulation (Crash Blocked)

When a payload of **100000** is injected  
(simulating the Cloudflare memory bug):

- Worker Sandbox crashes
- Update is **blocked**
- Main Server continues running without restart

📷 `./screenshots/crash-prevention.png`

📌 Terminal logs confirm:
> Production server never restarted despite fatal sandbox error.

---

## 🛠️ Installation & Usage (Local Cloud Simulation)

### Prerequisites
- Docker
- Docker Compose

---

### 1️⃣ Clone the Repository

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
