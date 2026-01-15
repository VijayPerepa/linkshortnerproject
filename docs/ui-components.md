# UI Components - shadcn/ui

This document outlines the UI component strategy for the Link Shortener project.

## Core Principle

**All UI elements in this application use shadcn/ui components.**

## Rules

1. **Never create custom UI components** - Always use shadcn/ui components
2. **Install before use** - Add components via the shadcn CLI before importing
3. **Compose, don't customize** - Build complex UIs by composing shadcn components
4. **Consistent styling** - Use Tailwind utilities for layout and spacing only

## Installing Components

```bash
npx shadcn@latest add <component-name>
```

Examples:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
```

## Usage Pattern

```tsx
// ✅ Correct - Using shadcn component
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}

// ❌ Incorrect - Creating custom UI component
export function CustomButton({ children }) {
  return <button className="...">{children}</button>
}
```

## Common Components

### Forms
- `button` - Buttons with variants (default, destructive, outline, ghost, link)
- `input` - Text inputs
- `textarea` - Multi-line text inputs
- `select` - Dropdown selects
- `checkbox` - Checkboxes
- `label` - Form labels
- `form` - Form wrapper with validation

### Layout
- `card` - Container cards with header, content, footer
- `separator` - Dividers
- `sheet` - Side panels
- `dialog` - Modals
- `tabs` - Tab navigation

### Feedback
- `alert` - Alert messages
- `toast` - Notifications
- `badge` - Status badges
- `skeleton` - Loading skeletons

### Data Display
- `table` - Data tables
- `avatar` - User avatars
- `tooltip` - Tooltips

## Customization

Customize only through:
- **Variants** - Use built-in component variants
- **Composition** - Combine multiple components
- **Tailwind classes** - Add spacing, layout utilities via `className`

```tsx
// ✅ Correct customization
<Button variant="outline" className="mt-4 w-full">
  Submit
</Button>

// ❌ Avoid creating wrapper components
function MyButton({ children }) {
  return <Button variant="outline" className="mt-4">{children}</Button>
}
```

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Component List](https://ui.shadcn.com/docs/components)
- Components are located in `/components/ui/`

---

**Last Updated**: January 2026  
**Version**: 1.0.0
