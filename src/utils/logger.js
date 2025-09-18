// src/utils/logger.js
export async function Log(stack, level, pkg, message) {
  try {
    const validStacks = ["backend", "frontend"];
    const validLevels = ["debug", "info", "warn", "error", "fatal"];
    const validFrontendPkgs = [
      "api",
      "component",
      "hook",
      "page",
      "state",
      "style",
      "auth",
      "config",
      "middleware",
      "utils",
    ];

    if (!validStacks.includes(stack)) throw new Error("Invalid stack");
    if (!validLevels.includes(level)) throw new Error("Invalid log level");
    if (!validFrontendPkgs.includes(pkg)) throw new Error("Invalid package");

    const body = { stack, level, package: pkg, message };

    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error("Failed to send log:", res.status);
    } else {
      const data = await res.json();
      console.info("✅ Log sent:", data);
    }
  } catch (err) {
    console.error("Logger error:", err.message);
  }
}
