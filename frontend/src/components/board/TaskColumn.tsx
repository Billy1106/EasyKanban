import TaskCard from "./TaskCard";
import { Task } from ".";
import { Badge, Box, IconButton, Typography } from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddIcon from "@mui/icons-material/Add";
import TaskUpdateDialog from "./dialogs/TaskUpdateDialog";
import { useState } from "react";

function TaskColumn({ tasks, title }: { tasks: Task[]; title: string }) {
  const { setNodeRef } = useDroppable({ id: title });
  const [addTaskOpen, setAddTaskOpen] = useState<boolean>(false);
  const taskIds = tasks.map((task) => task.id);

  function handleCloseDialog(task: Task | null) {
    if (task) {
      //add task here
    }
    setAddTaskOpen(false);
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <Badge badgeContent={tasks.length} color="secondary">
          <Typography fontFamily="Inter" fontWeight="600" fontSize="20px">
            {title}
          </Typography>
        </Badge>
      </Box>
      <Box>
        <SortableContext
          id={title}
          items={taskIds}
          strategy={verticalListSortingStrategy}
        >
          <div
            ref={setNodeRef}
            style={{
              minHeight: "600px",
              minWidth: "340px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {tasks.length > 0 ? (
              tasks.map((task: Task) => <TaskCard key={task.id} task={task} />)
            ) : (
              <div
                style={{ padding: "10px", textAlign: "center", color: "grey" }}
              >
                Drop items here
              </div>
            )}
            <IconButton
              sx={{
                maxWidth: 340,
                borderRadius: 2,
              }}
              onClick={() => setAddTaskOpen(true)}
            >
              <AddIcon />
            </IconButton>
          </div>
        </SortableContext>
        <TaskUpdateDialog open={addTaskOpen} onClose={handleCloseDialog} />
      </Box>
    </Box>
  );
}
export default TaskColumn;
