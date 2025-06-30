import { useState } from "react";
import { PLACEHOLDER_LABELS } from "@/utils/constants/ui/placeholders";
import { IoSearch } from "react-icons/io5";
import { CgCloseO } from "react-icons/cg";
import styles from "./Search.module.scss";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className={styles.search}>
      <div className={styles.input}>
        <div className={styles.glass}>
          {!searchQuery && <IoSearch />}
        </div>
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={PLACEHOLDER_LABELS.search}
          value={searchQuery}
          type="text"
        />
        {searchQuery && (
          <div className={styles.close} onClick={() => setSearchQuery("")}>
            <CgCloseO />
          </div>
        )}
      </div>
      <button
        className={styles.button}
        style={{ visibility: searchQuery ? "visible" : "hidden" }}>
          <span><IoSearch /></span>
      </button>
    </div>
  );
};

export default Search;
