const express = require('express');
const { Worker } = require('worker_threads');
const path = require('path');
const app = express();

app.use(express.json());

// Ye line HTML Dashboard serve karegi
app.use(express.static('public'));

app.post('/deploy-config', (req, res) => {
    const newConfig = req.body;
    console.log("\n🔹 New Config Received. Starting Safety Check...");

    // === THE AEGIS LOGIC ===
    const sandbox = new Worker('./worker.js', {
        workerData: newConfig
    });

    sandbox.on('message', (msg) => {
        if (msg === "SUCCESS") {
            console.log("✅ Check Passed. Config Updated!");
            res.status(200).json({ status: "Deployed", config: newConfig });
        }
    });

    sandbox.on('error', (err) => {
        console.log(`🛑 BLOCKED: Crash Detected! Reason: ${err.message}`);
        res.status(400).json({ status: "Rejected", reason: "Config unsafe - Crash Detected" });
    });

    sandbox.on('exit', (code) => {
        if (code !== 0) console.log(`⚠️ Sandbox died (Exit Code: ${code})`);
    });
});

app.listen(3000, () => {
    console.log("🛡️  Aegis Dashboard running at http://localhost:3000");
});