# LeetCode-Style Practice Page

## Overview
The Practice page now works **exactly like LeetCode**, with proper test case display, console output, and submission flow.

## Key Features

### 1. **LeetCode-Style Layout**
- **Left Panel**: Problem description and test cases
- **Right Panel**: Code editor with console
- Clean, dark theme matching LeetCode's aesthetic

### 2. **Test Cases Display**
- First 3 test cases are **visible** in the Description tab
- Displayed below the example in the problem statement
- Shows both Input and Expected Output
- Additional hidden test cases run during submission

### 3. **Run Button Behavior (Like LeetCode)**
```
Click "Run" → Executes ONLY visible test cases → Shows results in console
```

**Console Output:**
- Shows "Accepted" (green) if all visible tests pass
- Shows "Wrong Answer" (red) if any test fails
- Displays each test case with:
  - Input
  - Your Output
  - Expected (only shown if failed)
  - Error message (if any)

### 4. **Submit Button Behavior (Like LeetCode)**
```
Click "Submit" → Runs ALL test cases (visible + hidden) → Shows acceptance status
```

**If All Pass:**
- Alert: "Accepted - All test cases passed!"
- Solution saved to Firebase

**If Any Fail:**
- Alert: "Wrong Answer - X out of Y test cases failed"
- Suggests using "Run" to debug visible cases

### 5. **Two Tabs in Left Panel**

#### Description Tab
- Problem description
- Example with explanation
- **Test Cases section** (NEW!)
  - Shows first 3 test cases
  - Each case displays Input and Output
  - In LeetCode-style cards

#### Result Tab
- Shows after clicking "Run"
- Displays detailed results for each visible test case
- Summary: "Accepted" or "Wrong Answer"
- Color-coded: Green (pass), Red (fail)

## UI Elements

### Colors (LeetCode Theme)
- **Easy**: `#00b8a3` (teal)
- **Medium**: `#ffc01e` (yellow)
- **Hard**: `#ef4743` (red)
- **Success/Pass**: `#00b8a3` (green)
- **Error/Fail**: `#ef4743` (red)
- **Background**: `#1a1a1a`, `#262626`, `#282828` (dark grays)
- **Text**: White and `#eff1f6bf` (light gray)

### Console
- **Testcase Tab**: Shows test case inputs/outputs
- Displays results in LeetCode format:
  - Case number with pass/fail indicator
  - Input
  - Output (your result)
  - Expected (only if failed)
  - Error message (if runtime error)

## User Workflow

### Typical Usage:
1. **Read** the problem description
2. **Check** the example and visible test cases
3. **Write** your solution in the code editor
4. **Click "Run"** to test against visible cases
5. **Debug** if any visible test fails (check Result tab or console)
6. **Repeat** steps 3-5 until all visible tests pass
7. **Click "Submit"** to run all hidden tests and save solution

### Example Console Output:

```
Accepted
─────────────────
Case 1: ✓
Input: [2,7,11,15], 9
Output: [0,1]

Case 2: ✓
Input: [3,2,4], 6
Output: [1,2]

Case 3: ✓
Input: [3,3], 6
Output: [0,1]
```

```
Wrong Answer
─────────────────
Case 1: ✓
Input: [2,7,11,15], 9
Output: [0,1]

Case 2: ✗
Input: [3,2,4], 6
Output: [0,2]
Expected: [1,2]

Case 3: ✓
Input: [3,3], 6
Output: [0,1]
```

## Technical Implementation

### State Management
```javascript
const [code, setCode] = useState('');
const [consoleOutput, setConsoleOutput] = useState([]);
const [isRunning, setIsRunning] = useState(false);
const [isSaving, setIsSaving] = useState(false);
const [activeTab, setActiveTab] = useState('description');
```

### Test Case Arrays
```javascript
// First 3 test cases shown to user
const visibleTestCases = currentQuestion?.testCases?.slice(0, 3) || [];

// All test cases (including hidden ones) run on Submit
const allTestCases = currentQuestion?.testCases || [];
```

### Run Function
- Executes user code against `visibleTestCases`
- Uses `eval()` for JavaScript execution
- Compares output with expected using JSON.stringify
- Updates `consoleOutput` with results

### Submit Function
- Runs ALL test cases (`allTestCases`)
- If any fail: Shows alert and prevents submission
- If all pass: Saves to Firebase and shows success

## Benefits

✅ **LeetCode-like experience** - Familiar workflow for interview prep
✅ **Test visibility** - Users see what they're testing against
✅ **Progressive testing** - Run → Debug → Submit workflow
✅ **Hidden tests** - Prevents gaming the system
✅ **Clean console** - Clear, formatted output like LeetCode
✅ **Instant feedback** - Real-time pass/fail indicators

## File Modified
- `src/pages/Practice.jsx` - Complete rewrite for LeetCode behavior
