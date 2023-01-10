import { Alert, AlertColor } from "@mui/material";
import arrayOfInputsWithErrors from "./helper/arrayOfInputsWithErrors";
import { ErrorsOnInput } from "./helper/checkErrosOnInputs";

type FeedbackAlertProps = {
  type: AlertColor | undefined;
  message?: string;
  userErrors?: ErrorsOnInput;
  onCloseAlert: () => void;
};

const FeedbackAlert = ({ type, message, userErrors, onCloseAlert }: FeedbackAlertProps) => {
  let messageString = message ?? "";

  if (!messageString && userErrors) {
    const inputsWithErros = arrayOfInputsWithErrors(userErrors);
    if (inputsWithErros.length === 1) {
      messageString = `The ${inputsWithErros[0]} input must be filled out correctly.`;
    } else {
      messageString = `The ${inputsWithErros.join(", ")} inputs must be filled out correctly.`;
    }
  }

  return (
    <Alert severity={type} onClose={onCloseAlert}>
      {messageString}
    </Alert>
  );
};

export default FeedbackAlert;
