
import React from 'react';
import styles from './ProgressBar.module.css';

// icons from react-icons
import { GrMapLocation } from "react-icons/gr";
import { BiDirections } from "react-icons/bi";
import { GiSettingsKnobs } from "react-icons/gi";
import { TiDocumentText } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  // Create an array of step indices [0, 1, 2, 3, 4]
  const stepIndices = Array.from({ length: totalSteps }, (_, i) => i);

  // no need to wrap them in a functional component like before,
  // as react-icons components already behave like React components.
  const stepIcons = [
    GrMapLocation,   // For Step 1
    BiDirections,    // For Step 2
    GiSettingsKnobs, // For Step 3
    TiDocumentText,  // For Step 4
    FaRegHeart,      // For Step 5
  ];

  return (
    <div className={styles.progressBarContainer}>
      {stepIndices.map((index) => {
        const isActive = index <= currentStep; // True if step is current or completed
        const isCompleted = index < currentStep; // True if step is strictly completed
        const IconComponent = stepIcons[index]; // Get the correct icon component for this step

        return (
          <React.Fragment key={index}>
            <div className={`${styles.step} ${isActive ? styles.stepActive : ''}`}>
              <div className={styles.iconWrapper}>
                {/* Render the imported IconComponent directly */}
                <IconComponent className={styles.icon} />
              </div>
            </div>
            {index < totalSteps - 1 && ( // Render line separator for all but the last step
              <div className={`${styles.line} ${isCompleted ? styles.lineActive : ''}`}></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressBar;