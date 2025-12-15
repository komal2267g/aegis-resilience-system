// worker.js
const { parentPort, workerData } = require('worker_threads');

const config = workerData;

console.log(`[Sandbox] Checking Config Limit: ${config.limit}...`);

try {
    // === SIMULATION FIX ===
    // Hum memory flood nahi karenge, bas logic check karenge.
    // Cloudflare scenario: Valid Syntax, but Runtime Panic.
    
    if (config.limit > 5000) {
        // Hum manually "Crash" karwa rahe hain
        throw new Error("FATAL: Memory Limit Exceeded! (Simulated Logic Panic)");
    }

    // Agar limit kam hai to Success
    parentPort.postMessage("SUCCESS");

} catch (error) {
    // Error ko throw karo taaki Main Server detect kare
    throw error;
}