
import React, { useImperativeHandle } from 'react';
import styles from './Step4Form.module.css';
import Image from 'next/image'; 

// Define the interface for the methods exposed by this component via ref
export interface Step4FormHandles {
  validateAndProceed: () => boolean;
}

// Define Step4FormData as an empty object type more explicitly
export type Step4FormData = Record<string, never>; // Represents an object with no properties

// Define Step4FormProps as an empty object type more explicitly
type Step4FormProps = Record<string, never>; 


const Step4Form = React.forwardRef<Step4FormHandles, Step4FormProps>(
  (props, ref) => {
    useImperativeHandle(ref, () => ({
      validateAndProceed: () => {
        return true;
      },
    }));

    return (
      <div className={styles.step4Container}>
        <h2 className={styles.sectionTitle}>Miles Responsibility</h2>
        <div className={styles.contentWrapper}>
          <div className={styles.imageSection}>
            <Image
              src="/Miles-img.svg"
              alt="May the miles be with you. Vintage airplane"
              className={styles.milesImage}
              width={300} 
              height={200} 
              priority 
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

// Add displayName for better debugging
Step4Form.displayName = 'Step4Form';

export default Step4Form;