import { exportToCSV, exportToExcel } from "../../../../utils/file/export-file";
import { FaFileExcel } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa6";
import styles from "./OfficeFileBtn.module.scss";
import { download } from "../../../../utils/constants/constants";

interface OfficeFileBtnProps<T> {
  stack: T[];
}

const OfficeFileBtn = <T,>({ stack }: OfficeFileBtnProps<T>) => {
  return (
    <div className={styles.icons}>
      <div className={styles.items}>
        <FaFileExcel
          className={styles.green}
          title={download}
          onClick={() => exportToExcel(stack)}
        />
        <FaFileCsv
          className={styles.yellow}
          title={download}
          onClick={() => exportToCSV(stack)}
        />
      </div>
    </div>
  );
};

export default OfficeFileBtn;
