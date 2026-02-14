<div align="center">

# 🚀 NextRound AI

### AI-Powered Interview Preparation Platform

*Master technical interviews and DSA problems with intelligent AI assistance*

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.9.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

</div>

---

## 📖 About

**NextRound AI** is a comprehensive interview preparation platform designed specifically for students and freshers to ace technical interviews. Combining the power of AI with a robust coding practice environment, it offers personalized learning experiences, real-time code execution, and intelligent interview simulations.

### Why NextRound AI?

- 🎯 **Smart Practice**: Curated DSA problems across 8+ topics with 96+ questions
- 🤖 **AI Interview**: Realistic interview simulations with GPT-4 powered feedback
- 💻 **Multi-Language Support**: Code in JavaScript, C++, or Java
- 📊 **Progress Tracking**: Visual dashboards with streak tracking and leaderboards
- 🏆 **Gamification**: Build streaks, compete on leaderboards, earn achievements
- 💬 **AI Chat Assistant**: 24/7 AI help for coding concepts and problem-solving

---

## ✨ Features

### 🎓 **Comprehensive Learning Environment**

#### 1. **Practice Problems**
- **96+ Handcrafted Problems** across 8 core topics:
  - 📊 Arrays (12 problems)
  - 🔤 Strings (12 problems)
  - 📚 Stack (12 problems)
  - 🔄 Queue (12 problems)
  - 🔗 Linked Lists (12 problems)
  - 🔁 Recursion (12 problems)
  - 🎨 Patterns (12 problems)
  - ⚙️ Functions (12 problems)

- **LeetCode-Style Interface**:
  - Split-screen layout (problem description + code editor)
  - Visible test cases (Run Code)
  - Hidden test cases (Submit)
  - Detailed test results with input/output

- **Monaco Editor Integration**:
  - Syntax highlighting
  - Auto-completion
  - Error detection
  - Multi-language support

#### 2. **Multi-Language Code Execution**

- **JavaScript**: Client-side execution with `eval()`
- **C++**: Server-side via Piston API
- **Java**: Server-side via Piston API

**Smart Test Harness Generation**:
- Automatically wraps user code with test inputs
- Handles all data types (arrays, strings, booleans, numbers)
- Supports 1D arrays, 2D arrays, primitives
- Dynamic type detection and formatting

#### 3. **AI-Powered Interview Simulation**

- **Realistic Mock Interviews**:
  - Technical screening rounds
  - DSA problem-solving interviews
  - System design discussions (coming soon)

- **Intelligent Evaluation**:
  - Real-time code analysis
  - Performance feedback
  - Improvement suggestions
  - Personalized tips

- **Interview Reports**:
  - Detailed score breakdown
  - Strengths & weaknesses analysis
  - Actionable recommendations

#### 4. **AI Chat Assistant**

- 24/7 availability
- Concept explanations
- Problem-solving hints
- Code debugging help
- Interview preparation tips

#### 5. **Gamification & Progress Tracking**

**Streak System** 🔥:
- Daily problem-solving streaks
- Current streak counter
- Longest streak record
- Motivational messages

**Leaderboard** 🏆:
- Real-time rankings
- Based on problems solved
- Top 10 users display
- User position highlighting

**Dashboard Analytics** 📊:
- Visual progress charts (Recharts)
- Topic-wise breakdown
- Recent submissions history
- Performance trends

#### 6. **User Management**

- **Authentication** (Firebase):
  - Email/Password signup
  - Secure login
  - Password reset
  - Session management

- **User Profiles**:
  - Custom username
  - Profile image upload (Base64)
  - Email verification
  - Account settings

- **Solution History**:
  - All submitted solutions saved
  - Filter by topic/language
  - Resubmit functionality
  - Code versioning

---

## 🎨 Design & UX

### Modern Interface

- **Dark Theme**: Eye-friendly dark mode throughout
- **Gradient Accents**: Beautiful purple-blue-pink gradients
- **Smooth Animations**: Fade-in, slide-up, scale effects
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Custom Modals**: Styled confirmation dialogs (no browser alerts)
- **Custom Scrollbars**: Purple-themed scrollbars

