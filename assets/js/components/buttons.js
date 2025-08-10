/**
 * Button component for generating HTML button elements
 * @param {Object} props - Button properties
 * @param {string} [props.name] - Name attribute
 * @param {string} [props.id] - ID attribute
 * @param {string} [props.value] - Button text/value
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.type="button"] - Button type (button, submit, reset)
 * @param {string} [props.btnType="primary"] - Visual style (primary, secondary, third)
 * @param {string} [props.element="input"] - HTML element to use (input or button)
 * @param {boolean} [props.disabled] - Whether button is disabled
 * @param {Object} [props.data] - Data attributes as key-value pairs
 * @returns {string} HTML button markup
 */
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
  // Determine button style class based on type
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

  // Build data attributes string
  const dataAttributes = Object.entries(data)
    .map(([key, value]) => `data-${key}="${value}"`)
    .join(" ");

  // Generate button based on element type
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

  // Default to input element
  return /*html*/`
    <input
      type="${type || 'button'}"
      class="btn ${getBtnTypeClass()} ${className || ""}"
      name="${name || ""}"
      id="${id || ""}"
      value="${value || ""}"
      ${disabled ? 'disabled' : ''}
      ${dataAttributes}
    >
    </input>
  `;
};
