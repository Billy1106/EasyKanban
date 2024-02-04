import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { STATE, TAG, TAG_COLOR, Task } from "..";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ErrorAlert from "../../global/ErrorAlert";
// import SuccessAlert from "../../global/SuccessAlert";

export interface TaskUpdateDialogProps {
  open: boolean;
  onClose: (task: Task | null) => void;
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
  const [success, setSuccess] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  const { onClose, open } = props;

  const handleAddTag = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && tagInput) {
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleCancel = () => {
    onClose(null);
  };

  const handleSubmit = () => {
    try {
      setSuccess(true);
      onClose({
        id: title + Math.random().toString(),
        title,
        description,
        assignee,
        severity,
        storyPoint,
        status: STATE.BACKLOG,
        deadline,
        startedAt,
        tags: tags,
      } as unknown as Task);
    } catch (err) {
      console.log(err);
      setSuccess(false);
      setError("Failed to create task");
    }
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
              rows="15"
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
              onChange={(_, value: number | number[]) => setSeverity(value as number)}
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
              onChange={(_, value: number | number[]) => setStoryPoint(value as number)}
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
            <Box sx={{ marginTop: 2 }}>
              <TextField
                label="Add a tag"
                variant="outlined"
                size="small"
                fullWidth
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                sx={{ marginBottom: 2 }}
              />
              {tags.map((tag, index) => (
                <Chip
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                  key={index}
                  size="small"
                  sx={{
                    backgroundColor: TAG_COLOR[tag as TAG] + "30" ?? "#F5F5F5",
                    color: TAG_COLOR[tag as TAG] ?? "#4a4a4a",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "600",
                    margin: "2px",
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>{success ? <></> : <ErrorAlert error={error} />}</Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            gap: "10px",
          }}
        >
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default TaskUpdateDialog;
