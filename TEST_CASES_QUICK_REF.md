# 🎯 Quick Reference: Test Cases System

## How It Works

### For Students
```
Write Code → Run Tests → See Results → Submit (if all pass)
```

### For Developers
```javascript
// Add test cases to any question:
{
  id: 1,
  title: "Problem Name",
  testCases: [
    { input: [arg1, arg2], expected: output }
  ]
}
```

---

## Test Case Format

```javascript
{
  input: [/* array of function arguments */],
  expected: /* expected return value */
}
```

### Examples

#### Single Argument
```javascript
{ input: [[1,2,3,4]], expected: 10 }
// Calls: functionName([1,2,3,4])
```

#### Multiple Arguments
```javascript
{ input: [[2,7,11,15], 9], expected: [0,1] }
// Calls: functionName([2,7,11,15], 9)
```

#### No Arguments
```javascript
{ input: [], expected: 5 }
// Calls: functionName()
```

---

## UI States

| State | Border | Icon | Message |
|-------|--------|------|---------|
| Not Run | Gray | - | Ready to test |
| Running | Yellow | 🟡 | Running... |
| Passed | Green | ✅ | PASSED |
| Failed | Red | ❌ | FAILED |

---

## Button Actions

### Run Code (▶)
- Quick test with console output
- Use for debugging
- No validation

### Submit (💾)
- Runs ALL test cases
- Validates solution
- Saves if all pass
- **Required for submission**

### Run All Test Cases (🧪)
- Manual test execution
- Shows detailed results
- Preview before submission

---

## Test Results

### Summary Card
```
🎉 All Tests Passed!       OR      📊 2/4 Tests Passed
Great job! Submit now.             Keep working on it.
```

### Individual Test
```
┌─────────────────────────┐
│ Test Case 1          ✅ │
│ ✓ PASSED                │
├─────────────────────────┤
│ Input:     [2,7], 9     │
│ Expected:  [0,1]        │
│ Your Output: [0,1]      │
└─────────────────────────┘
```

---

## Common Patterns

### Array Function
```javascript
function arraySum(nums) {
  return nums.reduce((a, b) => a + b, 0);
}

testCases: [
  { input: [[1,2,3]], expected: 6 },
  { input: [[]], expected: 0 }
]
```

### Two Parameters
```javascript
function twoSum(nums, target) {
  // ...
}

testCases: [
  { input: [[2,7,11,15], 9], expected: [0,1] }
]
```

### Boolean Return
```javascript
function isPalindrome(s) {
  // ...
}

testCases: [
  { input: ["racecar"], expected: true },
  { input: ["hello"], expected: false }
]
```

---

## Tips

### Writing Tests
✅ Cover edge cases
✅ Include empty inputs
✅ Test boundaries
✅ Use varied data

### For Users
✅ Run tests before submit
✅ Fix failures one by one
✅ Check input/output types
✅ Read error messages

---

## Error Messages

### "Submission failed! X test case(s) did not pass"
→ Check Test Cases tab for details

### "Could not determine function name"
→ Check starter code format

### Test shows error
→ Code threw an exception

---

## Quick Commands

| Action | Shortcut |
|--------|----------|
| Switch Tab | Click tab |
| Run Tests | Button in Description |
| Re-run Tests | Button in Test Cases |
| Submit | Top right button |
| Change Language | Language selector |

---

## File Locations

```
src/
  pages/
    Practice.jsx          ← Main component
  data/
    questions/
      arrays.js          ← Test cases here
      strings.js
      ...
```

---

## Adding New Test Cases

```javascript
// In your question file:
{
  id: X,
  title: "...",
  // ... other fields
  testCases: [
    { input: [...], expected: ... },
    { input: [...], expected: ... },
    // Add more as needed
  ]
}
```

---

## Visual Guide

```
┌─────────────────────────────────────┐
│ 🎯 Two Sum              Easy   2/4  │ ← Header
├───────────┬─────────────────────────┤
│           │                         │
│ Tabs:     │  Monaco Editor          │
│ • Desc    │  (Code here)            │
│ • Tests   │                         │
│           │─────────────────────────│
│ Problem   │  Console Output         │
│ Details   │  (Results here)         │
│           │                         │
└───────────┴─────────────────────────┘
```

---

## Success Criteria

### For Submission
- [ ] All test cases present
- [ ] All tests executed
- [ ] All tests passed
- [ ] User logged in

---

## Remember

💡 **Test cases ensure quality**
🎯 **All must pass to submit**
🚀 **Learn from failures**
✨ **Visual feedback helps**

---

*Happy Testing!* 🧪
