# 🎯 User Guide: How to Use the Code Editor

## Welcome! Here's How to Solve Problems

### Step 1: Choose a Problem 📝
1. Go to **Problems** page
2. Select a topic (Arrays, Strings, etc.)
3. Click on a question

---

### Step 2: Read & Understand 📖
You'll see:
- **Problem Description** - What you need to solve
- **Example** - Sample input/output with explanation
- **Test Cases** - First 3 test cases are visible

**Example:**
```
Problem: Two Sum
Given array [2,7,11,15] and target 9
Return indices [0,1] because nums[0] + nums[1] = 9

Test Cases You Can See:
Case 1: [2,7,11,15], 9 → [0,1]
Case 2: [3,2,4], 6 → [1,2]
Case 3: [3,3], 6 → [0,1]

Hidden Test Cases: (You don't see these until Submit)
Case 4, 5, 6... → Used for final validation
```

---

### Step 3: Select Your Language 💻

**Top-right corner of editor**, choose one:

| Button | When to Use | Execution Time |
|--------|-------------|----------------|
| 🟨 **JavaScript** | Quick practice, web dev interviews | ⚡ Instant |
| 🔵 **C++** | Systems programming, competitive coding | 🚀 2-3 seconds |
| ☕ **Java** | Enterprise roles, Android dev | 🚀 2-3 seconds |

---

### Step 4: Write Your Solution ✍️

**IMPORTANT:** Only write logic inside the function/method!

#### ✅ JavaScript - Write Inside Function:
```javascript
function twoSum(nums, target) {
  // ✅ DO: Write your logic here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}

// ❌ DON'T: Write code outside the function
console.log("test"); // This will break!
```

#### ✅ C++ - Write Inside Solution Class:
```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // ✅ DO: Write your logic here
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};

// ❌ DON'T: Write main() or includes (auto-added)
```

#### ✅ Java - Write Inside Solution Class:
```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        // ✅ DO: Write your logic here
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}

// ❌ DON'T: Write Main class or imports (auto-added)
```

---

### Step 5: Click "Run" to Test 🏃

**What Happens:**
1. Your code is automatically wrapped with test harness
2. Runs against **first 3 visible** test cases
3. Results appear in console below

**Console Shows:**
```
✅ Accepted (All 3 test cases passed!)

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

**OR if something fails:**
```
❌ Wrong Answer

Case 1: ✓
Input: [2,7,11,15], 9
Output: [0,1]

Case 2: ✗
Input: [3,2,4], 6
Output: [0,2]    ← Your output
Expected: [1,2]  ← Should be this

Case 3: ✓
Input: [3,3], 6
Output: [0,1]
```

---

### Step 6: Debug & Fix 🔧

**If tests fail:**
1. Look at which case failed
2. Check the input for that case
3. Compare your output vs expected
4. Add `console.log()` / `cout` / `System.out.println()` to debug
5. Fix your code
6. Click "Run" again

**Debugging Tips:**
```javascript
// JavaScript
function twoSum(nums, target) {
  console.log("Input:", nums, target); // See inputs
  const result = [];
  // ... your logic ...
  console.log("Result:", result); // See what you're returning
  return result;
}
```

```cpp
// C++
vector<int> twoSum(vector<int>& nums, int target) {
    cout << "Target: " << target << endl; // Debug
    // ... your logic ...
    return result;
}
```

```java
// Java
public int[] twoSum(int[] nums, int target) {
    System.out.println("Target: " + target); // Debug
    // ... your logic ...
    return result;
}
```

---

### Step 7: Submit When Ready 📤

**When all visible tests pass, click "Submit"**

**What Happens:**
1. Runs **ALL** test cases (visible + hidden)
2. Hidden tests validate edge cases
3. If **all pass** → ✅ Accepted + Solution saved
4. If **any fail** → ❌ Wrong Answer + count shown

**Success:**
```
✅ Accepted

