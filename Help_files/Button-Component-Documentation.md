# Button Component Documentation

## Overview

The Button Component is a flexible, reusable vanilla JavaScript utility that generates HTML button markup. It supports both `<input>` and `<button>` elements with various styling options and attributes. This component follows a functional approach, making it easy to integrate into any part of the Social-Cuisiener-2025 application.

## File Location

```
assets/js/components/buttons.js
```

## Component Structure

The button component is implemented as a pure JavaScript function that takes an object of properties and returns an HTML string. This approach allows for maximum flexibility while maintaining a clean API.

```javascript
export const button = ({
  name,
  id,
  value,
  class: className,
  type = "button",
  btnType = "primary",
  element = "input",
  disabled = false,
  data = {}
}) => {
  // Implementation...
};
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | string | `""` | The name attribute for the button |
| `id` | string | `""` | The id attribute for the button |
| `value` | string | `""` | The text/value of the button |
| `class` | string | `""` | Additional CSS classes to apply |
| `type` | string | `"button"` | Button type (button, submit, reset) |
| `btnType` | string | `"primary"` | Visual style (primary, secondary, third) |
| `element` | string | `"input"` | HTML element to use (input or button) |
| `disabled` | boolean | `false` | Whether the button is disabled |
| `data` | object | `{}` | Data attributes as key-value pairs |

## Button Types

The component supports three visual styles through the `btnType` parameter:

1. **primary** - Uses the `btn-puprle` class (default)
2. **secondary** - Uses the `btn-orange` class
3. **third** - Uses the `btn-teal` class

## Implementation Details

### Button Type Selection

The component uses a switch statement to determine the appropriate CSS class based on the `btnType` parameter:

```javascript
const getBtnTypeClass = () => {
  switch (btnType) {
    case "primary":
      return "btn-puprle";
    case "secondary":
      return "btn-orange";
    case "third":
      return "btn-teal";
    default:
      return "btn-puprle";
  }
};
```

### Data Attributes

The component supports dynamic data attributes through the `data` parameter. These are converted to HTML attributes using:

```javascript
const dataAttributes = Object.entries(data)
  .map(([key, value]) => `data-${key}="${value}"`)
  .join(" ");
```

### Element Type Selection

The component can render either an `<input>` or a `<button>` element based on the `element` parameter:

```javascript
if (element === "button") {
  // Return button element
} else {
  // Return input element
}
```

## Recent Improvements

The button component has undergone several improvements to enhance its functionality and maintainability:

### 1. Parameter Destructuring

**Before:**
```javascript
export const button = ({
  name: name,
  id: id,
  value: value,
  class: className,
  type: type,
  onClick: onClick,
  btnType: btnType,
}) => {
  // Implementation...
};
```

**After:**
```javascript
export const button = ({
  name,
  id,
  value,
  class: className,
  type = "button",
  btnType = "primary",
  element = "input",
  disabled = false,
  data = {}
}) => {
  // Implementation...
};
```

This change simplifies the code and makes it more readable by using ES6 destructuring syntax.

### 2. Default Parameter Values

Default values have been added for common parameters, reducing the need to specify every property when using the component:

- `type = "button"`
- `btnType = "primary"`
- `element = "input"`
- `disabled = false`
- `data = {}`

### 3. Switch Statement for Button Types

**Before:**
```javascript
const renderBtnType = () => {
  if (btnType === "primary") {
    return "btn-puprle";
  } else if (btnType === "secondary") {
    return "btn-orange";
  } else if (btnType === "third") {
    return "btn-teal";
  } else {
    return "btn-puprle";
  }
};
```

**After:**
```javascript
const getBtnTypeClass = () => {
  switch (btnType) {
    case "primary":
      return "btn-puprle";
    case "secondary":
      return "btn-orange";
    case "third":
      return "btn-teal";
    default:
      return "btn-puprle";
  }
};
```

This change improves readability and maintainability by using a switch statement, which is more appropriate for this type of selection logic.

### 4. Support for Button Elements

The component now supports both `<input>` and `<button>` elements, providing more flexibility in how buttons are rendered:

```javascript
if (element === "button") {
  return /*html*/`
    <button
      type="${type || 'button'}"
      class="btn ${getBtnTypeClass()} ${className || ""}"
      name="${name || ""}"
      id="${id || ""}"
      ${disabled ? 'disabled' : ''}
      ${dataAttributes}
    >
      ${value || ""}
    </button>
  `;
}
```

### 5. Disabled State Support

The component now supports the disabled state through the `disabled` parameter:

```javascript
${disabled ? 'disabled' : ''}
```

### 6. Data Attributes Support

The component now supports data attributes through the `data` parameter:

```javascript
const dataAttributes = Object.entries(data)
  .map(([key, value]) => `data-${key}="${value}"`)
  .join(" ");
