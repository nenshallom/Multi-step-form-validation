// src/components/common/InputField.tsx

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './InputField.module.css';

interface InputFieldProps {
  id: string;
  label: React.ReactNode; // React.ReactNode to allow JSX (icons)
  type: string;
  onChange: (value: string | Date | null) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  readOnly?: boolean;
  minDate?: Date | null;
  value: string | number | Date | null;
}

// Define a specific interface for CustomDateInput's props
interface CustomDateInputComponentProps {
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  readOnly = false,
  minDate = null,
}) => {
  const handleDateChange = (date: Date | null) => {
    onChange(date);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputId = `input-${id}`;

  // Use the specific CustomDateInputComponentProps interface instead of 'any'
  const CustomDateInput = React.forwardRef<HTMLInputElement, CustomDateInputComponentProps>(
    ({ value, onClick, onBlur, placeholder }, ref) => (
      <div className={styles.inputWrapper}>
        <input
          id={inputId}
          type="text" // Always text for date picker's custom input
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          value={value || ''}
          onClick={onClick}
          onFocus={(e) => onClick?.(e as unknown as React.MouseEvent<HTMLInputElement>)} // Ensures calendar opens on focus
          onBlur={onBlur}
          readOnly={true}
          placeholder={placeholder || ''}
          ref={ref}
        />
      </div>
    )
  );
  CustomDateInput.displayName = 'CustomDateInput';


  return (
    <div className={styles.inputGroup}>
      <label htmlFor={inputId} className={styles.label}>{label}</label>
      {type === 'date' ? (
        <DatePicker
          selected={value instanceof Date ? value : null}
          onChange={handleDateChange}
          customInput={<CustomDateInput placeholder={placeholder} onBlur={onBlur} />}
          dateFormat="dd/MM/yyyy"
          minDate={minDate || undefined}
          popperPlacement="bottom-start"
          closeOnScroll={true}
          shouldCloseOnSelect={true}
        />
      ) : (
        <div className={styles.inputWrapper}>
          <input
            id={inputId}
            type={type}
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            value={(value as string | number | null) || ''}
            onChange={handleInputChange}
            onBlur={onBlur}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        </div>
      )}
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default InputField;