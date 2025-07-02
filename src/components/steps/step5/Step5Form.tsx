
import React, { useState, useImperativeHandle } from 'react';
import RadioCard from '../../common/RadioCard'; 
import styles from './Step5Form.module.css'; 

// to be replace with actual SVG components or image imports later
const HomeIcon = '🏠';
const GlobeIcon = '🌐'; 
const HandIcon = '🤲'; 
const AccessibilityIcon = '♿';


export interface Step5FormHandles {
  validateAndProceed: () => boolean; // A function that validates and returns true if successful
}

// shape of the data for this step
export interface Step5FormData {
  foundationType: 'home' | 'globe' | 'hand' | 'accessibility' | '';
}

interface Step5FormProps {
  initialData: {
    foundationType: Step5FormData['foundationType']; // Initial value for the selected foundation
  };
  onUpdateFormData: (data: Step5FormData) => void;
}


const Step5Form = React.forwardRef<Step5FormHandles, Step5FormProps>(
  ({ initialData, onUpdateFormData }, ref) => {
    // 1. State to manage the selected foundation type for this step
    const [foundationType, setFoundationType] = useState<Step5FormData['foundationType']>(
      initialData.foundationType
    );

    // 2. State to manage validation errors
    const [error, setError] = useState(''); 

    // 3. Handle radio card selection change
    const handleFoundationTypeChange = (value: string) => {
      setFoundationType(value as Step5FormData['foundationType']); // Update the state
      setError(''); // Clear any previous error when a selection is made
    };

    // 4. Validation logic
    const validateForm = () => {
      if (!foundationType) { 
        setError('Please select a foundation to help.');
        return false;
      }
      setError(''); // Clear error if validation passes
      return true;
    };

    // 5. Expose methods to the parent via ref (for MultiStepForm to call)
    useImperativeHandle(ref, () => ({
      validateAndProceed: () => {
        const isValid = validateForm(); // Run internal validation
        if (isValid) {
          // If valid, update parent's form data with the selected foundationType
          onUpdateFormData({ foundationType });
        }
        return isValid; // Tell the parent if validation passed
      },
    }));

    return (
      <div className={styles.step5Container}>
        <h2 className={styles.sectionTitle}>Who do you want to help?</h2>
        <div className={styles.radioCardGrid}>
          {/* Home Foundation RadioCard */}
          <RadioCard
            name="foundationType" 
            value="home" 
            label="Foundation"
            icon={HomeIcon}
            checked={foundationType === 'home'} 
            onChange={handleFoundationTypeChange} 
          />

          {/* Globe Foundation RadioCard */}
          <RadioCard
            name="foundationType"
            value="globe"
            label="Foundation"
            icon={GlobeIcon}
            checked={foundationType === 'globe'}
            onChange={handleFoundationTypeChange}
          />

          {/* Hand Foundation RadioCard */}
          <RadioCard
            name="foundationType"
            value="hand"
            label="Foundation"
            icon={HandIcon}
            checked={foundationType === 'hand'}
            onChange={handleFoundationTypeChange}
          />

          {/* Accessibility Foundation RadioCard */}
          <RadioCard
            name="foundationType"
            value="accessibility"
            label="Foundation"
            icon={AccessibilityIcon}
            checked={foundationType === 'accessibility'}
            onChange={handleFoundationTypeChange}
          />
        </div>

        {/* Display error message if present */}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  }
);

export default Step5Form;