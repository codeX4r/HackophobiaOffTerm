#!/usr/bin/env node

const { exec } = require('child_process');
const os = require('os');

const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';

async function getCommand(prompt, apiKey) {
    const url = 'https://api.groq.com/openai/v1/chat/completions';


    const osType = os.platform() === 'win32' ? 'Windows Command Prompt (cmd)' : 'Linux Bash';

    const systemPrompt =
        `You are an elite terminal expert. Translate the user's natural language request ` +
        `into a single, valid, executable command for ${osType}. ` +
        `CRITICAL: Output ONLY the raw command. Do not include explanations. ` +
        `Do not include markdown formatting or backticks. Just the raw text.`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'openai/gpt-oss-20b',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.1
            })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(`API Error: ${errData.error?.message || response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content || '';
        return content.replace(/`/g, '').trim();
    } catch (err) {
        console.error(`\nError: ${err.message}\n`);
        process.exit(1);
    }
}

async function main() {

    const apiKey = process.env.GROQ_API_KEY || "put api key here";

    if (!apiKey || apiKey.includes("YOUR_ACTUAL_KEY")) {
        console.error(`\n${CYAN}Error: Please put your Groq API key in index.js${RESET}\n`);
        process.exit(1);
    }

    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.log("Usage: node index.js \"<what you want to do>\"");
        process.exit(0);
    }

    console.error(`${CYAN}Translating and executing automatically...${RESET}`);
    const command = await getCommand(args.join(' '), apiKey);
    console.log(`\n${GREEN}> ${command}${RESET}\n`);


    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution Error: ${error.message}`);
            return;
        }
        if (stderr) console.error(stderr);
        if (stdout) console.log(stdout);
    });
}

main();