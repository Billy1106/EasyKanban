import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Tab,
  Tabs,
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
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CloudSyncIcon from "@mui/icons-material/CloudSync";

function DashBoardHeader({
  tasks,
  handleVisibleTasksUpdated,
}: {
  tasks: Task[];
  handleVisibleTasksUpdated: (tasks: Task[]) => void;
}) {
  const [title, setTitle] = useState<string>("untitled");
  const [people, setPeople] = useState<string[]>([
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
    "Jack White",
    "Jill Black",
  ]);
  setPeople(people);
  const [search, setSearch] = useState<string>("");
  const [sortButtonOpen, setSortButtonOpen] = useState<boolean>(false);

  const peopleIcons = people.slice(0, 3).map(() => (
    <AccountCircle
      style={{
        fontSize: 48,
        padding: "0px",
      }}
      sx={{
        marginRight: "0px",
        opacity: 0.5
      }}
    />
  ));

  function updateTitle() {
    if (title === "") {
      setTitle("untitled");
    }
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
      maxWidth="xl"
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <TextField
              value={title}
              variant="standard"
              onChange={(e) => setTitle(e.target.value)}
              onBlur={updateTitle}
              sx={{
                padding: 1,
                borderBottom: "1px solid #a5b1c7",
              }}
              InputProps={{
                disableUnderline: true,
                style: { fontSize: 32, fontWeight: "600" },
              }}
            />
            <EditIcon
              sx={{
                color: "#a5b1c7",
              }}
              style={{
                fontSize: 32,
              }}
            />
          </Box>
          <Box>
            <Tabs
              value={0}
              onChange={() => {}}
            >
              <Tab label="Dashboard" />
              <Tab label="Calender" />
              <Tab label="Progress" />
              <Tab label="Board" />
            </Tabs>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                marginRight: "20px",
              }}
            >
              {peopleIcons}
            </Box>
            {people.length > 3 && (
              <IconButton>
                <Badge badgeContent={`+${people.length - 3}`} color="primary">
                  <AccountCircle
                    style={{
                      fontSize: 48,
                    }}
                  />
                </Badge>
              </IconButton>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              gap: "20px",
            }}
          >
            <ButtonGroup variant="contained" sx={{ boxShadow: "none" }}>
              <Button sx={buttonStyle}>
                <DashboardIcon sx={{ color: "#a5b1c7" }} />
                Board
              </Button>
              <Divider orientation="vertical" flexItem />
              <Button sx={buttonStyle}>
                <DashboardIcon sx={{ color: "#a5b1c7" }} />
                List
              </Button>
            </ButtonGroup>
            <Divider orientation="vertical" flexItem />
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#a5b1c7",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
                fontWeight={600}
                fontSize={16}
              >
                <LockIcon />
                Limited Access
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ color: "#a5b1c7" }}
                fontWeight={600}
                fontSize={16}
              >
                Synch
              </Typography>
              <IconButton sx={iconButtonStyle} onClick={() => {}}>
                <CloudSyncIcon />
              </IconButton>
              <Typography
                sx={{ color: "#a5b1c7" }}
                fontWeight={600}
                fontSize={16}
              >
                Upload
              </Typography>
              <IconButton sx={iconButtonStyle} onClick={() => {}}>
                <DriveFolderUploadIcon />
              </IconButton>
            </Box>
          </Box>
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
                width: "300px",
              }}
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: 20,
                  padding: "10px",
                  margin: "0px",
                },
              }}
              label={<SearchLabel />}
            />

            <IconButton sx={iconButtonStyle}>
              <EditIcon />
            </IconButton>
            <IconButton sx={iconButtonStyle}>
              <FilterListIcon />
            </IconButton>
            <IconButton
              sx={iconButtonStyle}
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

const buttonStyle = {
  gap: 1,
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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
  padding: "0px 50px",
  height: "50px",
};

const iconButtonStyle = {
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
};

const SearchLabel = () => (
  <Box sx={{ display: "flex", gap: "10px", paddingLeft: "10px" }}>
    <SearchIcon sx={{ color: "#a5b1c7" }} fontSize="medium" />
    <Typography sx={{ fontWeight: "600", color: "#a5b1c7" }}>Search</Typography>
  </Box>
);

export default DashBoardHeader;