```

### 7. JSDoc Documentation

Comprehensive JSDoc documentation has been added to improve code understanding:

```javascript
/**
 * Button component for generating HTML button elements
 * @param {Object} props - Button properties
 * @param {string} [props.name] - Name attribute
 * @param {string} [props.id] - ID attribute
 * ...
 */
```

## Usage Examples

### Basic Button

```javascript
button({
  name: "post_id",
  id: "commentBtn",
  value: "Send",
  btnType: "primary"
})
```

Output:
```html
<input
  type="button"
  class="btn btn-puprle "
  name="post_id"
  id="commentBtn"
  value="Send"
>
</input>
```

### Button Element with Secondary Style

```javascript
button({
  value: "Cancel",
  btnType: "secondary",
  element: "button"
})
```

Output:
```html
<button
  type="button"
  class="btn btn-orange "
  name=""
  id=""
>
  Cancel
</button>
```

### Disabled Button with Data Attributes

```javascript
button({
  value: "Processing...",
  disabled: true,
  data: {
    action: "submit",
    target: "form1"
  }
})
```

Output:
```html
<input
  type="button"
  class="btn btn-puprle "
  name=""
  id=""
  value="Processing..."
  disabled
  data-action="submit" data-target="form1"
>
</input>
```

### Submit Button

```javascript
button({
  type: "submit",
  value: "Submit Form",
  btnType: "third",
  className: "form-submit"
})
```

Output:
```html
<input
  type="submit"
  class="btn btn-teal form-submit"
  name=""
  id=""
  value="Submit Form"
>
</input>
```

## Integration with Other Components

The button component can be easily integrated with other components in your application. For example, in the PostDetailPage.js file:

```javascript
import { button } from "../components/buttons";

// Later in your code
${button({
  name: `${data.id}`,
  id: "commentBtn",
  value: "Send",
  btnType: "primary",
})}
```

## Best Practices

1. **Use Semantic Button Types**: Use `type="submit"` for form submission buttons and `type="button"` for action buttons.

2. **Provide Meaningful Values**: Always provide a descriptive `value` for better accessibility.

3. **Use Data Attributes for JavaScript Hooks**: Instead of relying on classes or IDs for JavaScript functionality, use data attributes:

```javascript
button({
  value: "Like",
  data: {
    action: "like",
    postId: "123"
  }
})
```

4. **Disable Buttons During Processing**: Use the `disabled` parameter to prevent multiple submissions:

```javascript
button({
  value: "Submitting...",
  disabled: true
})
```

## Future Enhancements

Potential future enhancements for the button component could include:

1. **Event Handling**: Direct integration with event handlers
2. **Icon Support**: Adding support for icons within buttons
3. **Animation States**: Support for loading/processing animations
4. **Accessibility Improvements**: ARIA attributes and keyboard navigation support

## Conclusion

The button component provides a flexible, reusable way to generate button markup throughout the Social-Cuisiener-2025 application. Its functional approach and comprehensive parameter support make it adaptable to various use cases while maintaining consistency in the UI.
