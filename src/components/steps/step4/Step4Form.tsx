
import React, { useImperativeHandle } from 'react';
import styles from './Step4Form.module.css';

// Define the interface for the methods exposed by this component via ref
export interface Step4FormHandles {
  validateAndProceed: () => boolean; // A function that validates and returns true if successful
}

export interface Step4FormData {
  // This step is purely informational and does not collect new data.
}

interface Step4FormProps {
  // No specific props needed as it's just displaying static content
}


const Step4Form = React.forwardRef<Step4FormHandles, Step4FormProps>(
  (props, ref) => { 
    useImperativeHandle(ref, () => ({
      validateAndProceed: () => {
        // This step is purely informational, so it's always valid
        return true;
      },
    }));

    return (
      <div className={styles.step4Container}>
        <h2 className={styles.sectionTitle}>Miles Responsibility</h2>
        <div className={styles.contentWrapper}>
          <div className={styles.imageSection}>
            <img
              src="/Miles-img.svg" 
              alt="May the miles be with you. Vintage airplane"
              className={styles.milesImage}
            />
            <p className={styles.imageCaption}>May the miles be with you.</p>
          </div>
          <div className={styles.textSection}>
            <p>
              Throughout the history, globalization and technological developments have always had a
              great effect on transportation. Today, everybody transports above the clouds and
              under the seas in more different ways and durations compared to past. While airplane
              was an extreme transportation vehicle for most of us only a quarter century ago, many
              people use it in their daily routines in today. Airlines organize so many campaigns
              like elastic schedules, promotion gifts and discounts to maintain this increase in
              number of people who fly regularly and often. Bonus miles is only one of the person
              in accordance with the length and frequency of their flights. However most of these
              miles go waste without growing enough to get a small gift like teddy bear let alone a
              free bonus ticket.
            </p>
          </div>
        </div>
      </div>
    );
  }
);

export default Step4Form;