//import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';
import MenuIcon from '@mui/icons-material/Menu';
import SaveIcon from '@mui/icons-material/Save';
import Button from "../button/Button.tsx";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
    title: string | number;
    cornerTitle?: string | number;
    variant?: "cornerTitle" | "hamburger" | "save";
    cornerTitleOnClick: () => void;
}

export default function PageHeader({ title, cornerTitle, variant, cornerTitleOnClick }: PageHeaderProps) {
    const navigate = useNavigate();
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
                { variant === "save" && (
                    <Button onClick={cornerTitleOnClick} variant="save"><SaveIcon/></Button>
                )}
            </div>
        </div>
    );
}