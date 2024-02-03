import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

import {
  sortTasks,
  sortByDeadline,
  sortByTitle,
  sortBySeverity,
  sortByStoryPoint,
  sortByAssignee,
  sortByStartedAt,
} from "../../../utils/taskUtils";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"; // Icon for ascending sort
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"; // Icon for descending sort

import { Task } from "..";
import { useState } from "react";

export interface SortButtonDialogProps {
  open: boolean;
  onClose: (tasks: Task[]) => void;
  tasks: Task[];
}

function SortButtonDialog(props: SortButtonDialogProps) {
  const { onClose, open, tasks } = props;
  const [ascending, setAscending] = useState<boolean>(true);

  const handleCancel = () => {
    onClose([...tasks]);
  };

  const handleSubmit = (compareFunction: (a: Task, b: Task) => number) => {
    const newTasks: Task[] = sortTasks(tasks, compareFunction);
    onClose(newTasks);
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "10px",
          padding: "10px",
        }}
      >
        <ButtonGroup
          style={{ border: "none", boxShadow: "none", backgroundColor: "none" }}
        >
          <Button
            sx={{
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
            onClick={() => {
              setAscending(true);
            }}
          >
            <ArrowUpwardIcon />
          </Button>
          <Button
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
            onClick={() => {
              setAscending(false);
            }}
          >
            <ArrowDownwardIcon />
          </Button>
        </ButtonGroup>
      </Box>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {[
            { label: "Title", action: sortByTitle },
            { label: "Deadline", action: sortByDeadline },
            { label: "Severity", action: sortBySeverity },
            { label: "Story Points", action: sortByStoryPoint },
            { label: "Assignee", action: sortByAssignee },
            { label: "Started At", action: sortByStartedAt },
          ].map(({ label, action }) => (
            <Button
              key={label}
              variant="outlined"
              startIcon={<SortIcon />}
              onClick={() => handleSubmit(action)}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                color: "black",
                borderColor: "black",
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SortButtonDialog;
