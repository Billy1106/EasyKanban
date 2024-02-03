import {
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { taskSearch } from "../../utils/taskUtils.ts";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import { Task } from ".";
import SortButtonDialog from "./dialogs/SortButtonDialog";

function DashBoardHeader({
  tasks,
  handleVisibleTasksUpdated,
}: {
  tasks: Task[];
  handleVisibleTasksUpdated: (tasks: Task[]) => void;
}) {
  const [title, setTitle] = useState<string>("untitled");
  const [search, setSearch] = useState<string>("");
  const [sortButtonOpen, setSortButtonOpen] = useState<boolean>(false);

  function updateTitle() {
    if (title === "") {
      setTitle("untitled");
    }
    console.log("update title", title);
  }
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    const filteredTasks: Task[] = taskSearch(e.target.value, tasks);
    handleVisibleTasksUpdated(filteredTasks);
  }

  function handleCloseDialog(tasks: Task[]) {
    setSortButtonOpen(false);
    handleVisibleTasksUpdated(tasks);
  }
  return (
    <Container
      sx={{
        minHeight: "100px",
        display: "flex",
        alignItems: "center",
      }}
      style={{ padding: "0px" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          gap: "20px",
          width: "100%",
        }}
      >
        <TextField
          value={title}
          variant="standard"
          onChange={(e) => setTitle(e.target.value)}
          onBlur={updateTitle}
          sx={{
            padding: 1,
          }}
          InputProps={{
            disableUnderline: true,
            style: { fontSize: 32 },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <ButtonGroup variant="contained" sx={{ boxShadow: "none" }}>
            <Button
              sx={{
                gap: 1,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 12px",
                textTransform: "capitalize",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                },
                color: "#606C80",
                fontWeight: "600",
              }}
            >
              <DashboardIcon sx={{ color: "#a5b1c7" }} />
              Board
            </Button>
            <Button
              sx={{
                gap: 1,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 12px",
                textTransform: "capitalize",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                },
                color: "#606C80",
                fontWeight: "600",
              }}
            >
              <DashboardIcon sx={{ color: "#a5b1c7" }} />
              List
            </Button>
          </ButtonGroup>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <TextField
              value={search}
              onChange={handleSearch}
              variant="standard"
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                color: "#606C80",
                fontWeight: "600",
              }}
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: 20,
                  padding: "10px",
                  margin: "0px",
                },
              }}
              label={
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    paddingLeft: "10px",
                  }}
                >
                  <SearchIcon sx={{ color: "#a5b1c7" }} fontSize="medium" />
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "#a5b1c7",
                    }}
                  >
                    Search
                  </Typography>
                </Box>
              }
            />
            <IconButton
              sx={{
                gap: 1,
                border: "none",
                display: "flex",
                alignItems: "center",
                textTransform: "capitalize",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                },
                color: "#606C80",
                fontWeight: "600",
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              sx={{
                gap: 1,
                border: "none",
                display: "flex",
                alignItems: "center",
                textTransform: "capitalize",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                },
                color: "#606C80",
                fontWeight: "600",
              }}
            >
              <FilterListIcon />
            </IconButton>
            <IconButton
              sx={{
                gap: 1,
                border: "none",
                display: "flex",
                alignItems: "center",
                textTransform: "capitalize",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                },
                color: "#606C80",
                fontWeight: "600",
              }}
              onClick={() => setSortButtonOpen(true)}
            >
              <SortIcon />
            </IconButton>
          </Box>
        </Box>
        <SortButtonDialog
          open={sortButtonOpen}
          onClose={handleCloseDialog}
          tasks={tasks}
        />
      </Box>
    </Container>
  );
}

export default DashBoardHeader;
