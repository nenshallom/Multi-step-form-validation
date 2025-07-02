// src/components/steps/Step2/Step2Form.tsx

import React, { useState, useImperativeHandle } from 'react';
import RadioCard from '../../common/RadioCard';
import styles from './Step2Form.module.css';

// Simple icons to represent ticket types
const BusinessIcon = '👑'; 
const EconomyIcon = '👤'; 

// Type for what this form exposes to the parent (MultiStepForm)
export interface Step2FormHandles {
  validateAndProceed: () => boolean; 
}

// Props this form receives from the parent
interface Step2FormProps {
  initialData: {
    ticketType: 'economy' | 'business' | ''; 
  };
  onUpdateFormData: (data: Step2FormData) => void;
}

// Type for the form's data shape
export interface Step2FormData {
  ticketType: 'economy' | 'business' | '';
}

const Step2Form = React.forwardRef<Step2FormHandles, Step2FormProps>(
  ({ initialData, onUpdateFormData }, ref) => {
    const [ticketType, setTicketType] = useState<Step2FormData['ticketType']>(initialData.ticketType);
    const [error, setError] = useState(''); 

    // Called when user selects a ticket type
    const handleTicketTypeChange = (value: string) => {
      setTicketType(value as Step2FormData['ticketType']); 
      setError(''); // Clear error if any
    };

    // Checks if user made a selection, shows error if not
    const validateForm = () => {
      if (!ticketType) { 
        setError('Please select a ticket type.');
        return false;
      }
      setError('');
      return true;
    };

    // Exposes the validateAndProceed method to parent via ref
    useImperativeHandle(ref, () => ({
      validateAndProceed: () => {
        const isValid = validateForm();
        if (isValid) {
          onUpdateFormData({ ticketType }); // Inform parent of the selected value
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
            checked={ticketType === 'business'}
            onChange={handleTicketTypeChange}
          />

          <RadioCard
            name="ticketType"
            value="economy"
            label="Economy"
            icon={EconomyIcon}
            checked={ticketType === 'economy'}
            onChange={handleTicketTypeChange}
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  }
);

export default Step2Form; 
