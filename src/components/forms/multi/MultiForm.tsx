import React, { memo } from "react";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import Textarea from "../../ui/textarea/Textarea";
import BtnAction from "../../ui/buttons/BtnAction";
import Preview from "../../ui/preview/Preview";
import { useGetLocationsQuery } from "../../../store/api/locationApi";
import { useGetTypesQuery } from "../../../store/api/typesApi";
import { useGetManufacturersQuery } from "../../../store/api/manufacturersApi";
import { add, update, reset, slugLocation } from "../../../utils/constants/constants";
import { IDeviceMedia, IEntity } from "../../../types/devices";
import { IFieldMultiformConfig } from "../../../types/content";
import { HiMiniXMark } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { ToastContainer } from "react-toastify";
import { IEntityFormActions } from "../../../types/entity";
import { IAdminEntityState } from "../../../reducers/admin-entity/adminEntityTypes";
import Tooltip from "../../ui/tooltip/Tooltip";
import styles from "./MultiForm.module.scss";

interface IMultiFormProps {
  actions: IEntityFormActions;
  state: IAdminEntityState;
  title: string;
  fields: IFieldMultiformConfig[];
  media?: IDeviceMedia;
  fieldType?: string;
  fileInputRef?: React.RefObject<HTMLInputElement>;
  locationType?: string;
}

const MultiForm = memo(({
  title,
  fields,
  actions,
  state,
  fieldType,
  media,
  locationType,
  fileInputRef,
}: IMultiFormProps) => {
  const { data: cities } = useGetLocationsQuery();
  const { data: manufacturers } = useGetManufacturersQuery();
  const { data: types } = useGetTypesQuery();
  const isEntityImg = state.entity.imagePath
    ? `${import.meta.env.VITE_API_MODELS}${state.entity.imagePath}`
    : media?.prevImg;
  const dataSources = { cities, manufacturers, types };

  return (
    <div className={styles.wrapper}>
      <ToastContainer position="top-center" theme="light" />
      {fieldType === "model" && (
        <div className={styles.preview}>
          <Preview
            state={state}
            media={isEntityImg || ""}
            ref={fileInputRef}
            actions={actions}
          />
        </div>
      )}
      <form>
        <h2 className={styles.title}>{title}</h2>
        {fields?.map((field) => {
          if (field.type === "input" || field.type === "tel") {
            return (
              <React.Fragment key={`${field.name}::${field.type}`}>
              {field.name === "slug" && <Tooltip data={slugLocation} /> }
              <Input
                key={field.name}
                label={field.label}
                type={field.type}
                name={field.name}
                value={state.entity[field.name] || ""}
                errors={state.errors}
                placeholder={field.placeholder}
                onChange={(e) =>
                actions.handleInputChange(field.name, e.target.value)
                }
              />
              </React.Fragment>
            );
          }
          if (field.type === "select") {
            const items = dataSources[field.itemsKey as keyof typeof dataSources] || [];
            return (
              <Select
                key={field.name}
                setValue={(val) => {
                  actions.handleInputChange?.(field.name, val.name);
                  if (field.name === "manufacturer") {
                    actions.handleInputChange?.("manufacturerId", val.id);
                  }
                  if (field.name === "type") {
                    actions.handleInputChange?.("typeId", val.id);
                  }
                }}
                items={items || []}
                label={field.label || ""}
                value={state.entity[field.name] || ""}
                errors={state.errors}
                name={field.name}
                getId={(item: IEntity) => item.id}
                getLabel={(item) => item.name}
              />
            );
          }
          if (field.type === "textarea") {
            return (
              <Textarea
                key={field.name}
                value={state.entity[field.name] || ""}
                errors={state.errors}
                label={field.label || ""}
                placeholder={field.placeholder}
                name={field.name}
                onChange={(e) =>
                  actions.handleInputChange(field.name, e.target.value)
                }
              />
            );
          }
        })}
        <div className={styles.actions}>
          <BtnAction
            icon={<HiMiniXMark />}
            size="lg"
            color="grey"
            title={reset}
            click={actions.handleResetEntity}
          />
          <BtnAction
            icon={<GoPlus />}
            size="lg"
            color="green"
            title={state.isUpdate ? update : add}
            click={() => actions.handleCreateEntity(locationType || '')}
          />
        </div>
      </form>
    </div>
  );
});

export default MultiForm;
