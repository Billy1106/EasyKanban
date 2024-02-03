import { Alert, AlertTitle } from "@mui/material";

function ErrorAlert({ success }: { success: string }) {
  return (
    <Alert severity="success">
      <AlertTitle>Success</AlertTitle>
      {success}
    </Alert>
  );
}

export default ErrorAlert;
