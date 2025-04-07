// src/components/Button.tsx
import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'back';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant }) => {
  let variantStyles;
  if (variant === 'default' || !variant) {
    variantStyles = styles.button;
  } else if (variant === 'back') {
    variantStyles = styles.back;
  }
  return (
    <button 
      onClick={onClick} 
      className={variantStyles}>
      {label}
    </button>
  );
};

export default Button;
