// src/components/Layout.tsx
import React from "react";
import styles from "./Layout.module.css";

interface LayoutProps {
    children: React.ReactNode;
  }
  
  const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <div className={styles.container}>{children}</div>;
  };
  
  export default Layout;