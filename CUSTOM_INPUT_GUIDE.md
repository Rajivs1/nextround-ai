# 🎯 Custom Input Feature - User Guide

## Overview
The Practice page now includes a **Custom Input** feature that allows you to test your code with your own test data before running the automatic test cases.

---

## 📝 How to Use Custom Input

### 1. **Find the Input Section**
Located at the bottom of the editor, in the console area:
```
┌─────────────────────────────────────┐
│  Testcase  |  Result                │
├─────────────────────────────────────┤
│  Input: (Optional - for manual...) │
│  ┌───────────────────────────────┐ │
│  │ [2,7,11,15], 9                │ │ ← Type here
│  └───────────────────────────────┘ │
├─────────────────────────────────────┤
│  Output:                            │
│  Your results will appear here      │
└─────────────────────────────────────┘
```

### 2. **Enter Your Test Data**
Type your input in the text area:
```javascript
// Example inputs:
[2,7,11,15], 9
"hello"
[[1,2],[3,4]]
42
```

### 3. **Run Your Code**
Click the **▶ Run** button to execute with your custom input

### 4. **View Results**
See the output in the console area below

---

## 📋 Input Format Examples

### Array Problems
```javascript
// Two Sum
[2,7,11,15], 9

// Best Time to Buy and Sell Stock
[7,1,5,3,6,4]

// Contains Duplicate
[1,2,3,1]
```

### String Problems
```javascript
// Single string
"hello"

// String with special characters
"Hello, World!"

// Multiple strings
"abc", "def"
```

### Number Problems
```javascript
// Single number
42

// Multiple numbers
5, 10, 15
```

### Complex Inputs
```javascript
// 2D Array
[[1,2,3],[4,5,6]]

// Array of objects
[{"name":"John"},{"name":"Jane"}]

// Mixed types
[1,"two",3], "separator"
```

---

## 🔧 How It Works

### JavaScript Code
```javascript
// Your input:
[2,7,11,15], 9

// System makes it available as:
window.testInput = [2,7,11,15];
// Plus the second parameter is available in context

// Your function runs with this data
```

### C++ / Java Code
```cpp
// Your input is passed as stdin
// You can use cin/scanf to read it

// Example:
Input: 5 10
// Your code can read:
int a, b;
cin >> a >> b;
```

---

## 💡 Usage Scenarios

### Scenario 1: Quick Debugging
```
1. Write code
2. Add custom input
3. Click Run
4. Check output
5. Fix bugs
6. Repeat
```

### Scenario 2: Edge Case Testing
```
1. Write solution
2. Test with empty array: []
3. Test with single element: [1]
4. Test with negatives: [-1,-2,-3]
5. Test with large input
```

### Scenario 3: Before Submission
```
1. Complete solution
2. Test with custom cases
3. Debug any issues
4. Run automatic test cases
5. Submit solution
```

---

## ⚙️ Technical Details

### For JavaScript
- Input is parsed as JSON if possible
- Otherwise treated as string
- Available as `window.testInput`
- You can access it directly in your code

### For C++ / Java
- Input passed as stdin (standard input)
- Use `cin`, `scanf`, or `Scanner`
- Multi-line input supported
- Newlines preserved

---

## 📝 Example Usage

### Example 1: Two Sum
```javascript
// Custom Input:
[2,7,11,15], 9

// Your Code:
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}

// To test manually:
console.log(twoSum([2,7,11,15], 9));

// Output:
[0,1]
```

### Example 2: String Reversal
```javascript
// Custom Input:
"Hello World"

// Your Code:
function reverse(s) {
  return s.split('').reverse().join('');
}

// To test:
console.log(reverse("Hello World"));

// Output:
dlroW olleH
```

---

## 🎯 Pro Tips

### 1. **Use Console.log**
```javascript
// Add debug logs in your code
console.log("Input:", nums);
console.log("Target:", target);
console.log("Result:", result);
```

### 2. **Test Edge Cases**
```javascript
// Empty input
[]

// Single element
[1]

// Negative numbers
[-1, -2, -3]

// Large numbers
[1000000, 2000000]
```

### 3. **Format Your Input**
```javascript
// Good formatting:
[1,2,3,4], 5

// Also works:
[1, 2, 3, 4], 5

// Complex:
[[1,2],[3,4]], 2
```

### 4. **Combine with Test Cases**
```
1. Test with custom input (manual test)
2. Debug and fix issues
3. Run automatic test cases
4. Submit when all pass
```

---

## ⚠️ Common Issues

### Issue: "Cannot parse input"
**Solution:** Check your JSON format
```javascript
// Wrong:
[1,2,3, 4

// Right:
[1,2,3,4]
```

### Issue: "Undefined is not a function"
**Solution:** Make sure you call your function
```javascript
// Add this to test:
console.log(yourFunction(params));
```

### Issue: "No output"
**Solution:** Use console.log
```javascript
// Don't just return
return result;

// Also log it
console.log(result);
return result;
```

---

## 🚀 Workflow

### Complete Testing Flow
```
1. Write code in editor
   ↓
2. Add custom input (optional)
   ↓
3. Click "Run" to test manually
   ↓
4. View output, fix bugs
   ↓
5. Click "Run All Testcases"
   ↓
6. Review automatic test results
   ↓
7. Click "Submit" when all pass
   ↓
8. ✅ Solution saved!
```

---

## 📊 Benefits

### For Quick Testing
✅ Test with your own data
✅ No need to modify code
✅ Fast debugging cycle
✅ Flexible input format

### For Edge Cases
✅ Test boundary conditions
✅ Try unusual inputs
✅ Validate assumptions
✅ Build confidence

### For Learning
✅ Understand how code works
✅ See intermediate outputs
✅ Debug step by step
✅ Experiment freely

---

## 🎨 Visual Design

### Input Area
```
Background: #262626
Border:     #3a3a3a
Focus:      #00b8a3 (teal)
Text:       White monospace
```

### Output Area
```
Success:    #00b8a3 (green text)
Error:      #ef4743 (red text)
Running:    #ffc01e (yellow text)
Empty:      Gray placeholder
```

---

## 💡 Examples by Language

### JavaScript
```javascript
// Input area:
[1,2,3,4,5]

// Your code can use it:
const input = window.testInput;
console.log(input);
```

### C++
```cpp
// Input area:
5 10

// Your code reads it:
int a, b;
cin >> a >> b;
cout << a + b << endl;
```

### Java
```java
// Input area:
5 10

// Your code reads it:
Scanner sc = new Scanner(System.in);
int a = sc.nextInt();
int b = sc.nextInt();
System.out.println(a + b);
```

---

## 🎉 Summary

The console now supports:
- ✅ **Custom input** for manual testing
- ✅ **Multiple input formats** (arrays, strings, numbers)
- ✅ **stdin support** for C++/Java
- ✅ **Real-time output** display
- ✅ **Error messages** when things go wrong
- ✅ **Clear button** to reset
- ✅ **Professional UI** like LeetCode

**You can now test your code with any input before running the automatic test cases!** 🚀

---

## 📌 Quick Reference

| Action | Location | Purpose |
|--------|----------|---------|
| Add Input | Bottom console area | Provide custom test data |
| Run Code | Top right | Execute with custom input |
| View Output | Console area | See results |
| Clear Output | Console header | Reset console |
| Run Tests | Description tab | Automatic validation |
| Submit | Top right | Save solution |

---

*Happy Coding!* 💻✨
