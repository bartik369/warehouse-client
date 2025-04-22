import React, { forwardRef } from "react";
import { IEntityFormActions } from "../../../types/entity";
import loadIcon from "../../../assets/elements/load.svg";
import previewPicture from "../../../assets/elements/default.png";
import style from "./Preview.module.scss";

interface IPreviewProps {
  actions: IEntityFormActions;
  media: string;
  ref?: React.RefObject<HTMLInputElement>;
}
const Preview = forwardRef<HTMLInputElement, IPreviewProps>(
  ({ media, actions }, ref) => {
    return (
      <label className={style.file} htmlFor={"upload"}>
        <div className={style.icon}>
          <img src={loadIcon} alt="" />
        </div>
        <img src={media || previewPicture} />
        {
          <input
            ref={ref}
            name="file"
            id="upload"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => actions.handleMedia?.(e)}
          />
        }
      </label>
    );
  }
);

export default Preview;
