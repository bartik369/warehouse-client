import LocationForm from "../../../forms/location/LocationForm";
import DepartmentList from "./DepartmentList";
import styles from '../Admin.module.scss';

const AddDepartment = () => {
    return (
        <section className={styles.inner}>
           <div className={styles.form}>
            <LocationForm />
           </div>
           <aside className={styles.list}>
            <DepartmentList />
           </aside>
        </section>
    );
};

export default AddDepartment;