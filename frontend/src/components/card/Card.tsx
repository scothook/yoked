import React from "react";
import styles from "./Card.module.css";

interface CardProps {
    children: React.ReactNode;
    className?: string; // optional className for additional styling
    onClick?: () => void; 
}

const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
    return <div className={`${styles.card} ${className}`}
                onClick={onClick}
    >{children}</div>;
};

export default Card;