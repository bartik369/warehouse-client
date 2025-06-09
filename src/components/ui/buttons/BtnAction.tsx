import React, { memo } from "react";
import styles from "./Buttons.module.scss";

interface IButtonProps {
  icon?: JSX.Element;
  size: "sm" | "md" | "lg";
  color: string;
  title: string;
  click?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const BtnAction = memo(({ icon, size, title, color, click }: IButtonProps) => {
  return (
    <button
      onClick={click}
      type="button"
      tabIndex={0}
      className={`${styles.button} ${styles[size]} ${styles[color]}`}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{title}</span>
    </button>
  );
});

export default BtnAction;
