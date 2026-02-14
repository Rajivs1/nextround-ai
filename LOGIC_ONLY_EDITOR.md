# LeetCode-Style Code Editor: Logic Only

## ✅ How It Works Now

Users **only write function/method logic** - the system automatically wraps it with test harness code.

---

## 📝 What Users See vs What Gets Executed

### **JavaScript**

#### User Writes:
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

#### System Executes:
```javascript
function twoSum(nums, target) {
  const map = new Map();
  // ... user's code ...
}

// Auto-generated test harness
const testInput = [[2,7,11,15], 9];
const result = twoSum(...testInput);
// Returns: [0, 1]
```

---

### **C++**

#### User Writes:
```cpp
class Solution {
public:
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
};
```

#### System Executes:
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // ... user's code ...
    }
};

// Auto-generated main() with test harness
int main() {
    Solution sol;
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = sol.twoSum(nums, target);
    cout << "[";
    for(int i = 0; i < result.size(); i++) {
        cout << result[i];
        if(i < result.size()-1) cout << ",";
    }
    cout << "]" << endl;
    return 0;
}
```

**Output:** `[0,1]`

---

### **Java**

#### User Writes:
```java
class Solution {
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

#### System Executes:
```java
import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // ... user's code ...
    }
}

// Auto-generated Main class with test harness
class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] result = sol.twoSum(nums, target);
        System.out.print("[");
        for(int i = 0; i < result.length; i++) {
            System.out.print(result[i]);
            if(i < result.length-1) System.out.print(",");
        }
        System.out.println("]");
    }
}
```

**Output:** `[0,1]`

---

## 🔧 What the System Does

### 1. **Starter Code Generation**
Each language gets appropriate starter template:

| Language | Template |
|----------|----------|
| JavaScript | `function name(params) { }` |
| C++ | `class Solution { public: returnType name(params) { } };` |
| Java | `class Solution { public returnType name(params) { } }` |

### 2. **Test Harness Injection**

#### For JavaScript:
- Wraps user function with test execution code
- Uses `eval()` to run

#### For C++:
- Adds `#include` statements
- Adds `main()` function
- Instantiates `Solution` object
- Calls user's method with test input
- Prints result in JSON format

#### For Java:
- Adds `import` statements
- Creates `Main` class
- Instantiates `Solution` object
- Calls user's method with test input
- Prints result in JSON format

### 3. **Test Execution**
- Runs each test case with auto-generated harness
- Captures output
- Compares with expected result
- Shows pass/fail

---

## 💡 Benefits

### For Users:
✅ **No Boilerplate** - No need to write main(), includes, imports  
✅ **Focus on Logic** - Just solve the algorithm problem  
✅ **Less Typing** - Only write what matters  
✅ **Less Errors** - No syntax errors in test harness  
✅ **Professional** - Exact LeetCode experience

### For System:
✅ **Consistent Testing** - Same test format across languages  
✅ **Flexible** - Easy to add new languages  
✅ **Maintainable** - Test harness centralized  
✅ **Scalable** - Works for all problem types

---

## 📊 Comparison

### Before (Manual Test Harness):
```cpp
// User had to write ALL of this:
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(...) {
        // their logic
    }
};

int main() {
    Solution sol;
    vector<int> nums = {2,7,11,15};
    int target = 9;
    vector<int> result = sol.twoSum(nums, target);
    // print result...
    return 0;
}
```

### After (Logic Only):
```cpp
// User only writes THIS:
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // their logic
    }
};
```

**80% less code to write!**

---

## 🎯 User Workflow

1. **Read Problem** → See description + test cases
2. **Select Language** → JS, C++, or Java
3. **See Starter Code** → Only the function/class
4. **Write Logic** → Inside function/method body
5. **Click "Run"** → System wraps + executes + shows results
6. **Debug** → Fix failing cases
7. **Click "Submit"** → All tests run automatically
8. **Success!** → Solution saved

---

## 🔍 Technical Details

### JavaScript Test Harness:
```javascript
${userCode}

const testInput = ${JSON.stringify(testCase.input)};
const result = (() => {
  return functionName(...testInput);
})();
// Compare result with expected
```

### C++ Test Harness:
```cpp
#include <iostream>
#include <vector>
using namespace std;

${userCode}

int main() {
    Solution sol;
    // Generate test input code
    vector<int> nums = {...};
    int target = ...;
    vector<int> result = sol.functionName(nums, target);
    // Print result as JSON
    return 0;
}
```

### Java Test Harness:
```java
import java.util.*;

${userCode}

class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        // Generate test input code
        int[] nums = {...};
        int target = ...;
        int[] result = sol.functionName(nums, target);
        // Print result as JSON
    }
}
```

---

## ✨ Key Features

### 1. **Automatic Test Generation**
- System reads test case: `{ input: [[2,7,11,15], 9], expected: [0,1] }`
- Generates appropriate code for each language
- Executes and captures output
- Compares with expected

### 2. **Error Handling**
- **Compilation errors** → Shows compiler output
- **Runtime errors** → Shows error message
- **Wrong output** → Shows expected vs actual

### 3. **Clean Output**
- JavaScript: Array/object notation
- C++: JSON-formatted output
- Java: JSON-formatted output
- All outputs comparable directly

---

## 🎓 Educational Value

Users learn to:
- ✅ Focus on algorithm logic
- ✅ Write production-quality code
- ✅ Think in terms of function contracts
- ✅ Debug efficiently
- ✅ Write language-idiomatic solutions

---

## 🚀 Performance

| Language | Execution Time | Notes |
|----------|---------------|-------|
| JavaScript | ~50ms | Browser eval() |
| C++ | ~2-3s | Compilation + execution |
| Java | ~2-3s | Compilation + execution |

---

**Users now have a true LeetCode experience - just write the logic, we handle the rest!** 🎉
