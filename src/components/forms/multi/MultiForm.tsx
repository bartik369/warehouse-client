import { FC } from "react";
import { useLocation } from "react-router-dom";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import Textarea from "../../ui/textarea/Textarea";
import BtnAction from "../../ui/buttons/BtnAction";
import Preview from "../../ui/preview/Preview";
import { useGetLocationsQuery } from "../../../store/api/locationApi";
import { useGetTypesQuery } from "../../../store/api/typesApi";
import { useGetManufacturersQuery } from "../../../store/api/manufacturersApi";
import { phoneNumberLabel } from "../../../utils/constants/device";
import { add, update, reset, slugLocation, name, slug, city, description,
  phoneMaskPlaceholder } from "../../../utils/constants/constants";
import { manufacturersLabel, deviceTypeLabel } from "../../../utils/constants/device";
import { IDeviceMedia, IEntity } from "../../../types/devices";
import { HiMiniXMark } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { BsQuestionSquare } from "react-icons/bs";
import { ToastContainer } from "react-toastify";
import styles from "./MultiForm.module.scss";

interface IMultiFormProps {
  title: string;
  entity: IEntity;
  isUpdate: boolean;
  media?: IDeviceMedia;
  fieldType?: string;
  fileInputRef?: React.RefObject<HTMLInputElement>;
  errors: Record<string, string>;
  setMedia?: () => void;
  handleCity?: (item: IEntity) => void;
  handleManufacturer?: (item: IEntity) => void;
  handleType?: (item: IEntity) => void;
  handleInput: (name: keyof IEntity, e: string) => void;
  handleCreate: (type: string) => void;
  handleReset: () => void;
}

const MultiForm: FC<IMultiFormProps> = ({
  title,
  entity,
  fieldType,
  isUpdate,
  errors,
  media,
  fileInputRef,
  setMedia,
  handleCity,
  handleManufacturer,
  handleType,
  handleInput,
  handleCreate,
  handleReset,
}) => {
  const locationPath = useLocation();
  const { data: cities } = useGetLocationsQuery();
  const { data : manufacturers } = useGetManufacturersQuery();
  const { data: types } = useGetTypesQuery();
  const locationType = locationPath.pathname.split('/')[2]?.split('-')[1] || '';
  const exceptionPath = !/add-(model|type)$/.test(locationPath.pathname);
  const isContractor = locationPath.pathname.endsWith("contractor");
  const isEntityImg = entity.imagePath 
    ? `${import.meta.env.VITE_API_MODELS}${entity.imagePath}`
    : media?.prevImg;
  
  return (
    <div className={styles.wrapper}>
      <ToastContainer position="top-center" theme="light" />
      {fieldType === "model" && (
        <div className={styles.preview}>
          <Preview
            media={isEntityImg || ""}
            ref={fileInputRef}
            setMedia={() => setMedia?.()}
          />
        </div>
      )}
      <form>
      <div className={styles.title}>{title}</div>
        <Input
          label={name}
          type="text"
          name="name"
          value={entity.name}
          errors={errors}
          onChange={(e) => handleInput("name", e.target.value)}
        />
        <div className={styles["tooltip-wrapper"]}>
          <span
            className={styles.tooltip}
            data-tooltip={slugLocation}
            tabIndex={0}
          >
            <BsQuestionSquare className={styles.icon} />
          </span>
        </div>
        {!(
          locationPath.pathname.endsWith("add-role") ||
          locationPath.pathname.endsWith("add-permission")
        ) && (
          <Input
            label={slug}
            type="text"
            name="slug"
            value={entity.slug || ""}
            errors={errors}
            onChange={(e) => handleInput("slug", e.target.value)}
          />
        )}
        {locationPath.pathname.endsWith("contractor") && (
          <Input
            type="tel"
            name="phoneNumber"
            value={entity.phoneNumber || ""}
            placeholder={phoneMaskPlaceholder}
            onChange={(e) => handleInput("phoneNumber", e.target.value)}
            label={phoneNumberLabel}
            errors={errors}
          />
        )}
        {locationPath.pathname.endsWith("add-warehouse") && 
          <Select
            setValue={(val) => handleCity?.(val)}
            items={cities || []}
            label={city}
            value={entity.locationName || ""}
            errors={errors}
            name="locationName"
            getId={(item: IEntity) => item.id}
          />
        }
         { locationPath.pathname.endsWith("add-model") && 
         <>
          <Select
            setValue={(val) => handleManufacturer?.(val)}
            items={manufacturers || []}
            label={manufacturersLabel}
            value={entity.manufacturer || ""}
            errors={errors}
            name="manufacturer"
            getId={(item: IEntity) => item.id}
          />
          <Select
            setValue={(val) => handleType?.(val)}
            items={types || []}
            label={deviceTypeLabel}
            value={entity.type || ""}
            errors={errors}
            name="type"
            getId={(item: IEntity) => item.id}
        />
        </>
        }
        {exceptionPath && 
         <Textarea
          value={entity[isContractor ? "address" : "comment"] || ""}
          errors={errors}
          label={description}
          name={isContractor ? "address" : "comment"}
          setText={(e) =>
            handleInput(isContractor ? "address" : "comment", e.target.value)
          }
       />
        }
        <div className={styles.actions}>
          <BtnAction
            icon={<HiMiniXMark />}
            size="lg"
            color="grey"
            title={reset}
            click={handleReset}
          />
          <BtnAction
            icon={<GoPlus />}
            size="lg"
            color="blue"
            title={isUpdate ? update : add}
            click={() => handleCreate(locationType)}
          />
        </div>
      </form>
    </div>
  );
};

export default MultiForm;
