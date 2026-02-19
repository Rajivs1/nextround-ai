# Color Scheme Guide - NextRound AI

## Current Color Scheme

### Background Colors

#### Primary Backgrounds
```
Light Black:     #1a1a1a  ████████  Main app background
Dark Gray:       #262626  ████████  Cards, modals
Gray-900:        #111827  ████████  Sections, containers
Gray-800:        #1f2937  ████████  Nested elements
```

#### Gradient Backgrounds
```
Hero Section:    from-[#1a1a1a] via-gray-900 to-[#1a1a1a]
Features:        from-[#1a1a1a] via-gray-900 to-[#1a1a1a]
Leaderboard:     from-[#1a1a1a] to-gray-900
CTA Section:     from-[#1a1a1a] to-gray-900
```

### Text Colors

#### Standard Text
```
Primary:         gray-100  #f3f4f6  ████████  Main content
Secondary:       gray-300  #d1d5db  ████████  Supporting text
Tertiary:        gray-400  #9ca3af  ████████  Subtle text
Emphasized:      white     #ffffff  ████████  Important text
```

#### Colored Text (Gradients)
```
Brand Gradient:  blue-400 → purple-400 → pink-400
Success:         green-400  #4ade80  ████████
Warning:         yellow-400 #facc15  ████████
Error:           red-400    #f87171  ████████
Info:            blue-400   #60a5fa  ████████
```

### UI Element Colors

#### Buttons
```
Primary:         from-blue-500 via-purple-500 to-pink-500
Secondary:       border-gray-600 hover:border-gray-400
Success:         from-green-500 to-emerald-500
Danger:          from-red-500 to-orange-500
```

#### Borders
```
Default:         gray-700   #374151  ████████
Hover:           gray-600   #4b5563  ████████
Active:          gray-500   #6b7280  ████████
Accent:          purple-500 #a855f7  ████████
```

#### Status Colors
```
Success:         green-500  #22c55e  ████████
Warning:         orange-500 #f97316  ████████
Error:           red-500    #ef4444  ████████
Info:            blue-500   #3b82f6  ████████
```

## Usage Examples

### Page Container
```jsx
<div className="min-h-screen bg-[#1a1a1a] text-gray-100">
  {/* Content */}
</div>
```

### Card Component
```jsx
<div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
  <h3 className="text-white font-bold mb-2">Title</h3>
  <p className="text-gray-300">Description</p>
</div>
```

### Button Variants
```jsx
{/* Primary */}
<button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
  Primary Action
</button>

{/* Secondary */}
<button className="border-2 border-gray-600 text-gray-300 hover:text-white">
  Secondary Action
</button>

{/* Success */}
<button className="bg-green-500 text-white">
  Success Action
</button>
```

### Modal/Overlay
```jsx
<div className="fixed inset-0 bg-[#1a1a1a]/80 backdrop-blur-sm">
  <div className="bg-gray-900 border border-gray-700 rounded-2xl">
    {/* Modal content */}
  </div>
</div>
```

### Section with Gradient
```jsx
<section className="bg-gradient-to-b from-[#1a1a1a] via-gray-900 to-[#1a1a1a]">
  {/* Section content */}
</section>
```

## Contrast Ratios (WCAG AA Compliant)

```
Background #1a1a1a with:
- gray-100 text:  ✅ 14.5:1 (Excellent)
- gray-300 text:  ✅ 9.8:1  (Very Good)
- gray-400 text:  ✅ 7.2:1  (Good)
- white text:     ✅ 16.1:1 (Perfect)

Minimum required: 4.5:1 for normal text, 3:1 for large text
```

## Color Psychology

### Light Black (#1a1a1a)
- **Professional**: Conveys sophistication and modernity
- **Comfortable**: Reduces eye strain compared to pure black
- **Versatile**: Works well with all accent colors
- **Depth**: Allows for subtle layering and shadows

### Gray Scale
- **gray-100**: High readability, primary content
- **gray-300**: Supporting information, less emphasis
- **gray-400**: Subtle details, placeholders
- **gray-700**: Borders, dividers
- **gray-900**: Elevated surfaces, cards

### Accent Colors
- **Blue**: Trust, technology, professionalism
- **Purple**: Creativity, innovation, premium
- **Pink**: Energy, modern, engaging
- **Green**: Success, growth, positive feedback
- **Red**: Urgency, errors, important actions

## Best Practices

### Do's ✅
- Use `bg-[#1a1a1a]` for main backgrounds
- Use `text-gray-100` for primary text
- Use `text-gray-300` for secondary text
- Use gradients for visual interest
- Maintain consistent spacing and borders
- Use colored text for status indicators

### Don'ts ❌
- Don't use pure black (#000000)
- Don't use pure white backgrounds
- Don't use low-contrast text colors
- Don't mix too many gradient directions
- Don't overuse bright accent colors
- Don't forget hover states

## Responsive Considerations

### Mobile
- Maintain same color scheme
- Ensure touch targets have sufficient contrast
- Use larger text sizes with same colors

### Desktop
- Utilize gradients for depth
- Add subtle hover effects
- Maintain consistency across breakpoints

## Dark Mode (Current Implementation)

The application currently uses a dark theme by default:
- Background: Light Black (#1a1a1a)
- Text: Gray-100 (#f3f4f6)
- Accents: Vibrant colors for contrast

## Future: Light Mode (Optional)

If implementing light mode:
```
Background:      #ffffff (white)
Text:            gray-900 (#111827)
Cards:           gray-50 (#f9fafb)
Borders:         gray-200 (#e5e7eb)
```

## Quick Reference

### Most Common Classes
```
Backgrounds:     bg-[#1a1a1a], bg-gray-900, bg-gray-800
Text:            text-gray-100, text-gray-300, text-white
Borders:         border-gray-700, border-gray-600
Hover:           hover:bg-gray-800, hover:text-white
Gradients:       from-blue-500 via-purple-500 to-pink-500
```

### Utility Classes
```
Backdrop:        bg-[#1a1a1a]/80 backdrop-blur-sm
Glass Effect:    bg-gray-900/50 backdrop-blur-md
Shadow:          shadow-lg shadow-purple-500/50
Glow:            hover:shadow-2xl hover:shadow-blue-500/50
```
