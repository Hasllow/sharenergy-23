import { Container } from "@mui/material";
import styles from "./CardUser.module.css";
import { transformAddressString } from "./helper/transformAddressString";
import transformCpfString from "./helper/transformCpfString";
import transformPhoneString from "./helper/transformPhoneString";
import { UserProps } from "./types/UserTypes";

const CardUser = (props: UserProps) => {
  const addressString = transformAddressString(props.user.address);
  const cpfString = transformCpfString(props.user.cpf);
  const phoneString = transformPhoneString(props.user.phone);

  return (
    <Container>
      <div className={styles.cardUser}>
        <h3>Name: </h3>
        <p>{props.user.name}</p>
      </div>
      <div className={styles.cardUser}>
        <h3>Email: </h3>
        <p>{props.user.email}</p>
      </div>
      <div className={styles.cardUser}>
        <h3>CPF: </h3>
        <p>{cpfString}</p>
      </div>
      <div className={styles.cardUser}>
        <h3>Phone: </h3>
        <p>{phoneString}</p>
      </div>
      <div className={styles.cardUser}>
        <h3>Address: </h3>
        <p>{addressString}</p>
      </div>
    </Container>
  );
};

export default CardUser;
