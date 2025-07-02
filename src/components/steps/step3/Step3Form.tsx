
import React, { useEffect, useState } from 'react';
import styles from './Step3Form.module.css';
import { Step1FormData } from '../step1/Step1Form';
import { Step2FormData } from '../step2/Step2Form';

interface Step3FormProps {
  formData: {
    step1: Step1FormData;
    step2: Step2FormData;
  };
}

interface DisplayData {
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  ticketType: string;
}

const Step3Form: React.FC<Step3FormProps> = ({ formData }) => {
  const [displayData, setDisplayData] = useState<DisplayData | null>(null);

  const parseDate = (dateValue: string | Date | null): Date | null => {
    if (dateValue instanceof Date) {
      return dateValue;
    }
    if (typeof dateValue === 'string') {
      const parsedDate = new Date(dateValue);
      return isNaN(parsedDate.getTime()) ? null : parsedDate;
    }
    return null;
  };

  useEffect(() => {
    // --- ADDED SAFE GUARD HERE ---
    if (!formData || !formData.step1) {
      console.warn("Step3Form received incomplete formData.step1. Cannot display flight details.");
      setDisplayData(null); // Or set a default "No data" state
      return; // Exit useEffect early
    }
    // --- END SAFE GUARD ---

    const departDateObj = parseDate(formData.step1.departDate);
    const formattedDepartDate = departDateObj
      ? departDateObj.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : 'N/A';

    const returnDateObj = parseDate(formData.step1.returnDate);
    const formattedReturnDate = returnDateObj
      ? returnDateObj.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
      : 'N/A (One Way)';

    // Ensure formData.step2 is also checked if it's potentially undefined
    const ticketType = formData.step2?.ticketType || 'N/A';

    setDisplayData({
      from: formData.step1.from,
      to: formData.step1.to,
      departDate: formattedDepartDate,
      returnDate: formattedReturnDate,
      ticketType: ticketType,
    });
  }, [formData]); // Dependency array: re-run when formData changes

  if (!displayData) {
    return <div className={styles.step3Container}>Loading or no flight details available...</div>;
  }

  return (
    <div className={styles.step3Container}>
      <h2 className={styles.sectionTitle}>Ticket Information Summary</h2>
      <div className={styles.summaryTableContainer}>
        <table className={styles.summaryTable}>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Type</th>
              <th>Departure Date</th>
              <th>Return Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{displayData.from}</td>
              <td>{displayData.to}</td>
              <td>{displayData.ticketType}</td>
              <td>{displayData.departDate}</td>
              <td>{displayData.returnDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

Step3Form.displayName = 'Step3Form';
export default Step3Form;