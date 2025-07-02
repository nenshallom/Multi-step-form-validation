// src/components/steps/Step2/Step2Form.tsx

import React, { useState, useImperativeHandle } from 'react';
import RadioCard from '../../common/RadioCard'; // Assuming RadioCard exists
import styles from './Step2Form.module.css';

// Simple icons to represent ticket types
const BusinessIcon = '👑';
const EconomyIcon = '👤';

// Type for what this form exposes to the parent (MultiStepForm)
export interface Step2FormHandles {
  validateAndProceed: () => boolean;
}

// Type for the form's data shape (used directly in props)
export interface Step2FormData {
  ticketType: 'economy' | 'business' | '';
}

// Props this form receives from the parent
interface Step2FormProps {
  initialData: Step2FormData; // Use the exported interface directly
  onUpdateFormData: (data: Step2FormData) => void;
}

const Step2Form = React.forwardRef<Step2FormHandles, Step2FormProps>(
  ({ initialData, onUpdateFormData }, ref) => {
    const [formData, setFormData] = useState<Step2FormData>(initialData); // Use formData state
    const [error, setError] = useState('');

    // Handle initialData changes (e.g., when navigating back and forth)
    React.useEffect(() => {
      setFormData(initialData);
    }, [initialData]);

    const handleTicketTypeChange = (value: string) => {
      setFormData(prev => ({ ...prev, ticketType: value as Step2FormData['ticketType'] }));
      setError('');
    };

    const validateForm = () => {
      if (!formData.ticketType) { // Use formData.ticketType
        setError('Please select a ticket type.');
        return false;
      }
      setError('');
      return true;
    };

    useImperativeHandle(ref, () => ({
      validateAndProceed: () => {
        const isValid = validateForm();
        if (isValid) {
          onUpdateFormData(formData); // Inform parent of the selected value
        }
        return isValid;
      },
    }));

    return (
      <div className={styles.step2Container}>
        <h2 className={styles.sectionTitle}>What type of ticket do you want?</h2>
        <div className={styles.radioCardGrid}>
          <RadioCard
            name="ticketType"
            value="business"
            label="Business"
            icon={BusinessIcon}
            checked={formData.ticketType === 'business'} // Use formData.ticketType
            onChange={handleTicketTypeChange}
          />

          <RadioCard
            name="ticketType"
            value="economy"
            label="Economy"
            icon={EconomyIcon}
            checked={formData.ticketType === 'economy'} // Use formData.ticketType
            onChange={handleTicketTypeChange}
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  }
);

// Add displayName for better debugging in React DevTools
Step2Form.displayName = 'Step2Form';

export default Step2Form;