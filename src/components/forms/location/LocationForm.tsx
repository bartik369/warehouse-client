import { useEffect, useState } from "react";
import Input from "../../ui/input/Input";
import Select from "../../ui/select/Select";
import Textarea from "../../ui/textarea/Textarea";
import { useLocation } from "react-router-dom";
import { useAddLocation } from "../../../hooks/data/useAddLocation";
import BtnAction from "../../ui/buttons/BtnAction";
import { useGetLocationsQuery } from "../../../store/api/locationApi";
import { ILocation } from "../../../types/locations";
import { add, addCityTitle, addWarehouseTitle, addDepartmentTitle, reset,
  slugLocation, name, slug, city, description} from "../../../utils/constants/constants";
import { HiMiniXMark } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { BsQuestionSquare } from "react-icons/bs";
import styles from "./LocationForm.module.scss";

const LocationForm = () => {
  const locationPath = useLocation();
  const locationType = locationPath.pathname.split("/")[2]?.split("-")[1] || "";
  const [title, setTitle] = useState("");
  const { data: cities } = useGetLocationsQuery();

  useEffect(() => {
    switch (locationType) {
      case "warehouse":
        setTitle(addWarehouseTitle);
        break;
      case "city":
        setTitle(addCityTitle);
        break;
      case "department":
        setTitle(addDepartmentTitle);
        break;
      default:
        setTitle("");
    }
  }, [locationType]);

  const { location, errors, handleCityChange, handleInputChange, handleCreateLocation,
    handleResetLocation } = useAddLocation();
  return (
    <form>
      <div className={styles.title}>{title}</div>
      <Input
        label={name}
        type="text"
        name="name"
        value={location.name}
        errors={errors}
        onChange={(e) => handleInputChange("name", e.target.value)}
      />
      <div className={styles["tooltip-wrapper"]}>
        <span className={styles.tooltip} data-tooltip={slugLocation} tabIndex={0}>
          <BsQuestionSquare className={styles.icon} />
        </span>
      </div>
      <Input
        label={slug}
        type="text"
        name="slug"
        value={location.slug}
        errors={errors}
        onChange={(e) => handleInputChange("slug", e.target.value)}
      />
      {locationPath.pathname.endsWith("add-warehouse") && (
        <Select<ILocation>
          setValue={handleCityChange}
          items={cities || []}
          label={city}
          value={location.locationName || ""}
          errors={errors}
          name="locationName"
          getId={(item: ILocation) => item.id}
        />
      )}
      <Textarea
        value={location.comment || ""}
        errors={errors}
        label={description}
        name="comment"
        setText={(e) => handleInputChange("comment", e.target.value)}
      />
      <div className={styles.actions}>
        <BtnAction
          icon={<HiMiniXMark />}
          type="button"
          size="lg"
          color="grey"
          title={reset}
          click={handleResetLocation}
        />
        <BtnAction
          icon={<GoPlus />}
          type="submit"
          size="lg"
          color="blue-green"
          title={add}
          click={(e) => handleCreateLocation(e, locationType)}
        />
      </div>
    </form>
  );
};

export default LocationForm;
