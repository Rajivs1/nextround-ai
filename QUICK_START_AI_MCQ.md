# 🚀 Quick Start: AI MCQ Generator

## ✨ What's New?

Your interview platform now uses **Groq AI** to generate fresh MCQ questions dynamically! No more repeating the same questions.

---

## 🏁 Get Started in 3 Steps

### Step 1: Verify Configuration ✅
Your `.env` file already has the Groq API key configured:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_AI_PROVIDER=groq
```

### Step 2: Test It (Optional) 🧪
Open `test-ai-mcq.html` in your browser to test question generation:
```bash
# Just double-click the file, or:
open test-ai-mcq.html
```

### Step 3: Use in Your App 🎯
1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to **Interview** page
3. Click **"🤖 AI-Generated Questions"** toggle
4. Select a role (Developer, HR, etc.)
5. Wait 10-20 seconds for generation
6. Start your assessment!

---

## 🎯 Quick Demo

### Using AI Questions:
1. Go to Interview page
2. Toggle to "AI-Generated Questions"
3. Click any role card
4. Wait for questions to generate
5. Complete assessment as usual!

### Compare with Standard:
1. Take an assessment with **Standard Questions**
2. Note your score
3. Take another with **AI-Generated Questions**
4. Compare the variety and difficulty!

---

## 📊 What You Get

### AI Mode:
- ✨ Fresh questions every time
- 🎓 Interview-relevant content
- 📝 Code snippets included
- ⏱️ 10-20 second generation
- 🎯 Mixed difficulty levels

### Standard Mode:
- 📚 Curated questions
- ⚡ Instant start
- 🎯 Consistent benchmarking
- 💯 Proven quality

---

## 🛠️ For Developers

### Generate Questions Programmatically:

```javascript
import { generateInterviewQuestions } from '../services/aiMCQGenerator';

// Generate 25 questions for a role
const questions = await generateInterviewQuestions('developer', 25);

// Use them in your component
setQuestions(questions);
```

### Available Functions:

```javascript
// General MCQ generation
generateMCQQuestions(role, topic, count, difficulty)

// Quick interview questions
generateInterviewQuestions(role, count)

// Programming-specific questions
generateProgrammingQuestions(topic, count, difficulty)

// With caching
getQuickQuestions(role, topic, count, useCache)
```

---

## 📖 Documentation

- **`AI_MCQ_GENERATOR_GUIDE.md`** - Complete user guide
- **`AI_MCQ_IMPLEMENTATION_SUMMARY.md`** - Technical details
- **`test-ai-mcq.html`** - Interactive test page

---

## ⚡ Performance

- **5 questions:** ~5-8 seconds
- **10 questions:** ~8-12 seconds
- **25 questions:** ~15-25 seconds

---

## 🎉 That's It!

You're ready to use AI-powered question generation!

### Next Steps:
1. ✅ Test with `test-ai-mcq.html`
2. ✅ Try it in your app
3. ✅ Compare AI vs Standard questions
4. ✅ Share feedback!

**Happy Practicing! 🚀**
