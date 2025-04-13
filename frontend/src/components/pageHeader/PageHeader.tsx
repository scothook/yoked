//import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBackIos';  
import Button from "../button/Button.tsx";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
    title: string | number;
    cornerTitle: string | number;
}

export default function PageHeader({ title, cornerTitle }: PageHeaderProps) {
    const navigate = useNavigate();
    return (
        <div className={styles.header}>
            <div className={styles.headerTitle}>
                <Button onClick={() => navigate(-1)} variant="back"><ArrowBackIcon/></Button>
                <h2>{title}</h2>
                <h2 className={styles.cornerTitle}>{cornerTitle}</h2>
            </div>
        </div>
    );
}