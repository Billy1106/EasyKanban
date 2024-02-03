// In src/posts/PostCard.tsx
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CardActions,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from ".";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

function TaskCard({ task }: { task: Task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    setActivatorNodeRef,
    isDragging,
    transition,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  const calculateBorderCompletion = (deadline: string, startedDate: string) => {
    const started = new Date(startedDate);
    const dueDate = new Date(deadline);
    const today = new Date();
    const remainingTime = dueDate.getTime() - today.getTime();
    const totalTime = dueDate.getTime() - started.getTime();
    return Math.floor((1 - remainingTime / totalTime) * 100);
  };

  const borderCompletion = calculateBorderCompletion(
    task.deadline,
    task.startedAt
  );

  return (
    <Box
      sx={{ marginBottom: 2, display: "flex", justifyContent: "center" }}
      ref={setNodeRef}
      style={style}
    >
      <Card
        sx={{
          maxWidth: 340,
          boxShadow: 0,
          borderRadius: 2,
        }}
        id={task.id}
        ref={setNodeRef}
      >
        <CardContent style={{ paddingBottom: "0px" }}>
          <Box sx={{ gap: "10px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", gap: "10px" }}>
                {task.tags.map((tag) => (
                  <Chip label={tag} size="small" />
                ))}
              </Box>
              <Box
                sx={{ cursor: isDragging ? "grabbing" : "grab" }}
                ref={setActivatorNodeRef}
                {...attributes}
                {...listeners}
              >
                <DragHandleIcon />
              </Box>
            </Box>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              m={1}
              sx={{ color: "#3a3a3a", marginLeft: "0px" }}
            >
              {task.title}
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ color: "#4a4a4a" }}>
            {task.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "0px",
            }}
          >
            <CardActions
              sx={{
                padding: "0px",
              }}
            >
              <IconButton
                size="small"
                sx={{
                  padding: "0px",
                }}
              >
                <AccountCircleIcon />
              </IconButton>
              <Typography
                variant="body2"
                sx={{
                  color: "#4a4a4a",
                  justifyContent: "center",
                  marginLeft: "0px",
                }}
              >
                {task.assignee}
              </Typography>
            </CardActions>
            <CardActions>
              <IconButton size="small">
                {borderCompletion > 100 ? (
                  <LocalFireDepartmentIcon sx={{ color: "red" }} />
                ) : (
                  <DateRangeIcon />
                )}
              </IconButton>
              <Typography
                variant="body2"
                sx={{
                  color: "#4a4a4a",
                  justifyContent: "center",
                }}
                style={{
                  color: borderCompletion > 90 ? "red" : "black",
                  marginLeft: "0px",
                }}
              >
                {dateFormatter(task.deadline)}
              </Typography>
            </CardActions>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

function dateFormatter(date: string): string {
  const d = new Date(date);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) {
    return "Today " + d.toLocaleTimeString().slice(0, 5);
  }
  return d.toDateString();
}

export default TaskCard;
