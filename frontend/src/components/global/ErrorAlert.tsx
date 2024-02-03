import { Alert, AlertTitle } from "@mui/material";

function ErrorAlert({ error }: { error: string }) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {error}
    </Alert>
  );
}

export default ErrorAlert;
