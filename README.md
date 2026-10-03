# OffTerm 💻 (HackOPhobia '26 Submission)

**OffTerm** is a CLI tool built with Node.js that translates natural language queries into executable Bash commands using open-weight AI (Llama 3.1 8B).

## 🚀 Key Features
* **Open-Weight Intelligence:** Powered by Meta's Llama 3.1 8B.
* **Zero NPM Packages Required:** Built using native Node.js APIs (`fetch`, `child_process`).
* **Safety First:** Preview generated shell commands before executing them using the `-x` flag.

## 🛠️ Tech Stack
* **Runtime:** Node.js (v18+)
* **Model Engine:** Groq API (Llama-3.1-8b-instant)
* **License:** MIT

## ⚡ Quick Start

1. Get a free API key from [Groq Console](https://console.groq.com).
2. Export the key in your terminal:
   \`\`\`bash
   export GROQ_API_KEY="your_api_key_here"
   \`\`\`
3. Run OffTerm:
   \`\`\`bash
   node index.js "kill the process running on port 8080"
   \`\`\`

### Execute Flag (`-x`)
Add `-x` to prompt for immediate execution:
\`\`\`bash
node index.js "list all node processes" -x
\`\`\`