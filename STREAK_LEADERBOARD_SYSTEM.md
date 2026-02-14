# Streak & Leaderboard System

## Overview
The NextRound AI platform now includes a comprehensive **Streak Tracking** and **Leaderboard** system to gamify learning and encourage consistent practice! 🔥🏆

## Features Implemented

### 1. Streak Tracking System ⚡

#### What is a Streak?
A streak tracks consecutive days of activity (solving problems). The longer you maintain your streak, the higher it grows!

#### How it Works:
- **Day 1**: Solve your first problem → Streak starts at 1 🎯
- **Day 2**: Solve another problem the next day → Streak increases to 2 🔥
- **Day 3**: Continue solving → Streak increases to 3 🚀
- **Skip a day**: Streak resets to 1 😢

#### Streak Metrics:
- **Current Streak**: Your active consecutive days of solving problems
- **Longest Streak**: Your all-time best streak record
- **Problems Solved**: Total count of unique problems you've solved

#### Data Storage:
User documents in Firestore now include:
```javascript
{
  currentStreak: number,      // Active streak count
  longestStreak: number,      // Best streak ever
  lastActivityDate: string,   // ISO date of last activity
  totalProblemsSolved: number // Total unique problems solved
}
```

#### Streak Logic:
- ✅ **Same Day**: Streak stays the same
- ✅ **Next Day** (consecutive): Streak increments by 1
- ❌ **Skipped Day(s)**: Streak resets to 1

---

### 2. Leaderboard System 🏆

#### What is the Leaderboard?
A ranking of top users based on total problems solved, displayed on the home page for logged-in users.

#### Leaderboard Features:
- **Top 10 Users**: Shows the best performers
- **Real-time Data**: Fetched from Firestore
- **Rank Display**:
  - 🥇 #1 - Gold
  - 🥈 #2 - Silver
  - 🥉 #3 - Bronze
  - #4-10 - Numbered ranks
- **User Highlighting**: Your position is highlighted in purple
- **Streak Display**: Each user's current streak is shown

#### Leaderboard Metrics:
- Username
- Total problems solved
- Current streak
- Profile image (if set)

---

### 3. Home Page Integration 🎨

#### For Logged-In Users Only:
The streak and leaderboard section appears between the hero section and features section on the home page.

#### Layout:
```
┌─────────────────────────────────────┐
│  🔥 Your Streak    │  🏆 Top Coders │
│                    │                 │
│  Current: 5 days   │  1. 🥇 User1   │
│  Longest: 12 days  │  2. 🥈 User2   │
│  Problems: 25      │  3. 🥉 User3   │
│  Motivation msg    │  ...           │
└─────────────────────────────────────┘
```

#### Design Features:
- **Gradient Cards**: Beautiful gradient backgrounds
- **Responsive**: Works on mobile and desktop
- **Animations**: Smooth hover effects
- **Custom Scrollbar**: Purple-themed scrollbar for leaderboard
- **Motivational Messages**: Dynamic messages based on streak

---

### 4. Practice Page Integration 💻

#### Automatic Streak Updates:
When you successfully submit a solution that passes all test cases:
1. ✅ Solution is saved to your profile
2. 🔢 `totalProblemsSolved` is incremented (for new problems only)
3. 🔥 Streak is automatically updated
4. 🎉 Success modal shows your updated streak!

#### Success Messages:
- **Streak Increased**: "All test cases passed! 🔥 Streak: 5 days! Your solution has been saved successfully."
- **Same Day**: "All test cases passed! Your solution has been saved successfully."

---

## Technical Implementation

### Files Created:
1. **`src/utils/streakUtils.js`**
   - `calculateStreak()`: Calculates streak based on last activity
   - `updateUserStreak()`: Updates user's streak in Firestore
   - `getUserStreak()`: Fetches user's streak data
   - `initializeUserStreak()`: Initializes streak for new users

2. **`src/utils/leaderboardUtils.js`**
   - `getLeaderboard()`: Fetches top users from Firestore
   - `getUserRank()`: Gets user's rank position
   - `updateTotalProblemsSolved()`: Updates problem count

### Files Modified:
1. **`src/pages/Practice.jsx`**
   - Imported `updateUserStreak`
   - Updated `handleSubmitSolution` to:
     - Track `totalProblemsSolved`
     - Update streak on successful submission
     - Show enhanced success message with streak

2. **`src/pages/Home.jsx`**
   - Imported `getLeaderboard`
   - Added state for leaderboard data
   - Created streak and leaderboard section (visible only for logged-in users)
   - Real-time user profile updates

---

## Firestore Rules Consideration

Ensure your Firestore security rules allow:
- ✅ Users can read their own profile data
- ✅ Users can update their own `currentStreak`, `longestStreak`, `lastActivityDate`, `totalProblemsSolved`
- ✅ All authenticated users can read basic profile data for leaderboard (username, profileImage, totalProblemsSolved, currentStreak)

Example rule:
```javascript
match /users/{userId} {
  allow read: if request.auth != null;
  allow write: if request.auth.uid == userId;
}
```

---

## Motivational Messages 💪

Based on your current streak, you'll see different motivational messages:

| Streak Range | Message |
|-------------|---------|
| 0 days | "Start solving to build your streak! 💪" |
| 1-6 days | "Keep going! You're building momentum! 🚀" |
| 7-29 days | "Amazing consistency! Keep it up! ⭐" |
| 30+ days | "You're on fire! Legendary streak! 🔥" |

---

## User Experience Flow

### New User:
1. Signs up → `currentStreak: 0`, `longestStreak: 0`, `totalProblemsSolved: 0`
2. Solves first problem → `currentStreak: 1`, `longestStreak: 1`, `totalProblemsSolved: 1`
3. Views home page → Sees their streak card and leaderboard

### Returning User (Next Day):
1. Solves a problem → Streak increments
2. Success modal shows updated streak: "🔥 Streak: 2 days!"
3. Home page automatically reflects new streak
4. Leaderboard position may improve

### User Who Skips a Day:
1. Misses a day
2. Solves a problem → Streak resets to 1
3. Longest streak remains unchanged (preserved as record)

---

## Benefits 🎯

1. **Consistency**: Encourages daily practice
2. **Competition**: Leaderboard motivates users to solve more problems
3. **Gamification**: Makes learning fun and engaging
4. **Progress Tracking**: Visual representation of effort
5. **Community**: See how you compare to other users

---

## Future Enhancements (Potential)

- 🔔 Streak reminders/notifications
- 📊 Detailed streak history (calendar view)
- 🏅 Badges for milestones (7-day, 30-day, 100-day streaks)
- 🎖️ Different leaderboard categories (by topic, by language)
- 👥 Friends/Following system
- 📈 Weekly/Monthly leaderboard resets

---

## Testing Checklist ✅

- [ ] Solve a problem and verify streak increments
- [ ] Solve another problem same day and verify streak stays same
- [ ] Wait 24+ hours, solve a problem, verify streak increments
- [ ] Skip 2 days, solve a problem, verify streak resets to 1
- [ ] Check leaderboard shows top users correctly
- [ ] Verify your position is highlighted on leaderboard
- [ ] Test on mobile and desktop
- [ ] Verify motivational messages change with streak

---

## Summary

The streak and leaderboard system adds a powerful gamification layer to NextRound AI, encouraging consistent practice and healthy competition among users. With beautiful UI, real-time updates, and motivational messages, users are incentivized to maintain their learning momentum! 🚀
