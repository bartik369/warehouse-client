import styles from "./Toggle.module.scss";

interface ToggleProps {
  checked: boolean;
  label: string;
  leftPosition: string;
  rightPosition: string;
  setChecked: () => void;
}
const Toggle = ({
  checked,
  leftPosition,
  rightPosition,
  label,
  setChecked,
}: ToggleProps) => {
  return (
    <div
      className={styles.switch}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setChecked();
      }}
    >
      <div className={styles.label}>{label}</div>
      <input
        onChange={setChecked}
        type="checkbox"
        id="checkbox"
        checked={checked}
      />
      <label className={styles.slider} htmlFor="checkbox">
        <div className={styles.labels}>
          <span className={styles.yes}>{rightPosition}</span>
          <span className={styles.no}>{leftPosition}</span>
        </div>
      </label>
    </div>
  );
};

export default Toggle;
