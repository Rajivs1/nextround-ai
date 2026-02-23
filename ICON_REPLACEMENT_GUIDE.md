# Icon Replacement Guide

## Icons Component Created
Location: `src/components/Icons.jsx`

Contains SVG icons for:
- FireIcon 🔥
- TrophyIcon 🏆
- CodeIcon 💻
- ChartIcon 📊
- RocketIcon 🚀
- TargetIcon 🎯
- StarIcon ⭐
- MuscleIcon 💪
- TrendingUpIcon 📈
- And more...

## Replacements Needed in Home.jsx

### 1. Import Icons (DONE)
```javascript
import { 
  FireIcon, 
  TrophyIcon, 
  CodeIcon, 
  ChartIcon, 
  RocketIcon, 
  TargetIcon,
  StarIcon,
  TrendingUpIcon
} from "../components/Icons";
```

### 2. Replace Emoji Usage

#### Navigation Icons
```jsx
// Replace: <span className="text-xl">💻</span>
// With: <CodeIcon className="w-5 h-5" />

// Replace: <span className="text-xl">📊</span>
// With: <ChartIcon className="w-5 h-5" />
```

#### Hero Section
```jsx
// Replace: <span className="mr-2 text-xl sm:text-2xl">🚀</span>
// With: <RocketIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
```

#### Streak Section
```jsx
// Replace: <div className="text-4xl">🔥</div>
// With: <FireIcon className="w-10 h-10 text-orange-500" />

// Replace: <div className="text-2xl">🏆</div>
// With: <TrophyIcon className="w-6 h-6 text-yellow-500" />

// Replace: 🔥 {userEntry.currentStreak}
// With: <FireIcon className="w-4 h-4 inline" /> {userEntry.currentStreak}
```

#### Leaderboard Section
```jsx
// Replace: <div className="text-4xl">🏆</div>
// With: <TrophyIcon className="w-10 h-10 text-yellow-500" />
```

#### Feature Cards
```jsx
// Replace: 💻 (Practice)
// With: <CodeIcon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />

// Replace: 📊 (Dashboard)
// With: <ChartIcon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />

// Replace: 🔥 (Daily Challenge)
// With: <FireIcon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-orange-500" />
```

#### Motivation Messages
```jsx
// Replace: "Start solving to build your streak! 💪"
// With: "Start solving to build your streak!" + <TrendingUpIcon className="w-4 h-4 inline ml-1" />

// Replace: "Keep going! You're building momentum! 🚀"
// With: "Keep going! You're building momentum!" + <RocketIcon className="w-4 h-4 inline ml-1" />

// Replace: "Amazing consistency! Keep it up! ⭐"
// With: "Amazing consistency! Keep it up!" + <StarIcon className="w-4 h-4 inline ml-1" />

// Replace: "You're on fire! Legendary streak! 🔥"
// With: "You're on fire! Legendary streak!" + <FireIcon className="w-4 h-4 inline ml-1" />
```

#### CTA Buttons
```jsx
// Replace: <span className="mr-2 text-xl sm:text-2xl">🎯</span>
// With: <TargetIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />

// Replace: <span className="ml-4 text-2xl sm:text-3xl...">🚀</span>
// With: <RocketIcon className="w-6 h-6 sm:w-8 sm:h-8 ml-4 group-hover:rotate-12 transition-transform" />
```

#### Floating Daily Challenge Button
```jsx
// Replace: <span className="text-3xl animate-bounce-slow">🔥</span>
// With: <FireIcon className="w-8 h-8 text-white animate-bounce-slow" />
```

## Benefits of SVG Icons

1. **Scalable**: Perfect at any size
2. **Customizable**: Can change color, size, stroke
3. **Accessible**: Better for screen readers
4. **Professional**: More polished appearance
5. **Consistent**: Same style across all icons
6. **Performance**: Smaller file size than emoji fonts

## Color Recommendations

- Fire/Streak: `text-orange-500` or `text-red-500`
- Trophy/Achievement: `text-yellow-500` or `text-amber-500`
- Code/Technical: `text-blue-500` or `text-indigo-500`
- Charts/Data: `text-purple-500` or `text-violet-500`
- Rocket/Speed: `text-cyan-500` or `text-sky-500`
- Target/Goal: `text-green-500` or `text-emerald-500`
- Star/Quality: `text-yellow-400` or `text-amber-400`

## Implementation Status

- ✅ Icons component created
- ✅ Icons imported in Home.jsx
- ⏳ Manual replacement needed (file too large for automated replacement)

## Next Steps

Manually replace each emoji with the corresponding icon component using the patterns above. The icons are already imported and ready to use.
