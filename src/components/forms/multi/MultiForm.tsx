import { useMemo, FC } from "react";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import Textarea from "../../ui/textarea/Textarea";
import { useLocation } from "react-router-dom";
import BtnAction from "../../ui/buttons/BtnAction";
import { useGetLocationsQuery } from "../../../store/api/locationApi";
import { IAdminEntity } from "../../../types/content";
import { phoneNumberLabel } from "../../../utils/constants/device";
import {
  add,
  update,
  addLocationTitle,
  addWarehouseTitle,
  addDepartmentTitle,
  addRoleTitle,
  addPermissionTitle,
  reset,
  slugLocation,
  name,
  slug,
  city,
  description,
  addContractorTitle,
  addManufacturerTitle,
  phoneMaskPlaceholder,
} from "../../../utils/constants/constants";
import { HiMiniXMark } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { BsQuestionSquare } from "react-icons/bs";
import styles from "./MultiForm.module.scss";

interface IMultiFormProps {
  entity: IAdminEntity;
  isUpdate: boolean;
  errors: Record<string, string>;
  handleCity?: (item: any) => void;
  handleInput: (name: keyof IAdminEntity, e: string) => void;
  handleCreate: (e: React.MouseEvent<HTMLButtonElement>, type: string) => void;
  handleReset: () => void;
}

const MultiForm: FC<IMultiFormProps> = ({
  entity,
  isUpdate,
  errors,
  handleCity,
  handleInput,
  handleCreate,
  handleReset,
}) => {
  const locationPath = useLocation();
  const locationType = locationPath.pathname.split("/")[2]?.split("-")[1] || "";
  const { data: cities } = useGetLocationsQuery();

  const title = useMemo(() => {
    switch (locationType) {
      case "warehouse":
        return addWarehouseTitle;
      case "location":
        return addLocationTitle;
      case "department":
        return addDepartmentTitle;
      case "contractor":
        return addContractorTitle;
      case "manufacturer":
        return addManufacturerTitle;
      case "role":
        return addRoleTitle;
      case "permission":
        return addPermissionTitle;
      default:
        return "";
    }
  }, [locationType]);

  const isContractor = locationPath.pathname.endsWith("contractor");
  return (
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
      {locationPath.pathname.endsWith("add-warehouse") && (
        <Select<IAdminEntity>
          setValue={handleCity}
          items={cities || []}
          label={city}
          value={entity.locationName || ""}
          errors={errors}
          name="locationName"
          getId={(item: IAdminEntity) => item.id}
        />
      )}
      <Textarea
        value={entity[isContractor ? "address" : "comment"] || ""}
        errors={errors}
        label={description}
        name={isContractor ? "address" : "comment"}
        setText={(e) =>
          handleInput(isContractor ? "address" : "comment", e.target.value)
        }
      />
      <div className={styles.actions}>
        <BtnAction
          icon={<HiMiniXMark />}
          type="button"
          size="lg"
          color="grey"
          title={reset}
          click={handleReset}
        />
        <BtnAction
          icon={<GoPlus />}
          type="submit"
          size="lg"
          color="blue-green"
          title={isUpdate ? update : add}
          click={(e) => handleCreate(e, locationType)}
        />
      </div>
    </form>
  );
};

export default MultiForm;
