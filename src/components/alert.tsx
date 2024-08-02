import { useState } from "react"
import styles from "../ui/confirm.module.css";

type ConfProps = {
  title: string;
  description: string;
}

function useConfirm(
    title: string,
    description: string
  ) {
  
  const [promise, setPromise] = useState(null);

  const confirm = () => new Promise((resolve, reject) => {
    setPromise({ resolve });
  });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <div id={styles.root} onClick={ handleCancel }>
      <div id={styles.container}>
        <h2 id={styles.title}> {title} </h2>
        <p id={styles.message}> {description} </p>
        <div id={styles.buttons}>
          <button onClick={ handleConfirm } id={styles.yesButton} > Yes </button>
          <button onClick={ handleCancel } id={styles.cancelButton} > Cancel </button>
        </div>
      </div>
    </div>

  );  
  return [ConfirmationDialog, confirm];

}

export default useConfirm;