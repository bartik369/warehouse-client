import React, { forwardRef } from "react";
import { EntityFormActions } from "@/types/entity";
import { AdminEntityState } from "@/reducers/admin-entity/adminEntityTypes";
import loadIcon from "@/assets/elements/load.svg";
import previewPicture from "@/assets/elements/default.png";
import style from "./Preview.module.scss";

interface PreviewProps {
  actions: EntityFormActions;
  state: AdminEntityState;
  media: string;
  ref?: React.RefObject<HTMLInputElement>;
}
const Preview = forwardRef<HTMLInputElement, PreviewProps>(
  ({ actions, state }, ref) => {
    return (
      <label className={style.file} htmlFor={"upload"}>
        <div className={style.icon}>
          <img src={loadIcon} alt="" />
        </div>
        <img src={state?.media?.prevImg || previewPicture} />
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
