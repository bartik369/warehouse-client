import React, { memo } from "react";
import Input from "@/components/ui/input/Input";
import Select from "@/components/ui/select/Select";
import Textarea from "@/components/ui/textarea/Textarea";
import Preview from "@/components/ui/preview/Preview";
import Actions from "../device/Actions";
import { useGetLocationsQuery } from "@/store/api/locationApi";
import { useGetTypesQuery } from "@/store/api/typesApi";
import { useGetManufacturersQuery } from "@/store/api/manufacturersApi";
import { DeviceMedia, Entity } from "@/types/devices";
import { FieldMultiformConfig } from "@/types/content";
import { ToastContainer } from "react-toastify";
import { EntityFormActions } from "@/types/entity";
import { AdminEntityState } from "@/reducers/admin-entity/adminEntityTypes";
import Tooltip from "@/components/ui/tooltip/Tooltip";
import { MESSAGES } from "@/utils/constants/ui/messages";
import styles from "./MultiForm.module.scss";

interface IMultiFormProps {
  actions: EntityFormActions;
  state: AdminEntityState;
  title: string;
  fields: FieldMultiformConfig[];
  media?: DeviceMedia;
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
              {field.name === "slug" && <Tooltip data={MESSAGES.slugLocation} /> }
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
                getId={(item: Entity) => item.id}
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
          <Actions
            isUpdate={state.isUpdate}
            resetEntity={actions.handleResetEntity}
            addEntity={() => actions.handleCreateEntity(locationType || '')}
          />
        </div>
      </form>
    </div>
  );
});

export default MultiForm;
