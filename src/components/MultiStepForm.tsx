'use client';

import React, { useState, useRef } from 'react';
import styles from './MultiStepForm.module.css';

import ProgressBar from './ProgressBar';
// --- Import StepForm's and its specific types ---
import Step1Form, { Step1FormHandles, Step1FormData } from './steps/step1/Step1Form';
import Step2Form, { Step2FormHandles, Step2FormData } from './steps/step2/Step2Form';
import Step3Form from './steps/step3/Step3Form';
import Step4Form, { Step4FormData } from './steps/step4/Step4Form';
import Step5Form, { Step5FormHandles, Step5FormData } from './steps/step5/Step5Form';

// --- Define the shape for Step 5 data ---
interface FormData {
  step1: Step1FormData;
  step2: Step2FormData;
  step4: Step4FormData;
  step5: Step5FormData;
}

const TOTAL_STEPS = 5;

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    step1: { from: '', to: '', departDate: null, returnDate: null },
    step2: { ticketType: '' },
    step4: {},
    step5: { foundationType: '' },
  });

  const step1Ref = useRef<Step1FormHandles>(null);
  const step2Ref = useRef<Step2FormHandles>(null);
  const step5Ref = useRef<Step5FormHandles>(null);

  const handleUpdateFormData = (stepName: keyof FormData, data: Partial<FormData[keyof FormData]>) => {
    setFormData((prev) => ({
      ...prev,
      [stepName]: { ...prev[stepName], ...data },
    }));
  };

  const handleNext = async () => {
    let isValid = true;
    if (currentStep === 1) isValid = step1Ref.current?.validateAndProceed() ?? false;
    if (currentStep === 2) isValid = step2Ref.current?.validateAndProceed() ?? false;
    // Add validation for other steps here if they have it

    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    let isStep5Valid = true;
    if (step5Ref.current) {
      isStep5Valid = step5Ref.current.validateAndProceed();
    }

    if (isStep5Valid) {
      console.log('Form Submitted!', formData);
      alert('Thank you for your submission!');
    }
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Form
            ref={step1Ref}
            initialData={formData.step1}
            onUpdateFormData={(data) => handleUpdateFormData('step1', data)}
          />
        );
      case 2:
        return (
          <Step2Form
            ref={step2Ref}
            initialData={formData.step2}
            onUpdateFormData={(data) => handleUpdateFormData('step2', data)}
          />
        );
      case 3:
        return <Step3Form formData={formData} />;
      case 4:
        return <Step4Form />;
      case 5:
        return (
          <Step5Form
            ref={step5Ref}
            initialData={formData.step5}
            onUpdateFormData={(data) => handleUpdateFormData('step5', data)}
          />
        );
      default:
        return <div className={styles.loadingMessage}>Invalid step.</div>;
    }
  };

  return (
    <div className={styles.multiStepFormContainer}>
      <div className="header-section">
        <h1>Search Flights, Cheapest Flights</h1>
        <p>All the plane tickets you are looking for together!</p>
      </div>
      <ProgressBar currentStep={currentStep - 1} totalSteps={TOTAL_STEPS} />
      <div className={styles.stepIndicator}>
        Step {currentStep} of {TOTAL_STEPS}
      </div>
      <div className={styles.stepContent}>{renderStepComponent()}</div>
      <div className={styles.navigationButtons}>
        {currentStep > 1 && (
          <button className={styles.backButton} onClick={handleBack}>
            Back
          </button>
        )}
        {currentStep < TOTAL_STEPS && (
          <button className={styles.nextButton} onClick={handleNext}>
            Next
          </button>
        )}
        {currentStep === TOTAL_STEPS && (
          <button className={styles.submitButton} onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
