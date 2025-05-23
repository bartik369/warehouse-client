import style from "./Toggle.module.scss";

interface IToggleProps {
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
}: IToggleProps) => {
  return (
    <div
      className={style.switch}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setChecked();
      }}
    >
      <div className={style.label}>{label}</div>
      <input
        onClick={setChecked}
        type="checkbox"
        id="checkbox"
        checked={checked}
      />
      <label className={style.slider} htmlFor="checkbox">
        <div className={style.labels}>
          <span className={style.yes}>{rightPosition}</span>
          <span className={style.no}>{leftPosition}</span>
        </div>
      </label>
    </div>
  );
};

export default Toggle;
