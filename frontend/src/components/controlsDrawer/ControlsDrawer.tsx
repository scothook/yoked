import styles from "./ControlsDrawer.module.css";

export default function ControlsDrawer() {
  //const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.controlsDrawer}>
      <div className={styles.controlsDrawerHeader}>
        <h2>Controls</h2>
      </div>
      <div className={styles.controlsDrawerContent}>
        <p>Content goes here...</p>
      </div>
    </div>
  );
  
}