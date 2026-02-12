# 🤖 AI MCQ Generator - User Guide

## ✨ What's New?

Your interview practice platform now features **AI-Powered Question Generation**! Instead of using the same hard-coded questions, you can now generate fresh, unique MCQ questions powered by Groq AI every time you practice.

---

## 🚀 How to Use

### 1. Access the Interview Page
Navigate to the **Interview** section from your dashboard.

### 2. Choose Question Type

You'll see two options:

**📚 Standard Questions**
- Pre-written, curated questions
- Consistent across all attempts
- Instant start (no waiting)
- Good for benchmarking

**🤖 AI-Generated Questions**
- Dynamically created by AI
- Fresh questions every time
- Takes 10-20 seconds to generate
- More variety and challenging

### 3. Select Your Role
Choose from available roles:
- 💻 Software Developer
- 🎨 Frontend Developer
- 👥 HR Professional
- 📊 Data Analyst
- 🗄️ SQL Developer

### 4. Start Assessment
- Click on your chosen role card
- Wait for questions to generate (if using AI)
- Complete 25 questions in 30 minutes
- Get instant results!

---

## 🎯 Features

### Dynamic Question Generation
- **Fresh Content:** Every assessment has new questions
- **Relevant Topics:** Questions match your selected role
- **Mixed Difficulty:** Easy, Medium, and Hard questions
- **Code Snippets:** Programming questions include properly formatted code

### Smart Question Quality
- Questions are practical and interview-relevant
- 4 multiple-choice options per question
- Clear, unambiguous correct answers
- Plausible distractors (wrong answers)

### Performance Tracking
- Same scoring system as standard questions
- Results saved to your profile
- Detailed performance analysis
- Question-by-question review

---

## 💡 Tips for Best Results

### When to Use AI-Generated Questions
✅ **Use AI when:**
- You've completed standard questions multiple times
- You want to test your knowledge with new scenarios
- You're looking for more practice variety
- You want to challenge yourself with different question styles

✅ **Use Standard when:**
- You want to benchmark your baseline score
- You prefer consistent question sets
- You're comparing progress over time
- You want to start immediately without waiting

### Best Practices
1. **Internet Connection:** Ensure stable internet for AI generation
2. **Be Patient:** Question generation takes 10-20 seconds
3. **Fresh Practice:** Use AI mode for each practice session
4. **Mix It Up:** Alternate between standard and AI questions

---

## 🛠️ Technical Details

### Powered by Groq AI
- **Models Used:** Llama 3.3 70B, Mixtral 8x7B, Llama 3.1 8B
- **Generation Time:** 10-20 seconds for 25 questions
- **API:** Groq Cloud API (Free tier included)
- **Reliability:** Automatic fallback between models

### Question Format
```javascript
{
  "id": 1,
  "question": "What is the output of this code?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct": 0, // Index of correct answer (0-3)
  "difficulty": "medium"
}
```

### Privacy & Data
- Questions are generated on-demand
- Not stored permanently in the database
- Your answers and scores are saved
- API calls are made securely

---

## 🐛 Troubleshooting

### Generation Takes Too Long
- **Normal time:** 10-20 seconds
- **If over 30 seconds:** 
  - Check your internet connection
  - Try refreshing the page
  - Switch to Standard questions

### Generation Failed Error
If you see "Failed to generate questions":
1. Check browser console (F12) for error details
2. Verify Groq API key in `.env` file
3. Try again (may be temporary API issue)
4. Use Standard questions as fallback

### Questions Don't Load
- Ensure you have an active internet connection
- Check if dev server is running
- Clear browser cache
- Restart the application

---

## 🔧 For Developers

### Using the AI MCQ Generator in Your Code

```javascript
import { generateMCQQuestions, generateInterviewQuestions } from '../services/aiMCQGenerator';

// Generate questions for a specific role
const questions = await generateInterviewQuestions('developer', 25);

// Generate questions for a specific topic
const arrayQuestions = await generateMCQQuestions('developer', 'Arrays', 10, 'mixed');

// With specific difficulty
const hardQuestions = await generateMCQQuestions('developer', 'Recursion', 5, 'hard');
```

### Available Functions

**`generateMCQQuestions(role, topic, count, difficulty)`**
- `role`: 'developer', 'hr', 'dataAnalyst', 'sqlDeveloper', etc.
- `topic`: Specific subject (optional)
- `count`: Number of questions (default: 10)
- `difficulty`: 'easy', 'medium', 'hard', or 'mixed' (default: 'mixed')

**`generateInterviewQuestions(role, count)`**
- Quick function for interview-style questions
- Returns 25 mixed-difficulty questions by default

**`getQuickQuestions(role, topic, count, useCache)`**
- Same as `generateMCQQuestions` but with caching
- Cache expires after 5 minutes

### Configuration

Add to your `.env` file:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_AI_PROVIDER=groq
```

Get your free Groq API key: https://console.groq.com/keys

---

## 🎓 Examples

### Example: Developer Assessment
```
Role: Software Developer
Mode: AI-Generated
Questions: 25
Topics Covered:
  - JavaScript fundamentals
  - Data structures
  - Algorithms
  - Code output prediction
  - Best practices
  - Design patterns
```

### Sample AI-Generated Question
```
Question: What will this JavaScript code output?

```javascript
let x = [1, 2, 3];
let y = x;
y.push(4);
console.log(x.length);
```

Options:
A) 3
B) 4  ✅ Correct
C) undefined
D) Error
```

---

## 📊 Comparison: AI vs Standard

| Feature | Standard Questions | AI-Generated Questions |
|---------|-------------------|----------------------|
| Speed | Instant | 10-20 seconds |
| Variety | Fixed set | Unlimited unique questions |
| Consistency | Same every time | Different each time |
| Quality | Hand-crafted | AI-generated & validated |
| Best For | Benchmarking | Practice & Learning |
| Cost | Free | Free (with API limits) |

---

## 🚀 Future Enhancements

Coming soon:
- Topic-specific question generation
- Difficulty level customization
- Multi-language code questions
- Custom question count
- Question bookmarking
- Export questions to PDF

---

## 📝 Feedback

Found a bug or have a suggestion? Please let us know!

**Happy Learning! 🎉**
