import Headers from "./components/global/Header";
import Dashboard from "./components/board/Dashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";

function App() {
  const theme = createTheme();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Dashboard />
      </ThemeProvider>
    </>
  );
}

export default App;
