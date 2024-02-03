import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import dayjs, from "dayjs";
import { STATE, Task } from ".";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export interface TaskUpdateDialogProps {
  open: boolean;
  onClose: (value: Task | null) => void;
}

const storyPoints = [
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 5,
  },
  {
    value: 8,
  },
  {
    value: 13,
  },
];

function TaskUpdateDialog(props: TaskUpdateDialogProps) {
  const [title, setTitle] = useState<string>("task");
  const [description, setDescription] = useState<string>("");
  const [assignee, setAssignee] = useState<string>("");
  const [severity, setSeverity] = useState<number>(0);
  const [storyPoint, setStoryPoint] = useState<number>(0);
  const [deadline, setDeadline] = useState<string>(new Date().toString());
  const [startedAt, setStartedAt] = useState<string>(new Date().toString());

  const { onClose, open } = props;

  const handleCancel = () => {
    onClose(null);
  };

  const handleSubmit = () => {
    onClose({
      title,
      description,
      assignee,
      severity,
      storyPoint,
      status: STATE.STAY,
      deadline,
      startedAt,
    } as Task);
  };

  return (
    <Dialog open={open} fullWidth maxWidth={"md"}>
      <DialogContent
        sx={{
          gap: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid xs={8} item>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              type="text"
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Description"
              multiline
              rows="10"
              fullWidth
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid
            xs={4}
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <TextField
              margin="dense"
              label="Assign To"
              type="text"
              fullWidth
              onChange={(e) => setAssignee(e.target.value)}
            />
            <Typography
              color="grey"
              fontSize={15}
              fontFamily="Helvetica"
              fontWeight={400}
              letterSpacing={0.00938}
              margin={1}
              gutterBottom
            >
              Severity
            </Typography>
            <Slider
              defaultValue={0}
              step={1}
              marks
              min={1}
              max={10}
              valueLabelDisplay="auto"
              onChange={(_, value: number) => setSeverity(value as number)}
              sx={{
                padding: "0px",
                color: "grey",
              }}
            />
            <Typography
              color="grey"
              fontSize={15}
              fontFamily="Helvetica"
              fontWeight={400}
              letterSpacing={0.00938}
              margin={1}
              gutterBottom
            >
              Story Points
            </Typography>
            <Slider
              defaultValue={1}
              step={null}
              marks={storyPoints}
              min={1}
              max={13}
              valueLabelDisplay="auto"
              onChange={(_, value: number) => setStoryPoint(value as number)}
              sx={{
                padding: "1px",
                color: "grey",
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  paddingTop: "20px",
                }}
              >
                <DatePicker
                  label="Due Date"
                  value={dayjs(deadline as string)}
                  onChange={(date) =>
                    setDeadline(date ? date.toString() : new Date().toString())
                  }
                />
                <DatePicker
                  label="Start Date"
                  value={dayjs(startedAt as string)}
                  onChange={(date) =>
                    setStartedAt(date ? date.toString() : new Date().toString())
                  }
                />
              </Box>
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskUpdateDialog;
