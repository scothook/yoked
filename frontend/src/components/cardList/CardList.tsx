import React from "react";
import styles from "./CardList.module.css";

interface CardListProps {
    cards: React.ReactNode;
}

const CardList: React.FC<CardListProps> = ({ cards }) => {
    return <div className={styles.cardList}>
        {cards}</div>;
};

export default CardList;