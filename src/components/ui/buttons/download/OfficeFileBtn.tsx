import { exportToCSV, exportToExcel } from "@/utils/file/export-file";
import { SECTION_TITLES } from "@/utils/constants/ui/titles";
import { FaFileExcel } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa6";
import styles from "./OfficeFileBtn.module.scss";

interface OfficeFileBtnProps<T> {
  stack: T[];
}

const OfficeFileBtn = <T,>({ stack }: OfficeFileBtnProps<T>) => {
  return (
    <div className={styles.icons}>
      <div className={styles.items}>
        <FaFileExcel
          className={styles.green}
          title={SECTION_TITLES.download}
          onClick={() => exportToExcel(stack)}
        />
        <FaFileCsv
          className={styles.yellow}
          title={SECTION_TITLES.download}
          onClick={() => exportToCSV(stack)}
        />
      </div>
    </div>
  );
};

export default OfficeFileBtn;
