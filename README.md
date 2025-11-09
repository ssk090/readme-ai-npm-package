# 🧠 @catmeow/readme-ai

> Generate beautiful, professional **README.md** files for your project — powered by Google Gemini AI.

---

## 🚀 Quick Start (No Install Needed)

Just run this inside your project folder 👇

```bash
npx @catmeow/readme-ai --api-key <YOUR_GOOGLE_API_KEY>
```

It analyzes your project, generates a README, and saves it automatically.

---

## 💡 Why Use It?

- 🪄 **Instant READMEs** — saves hours of writing  
- 🤖 **AI-powered** by Google Gemini  
- 🧠 **Understands your project** structure, code, and stack  
- ✨ **Zero setup** — just one command  

---

## 📦 Install (Optional)

If you prefer installing globally:

```bash
npm install -g @catmeow/readme-ai
# or
pnpm add -g @catmeow/readme-ai
```

Then run:

```bash
readme-ai
```

Or specify a project path:

```bash
readme-ai /path/to/your/project
```

---

## ⚙️ Environment Setup

You can set your API key once and forget it 👇

```bash
export GOOGLE_API_KEY=<YOUR_GOOGLE_API_KEY>
```

Or create a `.env` file in the root:

```
GOOGLE_API_KEY=<YOUR_GOOGLE_API_KEY>
```

---

## 🧠 Example Output

```bash
🧩 Analyzing project...
🤖 Generating README using AI...
✅ README.md created successfully!
```

---

## 🧰 Run as a Local Server (Optional)

You can also start the generator as an API server.

```bash
node src/server.ts
```

Then call it:

```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{"name": "my-project"}'
```

---

## 🧩 Programmatic Usage

Use it directly in your scripts:

```js
import { ProjectAnalyzer } from '@catmeow/readme-ai/src/analyzer';

const analyzer = new ProjectAnalyzer('./my-app');
const projectInfo = await analyzer.analyze();
console.log(projectInfo);
```

---

## 🧱 Built With

- ⚡ TypeScript  
- 🌐 Node.js  
- 🚀 Express  
- 🧠 Google Gemini API  
- 🎨 Chalk & Commander  

---

## 🐾 License

MIT © CatMeow