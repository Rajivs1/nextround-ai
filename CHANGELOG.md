# Changelog

All notable changes to NextRound AI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Trees and Graphs problems
- Dynamic Programming section
- Company-specific problem sets
- Weekly coding contests
- Discussion forum
- Video solutions

---

## [1.0.0] - 2026-02-14

### 🎉 Initial Release

#### Added

**Core Features:**
- ✅ User authentication (Firebase)
  - Email/password signup and login
  - Password reset functionality
  - Session management
  - Profile image upload

- ✅ Practice Environment
  - 96+ coding problems across 8 topics
  - LeetCode-style split-screen interface
  - Monaco code editor integration
  - Multi-language support (JavaScript, C++, Java)
  - Real-time code execution
  - Visible and hidden test cases
  - Detailed test results

- ✅ AI-Powered Features
  - AI Interview Simulation (GPT-4)
  - AI Chat Assistant
  - Intelligent feedback and evaluation
  - Personalized improvement suggestions

- ✅ Gamification
  - Daily streak tracking
  - Leaderboard with real-time rankings
  - Progress tracking dashboard
  - Visual analytics with Recharts

- ✅ UI/UX
  - Modern dark theme
  - Responsive design (mobile, tablet, desktop)
  - Smooth animations (fade-in, slide-up, scale)
  - Custom modals (logout confirmation)
  - Purple-themed scrollbars
  - Gradient accents

**Problem Topics:**
- 📊 Arrays (12 problems)
- 🔤 Strings (12 problems)
- 📚 Stack (12 problems)
- 🔄 Queue (12 problems)
- 🔗 Linked Lists (12 problems)
- 🔁 Recursion (12 problems)
- 🎨 Patterns (12 problems)
- ⚙️ Functions (12 problems)

**Technical Implementation:**
- React 19.2.0 with hooks
- React Router 7.13.0 for navigation
- Vite 7.3.1 build tool
- Tailwind CSS 3.4.19 for styling
- Firebase 12.9.0 (Auth + Firestore)
- Monaco Editor 4.7.0 for code editing
- Recharts 3.7.0 for data visualization
- Piston API for C++/Java execution
- OpenAI GPT-4 integration

---

## [0.9.0] - 2026-02-13

### Added
- Logout confirmation modal with beautiful design
- Multiple close options (X button, Cancel, Backdrop)
- Loading states with spinners
- Prevents accidental logouts

### Fixed
- Code editor now works for all topics (not just arrays)
- Dynamic test code generation for C++ and Java
- Handles all input formats (strings, arrays, booleans, numbers)
- Supports all return types (primitives, 1D arrays, 2D arrays)

### Changed
- Improved test harness generation logic
- Better error handling for code execution
- Enhanced feedback messages

---

## [0.8.0] - 2026-02-12

### Added
- Leaderboard username fix
- Auto-migration for existing users
- Dynamic leaderboard query (fetches all users)
- Field initialization on signup

### Fixed
- Users not appearing on leaderboard
- Missing `totalProblemsSolved` field
- Firestore query limitations

---

## [0.7.0] - 2026-02-11

### Added
- Streak tracking system
  - Daily activity tracking
  - Current streak counter
  - Longest streak record
  - Motivational messages
- Leaderboard system
  - Top 10 users ranking
  - Real-time updates
  - User position highlighting
  - Streak display

### Changed
- Home page now shows streak and leaderboard (logged-in users)
- Dashboard includes streak information
- Practice page updates streak on successful submission

---

## [0.6.0] - 2026-02-10

### Added
- Multi-language support (JavaScript, C++, Java)
- Language selector in code editor
- Piston API integration for C++/Java
- Syntax highlighting for all languages
- Test harness generation for compiled languages

### Changed
- Practice page refactored for language support
- Code editor now supports 3 languages
- Starter code generation for each language

---

## [0.5.0] - 2026-02-09

### Added
- LeetCode-style practice interface
- Split-screen layout (problem + editor)
- Visible test cases (Run Code)
- Hidden test cases (Submit)
- Detailed test results
- Console output with pass/fail indicators

### Changed
- Practice page completely redesigned
- Dark theme implementation
- LeetCode color palette applied

---

## [0.4.0] - 2026-02-08

### Added
- Test cases for all 96 questions
- Comprehensive test coverage
- Edge case testing
- Input validation

### Changed
- All questions now have 3-5 test cases
- Better test case structure
- Improved validation logic

---

## [0.3.0] - 2026-02-07

### Added
- AI Interview Simulation
- GPT-4 powered interviewer
- Real-time code evaluation
- Interview feedback reports
- Score calculation

### Changed
- Interview page redesigned
- Better AI prompt engineering
- Improved result display

---

## [0.2.0] - 2026-02-06

### Added
- Dashboard with analytics
- Recharts integration
- Progress tracking
- Solution history
- Profile management
- Account settings

### Changed
- Dashboard layout improved
- Better data visualization
- Enhanced user profile

---

## [0.1.0] - 2026-02-05

### Added
- Initial project setup
- React + Vite configuration
- Firebase integration
- Basic authentication
- Home page
- Problems listing page
- Basic code editor
- 96 coding problems

### Technical
- ESLint configuration
- Tailwind CSS setup
- React Router setup
- Firebase configuration

---

## Version History Summary

| Version | Date | Highlights |
|---------|------|-----------|
| **1.0.0** | 2026-02-14 | 🎉 Initial Release - Full featured platform |
| 0.9.0 | 2026-02-13 | Logout modal + Code editor fixes |
| 0.8.0 | 2026-02-12 | Leaderboard fixes |
| 0.7.0 | 2026-02-11 | Streak & Leaderboard system |
| 0.6.0 | 2026-02-10 | Multi-language support |
| 0.5.0 | 2026-02-09 | LeetCode-style interface |
| 0.4.0 | 2026-02-08 | Test cases for all problems |
| 0.3.0 | 2026-02-07 | AI Interview simulation |
| 0.2.0 | 2026-02-06 | Dashboard & analytics |
| 0.1.0 | 2026-02-05 | Project initialization |

---

## Breaking Changes

None yet - this is the initial release!

---

## Security

### Version 1.0.0
- Secure Firebase authentication
- Firestore security rules implemented
- Environment variables for sensitive data
- No known vulnerabilities

---

## Contributors

Special thanks to all contributors who helped build NextRound AI! 🙏

---

## Links

- [Repository](https://github.com/yourusername/nextround-ai)
- [Issues](https://github.com/yourusername/nextround-ai/issues)
- [Releases](https://github.com/yourusername/nextround-ai/releases)
- [Documentation](https://docs.nextroundai.com)

---

<div align="center">

**[⬆ Back to Top](#changelog)**

Made with ❤️ for aspiring developers

</div>
