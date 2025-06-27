import { Link } from "react-router-dom";
import { locations } from "../../../utils/data/menus";
import styles from "./Locations.module.scss";

const Locations = () => {
  return (
    <div className={styles.inner}>
      <div className={styles.items}>
        {locations.map((city) => (
          <Link to={city.path} key={city.id} className={styles.item}>
            <img src={city.image} alt="" />
            <h4>{city.label}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Locations;
