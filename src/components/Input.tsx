import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    const inputStyles = `
      h-12 px-4 w-full rounded-button border border-gray-300
      text-body text-vexto-dark placeholder:text-gray-400
      focus-vexto transition-smooth min-h-touch
      ${error ? 'border-error focus:ring-error' : 'focus:border-vexto-primary'}
    `;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-vexto-dark mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${inputStyles} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
