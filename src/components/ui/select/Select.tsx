import { FC, memo, useState } from "react";
import { useOutsideClick } from "../../../hooks/data/useOutsideClick";
import { IEntity, IValidationErrors } from "../../../types/devices";
import { selectFromList, noExistSelect } from "../../../utils/constants/device";
import style from "./Select.module.scss";

interface ISelectProps {
  items: IEntity[];
  label: string;
  name?: string;
  value: string;
  errors: IValidationErrors;
  setValue: (value: IEntity) => void;
}

const Select: FC<ISelectProps> = memo(
  ({ items, name, label, value, errors, setValue }) => {
    const { isOpen, setIsOpen, modalRef } = useOutsideClick();
    const errorMessage = errors[name as keyof IValidationErrors];
    const handleSelect = (option: IEntity) => {
      setIsOpen(false);
      setValue(option);
    };
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    console.log(errors)

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        setFocusedIndex((prev) =>
          prev === null || prev >= items.length - 1 ? 0 : prev + 1
        );
      } else if (e.key === "ArrowUp") {
        setFocusedIndex((prev) =>
          prev === null || prev <= 0 ? items.length - 1 : prev - 1
        );
      } else if (e.key === "Enter" && focusedIndex !== null) {
        handleSelect(items[focusedIndex]);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    return (
      <div className={style.wrapper} onKeyDown={handleKeyDown} ref={modalRef}>
        {errorMessage && 
          <div className={style.error}>
            {errorMessage}
          </div>
        }
        {label && 
          <span className={style.label}>
            {label}
          </span>
        }
        <button
          type={'button'}
          className={style.container}
          onClick={() => setIsOpen(!isOpen)}
        >
          {value ? value : selectFromList}
          <span className={style.arrow} />
        </button>

        {isOpen && (
          <div className={style.dropdown}>
            {items.length > 0 ? (
              items.map((option, index) => (
                <div
                  key={option.id}
                  className={`${style.option} ${
                    focusedIndex === index ? style.focused : ""
                  }`}
                  onClick={() => handleSelect(option)}
                  role="button"
                  tabIndex={0}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                >
                  {option.name}
                </div>
              ))
            ) : (
              <div className={style["no-options"]}>{noExistSelect}</div>
            )}
          </div>
        )}
      </div>
    );
  }
);

export default Select;




// import { FC, memo } from "react";
// import { useOutsideClick } from "../../../hooks/data/useOutsideClick";
// import { IEntity, IValidationErrors } from "../../../types/devices";
// import { selectFromList, noExistSelect } from "../../../utils/constants/device";
// import style from "./Select.module.scss";

// interface ISelectProps {
//   items: IEntity[];
//   label: string;
//   name?: string;
//   value: string;
//   errors: IValidationErrors;
//   setValue: (value: IEntity) => void;
// }

// const Select: FC<ISelectProps> = memo(
//   ({ items, name, label, value, errors, setValue }) => {
//     const { isOpen, setIsOpen, modalRef } = useOutsideClick();
//     const errorMessage = errors[name as keyof IValidationErrors];
//     const handleSelect = (option: IEntity) => {
//       setIsOpen(false);
//       setValue(option);
//     };

//     return (
//       <div className={style.wrapper}>
//         <div className={style.error}>
//           {errorMessage?.length! > 0 && errorMessage}
//         </div>
//         <div className={style.selectContainer} ref={modalRef}>
//           {label && <label className={style.label}>{label}</label>}
//           <input
//             name={name}
//             type="text"
//             className={style.input}
//             value={value || ""}
//             onClick={() => setIsOpen(!isOpen)}
//             placeholder={selectFromList}
//             readOnly
//           />
//           <div className={style.arrow} onClick={() => setIsOpen(!isOpen)} />
//           {isOpen && (
//             <div className={style.dropdown}>
//               {items ? (
//                 items.map((option) => (
//                   <div
//                     key={option.id}
//                     className={style.option}
//                     onClick={() => handleSelect(option)}
//                     role="button"
//                     tabIndex={0}
//                   >
//                     {option.name}
//                   </div>
//                 ))
//               ) : (
//                 <div className={style["no-options"]}>{noExistSelect}</div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// );

// export default Select;

