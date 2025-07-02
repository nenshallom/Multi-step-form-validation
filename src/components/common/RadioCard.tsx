// src/components/common/RadioCard.tsx

import React from 'react';
import styles from './RadioCard.module.css';

// Define the props for our RadioCard component
interface RadioCardProps {
  name: string; // The name attribute for the radio button group (e.g., "ticketType")
  value: string; // The unique value for this specific radio option (e.g., "economy", "business")
  label: string; // The text label displayed on the card (e.g., "Economy", "Business")
  icon: React.ReactNode; // The icon displayed on the card
  checked: boolean; // Whether this radio card is currently selected
  onChange: (value: string) => void; // Callback function when this card is selected
}

const RadioCard: React.FC<RadioCardProps> = ({
  name,
  value,
  label,
  icon,
  checked,
  onChange,
}) => {
  // Handle the click event on the card
  const handleClick = () => {
    // Call the onChange prop with this card's value
    // This mimics how a native radio button would update its parent's state
    onChange(value);
  };

  return (
    // The main container for the radio card
    <div
      className={`${styles.radioCard} ${checked ? styles.radioCardActive : ''}`}
      onClick={handleClick} // Make the whole card clickable
      role="radio" // ARIA role to indicate it's a radio button
      aria-checked={checked} // ARIA state for accessibility
      tabIndex={0} // Make it focusable for keyboard navigation
      onKeyDown={(e) => { // Handle keyboard navigation (Space/Enter to select)
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault(); // Prevent default scroll for spacebar
          handleClick();
        }
      }}
    >
      {/* Hidden native radio input for accessibility and form submission */}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)} // Still trigger onChange if native input is interacted with
        className={styles.hiddenRadio} // Hide the default radio button visually
        tabIndex={-1} // Remove from tab order, as the div handles focus
      />

      {/* The visual icon for the card */}
      <div className={styles.radioCardIcon}>
        {icon}
      </div>

      {/* The text label for the card */}
      <div className={styles.radioCardLabel}>
        {label}
      </div>
    </div>
  );
};

export default RadioCard;