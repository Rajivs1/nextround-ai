# Contributing to NextRound AI

First off, thank you for considering contributing to NextRound AI! 🎉

It's people like you that make NextRound AI such a great tool for interview preparation.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)

---

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all. By participating, you are expected to uphold this code.

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and encourage diverse perspectives
- Focus on what is best for the community
- Show empathy towards other community members

---

## How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, browser, Node version)

**Template:**
```markdown
## Bug Description
A clear description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Screenshots
If applicable, add screenshots.

## Environment
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Node Version: [e.g., 18.17.0]
```

### Suggesting Features ✨

Feature suggestions are tracked as GitHub issues. When creating a feature suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested feature**
- **Explain why this feature would be useful**
- **List any alternatives you've considered**

**Template:**
```markdown
## Feature Description
A clear description of the feature.

## Motivation
Why is this feature needed? What problem does it solve?

## Proposed Solution
How should this feature work?

## Alternatives Considered
Any alternative solutions or features you've considered.

## Additional Context
Any other context, screenshots, or mockups.
```

### Contributing Code 💻

#### Areas to Contribute

1. **Bug Fixes**
   - Check [Issues](https://github.com/yourusername/nextround-ai/issues) labeled `bug`
   - Fix and submit a PR

2. **New Features**
   - Check the [Roadmap](README.md#-roadmap)
   - Discuss before implementing (create an issue first)

3. **Documentation**
   - Improve README
   - Add code comments
   - Create tutorials/guides

4. **Testing**
   - Write unit tests
   - Write integration tests
   - Test edge cases

5. **UI/UX Improvements**
   - Enhance designs
   - Improve accessibility
   - Optimize performance

6. **New Problem Sets**
   - Add new coding problems
   - Create test cases
   - Write detailed descriptions

---

## Development Setup

### Prerequisites

- Node.js v18+
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Setup Steps

1. **Fork the repository**
   
   Click the "Fork" button on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/nextround-ai.git
   cd nextround-ai
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/nextround-ai.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create .env file**
   ```bash
   cp .env.example .env
   # Fill in your Firebase and OpenAI credentials
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## Pull Request Process

### Before Submitting

- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added (if applicable)
- [ ] All tests pass
- [ ] Build succeeds

### Submitting PR

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template

4. **PR Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## How Has This Been Tested?
   Describe your testing process
   
   ## Screenshots (if applicable)
   Add screenshots
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-reviewed
   - [ ] Commented complex code
   - [ ] Updated documentation
   - [ ] No new warnings
   - [ ] Tests added
   - [ ] All tests pass
   ```

### After Submitting

- Monitor your PR for feedback
- Respond to review comments
- Make requested changes
- Re-request review after updates

---

## Style Guidelines

### JavaScript/React

- Use ES6+ syntax
- Functional components with hooks
- PropTypes or TypeScript (if applicable)
- Meaningful variable names
- Keep functions small and focused
- DRY (Don't Repeat Yourself)

**Example:**
```javascript
// Good ✅
const handleSubmit = async (userData) => {
  try {
    const response = await saveUser(userData);
    showSuccessMessage(response);
  } catch (error) {
    showErrorMessage(error);
  }
};

// Bad ❌
const hs = async (ud) => {
  // Long, complex logic without error handling
};
```

### CSS/Tailwind

- Use Tailwind utility classes
- Follow mobile-first approach
- Maintain consistent spacing
- Use theme colors
- Avoid inline styles when possible

**Example:**
```jsx
// Good ✅
<button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
  Submit
</button>

// Bad ❌
<button style={{padding: '12px 24px', backgroundColor: '#3B82F6'}}>
  Submit
</button>
```

### File Organization

```
src/
├── components/       # Reusable components
│   ├── Button.jsx
│   └── Modal.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   └── Dashboard.jsx
├── utils/           # Utility functions
│   └── helpers.js
├── services/        # API services
│   └── api.js
└── styles/          # Global styles
    └── index.css
```

### Naming Conventions

- **Components**: PascalCase (`UserProfile.jsx`)
- **Functions**: camelCase (`getUserData()`)
- **Constants**: UPPER_SNAKE_CASE (`API_URL`)
- **Files**: kebab-case or PascalCase
- **CSS Classes**: kebab-case (`user-card`)

---

## Commit Messages

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
# Good ✅
feat(practice): add C++ code execution support
fix(auth): resolve login redirect issue
docs(readme): update installation instructions

# Bad ❌
fixed stuff
update
changes
```

### Detailed Example

```bash
feat(leaderboard): implement real-time ranking system

- Add Firestore query for top 10 users
- Create leaderboard component with live updates
- Add user position highlighting
- Display streak and problems solved

Closes #123
```

---

## Adding New Problems

### Problem Template

```javascript
{
  id: number,
  title: string,
  difficulty: "Easy" | "Medium" | "Hard",
  description: string,
  example: string,
  starterCode: string,
  testCases: [
    {
      input: any[],
      expected: any
    }
  ]
}
```

### Example

```javascript
{
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  example: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] == 9",
  starterCode: `function twoSum(nums, target) {
  // Write your code here
  
}`,
  testCases: [
    { input: [[2,7,11,15], 9], expected: [0,1] },
    { input: [[3,2,4], 6], expected: [1,2] },
    { input: [[3,3], 6], expected: [0,1] }
  ]
}
```

### Guidelines

- Include 3-5 test cases
- Cover edge cases
- Clear problem description
- Provide example with explanation
- Use consistent formatting

---

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## Documentation

### Code Comments

```javascript
/**
 * Calculates user's streak based on last activity
 * @param {Date} lastActivityDate - Last date user was active
 * @param {number} currentStreak - Current streak count
 * @returns {number} Updated streak count
 */
export const calculateStreak = (lastActivityDate, currentStreak) => {
  // Implementation
};
```

### README Updates

- Keep README.md up to date
- Update features list
- Add new screenshots
- Update roadmap

---

## Review Process

### What We Look For

- **Functionality**: Does it work as intended?
- **Code Quality**: Is it clean and maintainable?
- **Performance**: Is it efficient?
- **Testing**: Are there adequate tests?
- **Documentation**: Is it well-documented?
- **Style**: Does it follow guidelines?

### Response Time

- Initial review: Within 48 hours
- Follow-up reviews: Within 24 hours
- Merge: After approval from maintainers

---

## Getting Help

### Resources

- 📖 [Documentation](https://docs.nextroundai.com)
- 💬 [Discord Community](https://discord.gg/nextroundai)
- 📧 [Email Support](mailto:support@nextroundai.com)
- 🐛 [Issue Tracker](https://github.com/yourusername/nextround-ai/issues)

### Questions?

Don't hesitate to ask! We're here to help:
- Open an issue with the `question` label
- Ask in our Discord server
- Email the maintainers

---

## Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Given contributor badge
- Invited to maintainer team (for regular contributors)

---

## Thank You! 🙏

Every contribution, no matter how small, is valuable and appreciated. Together, we're building something amazing to help developers succeed in their careers!

**Happy Contributing!** 🚀

---

<div align="center">

**[⬆ Back to Top](#contributing-to-nextround-ai)**

Made with ❤️ by the NextRound AI community

</div>
