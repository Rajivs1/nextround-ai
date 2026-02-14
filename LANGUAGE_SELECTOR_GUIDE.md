# Quick Reference: Multi-Language Code Editor

## 🎯 How to Use

### Step 1: Select Your Language
**Top-right corner of code editor**

| Button | Language | Icon |
|--------|----------|------|
| JavaScript | JavaScript | 🟨 |
| C++ | C++ | 🔵 |
| Java | Java | ☕ |

### Step 2: Write Your Solution
Each language has its own template:

#### JavaScript Example:
```javascript
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
```

#### C++ Example:
```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
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
```

#### Java Example:
```java
import java.util.*;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
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
```

### Step 3: Run & Test
1. Click **"Run"** button
2. See results for visible test cases
3. Debug if any fail
4. Click **"Submit"** when all pass

---

## 🔍 Key Differences

### Execution Environment:

| Language | Execution | Speed | Notes |
|----------|-----------|-------|-------|
| **JavaScript** | Browser (eval) | ⚡ Instant | No network calls |
| **C++** | Piston API | 🚀 2-3s | Compilation + execution |
| **Java** | Piston API | 🚀 2-3s | Compilation + execution |

### Syntax Requirements:

| Language | File Name | Class Name | Main Required? |
|----------|-----------|------------|----------------|
| **JavaScript** | N/A | N/A | ❌ No |
| **C++** | main.cpp | N/A | ✅ Yes (for testing) |
| **Java** | Solution.java | Solution | ✅ Yes (for testing) |

---

## 💡 Tips

### JavaScript:
- ✅ Write logic inside the function
- ✅ Return the result
- ✅ No need for main() or print statements

### C++:
- ✅ Include necessary headers (`#include <vector>`, etc.)
- ✅ Use `using namespace std;`
- ✅ Write logic inside the function
- ✅ Use `main()` for manual testing (optional)
- ✅ Return result from function

### Java:
- ✅ Import necessary packages (`import java.util.*;`)
- ✅ Write inside `Solution` class
- ✅ Use proper return types (`int[]`, `List<Integer>`, etc.)
- ✅ Use `main()` for manual testing (optional)

---

## ⚠️ Common Errors

### JavaScript:
```javascript
// ❌ DON'T write code outside function
console.log("test");
function twoSum(nums, target) { ... }

// ✅ DO write code inside function only
function twoSum(nums, target) {
  const result = [];
  // your logic here
  return result;
}
```

### C++:
```cpp
// ❌ DON'T forget includes
vector<int> twoSum(...) { ... }

// ✅ DO include headers
#include <vector>
using namespace std;
vector<int> twoSum(...) { ... }
```

### Java:
```java
// ❌ DON'T use wrong class name
public class Main { ... }

// ✅ DO use "Solution" as class name
public class Solution { ... }
```

---

## 🎨 Console Output

### Success (All Tests Pass):
```
Accepted

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

### Failure (Some Tests Fail):
```
Wrong Answer

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

### Compilation Error (C++/Java):
```
Wrong Answer

Case 1: ✗
Input: [2,7,11,15], 9
Error: main.cpp:5:10: error: 'vector' was not declared
```

---

## 🚀 Workflow

### Recommended Process:
1. **Read** problem description
2. **View** visible test cases
3. **Select** language (JS/C++/Java)
4. **Write** solution
5. **Run** → Check visible test results
6. **Debug** → Fix failing cases
7. **Repeat** 5-6 until all visible pass
8. **Submit** → Test all cases (visible + hidden)
9. **Success!** → Solution saved ✅

---

## 📊 Language Comparison

### When to Use Each:

**JavaScript** 🟨
- ✅ Fastest execution (instant)
- ✅ Easiest syntax
- ✅ Best for quick testing
- ✅ Web development interviews

**C++** 🔵
- ✅ Industry standard for systems
- ✅ Common in competitive programming
- ✅ Performance-critical interviews
- ✅ FAANG companies

**Java** ☕
- ✅ Enterprise standard
- ✅ Common in backend roles
- ✅ Android development
- ✅ Large company interviews

---

## 🔄 Switching Languages

### What Happens:
1. Click new language button
2. Code editor **clears**
3. New starter code **loads**
4. Console **clears**
5. Previous solution **not saved** (unless submitted)

### To Save Multiple Solutions:
1. Write JavaScript solution
2. Click **Submit** → Saves JS version
3. Switch to C++
4. Write C++ solution
5. Click **Submit** → Saves C++ version
6. Now you have **both** solutions saved!

---

## 📝 Notes

- Each language runs the **same test cases**
- Solutions are saved **per language**
- You can solve problems in **multiple languages**
- Starter code is **auto-generated** for each language
- Test case format is **language-agnostic**

---

**Happy Coding!** 🎉
