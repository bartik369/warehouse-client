import { useGlobalModal } from "../../hooks/data/useGlobalModal";
import { User } from "../../types/user";
import { BsPen } from "react-icons/bs";
import styles from "./Document.module.scss";

interface SignaturesProps {
  issuerSignature: string | null;
  receiverSignature: string | null;
  issueUser: User | null;
  receiverUser: User | null;
}
const Signatures = ({
  issuerSignature,
  receiverSignature,
  issueUser,
  receiverUser,
}: SignaturesProps) => {
  const { openModal } = useGlobalModal();
  return (
    <div className={styles.signatures}>
      <div className={styles.item}>
        <div className={styles.user}>
          {issueUser?.firstNameRu} {issueUser?.lastNameRu}
        </div>
        <div
          className={`${styles.pic} ${
            issuerSignature ? styles.filed : styles.empty
          }`}
          onClick={() =>
            openModal("signature", {
              maxWidth: 400,
              role: "issuer",
            })
          }
        >
          {issuerSignature && <img src={issuerSignature} />}
          {!issuerSignature && (
            <span>
             <BsPen />
            </span>
          )}
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.user}>
          {receiverUser?.firstNameRu} {receiverUser?.lastNameRu}
        </div>
        <div
          className={`${styles.pic} ${
            receiverSignature ? styles.filed : styles.empty
          }`}
          onClick={() =>
            openModal("signature", {
              maxWidth: 400,
              role: "receiver",
            })
          }
        >
             {!receiverSignature && (
            <span>
              <BsPen />
            </span>
          )}
          {receiverSignature && (
            <img src={receiverSignature} alt="Подпись получателя" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Signatures;
