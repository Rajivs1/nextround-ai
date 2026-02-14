# CSS Utility Classes Reference 🎨

Quick reference for the new custom CSS classes added to enhance the UI.

## 🎭 Animation Classes

### `.animate-shimmer`
Subtle shimmer/shine effect that moves from left to right.
```jsx
<div className="animate-shimmer">Content</div>
```
**Use case:** Add premium feel to cards and buttons on hover

### `.animate-gradient`
Smooth gradient color animation.
```jsx
<div className="bg-gradient-to-r from-blue-500 to-purple-500 animate-gradient">
  Content
</div>
```
**Use case:** Animated backgrounds and headers

### `.animate-float-slow`
Gentle up-down floating animation (6s duration).
```jsx
<div className="animate-float-slow">🎯</div>
```
**Use case:** Icons, emojis, and decorative elements

### `.animate-spin-slow`
Slow rotation animation (3s duration).
```jsx
<div className="animate-spin-slow">⚙️</div>
```
**Use case:** Loading indicators and decorative elements

## 💎 Effect Classes

### `.glass-effect`
Glass morphism effect with blur and transparency.
```jsx
<div className="glass-effect">Content</div>
```
**Use case:** Modern cards, modals, and overlays

### `.hover-lift`
Lifts element up with shadow on hover.
```jsx
<button className="hover-lift">Click me</button>
```
**Use case:** Cards, buttons, and interactive elements

### `.text-gradient-animate`
Animated gradient text.
```jsx
<h1 className="text-gradient-animate">Animated Text</h1>
```
**Use case:** Hero headings and important titles

## 📦 Usage Examples

### Animated Feature Card
```jsx
<div className="relative p-6 rounded-2xl glass-effect hover-lift overflow-hidden group">
  {/* Shimmer overlay */}
  <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100"></div>
  
  {/* Content */}
  <div className="relative z-10">
    <div className="text-4xl animate-float-slow">🚀</div>
    <h3 className="text-xl font-bold">Feature Title</h3>
    <p className="text-gray-400">Description text</p>
  </div>
</div>
```

### Gradient Animated Background
```jsx
<div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10 animate-gradient">
</div>
```

### Floating Icon
```jsx
<div className="text-6xl animate-float-slow" style={{animationDelay: '0.5s'}}>
  💡
</div>
```

### Glass Morphism Container
```jsx
<div className="glass-effect rounded-2xl p-8 border border-white/10">
  Content with glass effect
</div>
```

## 🎨 Combining Classes

### Premium Card with All Effects
```jsx
<div className="group relative p-8 rounded-2xl glass-effect hover-lift overflow-hidden">
  {/* Gradient background glow */}
  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  
  {/* Shimmer effect */}
  <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100"></div>
  
  {/* Content */}
  <div className="relative z-10">
    <div className="text-5xl animate-float-slow mb-4">✨</div>
    <h3 className="text-2xl font-bold mb-2">Premium Feature</h3>
    <p className="text-gray-400">Enhanced with multiple effects</p>
  </div>
</div>
```

### Animated Hero Title
```jsx
<h1 className="text-6xl font-black mb-8">
  <span className="text-gradient-animate">
    Animated Gradient Text
  </span>
</h1>
```

## 🎯 Best Practices

1. **Performance**: Use animations sparingly on mobile devices
2. **Staggering**: Add `style={{animationDelay: '0.5s'}}` for sequential animations
3. **Combining**: Stack effects using Tailwind's group utility
4. **Opacity**: Use `opacity-0 group-hover:opacity-100` for reveal animations
5. **Z-index**: Always set `relative z-10` on content inside animated containers

## 🚀 Pro Tips

- Use `animate-float-slow` with different delays to create flowing motion
- Combine `glass-effect` with `hover-lift` for premium cards
- Layer multiple gradient backgrounds for depth
- Use `overflow-hidden` when adding `animate-shimmer` to prevent visual bugs
- Add `group` class to parent for `group-hover` effects on children

---

## 📱 Responsive Considerations

All animations respect `prefers-reduced-motion` and work well on mobile:
- Animations use hardware acceleration (`transform`)
- Glass effects fall back gracefully
- Hover effects only trigger on devices that support hover
- Performance optimized for smooth 60fps

## 🎨 Color Palette

The design uses these main gradients:
- **Primary**: `from-blue-500 to-purple-500`
- **Secondary**: `from-purple-500 to-pink-500`
- **Accent**: `from-cyan-500 to-blue-500`
- **Success**: `from-green-500 to-emerald-500`

Use these consistently across the application for visual harmony!