All test cases passed!
Your solution has been saved.
```

**Failure:**
```
❌ Wrong Answer

2 out of 6 test cases failed.

Click "Run" to debug with visible test cases.
```

---

## 🎯 Pro Tips

### 1. **Use Visible Tests to Debug**
- Don't submit blindly!
- First make sure all 3 visible tests pass
- Then submit to check hidden tests

### 2. **Think About Edge Cases**
What hidden tests might check:
- Empty arrays: `[]`
- Single element: `[1]`
- Negative numbers: `[-1, -2]`
- Large numbers: `[999999]`
- Duplicates: `[1, 1, 1]`

### 3. **Write Clean Code**
```javascript
// ✅ Good: Clear and readable
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

// ❌ Bad: Hard to debug
function twoSum(n,t){let m=new Map();for(let i=0;i<n.length;i++){if(m.has(t-n[i]))return[m.get(t-n[i]),i];m.set(n[i],i)}}
```

### 4. **Test Multiple Languages**
Try solving the same problem in different languages:
1. Solve in JavaScript (fastest to test)
2. Submit JavaScript solution
3. Switch to C++ → Write C++ solution
4. Submit C++ solution
5. Now you have both saved!

### 5. **Read Error Messages**
**Compilation Error (C++/Java):**
```
Error: 'vector' was not declared in this scope
→ Missing include/import (but we add them automatically!)
→ Check your syntax
```

**Runtime Error:**
```
Error: Cannot read property 'length' of undefined
→ You're accessing something that doesn't exist
→ Add null/undefined checks
```

---

## 🚫 Common Mistakes

### Mistake 1: Writing Outside Function
```javascript
// ❌ WRONG
console.log("Starting");
function twoSum(nums, target) { ... }
console.log("Done");

// ✅ RIGHT
function twoSum(nums, target) {
  // All code inside here
  return result;
}
```

### Mistake 2: Not Returning Value
```javascript
// ❌ WRONG - Doesn't return anything
function twoSum(nums, target) {
  const result = [0, 1];
  // Forgot to return!
}

// ✅ RIGHT
function twoSum(nums, target) {
  const result = [0, 1];
  return result;
}
```

### Mistake 3: Wrong Return Type
```java
// ❌ WRONG - Returns List instead of int[]
public int[] twoSum(int[] nums, int target) {
    List<Integer> result = new ArrayList<>();
    return result; // Type mismatch!
}

// ✅ RIGHT
public int[] twoSum(int[] nums, int target) {
    return new int[] {0, 1};
}
```

---

## 🎓 Learning Path

### Beginner: Start Here
1. **Easy Arrays** - Two Sum, Contains Duplicate
2. **Easy Strings** - Valid Anagram, Valid Palindrome
3. **JavaScript Only** - Learn logic first

### Intermediate: Level Up
1. **Medium Arrays** - 3Sum, Container With Most Water
2. **Medium Strings** - Longest Substring
3. **Try C++** - Learn performance optimization

### Advanced: Master Level
1. **Hard Problems** - Trapping Rain Water, N-Queens
2. **All Languages** - Compare implementations
3. **Optimize** - Improve time/space complexity

---

## 💡 Success Checklist

Before submitting, ask yourself:

- ✅ Does my code handle empty input?
- ✅ Does it work for single element?
- ✅ Does it handle duplicates?
- ✅ Did I test all visible cases?
- ✅ Is my code readable?
- ✅ Did I return the correct type?
- ✅ Are there any runtime errors?

---

## 🆘 Need Help?

**If stuck:**
1. Re-read the problem carefully
2. Try the example by hand
3. Check test case that's failing
4. Add debug prints
5. Test with simpler input
6. Look at your algorithm logic

**Remember:** 
- Visible tests help you debug
- Hidden tests validate correctness
- Run → Debug → Fix → Repeat → Submit

---

**Good luck coding! You've got this! 🚀**
