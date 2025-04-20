//import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import MenuIcon from '@mui/icons-material/Menu';  
import Button from "../button/Button.tsx";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
    title: string | number;
    cornerTitle?: string | number;
    variant?: "cornerTitle" | "hamburger";
    cornerTitleOnClick: () => void;
}

export default function PageHeader({ title, cornerTitle, variant, cornerTitleOnClick }: PageHeaderProps) {
    const navigate = useNavigate();
    console.log('PageHeader received cornerTitleOnClick:', cornerTitleOnClick);
    return (
        <div className={styles.header}>
            <div className={styles.headerTitle}>
                <Button onClick={() => navigate(-1)} variant="back"><ArrowBackIcon/></Button>
                <h2>{title}</h2>
                { variant === "hamburger" ? (
                    <Button onClick={cornerTitleOnClick} variant="hamburger"><MenuIcon/></Button>
                ) : (
                    <h2 className={styles.cornerTitle}>{cornerTitle}</h2>
                )}
            </div>
        </div>
    );
}