import { useLocation } from "react-router-dom";
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
import { BsQuestionSquare } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import { IEntityFormActions } from "../../../types/entity";
import { IAdminEntityState } from "../../../reducers/admin-entity/adminEntityTypes";
import styles from "./MultiForm.module.scss";


interface IMultiFormProps {
  actions: IEntityFormActions;
  state: IAdminEntityState;
  title: string;
  fields: IFieldMultiformConfig[];
  media?: IDeviceMedia;
  fieldType?: string;
  fileInputRef?: React.RefObject<HTMLInputElement>;
}

const MultiForm = ({
  title,
  fields,
  actions,
  state,
  fieldType,
  media,
  fileInputRef,
}:IMultiFormProps) => {
  const locationPath = useLocation();
  const { data: cities } = useGetLocationsQuery();
  const { data: manufacturers } = useGetManufacturersQuery();
  const { data: types } = useGetTypesQuery();
  const locationType = locationPath.pathname.split("/")[2]?.split("-")[1] || "";
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
        <div className={styles.title}>{title}</div>
        <div className={styles["tooltip-wrapper"]}>
          <span
            className={styles.tooltip}
            data-tooltip={slugLocation}
            tabIndex={0}
          >
            <BsQuestionSquare className={styles.icon} />
          </span>
        </div>
        {fields?.map((field) => {
          if (field.type === "input"  || field.type === "tel") {
            return (
              <Input
                key={field.name}
                label={field.label}
                type={field.type}
                name={field.name}
                value={state.entity[field.name] || ''}
                errors={state.errors}
                placeholder={field.placeholder}
                onChange={(e) => actions.handleInputChange(field.name, e.target.value)}
              />
            );
          }
          if (field.type === "select") {
            const items = dataSources[field.itemsKey!];
            return (
              <Select
                key={field.name}
                setValue={(val) => { 
                  actions.handleInputChange?.(field.name, val.name)
                  if (field.name === "manufacturer") {
                    actions.handleInputChange?.("manufacturerId",val.id)
                  }
                  if (field.name === "type") {
                    actions.handleInputChange?.("typeId",val.id)
                  }
                }}
                items={items || []}
                label={field.label || ""}
                value={state.entity[field.name] || ""}
                errors={state.errors}
                name={field.name}
                getId={(item: IEntity) => item.id}
              />
            );
          }
          if (field.type === "textarea") {
            return (
              <Textarea
                key={field.name}
                value={state.entity[field.name] || ""}
                errors={state.errors}
                label={field.label || ''}
                placeholder={field.placeholder}
                name={field.name}
                onChange={(e) => actions.handleInputChange(field.name, e.target.value)}
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
            click={() => actions.handleCreateEntity(locationType)}
          />
        </div>
      </form>
    </div>
  );
};

export default MultiForm;