### Logout Confirmation

- Beautiful confirmation modal
- Loading states with spinners
- Multiple close options (X, Cancel, Backdrop)
- Prevents accidental logouts

### Color Palette

- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#8B5CF6)
- **Accent**: Pink (#EC4899)
- **Success**: Green (#00B8A3)
- **Warning**: Yellow (#FFC01E)
- **Error**: Red (#EF4743)
- **Background**: Black/Gray (#000000, #1A1A1A)

---

## 🚀 Demo

### Screenshots

#### 🏠 **Home Page**
```
┌───────────────────────────────────────────────────────┐
│  🖼️ Logo  NextRound AI           Login | Sign Up     │
├───────────────────────────────────────────────────────┤
│                                                       │
│        Crack Your Next Interview                      │
│        AI-Powered Practice Sessions                   │
│                                                       │
│   [Start Assessment] [AI Chat] [View Progress]       │
│                                                       │
│  ┌─────────────┐  ┌─────────────┐                   │
│  │ 🔥 Streak   │  │ 🏆 Leaders  │                   │
│  │   5 days    │  │  1. Alice   │                   │
│  │  🏆 Best: 12│  │  2. Bob     │                   │
│  │  ✅ 25 Q's  │  │  3. You     │                   │
│  └─────────────┘  └─────────────┘                   │
└───────────────────────────────────────────────────────┘
```

#### 💻 **Practice Page** (LeetCode-Style)
```
┌────────────────────┬──────────────────────────────────┐
│ Problem            │ Code Editor                      │
├────────────────────┼──────────────────────────────────┤
│ Two Sum            │ function twoSum(nums, target) {  │
│ Difficulty: Easy   │   // Your code here              │
│                    │                                  │
│ Description:       │ }                                │
│ Given an array...  │                                  │
│                    │ [Run Code] [Submit]              │
│ Test Cases:        ├──────────────────────────────────┤
│ ✅ Case 1: Pass    │ Console Output:                  │
│ ✅ Case 2: Pass    │ ✅ Test Case 1 Passed            │
│ ✅ Case 3: Pass    │    Expected: [0,1]               │
│                    │    Output: [0,1]                 │
└────────────────────┴──────────────────────────────────┘
```

#### 🤖 **AI Interview**
```
┌───────────────────────────────────────────────────────┐
│  AI Interviewer: "Let's start with a warmup..."      │
├───────────────────────────────────────────────────────┤
│  Question: Implement a function to reverse a string   │
│                                                       │
│  [Code Editor with Real-time Evaluation]             │
│                                                       │
│  AI Feedback: "Good approach! Consider edge cases..." │
│                                                       │
│  [Next Question]                    Score: 85/100    │
└───────────────────────────────────────────────────────┘
```

#### 📊 **Dashboard**
```
┌───────────────────────────────────────────────────────┐
│  Welcome, John Doe              [Settings] [Logout]  │
├───────────────────────────────────────────────────────┤
│  Progress Overview                                    │
│  ┌─────────────┬─────────────┬─────────────┐        │
│  │ Total: 25   │ Easy: 15    │ Medium: 8   │        │
│  │ Hard: 2     │ Streak: 5🔥 │ Rank: #23   │        │
│  └─────────────┴─────────────┴─────────────┘        │
│                                                       │
│  [Performance Chart - Recharts Line Graph]           │
│                                                       │
│  Recent Submissions:                                  │
│  • Two Sum (JavaScript) - ✅ Accepted                │
│  • Valid Anagram (C++) - ✅ Accepted                 │
│  • Reverse List (Java) - ❌ Wrong Answer             │
└───────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.2.0 | UI Library |
| **React Router** | 7.13.0 | Client-side routing |
| **Vite** | 7.3.1 | Build tool & dev server |
| **Tailwind CSS** | 3.4.19 | Utility-first CSS |
| **Monaco Editor** | 4.7.0 | Code editor (VS Code) |
| **Recharts** | 3.7.0 | Data visualization |

### Backend & Services

| Service | Purpose |
|---------|---------|
| **Firebase Auth** | User authentication |
| **Firestore** | Database (user data, solutions) |
| **Piston API** | C++/Java code execution |
| **OpenAI GPT-4** | AI interview & chat |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting |
| **PostCSS** | CSS processing |
| **Autoprefixer** | CSS vendor prefixes |

---

## 📦 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Firebase Account** (for backend services)
- **OpenAI API Key** (for AI features)

### Step 1: Clone Repository

```bash
git clone https://github.com/rajivs1/nextround-ai.git
cd nextround-ai
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# OpenAI Configuration
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_OPENAI_MODEL=gpt-4

# Piston API (optional - uses public endpoint by default)
VITE_PISTON_API_URL=https://emkc.org/api/v2/piston
```

### Step 4: Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** (Email/Password)
3. Create a **Firestore Database**
4. Set up Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

### Step 5: Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎯 Usage

### Getting Started

1. **Sign Up**: Create an account with email and password
2. **Explore**: Browse 96+ coding problems across 8 topics
3. **Practice**: Solve problems in JavaScript, C++, or Java
4. **Run Tests**: Test your code with visible test cases
5. **Submit**: Submit solutions to pass all test cases
6. **Build Streak**: Solve daily to maintain your streak
7. **AI Interview**: Take mock interviews with AI
8. **Track Progress**: Monitor your improvement on the dashboard

### Practice Mode

```javascript
// Example: Two Sum Problem

// Step 1: Read problem description
// Step 2: Write your solution
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// Step 3: Run Code (tests visible cases)
// Step 4: Submit (tests all cases)
// Step 5: View results and feedback
```

### AI Interview Mode

1. Click "Start New Assessment"
2. Choose difficulty level
3. Answer questions in real-time
4. Receive AI feedback
5. View detailed report
6. Get improvement suggestions

---

## 📂 Project Structure

```
nextround-ai/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── NexrRoundAi.png
│   │   └── NexrRoundAi2.png
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── data/
│   │   └── questions/
│   │       ├── arrays.js
│   │       ├── strings.js
│   │       ├── stack.js
│   │       ├── queue.js
│   │       ├── linkedlist.js
│   │       ├── recursion.js
│   │       ├── patterns.js
│   │       └── functions.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Practice.jsx
│   │   ├── Problems.jsx
│   │   ├── Interview.jsx
│   │   ├── Chat.jsx
│   │   └── Result.jsx
│   ├── services/
│   │   └── aiDSAGenerator.js
│   ├── utils/
│   │   ├── streakUtils.js
│   │   ├── leaderboardUtils.js
│   │   └── migrationUtils.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── firebase.js
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🔧 Configuration

### Firestore Collections

#### `users` Collection
```javascript
{
  uid: string,
  email: string,
  username: string,
  profileImage: string (Base64),
  createdAt: timestamp,
  
  // Streak & Leaderboard
  currentStreak: number,
  longestStreak: number,
  lastActivityDate: string (ISO),
  totalProblemsSolved: number,
  
  // Solutions
  solvedQuestions: [
    {
      questionId: string,
      questionTitle: string,
      topic: string,
      topicName: string,
      language: string,
      code: string,
      solvedAt: string (ISO)
    }
  ],
  
  // Interview History
  scores: [
    {
      score: number,
      date: timestamp,
      feedback: string
    }
  ]
}
```

### API Integrations

#### Piston API (Code Execution)
```javascript
POST https://emkc.org/api/v2/piston/execute
{
  "language": "cpp" | "java",
  "version": "*",
  "files": [{
    "name": "main.cpp" | "Main.java",
    "content": "// generated code with user's solution"
  }]
}
```

#### OpenAI API (AI Features)
```javascript
POST https://api.openai.com/v1/chat/completions
{
  "model": "gpt-4",
  "messages": [
    { "role": "system", "content": "You are an expert interviewer..." },
    { "role": "user", "content": "User's response..." }
  ]
}
```

---

## 🎓 Features in Detail

### Streak System

**How it works:**
- Solve at least 1 problem per day to maintain streak
- Same day: Streak stays same
- Next day (consecutive): Streak +1
- Skip a day: Streak resets to 1
- Longest streak is preserved as record

**Motivational Messages:**
- 0 days: "Start solving to build your streak! 💪"
- 1-6 days: "Keep going! You're building momentum! 🚀"
- 7-29 days: "Amazing consistency! Keep it up! ⭐"
- 30+ days: "You're on fire! Legendary streak! 🔥"

### Leaderboard

**Ranking Logic:**
- Ordered by `totalProblemsSolved` (descending)
- Top 10 users displayed
- Real-time updates
- User position highlighted

**Display:**
- 🥇 Rank #1 (Gold)
- 🥈 Rank #2 (Silver)
- 🥉 Rank #3 (Bronze)
- #4-10 (Numbered)

### Code Editor (Monaco)

**Features:**
- Syntax highlighting for JS, C++, Java
- IntelliSense auto-completion
- Error squiggles
- Bracket matching
- Code folding
- Minimap (optional)
- Multiple themes
- Keyboard shortcuts (VS Code compatible)

**Test Execution:**

**Run Code** (Visible Tests):
- Runs 3 visible test cases
- Shows detailed results
- Input, Expected, Output comparison
- Pass/Fail status with colors

**Submit** (All Tests):
- Runs all test cases (visible + hidden)
- Must pass 100% to accept
- Saves solution to Firestore
- Updates streak
- Increments problems solved count

---

## 🚧 Roadmap

### Upcoming Features

- [ ] **More Topics**: Trees, Graphs, Dynamic Programming, Greedy
- [ ] **Company-Specific Practice**: Google, Amazon, Microsoft, etc.
- [ ] **Contest Mode**: Weekly coding contests
- [ ] **Discussion Forum**: Community discussions for each problem
- [ ] **Video Solutions**: Step-by-step video explanations
- [ ] **Mobile App**: React Native version
- [ ] **Collaborative Coding**: Pair programming with friends
- [ ] **Code Review**: AI-powered code review and suggestions
- [ ] **Badges & Achievements**: 100+ day streak, All topics completed, etc.
- [ ] **Premium Features**: Advanced analytics, personalized study plans

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

### Contribution Guidelines

- Follow existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation
- Ensure all tests pass

### Areas to Contribute

- 🐛 **Bug Fixes**: Report or fix bugs
- ✨ **New Features**: Implement roadmap features
- 📝 **Documentation**: Improve README, add guides
- 🎨 **UI/UX**: Enhance design and user experience
- 🧪 **Testing**: Add unit and integration tests
- 🌐 **Translations**: Add multi-language support

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

- **Your Name** - *Initial work* - [GitHub](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- **Firebase** - Authentication and database
- **Piston API** - Code execution engine
- **OpenAI** - GPT-4 AI integration
- **Monaco Editor** - VS Code editor component
- **Recharts** - Beautiful charts library
- **Tailwind CSS** - Utility-first CSS framework
- **LeetCode** - Inspiration for problem format

---

## 📞 Support

### Need Help?

- 📧 **Email**: support@nextroundai.com
- 💬 **Discord**: [Join our community](https://discord.gg/nextroundai)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/nextround-ai/issues)
- 📖 **Documentation**: [Full docs](https://docs.nextroundai.com)

### FAQ

**Q: Is this free to use?**
A: Yes! NextRound AI is completely free for students and freshers.

**Q: Do I need to install anything?**
A: Just a modern web browser. No installations required!

**Q: Which programming languages are supported?**
A: JavaScript, C++, and Java with plans for more.

**Q: How accurate is the AI interviewer?**
A: It uses GPT-4 and provides realistic interview simulation.

**Q: Can I use this for company interviews?**
A: Absolutely! It's designed specifically for technical interview prep.

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/nextround-ai?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/nextround-ai?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/nextround-ai)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/nextround-ai)

---

<div align="center">

### Made with ❤️ for aspiring developers

**[⬆ Back to Top](#-nextround-ai)**

---

**Star ⭐ this repo if you found it helpful!**

</div>
