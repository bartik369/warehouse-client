import React, { forwardRef } from "react";
import { IEntityFormActions } from "../../../types/entity";
import { IAdminEntityState } from "../../../reducers/admin-entity/adminEntityTypes";
import loadIcon from "../../../assets/elements/load.svg";
import previewPicture from "../../../assets/elements/default.png";
import style from "./Preview.module.scss";

interface IPreviewProps {
  actions: IEntityFormActions;
  state: IAdminEntityState;
  media: string;
  ref?: React.RefObject<HTMLInputElement>;
}
const Preview = forwardRef<HTMLInputElement, IPreviewProps>(
  ({ actions, state }, ref) => {
    return (
      <label className={style.file} htmlFor={"upload"}>
        <div className={style.icon}>
          <img src={loadIcon} alt="" />
        </div>
        <img src={state.media.prevImg || previewPicture} />
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
