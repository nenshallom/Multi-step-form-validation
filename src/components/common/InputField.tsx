
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
  placeholder?: string; // This will now include the right-side icon char
  readOnly?: boolean;
  minDate?: Date | null;
  value: string | number | Date | null;
}

interface CustomDateInputProps {
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
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

  const CustomDateInput = React.forwardRef<HTMLInputElement, any>(
    ({ value, onClick, onBlur, placeholder }, ref) => (
      <div className={styles.inputWrapper}> {/* Use inputWrapper from updated CSS */}
        <input
          id={inputId}
          type="text" // Always text for date picker's custom input
          className={`${styles.input} ${error ? styles.inputError : ''}`}
          value={value || ''}
          onClick={onClick}
          onFocus={onClick} // Ensures calendar opens on focus
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