// src/components/Button.tsx
import React from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  label?: string;
  onClick: () => void;
  variant?: 'default' | 'back' | 'hamburger' | 'save';
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant, children }) => {
  let variantStyles;
  if (variant === 'default' || !variant) {
    variantStyles = styles.button;
  } else if (variant === 'back') {
    variantStyles = styles.back;
  } else if (variant === 'hamburger') {
    variantStyles = styles.hamburger;
  } else if (variant === 'save') {
    variantStyles = styles.save;
  }
  console.log('Button received onClick:', onClick);

  return (
    <button 
      onClick={onClick} 
      className={variantStyles}>
      {label}
    {children}</button>
  );
};

export default Button;
