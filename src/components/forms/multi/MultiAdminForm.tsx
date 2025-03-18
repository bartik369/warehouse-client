import { useMemo} from "react";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import Textarea from "../../ui/textarea/Textarea";
import { useLocation } from "react-router-dom";
import { useAddAdminEntities } from "../../../hooks/data/useAddAdminEntities";
import BtnAction from "../../ui/buttons/BtnAction";
import { useGetLocationsQuery } from "../../../store/api/locationApi";
import { IAdminEntity } from "../../../types/content";
import { add, addCityTitle, addWarehouseTitle, addDepartmentTitle, reset,
  slugLocation, name, slug, city, description, addContractorTitle, addManufacturerTitle,
  phoneMaskPlaceholder,
} from "../../../utils/constants/constants";
import { HiMiniXMark } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { BsQuestionSquare } from "react-icons/bs";
import { phoneNumberLabel } from "../../../utils/constants/device";
import styles from "./MultiForm.module.scss";

const MultiForm = () => {
  const locationPath = useLocation();
  const locationType = locationPath.pathname.split("/")[2]?.split("-")[1] || "";
  const { data: cities } = useGetLocationsQuery();
  
  const title = useMemo(() => {
    switch (locationType) {
      case "warehouse": return addWarehouseTitle;
      case "city": return addCityTitle;
      case "department": return addDepartmentTitle;
      case "contractor": return addContractorTitle;
      case "manufacturer": return addManufacturerTitle;
      default: return "";
    }
  }, [locationType]);

  const { entity, errors, handleCityChange, handleInputChange, handleCreateEntity,
    handleResetEntity } = useAddAdminEntities();
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
        onChange={(e) => handleInputChange("name", e.target.value)}
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
      <Input
        label={slug}
        type="text"
        name="slug"
        value={entity.slug}
        errors={errors}
        onChange={(e) => handleInputChange("slug", e.target.value)}
      />
      {locationPath.pathname.endsWith("contractor") && (
        <Input 
          type='tel' 
          name='phoneNumber' 
          value={entity.phoneNumber || ""}
          placeholder={phoneMaskPlaceholder}
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          label={phoneNumberLabel}
          errors={errors}
      />
      )}
      {locationPath.pathname.endsWith("add-warehouse") && (
        <Select<IAdminEntity>
          setValue={handleCityChange}
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
        setText={(e) => handleInputChange(isContractor
            ? "address" 
            : "comment", 
          e.target.value)}
       />
      <div className={styles.actions}>
        <BtnAction
          icon={<HiMiniXMark />}
          type="button"
          size="lg"
          color="grey"
          title={reset}
          click={handleResetEntity}
        />
        <BtnAction
          icon={<GoPlus />}
          type="submit"
          size="lg"
          color="blue-green"
          title={add}
          click={(e) => handleCreateEntity(e, locationType)}
        />
      </div>
    </form>
  );
};

export default MultiForm;
