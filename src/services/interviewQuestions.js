// Role-based MCQ Questions
export const roleBasedQuestions = {
  developer: [
    // Basic Programming Concepts
    {
      id: 1,
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Undefined"],
      correct: 2,
      difficulty: "easy",
    },
    {
      id: 2,
      question: "What does 'DOM' stand for in web development?",
      options: [
        "Document Object Model",
        "Data Object Management",
        "Dynamic Object Method",
        "Document Oriented Model",
      ],
      correct: 0,
      difficulty: "easy",
    },
    // Code Snippet Questions
    {
      id: 3,
      question:
        "What will be the output of this JavaScript code?\n\n```javascript\nconsole.log(typeof null);\n```",
      options: ["null", "undefined", "object", "boolean"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 4,
      question:
        'What is the output of this C++ code?\n\n```cpp\nint x = 5;\nint y = ++x;\ncout << x << " " << y;\n```',
      options: ["5 5", "6 5", "5 6", "6 6"],
      correct: 3,
      difficulty: "medium",
    },
    {
      id: 5,
      question:
        "What will this JavaScript function return?\n\n```javascript\nfunction mystery(arr) {\n  return arr.filter(x => x % 2 === 0).length;\n}\nmystery([1, 2, 3, 4, 5, 6]);\n```",
      options: ["3", "6", "[2, 4, 6]", "undefined"],
      correct: 0,
      difficulty: "medium",
    },
    {
      id: 6,
      question:
        "What is the time complexity of this pseudocode?\n\n```\nfor i = 1 to n:\n    for j = 1 to n:\n        print(i * j)\n```",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 7,
      question:
        "What will be the output of this JavaScript code?\n\n```javascript\nlet a = [1, 2, 3];\nlet b = a;\nb.push(4);\nconsole.log(a.length);\n```",
      options: ["3", "4", "undefined", "Error"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 8,
      question: "Which design pattern ensures a class has only one instance?",
      options: ["Factory", "Observer", "Singleton", "Strategy"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 9,
      question:
        "What does this C++ code output?\n\n```cpp\nint arr[] = {1, 2, 3, 4, 5};\nint *ptr = arr + 2;\ncout << *ptr;\n```",
      options: ["1", "2", "3", "Error"],
      correct: 2,
      difficulty: "hard",
    },
    {
      id: 10,
      question:
        "What is the result of this JavaScript expression?\n\n```javascript\n'5' + 3 - 2\n```",
      options: ["6", "51", "53", "Error"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 11,
      question:
        "What will this recursive function return?\n\n```javascript\nfunction factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\nfactorial(4);\n```",
      options: ["10", "24", "16", "Error"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 12,
      question: "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Advanced Programming Integration",
        "Automated Program Interaction",
        "Application Process Integration",
      ],
      correct: 0,
      difficulty: "easy",
    },
    {
      id: 13,
      question:
        'What is the output of this C++ code?\n\n```cpp\nclass Base {\npublic:\n    virtual void show() { cout << "Base"; }\n};\nclass Derived : public Base {\npublic:\n    void show() { cout << "Derived"; }\n};\nBase* ptr = new Derived();\nptr->show();\n```',
      options: ["Base", "Derived", "Error", "Nothing"],
      correct: 1,
      difficulty: "hard",
    },
    {
      id: 14,
      question: "Which of these is a NoSQL database?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
      correct: 2,
      difficulty: "easy",
    },
    {
      id: 15,
      question:
        "What will this JavaScript code log?\n\n```javascript\nconst obj = { a: 1, b: 2 };\nconst { a, c = 3 } = obj;\nconsole.log(a, c);\n```",
      options: ["1 undefined", "1 3", "undefined 3", "Error"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 16,
      question: "What is the purpose of version control systems like Git?",
      options: [
        "Code compilation",
        "Track changes in code",
        "Database management",
        "UI design",
      ],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 17,
      question:
        "What does this pseudocode algorithm do?\n\n```\nfunction binarySearch(arr, target):\n    left = 0, right = arr.length - 1\n    while left <= right:\n        mid = (left + right) / 2\n        if arr[mid] == target: return mid\n        if arr[mid] < target: left = mid + 1\n        else: right = mid - 1\n    return -1\n```",
      options: [
        "Sorts an array",
        "Finds element in sorted array",
        "Reverses array",
        "Counts elements",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 18,
      question: "What is the difference between '==' and '===' in JavaScript?",
      options: [
        "No difference",
        "=== checks type and value",
        "== is faster",
        "=== is deprecated",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 19,
      question:
        'What will this C++ code print?\n\n```cpp\nvector<int> v = {1, 2, 3};\nfor(auto& x : v) {\n    x *= 2;\n}\nfor(int x : v) {\n    cout << x << " ";\n}\n```',
      options: ["1 2 3", "2 4 6", "Error", "Nothing"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 20,
      question:
        "Which of these is NOT a principle of Object-Oriented Programming?",
      options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"],
      correct: 3,
      difficulty: "easy",
    },
    {
      id: 21,
      question:
        "What does this JavaScript async function return?\n\n```javascript\nasync function getData() {\n    return 'Hello';\n}\ngetData();\n```",
      options: ["'Hello'", "Promise<'Hello'>", "undefined", "Error"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 22,
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Style System",
        "Coded Style Syntax",
      ],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 23,
      question:
        'What is the output of this C++ template function?\n\n```cpp\ntemplate<typename T>\nT max(T a, T b) {\n    return (a > b) ? a : b;\n}\ncout << max(5, 3) << " " << max(2.5, 3.7);\n```',
      options: ["5 3.7", "3 2.5", "5 2.5", "Error"],
      correct: 0,
      difficulty: "hard",
    },
    {
      id: 24,
      question: "Which data structure uses LIFO (Last In, First Out)?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 25,
      question:
        "What will this JavaScript closure return?\n\n```javascript\nfunction outer(x) {\n    return function(y) {\n        return x + y;\n    };\n}\nconst add5 = outer(5);\nadd5(3);\n```",
      options: ["5", "3", "8", "undefined"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 26,
      question: "What is the purpose of a constructor in OOP?",
      options: [
        "Destroy objects",
        "Initialize objects",
        "Copy objects",
        "Compare objects",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 27,
      question:
        'What does this C++ code demonstrate?\n\n```cpp\nclass Animal {\npublic:\n    virtual void sound() = 0;\n};\nclass Dog : public Animal {\npublic:\n    void sound() { cout << "Woof"; }\n};\n```',
      options: [
        "Inheritance",
        "Pure virtual function",
        "Abstract class",
        "All of the above",
      ],
      correct: 3,
      difficulty: "hard",
    },
    {
      id: 28,
      question: "Which protocol is used for secure web communication?",
      options: ["HTTP", "HTTPS", "FTP", "SMTP"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 29,
      question:
        "What is the result of this JavaScript array method?\n\n```javascript\n[1, 2, 3, 4].reduce((acc, curr) => acc + curr, 0)\n```",
      options: ["[1, 2, 3, 4]", "10", "4", "0"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 30,
      question: "What is recursion in programming?",
      options: [
        "A loop structure",
        "A function calling itself",
        "Error handling",
        "Memory allocation",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 31,
      question:
        "What will this C++ smart pointer code do?\n\n```cpp\nstd::unique_ptr<int> ptr = std::make_unique<int>(42);\nstd::unique_ptr<int> ptr2 = std::move(ptr);\ncout << (ptr == nullptr);\n```",
      options: ["Print 0", "Print 1", "Error", "Print 42"],
      correct: 1,
      difficulty: "hard",
    },
    {
      id: 32,
      question: "Which of these is a JavaScript framework?",
      options: ["Django", "Laravel", "React", "Spring"],
      correct: 2,
      difficulty: "easy",
    },
    {
      id: 33,
      question:
        "What does this algorithm's time complexity represent?\n\n```\nfunction findPairs(arr):\n    count = 0\n    for i = 0 to n-1:\n        for j = i+1 to n-1:\n            if arr[i] + arr[j] == target:\n                count++\n    return count\n```",
      options: ["O(n)", "O(log n)", "O(n²)", "O(n log n)"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 34,
      question: "What does MVC stand for in software architecture?",
      options: [
        "Model View Controller",
        "Multiple View Components",
        "Master View Control",
        "Modern Visual Components",
      ],
      correct: 0,
      difficulty: "medium",
    },
    {
      id: 35,
      question:
        "What will this JavaScript promise chain return?\n\n```javascript\nPromise.resolve(5)\n  .then(x => x * 2)\n  .then(x => x + 1)\n  .then(console.log);\n```",
      options: ["5", "10", "11", "undefined"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 36,
      question: "Which Big O notation represents constant time complexity?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 37,
      question:
        "What does this C++ lambda function do?\n\n```cpp\nauto lambda = [](int a, int b) -> int {\n    return a > b ? a : b;\n};\ncout << lambda(5, 3);\n```",
      options: ["Returns minimum", "Returns maximum", "Returns sum", "Error"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 38,
      question: "What is the purpose of unit testing?",
      options: [
        "Test entire application",
        "Test individual components",
        "Test user interface",
        "Test database",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 39,
      question:
        "What will this JavaScript spread operator do?\n\n```javascript\nconst arr1 = [1, 2];\nconst arr2 = [3, 4];\nconst result = [...arr1, ...arr2];\nconsole.log(result);\n```",
      options: ["[1, 2, 3, 4]", "[[1, 2], [3, 4]]", "[1, 2]", "Error"],
      correct: 0,
      difficulty: "easy",
    },
    {
      id: 40,
      question: "Which of these is NOT a valid HTTP status code?",
      options: ["200", "404", "500", "999"],
      correct: 3,
      difficulty: "medium",
    },
  ],

  hr: [
    {
      id: 1,
      question: "What is the primary goal of Human Resource Management?",
      options: [
        "Increase profits",
        "Manage people effectively",
        "Reduce costs",
        "Automate processes",
      ],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 2,
      question: "Which of these is NOT a component of compensation?",
      options: ["Base salary", "Benefits", "Bonuses", "Job description"],
      correct: 3,
      difficulty: "easy",
    },
    {
      id: 3,
      question: "What does KPI stand for in performance management?",
      options: [
        "Key Performance Indicator",
        "Knowledge Performance Index",
        "Key Process Integration",
        "Knowledge Process Indicator",
      ],
      correct: 0,
      difficulty: "easy",
    },
    {
      id: 4,
      question:
        "Which recruitment method is most cost-effective for entry-level positions?",
      options: [
        "Executive search",
        "Employee referrals",
        "Job boards",
        "Campus recruitment",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 5,
      question: "What is the purpose of an exit interview?",
      options: [
        "Terminate employment",
        "Gather feedback",
        "Negotiate salary",
        "Assign new roles",
      ],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 6,
      question:
        "Which law prohibits workplace discrimination based on race, color, religion, sex, or national origin?",
      options: ["FMLA", "FLSA", "Civil Rights Act", "ADA"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 7,
      question: "What is the difference between training and development?",
      options: [
        "No difference",
        "Training is short-term, development is long-term",
        "Training is expensive",
        "Development is mandatory",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 8,
      question: "Which of these is a characteristic of effective leadership?",
      options: [
        "Micromanagement",
        "Clear communication",
        "Avoiding feedback",
        "Working in isolation",
      ],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 9,
      question: "What is employee engagement?",
      options: [
        "Work hours",
        "Emotional commitment to work",
        "Salary satisfaction",
        "Job security",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 10,
      question:
        "Which performance appraisal method compares employees against each other?",
      options: [
        "360-degree feedback",
        "Ranking method",
        "Rating scales",
        "Self-assessment",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 11,
      question: "What is the purpose of job analysis?",
      options: [
        "Set salaries",
        "Understand job requirements",
        "Fire employees",
        "Plan vacations",
      ],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 12,
      question: "Which of these is NOT a type of interview?",
      options: ["Structured", "Unstructured", "Behavioral", "Financial"],
      correct: 3,
      difficulty: "easy",
    },
    {
      id: 13,
      question: "What does HRIS stand for?",
      options: [
        "Human Resource Information System",
        "Human Resource Integration Service",
        "Human Resource Internal Structure",
        "Human Resource Implementation Strategy",
      ],
      correct: 0,
      difficulty: "easy",
    },
    {
      id: 14,
      question:
        "Which motivation theory suggests that people are motivated by hierarchy of needs?",
      options: [
        "Herzberg's Theory",
        "Maslow's Hierarchy",
        "McGregor's Theory",
        "Equity Theory",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 15,
      question: "What is the primary purpose of onboarding?",
      options: [
        "Complete paperwork",
        "Integrate new employees",
        "Conduct training",
        "Set goals",
      ],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 16,
      question: "Which of these is a benefit of diversity in the workplace?",
      options: [
        "Reduced creativity",
        "Increased innovation",
        "Higher costs",
        "More conflicts",
      ],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 17,
      question: "What is succession planning?",
      options: [
        "Planning retirement parties",
        "Preparing future leaders",
        "Organizing events",
        "Managing payroll",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 18,
      question: "Which of these is NOT a component of total rewards?",
      options: [
        "Compensation",
        "Benefits",
        "Work-life balance",
        "Job termination",
      ],
      correct: 3,
      difficulty: "easy",
    },
    {
      id: 19,
      question: "What is the purpose of a performance improvement plan (PIP)?",
      options: [
        "Promote employees",
        "Address performance issues",
        "Increase salary",
        "Plan vacations",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 20,
      question:
        "Which conflict resolution style involves finding a mutually acceptable solution?",
      options: ["Avoiding", "Competing", "Collaborating", "Accommodating"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 21,
      question: "What is emotional intelligence in the workplace?",
      options: [
        "IQ level",
        "Ability to manage emotions",
        "Technical skills",
        "Work experience",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 22,
      question:
        "Which of these is a characteristic of effective team building?",
      options: ["Competition", "Clear goals", "Individual focus", "Secrecy"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 23,
      question: "What is the purpose of employee surveys?",
      options: [
        "Monitor internet usage",
        "Gather feedback",
        "Track attendance",
        "Assign tasks",
      ],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 24,
      question: "Which of these is NOT a type of employee benefit?",
      options: [
        "Health insurance",
        "Paid time off",
        "Retirement plans",
        "Performance reviews",
      ],
      correct: 3,
      difficulty: "easy",
    },
    {
      id: 25,
      question: "What is workplace culture?",
      options: [
        "Office decoration",
        "Shared values and beliefs",
        "Dress code",
        "Meeting schedules",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 26,
      question: "Which of these is a sign of employee burnout?",
      options: [
        "High productivity",
        "Decreased performance",
        "Increased collaboration",
        "Better attendance",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 27,
      question: "What is the purpose of competency mapping?",
      options: [
        "Create office maps",
        "Identify required skills",
        "Plan events",
        "Manage inventory",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 28,
      question: "Which of these is NOT a recruitment source?",
      options: [
        "Job portals",
        "Employee referrals",
        "Social media",
        "Performance appraisals",
      ],
      correct: 3,
      difficulty: "easy",
    },
    {
      id: 29,
      question: "What is the difference between coaching and mentoring?",
      options: [
        "No difference",
        "Coaching is task-focused, mentoring is relationship-focused",
        "Coaching is informal",
        "Mentoring is short-term",
      ],
      correct: 1,
      difficulty: "hard",
    },
    {
      id: 30,
      question:
        "Which of these is a key metric for measuring HR effectiveness?",
      options: [
        "Office temperature",
        "Employee turnover rate",
        "Number of meetings",
        "Printer usage",
      ],
      correct: 1,
      difficulty: "medium",
    },
  ],

  dataAnalyst: [
    {
      id: 1,
      question: "Which of these is NOT a measure of central tendency?",
      options: ["Mean", "Median", "Mode", "Range"],
      correct: 3,
      difficulty: "easy",
    },
    {
      id: 2,
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "Standard Query Language",
        "Sequential Query Language",
      ],
      correct: 0,
      difficulty: "easy",
    },
    {
      id: 3,
      question: "Which Python library is commonly used for data manipulation?",
      options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 4,
      question: "What is the purpose of data normalization?",
      options: [
        "Increase data size",
        "Standardize data ranges",
        "Delete data",
        "Encrypt data",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 5,
      question:
        "Which chart type is best for showing correlation between two variables?",
      options: ["Bar chart", "Pie chart", "Scatter plot", "Line chart"],
      correct: 2,
      difficulty: "easy",
    },
    {
      id: 6,
      question: "What does ETL stand for in data processing?",
      options: [
        "Extract, Transform, Load",
        "Evaluate, Test, Launch",
        "Export, Transfer, Link",
        "Examine, Track, Log",
      ],
      correct: 0,
      difficulty: "medium",
    },
    {
      id: 7,
      question:
        "Which statistical test is used to compare means of two groups?",
      options: ["Chi-square test", "T-test", "ANOVA", "Regression"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 8,
      question:
        "What is the difference between supervised and unsupervised learning?",
      options: [
        "No difference",
        "Supervised uses labeled data",
        "Unsupervised is faster",
        "Supervised is more accurate",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 9,
      question:
        "Which of these is a NoSQL database commonly used for big data?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
      correct: 2,
      difficulty: "easy",
    },
    {
      id: 10,
      question: "What is the purpose of A/B testing?",
      options: [
        "Test database performance",
        "Compare two versions",
        "Validate data quality",
        "Backup data",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 11,
      question: "Which measure indicates the spread of data?",
      options: ["Mean", "Median", "Standard deviation", "Mode"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 12,
      question: "What is data mining?",
      options: [
        "Deleting old data",
        "Discovering patterns in data",
        "Storing data",
        "Encrypting data",
      ],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 13,
      question:
        "Which visualization tool is commonly used for business intelligence?",
      options: ["Photoshop", "Tableau", "Word", "PowerPoint"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 14,
      question: "What is the purpose of data cleaning?",
      options: [
        "Delete all data",
        "Remove errors and inconsistencies",
        "Compress data",
        "Encrypt data",
      ],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 15,
      question: "Which of these is a type of regression analysis?",
      options: [
        "Linear regression",
        "Circular regression",
        "Square regression",
        "Triangle regression",
      ],
      correct: 0,
      difficulty: "easy",
    },
    {
      id: 16,
      question: "What does API stand for in data context?",
      options: [
        "Application Programming Interface",
        "Automated Process Integration",
        "Advanced Program Implementation",
        "Application Process Indicator",
      ],
      correct: 0,
      difficulty: "easy",
    },
    {
      id: 17,
      question: "Which of these is NOT a data type in most databases?",
      options: ["INTEGER", "VARCHAR", "DATE", "EMOTION"],
      correct: 3,
      difficulty: "easy",
    },
    {
      id: 18,
      question: "What is the purpose of data warehousing?",
      options: [
        "Store current data only",
        "Centralized data storage for analysis",
        "Delete old data",
        "Encrypt sensitive data",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 19,
      question:
        "Which statistical concept measures the likelihood of an event?",
      options: ["Mean", "Probability", "Variance", "Correlation"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 20,
      question: "What is the difference between OLTP and OLAP?",
      options: [
        "No difference",
        "OLTP for transactions, OLAP for analysis",
        "OLTP is faster",
        "OLAP is cheaper",
      ],
      correct: 1,
      difficulty: "hard",
    },
    {
      id: 21,
      question:
        "Which of these is a measure of model accuracy in classification?",
      options: ["Precision", "Length", "Width", "Height"],
      correct: 0,
      difficulty: "medium",
    },
    {
      id: 22,
      question: "What is the purpose of cross-validation?",
      options: [
        "Validate user input",
        "Assess model performance",
        "Check data types",
        "Verify passwords",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 23,
      question: "Which of these is NOT a common data format?",
      options: ["CSV", "JSON", "XML", "DOC"],
      correct: 3,
      difficulty: "easy",
    },
    {
      id: 24,
      question: "What is feature engineering?",
      options: [
        "Building software features",
        "Creating new variables from existing data",
        "Engineering hardware",
        "Designing user interfaces",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 25,
      question: "Which of these is a dimensionality reduction technique?",
      options: ["PCA", "SQL", "HTML", "CSS"],
      correct: 0,
      difficulty: "hard",
    },
    {
      id: 26,
      question: "What is the purpose of data profiling?",
      options: [
        "Create user profiles",
        "Understand data characteristics",
        "Profile system performance",
        "Create social media profiles",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 27,
      question: "Which of these is a time series analysis technique?",
      options: ["ARIMA", "HTML", "CSS", "PDF"],
      correct: 0,
      difficulty: "hard",
    },
    {
      id: 28,
      question: "What is the difference between correlation and causation?",
      options: [
        "No difference",
        "Correlation shows relationship, causation shows cause-effect",
        "Correlation is stronger",
        "Causation is easier to measure",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 29,
      question: "Which of these is NOT a type of data visualization?",
      options: ["Histogram", "Box plot", "Heat map", "Database"],
      correct: 3,
      difficulty: "easy",
    },
    {
      id: 30,
      question: "What is the purpose of data governance?",
      options: [
        "Government data only",
        "Manage data quality and security",
        "Political analysis",
        "Tax calculations",
      ],
      correct: 1,
      difficulty: "medium",
    },
  ],

  sqlDeveloper: [
    {
      id: 1,
      question: "Which SQL command is used to retrieve data from a database?",
      options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
      correct: 2,
      difficulty: "easy",
    },
    {
      id: 2,
      question: "What does the WHERE clause do in SQL?",
      options: ["Sorts data", "Filters data", "Groups data", "Joins tables"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 3,
      question: "Which SQL function returns the number of rows?",
      options: ["SUM()", "COUNT()", "AVG()", "MAX()"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 4,
      question: "What is a primary key?",
      options: [
        "First column",
        "Unique identifier",
        "Largest value",
        "Most important data",
      ],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 5,
      question: "Which JOIN returns all records from both tables?",
      options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
      correct: 3,
      difficulty: "medium",
    },
    {
      id: 6,
      question: "What does the GROUP BY clause do?",
      options: [
        "Sorts records",
        "Groups records with same values",
        "Filters records",
        "Joins tables",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 7,
      question: "Which SQL command is used to add new data?",
      options: ["ADD", "INSERT", "CREATE", "APPEND"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 8,
      question: "What is the difference between DELETE and TRUNCATE?",
      options: [
        "No difference",
        "DELETE can use WHERE, TRUNCATE cannot",
        "TRUNCATE is slower",
        "DELETE removes table structure",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 9,
      question: "Which constraint ensures a column cannot have NULL values?",
      options: ["UNIQUE", "CHECK", "NOT NULL", "FOREIGN KEY"],
      correct: 2,
      difficulty: "easy",
    },
    {
      id: 10,
      question: "What is a foreign key?",
      options: [
        "Key from another country",
        "Reference to primary key in another table",
        "Encrypted key",
        "Backup key",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 11,
      question: "Which SQL function returns the current date?",
      options: ["NOW()", "TODAY()", "CURRENT_DATE", "DATE()"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 12,
      question: "What does the HAVING clause do?",
      options: [
        "Filters individual rows",
        "Filters grouped results",
        "Sorts data",
        "Joins tables",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 13,
      question: "Which SQL command creates a new table?",
      options: ["MAKE TABLE", "CREATE TABLE", "NEW TABLE", "BUILD TABLE"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 14,
      question: "What is an index in SQL?",
      options: [
        "Table of contents",
        "Data structure for faster queries",
        "Row number",
        "Column position",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 15,
      question: "Which operator is used for pattern matching in SQL?",
      options: ["MATCH", "LIKE", "SIMILAR", "PATTERN"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 16,
      question: "What does ACID stand for in database transactions?",
      options: [
        "Atomicity, Consistency, Isolation, Durability",
        "Automatic, Consistent, Integrated, Durable",
        "Advanced, Complete, Isolated, Dependable",
        "Accurate, Complete, Independent, Detailed",
      ],
      correct: 0,
      difficulty: "hard",
    },
    {
      id: 17,
      question: "Which SQL command modifies existing data?",
      options: ["MODIFY", "CHANGE", "UPDATE", "ALTER"],
      correct: 2,
      difficulty: "easy",
    },
    {
      id: 18,
      question: "What is a subquery?",
      options: [
        "Query within another query",
        "Backup query",
        "Simple query",
        "Quick query",
      ],
      correct: 0,
      difficulty: "medium",
    },
    {
      id: 19,
      question: "Which SQL clause is used to sort results?",
      options: ["SORT BY", "ORDER BY", "ARRANGE BY", "SEQUENCE BY"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 20,
      question: "What is normalization in databases?",
      options: [
        "Making data normal",
        "Organizing data to reduce redundancy",
        "Backing up data",
        "Encrypting data",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 21,
      question: "Which SQL function converts text to uppercase?",
      options: ["UPPER()", "CAPS()", "UPPERCASE()", "BIG()"],
      correct: 0,
      difficulty: "easy",
    },
    {
      id: 22,
      question: "What is a view in SQL?",
      options: [
        "Physical table",
        "Virtual table based on query",
        "Table backup",
        "Table index",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 23,
      question: "Which SQL command removes a table?",
      options: ["REMOVE TABLE", "DELETE TABLE", "DROP TABLE", "CLEAR TABLE"],
      correct: 2,
      difficulty: "easy",
    },
    {
      id: 24,
      question: "What does the DISTINCT keyword do?",
      options: [
        "Sorts data",
        "Removes duplicates",
        "Counts rows",
        "Joins tables",
      ],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 25,
      question: "Which is NOT a valid SQL data type?",
      options: ["VARCHAR", "INTEGER", "DATE", "EMOTION"],
      correct: 3,
      difficulty: "easy",
    },
    {
      id: 26,
      question: "What is a stored procedure?",
      options: [
        "Stored data",
        "Precompiled SQL code",
        "Backup procedure",
        "Security procedure",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 27,
      question: "Which SQL command grants permissions?",
      options: ["ALLOW", "PERMIT", "GRANT", "GIVE"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 28,
      question: "What is the difference between UNION and UNION ALL?",
      options: [
        "No difference",
        "UNION removes duplicates, UNION ALL keeps them",
        "UNION ALL is faster",
        "UNION is deprecated",
      ],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 29,
      question: "Which SQL function returns the length of a string?",
      options: ["SIZE()", "LENGTH()", "COUNT()", "MEASURE()"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 30,
      question: "What is a trigger in SQL?",
      options: [
        "Button to start query",
        "Automatic procedure on data changes",
        "Error handler",
        "Performance monitor",
      ],
      correct: 1,
      difficulty: "hard",
    },
  ],
  
  // Aptitude Questions
  aptitude: [
    {
      id: 1,
      question: "If a train travels 120 km in 2 hours, what is its average speed?",
      options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 2,
      question: "A shopkeeper marks up his goods by 40% and offers a 20% discount. What is his net profit percentage?",
      options: ["10%", "12%", "15%", "20%"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 3,
      question: "If 15 workers can complete a task in 10 days, how many days will 25 workers take?",
      options: ["4 days", "6 days", "8 days", "12 days"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 4,
      question: "What is 25% of 80?",
      options: ["15", "20", "25", "30"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 5,
      question: "A sum of money doubles in 5 years at simple interest. What is the rate of interest per annum?",
      options: ["10%", "15%", "20%", "25%"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 6,
      question: "If A:B = 2:3 and B:C = 4:5, what is A:C?",
      options: ["8:15", "2:5", "3:5", "6:10"],
      correct: 0,
      difficulty: "hard",
    },
    {
      id: 7,
      question: "The average of 5 numbers is 30. If one number is excluded, the average becomes 25. What is the excluded number?",
      options: ["40", "45", "50", "55"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 8,
      question: "A pipe can fill a tank in 6 hours. Another pipe can empty it in 10 hours. If both pipes are opened together, in how many hours will the tank be filled?",
      options: ["12 hours", "15 hours", "18 hours", "20 hours"],
      correct: 1,
      difficulty: "hard",
    },
    {
      id: 9,
      question: "What is the next number in the series: 2, 6, 12, 20, 30, ?",
      options: ["38", "40", "42", "44"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 10,
      question: "The cost price of 20 articles is equal to the selling price of 16 articles. What is the profit percentage?",
      options: ["20%", "25%", "30%", "33.33%"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 11,
      question: "A person invests $1000 at 10% compound interest per annum. What will be the amount after 2 years?",
      options: ["$1200", "$1210", "$1220", "$1230"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 12,
      question: "If the perimeter of a square is 40 cm, what is its area?",
      options: ["80 cm²", "100 cm²", "120 cm²", "160 cm²"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 13,
      question: "A car covers a distance of 300 km at a speed of 60 km/h. How long does it take?",
      options: ["4 hours", "5 hours", "6 hours", "7 hours"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 14,
      question: "The ratio of ages of A and B is 3:5. If B is 20 years old, how old is A?",
      options: ["10 years", "12 years", "15 years", "18 years"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 15,
      question: "What is the compound interest on $5000 at 8% per annum for 2 years?",
      options: ["$800", "$832", "$850", "$900"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 16,
      question: "A train 100m long passes a pole in 5 seconds. What is its speed in km/h?",
      options: ["60 km/h", "72 km/h", "80 km/h", "90 km/h"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 17,
      question: "If 3x + 5 = 20, what is the value of x?",
      options: ["3", "5", "7", "9"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 18,
      question: "The sum of three consecutive odd numbers is 63. What is the middle number?",
      options: ["19", "21", "23", "25"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 19,
      question: "A mixture contains milk and water in ratio 5:3. If 8 liters of mixture is taken out, how much milk is removed?",
      options: ["4 liters", "5 liters", "6 liters", "7 liters"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 20,
      question: "What is 15% of 200 plus 20% of 150?",
      options: ["50", "55", "60", "65"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 21,
      question: "A man bought a bicycle for $500 and sold it for $600. What is his profit percentage?",
      options: ["15%", "20%", "25%", "30%"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 22,
      question: "The product of two numbers is 120 and their sum is 22. What are the numbers?",
      options: ["8 and 14", "10 and 12", "6 and 16", "11 and 11"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 23,
      question: "If the radius of a circle is 7 cm, what is its area? (Use π = 22/7)",
      options: ["144 cm²", "154 cm²", "164 cm²", "174 cm²"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 24,
      question: "A batsman scores 85 runs in his 10th inning and increases his average by 3 runs. What was his average before the 10th inning?",
      options: ["52", "55", "58", "60"],
      correct: 1,
      difficulty: "hard",
    },
    {
      id: 25,
      question: "What is the value of: (15 + 25) × 2 - 20?",
      options: ["50", "60", "70", "80"],
      correct: 1,
      difficulty: "easy",
    },
  ],

  // Logical Reasoning Questions
  logicalReasoning: [
    {
      id: 1,
      question: "All roses are flowers. Some flowers are red. Therefore:",
      options: [
        "All roses are red",
        "Some roses are red",
        "All red things are flowers",
        "Cannot be determined"
      ],
      correct: 3,
      difficulty: "medium",
    },
    {
      id: 2,
      question: "If CHAIR is coded as 12345, what is the code for REACH?",
      options: ["54321", "35241", "42135", "32145"],
      correct: 0,
      difficulty: "easy",
    },
    {
      id: 3,
      question: "Find the odd one out: Dog, Cat, Tiger, Car, Lion",
      options: ["Dog", "Cat", "Tiger", "Car"],
      correct: 3,
      difficulty: "easy",
    },
    {
      id: 4,
      question: "If A is the brother of B, B is the brother of C, and C is the father of D, how is D related to A?",
      options: ["Brother", "Nephew/Niece", "Son", "Cousin"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 5,
      question: "Complete the series: 2, 6, 12, 20, 30, ?",
      options: ["38", "40", "42", "44"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 6,
      question: "If all Bloops are Razzies and all Razzies are Lazzies, then all Bloops are definitely Lazzies.",
      options: ["True", "False", "Cannot be determined", "None of the above"],
      correct: 0,
      difficulty: "medium",
    },
    {
      id: 7,
      question: "What comes next in the sequence: A, C, E, G, ?",
      options: ["H", "I", "J", "K"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 8,
      question: "If BOOK is written as BNPK, how will PAGE be written?",
      options: ["OZNR", "PBHF", "QZFF", "OZFF"],
      correct: 0,
      difficulty: "medium",
    },
    {
      id: 9,
      question: "In a certain code, 'COMPUTER' is written as 'DPNQVUFS'. How is 'KEYBOARD' written?",
      options: ["LFZCPBSE", "KFZCPBSD", "LFZCPASE", "KFZBPBSD"],
      correct: 0,
      difficulty: "hard",
    },
    {
      id: 10,
      question: "Find the missing number: 3, 7, 15, 31, ?",
      options: ["55", "59", "63", "67"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 11,
      question: "If South-East becomes North and North-East becomes West, what does South become?",
      options: ["North-East", "North-West", "South-East", "South-West"],
      correct: 1,
      difficulty: "hard",
    },
    {
      id: 12,
      question: "Which word does NOT belong: Apple, Orange, Carrot, Banana, Grape",
      options: ["Apple", "Orange", "Carrot", "Banana"],
      correct: 2,
      difficulty: "easy",
    },
    {
      id: 13,
      question: "Statement: All mangoes are golden in color. No golden-colored things are cheap. Therefore:",
      options: [
        "All mangoes are cheap",
        "All mangoes are expensive",
        "No mango is cheap",
        "Cannot be determined"
      ],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 14,
      question: "In a row of children, Akash is 7th from the left and 13th from the right. How many children are in the row?",
      options: ["18", "19", "20", "21"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 15,
      question: "If 2 is replaced by 3, 3 by 4, and 4 by 5, what is the value of 2 + 3 × 4?",
      options: ["17", "20", "23", "26"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 16,
      question: "A is B's sister. C is B's mother. D is C's father. E is D's mother. How is A related to D?",
      options: ["Grandmother", "Granddaughter", "Daughter", "Niece"],
      correct: 1,
      difficulty: "hard",
    },
    {
      id: 17,
      question: "Complete the analogy: Book : Library :: Painting : ?",
      options: ["Artist", "Museum", "Canvas", "Frame"],
      correct: 1,
      difficulty: "easy",
    },
    {
      id: 18,
      question: "If the day before yesterday was Friday, what day will it be the day after tomorrow?",
      options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
      correct: 2,
      difficulty: "medium",
    },
    {
      id: 19,
      question: "In a certain code, 'rain' is 'pain', 'pain' is 'come', 'come' is 'man'. What do we say when it is raining?",
      options: ["rain", "pain", "come", "man"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 20,
      question: "Which number is the odd one out: 2, 5, 10, 17, 26, 37",
      options: ["2", "5", "10", "26"],
      correct: 3,
      difficulty: "hard",
    },
    {
      id: 21,
      question: "If CAT = 24, DOG = 26, what is BIRD?",
      options: ["30", "32", "34", "36"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 22,
      question: "Complete: ACE, BDF, CEG, ?",
      options: ["DEH", "DFH", "DGI", "EFG"],
      correct: 1,
      difficulty: "medium",
    },
    {
      id: 23,
      question: "If @ means +, # means -, $ means ×, and % means ÷, what is 6 @ 4 $ 5 % 2?",
      options: ["14", "16", "18", "20"],
      correct: 1,
      difficulty: "hard",
    },
    {
      id: 24,
      question: "Mirror image of AMBULANCE when seen in mirror is:",
      options: ["ECNALUBMA", "AMBULANCE", "reverse", "Cannot be determined"],
      correct: 0,
      difficulty: "easy",
    },
    {
      id: 25,
      question: "If 1=3, 2=3, 3=5, 4=4, 5=4, then 6=?",
      options: ["3", "4", "5", "6"],
      correct: 0,
      difficulty: "hard",
    },
  ],
};

// Role information
export const roles = [
  {
    id: "developer",
    name: "Software Developer",
    description:
      "Test your programming and software development knowledge with code snippets",
    icon: "💻",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: "frontendDeveloper",
    name: "Frontend Developer",
    description:
      "Assess your frontend development skills with JavaScript, CSS, and React",
    icon: "🎨",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "hr",
    name: "HR Professional",
    description: "Assess your human resources and people management skills",
    icon: "�",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "dataAnalyst",
    name: "Data Analyst",
    description: "Evaluate your data analysis and statistical knowledge",
    icon: "�️",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "sqlDeveloper",
    name: "SQL Developer",
    description: "Test your database and SQL expertise",
    icon: "🗄️",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: "aptitude",
    name: "Aptitude Test",
    description: "Assess your numerical and quantitative aptitude skills",
    icon: "🧮",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "logicalReasoning",
    name: "Logical Reasoning",
    description: "Test your logical thinking and problem-solving abilities",
    icon: "🧠",
    color: "from-indigo-500 to-purple-500",
  },
];

// Track used questions to prevent repetition
const usedQuestions = new Map();

// Get random questions for a specific role without repetition
export const getQuestionsForRole = (roleId, count = 25) => {
  const questions = roleBasedQuestions[roleId] || [];

  // Get or initialize used questions for this role
  if (!usedQuestions.has(roleId)) {
    usedQuestions.set(roleId, new Set());
  }

  const used = usedQuestions.get(roleId);
  const available = questions.filter((q) => !used.has(q.id));

  // If we don't have enough unused questions, reset the used set
  if (available.length < count) {
    used.clear();
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));

    // Mark these questions as used
    selected.forEach((q) => used.add(q.id));

    return selected;
  }

  // Select random questions from available ones
  const shuffled = [...available].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  // Mark these questions as used
  selected.forEach((q) => used.add(q.id));

  return selected;
};

// Reset used questions for a specific role (optional function)
export const resetUsedQuestions = (roleId) => {
  if (usedQuestions.has(roleId)) {
    usedQuestions.get(roleId).clear();
  }
};

// Calculate MCQ score
export const calculateMCQScore = (answers, questions) => {
  let correct = 0;
  answers.forEach((answer, index) => {
    if (answer === questions[index].correct) {
      correct++;
    }
  });
  return Math.round((correct / questions.length) * 10);
};

// Get performance analysis
export const getPerformanceAnalysis = (
  score,
  totalQuestions,
  correctAnswers
) => {
  const percentage = (correctAnswers / totalQuestions) * 100;

  if (percentage >= 90) {
    return {
      level: "Excellent",
      message:
        "Outstanding performance! You have excellent knowledge in this domain.",
      color: "text-yellow-400",
      bgColor: "from-yellow-500/20 to-orange-500/20",
    };
  } else if (percentage >= 75) {
    return {
      level: "Good",
      message:
        "Good job! You have solid understanding with room for minor improvements.",
      color: "text-green-400",
      bgColor: "from-green-500/20 to-emerald-500/20",
    };
  } else if (percentage >= 60) {
    return {
      level: "Average",
      message:
        "Average performance. Focus on strengthening your knowledge in key areas.",
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-cyan-500/20",
    };
  } else {
    return {
      level: "Needs Improvement",
      message:
        "There's significant room for improvement. Consider additional study and practice.",
      color: "text-purple-400",
      bgColor: "from-purple-500/20 to-pink-500/20",
    };
  }
};

// Legacy functions for backward compatibility
export const interviewQuestions = [
  "Tell me about yourself and your background.",
  "What are your greatest strengths and how do they apply to this role?",
  "Describe a challenging project you worked on and how you overcame obstacles.",
  "Where do you see yourself in 5 years?",
  "Why are you interested in this position and our company?",
];

export const getRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * interviewQuestions.length);
  return interviewQuestions[randomIndex];
};

export const calculateScore = (answer) => {
  const wordCount = answer.trim().split(/\s+/).length;

  if (wordCount < 10) return Math.floor(Math.random() * 3) + 5;
  if (wordCount < 50) return Math.floor(Math.random() * 3) + 6;
  if (wordCount < 100) return Math.floor(Math.random() * 3) + 7;
  return Math.floor(Math.random() * 2) + 9;
};
