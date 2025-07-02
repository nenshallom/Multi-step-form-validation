
import React, { useState, useImperativeHandle, useEffect } from 'react';
import InputField from '../../common/InputField';
import styles from './Step1Form.module.css';
import { FaPlaneDeparture, FaCalendarAlt } from "react-icons/fa";

// Interface for methods exposed to parent via ref
export interface Step1FormHandles {
  validateAndProceed: () => boolean;
}

// Form data structure
export interface Step1FormData {
  from: string;
  to: string;
  departDate: Date | null;
  returnDate: Date | null;
}

interface Step1FormProps {
  initialData: Step1FormData;
  onUpdateFormData: (data: Partial<Step1FormData>) => void;
}

const Step1Form = React.forwardRef<Step1FormHandles, Step1FormProps>(
  ({ initialData, onUpdateFormData }, ref) => {
    const [formData, setFormData] = useState<Step1FormData>(initialData);
    const [errors, setErrors] = useState<Partial<Record<keyof Step1FormData, string | undefined>>>({});

    // Keep formData in sync if parent updates initialData
    useEffect(() => {
      setFormData(initialData);
    }, [initialData]);

    const handleChange = (name: keyof Step1FormData, value: string | Date | null) => {
      const newFormData = { ...formData, [name]: value };
      setFormData(newFormData);
      onUpdateFormData({ [name]: value });

      // Clear error message for field being updated
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    };

    const validateForm = () => {
      const newErrors: Partial<Record<keyof Step1FormData, string | undefined>> = {};
      let isValid = true;

      // --- Validation Rules ---
      if (!formData.from?.trim()) {
        newErrors.from = 'Departure city is required.';
        isValid = false;
      }
      if (!formData.to?.trim()) {
        newErrors.to = 'Arrival city is required.';
        isValid = false;
      }
      if (!formData.departDate || !(formData.departDate instanceof Date) || isNaN(formData.departDate.getTime())) {
        newErrors.departDate = 'Valid departure date is required.';
        isValid = false;
      }
      if (formData.returnDate) {
        if (!(formData.returnDate instanceof Date) || isNaN(formData.returnDate.getTime())) {
          newErrors.returnDate = 'Invalid return date.';
          isValid = false;
        } else if (formData.departDate instanceof Date && formData.returnDate.getTime() < formData.departDate.getTime()) {
          newErrors.returnDate = 'Return date cannot be before departure date.';
          isValid = false;
        }
      }

      setErrors(newErrors);
      return isValid;
    };

    // Expose validateAndProceed to parent via ref
    useImperativeHandle(ref, () => ({
      validateAndProceed: () => validateForm(),
    }));

    return (
      <div className={styles.step1Container}>
        <h2 className={styles.sectionTitle}>Search Flights</h2>

        <div className={styles.formGrid}>
          <InputField
            id="from"
            label={<><FaPlaneDeparture className={styles.labelIcon} /> From</>}
            type="text"
            placeholder="Country, city or airport 🔍"
            value={formData.from}
            onChange={(val) => handleChange('from', val as string)}
            onBlur={validateForm}
            error={errors.from}
          />

          <InputField
            id="to"
            label={<><FaPlaneDeparture className={styles.labelIcon} /> To</>}
            type="text"
            placeholder="Country, city or airport 🔍"
            value={formData.to}
            onChange={(val) => handleChange('to', val as string)}
            onBlur={validateForm}
            error={errors.to}
          />

          <InputField
            id="departDate"
            label={<><FaCalendarAlt className={styles.labelIcon} /> Departure Date</>}
            type="date"
            placeholder="Select date 🕛"
            value={formData.departDate}
            onChange={(val) => handleChange('departDate', val as Date | null)}
            onBlur={validateForm}
            error={errors.departDate}
          />

          <InputField
            id="returnDate"
            label={<><FaCalendarAlt className={styles.labelIcon} /> Return Date (Optional)</>}
            type="date"
            placeholder="Select date 🕛"
            value={formData.returnDate}
            onChange={(val) => handleChange('returnDate', val as Date | null)}
            onBlur={validateForm}
            error={errors.returnDate}
            minDate={formData.departDate}
          />
        </div>
      </div>
    );
  }
);

Step1Form.displayName = 'Step1Form';
export default Step1Form;
