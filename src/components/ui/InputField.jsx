import React, { forwardRef } from "react";

const InputField = forwardRef(({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  leftIcon = null,
  rightIcon = null,
  onLeftIconClick,
  onRightIconClick,
  error = false,
  required = false,
  autoComplete,
  className = "",
  inputClassName = "",
  ...rest
}, ref) => {
  const hasLeft = Boolean(leftIcon);
  const hasRight = Boolean(rightIcon);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {hasLeft && (
          <button
            type="button"
            onClick={onLeftIconClick}
            className="absolute inset-y-0 left-3 my-auto text-gray-500 hover:text-gray-700"
            tabIndex={-1}
            aria-hidden="true"
          >
            {leftIcon}
          </button>
        )}
        <input
          id={id || name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          ref={ref}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 ${
            error ? "border-red-500" : "border-gray-300"
          } ${hasLeft ? "pl-10" : ""} ${hasRight ? "pr-10" : ""} ${inputClassName}`}
          {...rest}
        />
        {hasRight && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute inset-y-0 right-3 my-auto text-gray-500 hover:text-gray-700"
            aria-label="toggle"
            tabIndex={-1}
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
});

InputField.displayName = "InputField";

export default InputField;
