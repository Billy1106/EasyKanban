import Container from "@mui/material/Container";
import TaskColumn from "./TaskColumn";
import Box from "@mui/material/Box";
import { Task, STATE } from ".";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
} from "@dnd-kit/core";

import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import DashBoardHeader from "./DashboardHeader";
import { sortTasks, sortByDeadline } from "../../utils/taskUtils.ts";
import DashboardSidebar from "./DashboardSidebar";

const drawerWidth = 300;

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task1",
      title: "Fix login issue",
      severity: 2,
      assignee: "John Doe",
      storyPoint: 5,
      description:
        "Users are unable to log in using their credentials. Needs urgent attention.",
      status: STATE.INPROGRESS,
      deadline: "2024-02-31:20:20:00",
      startedAt: "2024-01-20:20:20:00",
      tags: ["Login", "Urgent"],
    },
    {
      id: "task2",
      title: "Update landing page",
      severity: 4,
      assignee: "Jane Smith",
      storyPoint: 3,
      description:
        "The landing page needs to be updated with the new product information.",
      status: STATE.INPROGRESS,
      deadline: "2024-10-31:20:20:00",
      startedAt: "2024-01-10:20:20:00",
      tags: ["Feature", "Landing Page"],
    },
    {
      id: "task3",
      title: "Database optimization",
      severity: 8,
      assignee: "Alice Johnson",
      storyPoint: 8,
      description:
        "Optimize database queries to improve application performance.",
      status: STATE.DONE,
      deadline: "2024-01-30:20:20:00",
      startedAt: "2023-12-30:20:20:00",
      tags: ["Database"],
    },
    {
      id: "task4",
      title: "Implement new feature",
      severity: 2,
      assignee: "Bob Brown",
      storyPoint: 13,
      description:
        "Implement the new communication feature as per the specifications.",
      status: STATE.STAY,
      deadline: "2024-12-31:20:20:00",
      startedAt: "2024-01-20:20:20:00",
      tags: ["Feature"],
    },
  ]);

  const [visibleTasks, setVisibleTasks] = useState<Task[]>([...tasks]);
  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };
  const [activeId, setActiveId] = useState(null);
  // const [displayMode, setDisplayMode] = useState<MODE>(MODE.BOARD);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const columns = [STATE.BACKLOG, STATE.STAY, STATE.INPROGRESS, STATE.DONE];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  useEffect(() => {
    setVisibleTasks([...sortTasks(tasks, sortByDeadline)]);
  }, []);
  
  function handleDragOver(event) {
    const { active, over } = event;
    const sourceColumn = findColumnByTaskId(active.id);
    const destinationColumn = findColumnByTaskId(over.id);

    if (sourceColumn && destinationColumn) {
      const activeIndex = tasks.findIndex((task) => task.id === activeId);
      const overIndex = tasks.findIndex((task) => task.id === over.id);
      const overTask = tasks[overIndex];
      const activeTask = tasks[activeIndex];
      if (overTask && activeTask) {
        tasks[activeIndex] = overTask;
        tasks[overIndex] = activeTask;
      }
      if (activeTask) {
        activeTask.status = destinationColumn;
      }
    } else {
      const activeIndex = tasks.findIndex((task) => task.id === activeId);
      const activeTask = tasks[activeIndex];
      activeTask.status = over.id;
    }
    setTasks([...tasks]);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const sourceColumn = findColumnByTaskId(active?.id);
    const destinationColumn = findColumnByTaskId(over?.id);
    if (sourceColumn && destinationColumn) {
      setActiveId(null);
    }
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  function handleSidebarToggle(isOpen: boolean) {
    setSidebarOpen(isOpen);
  }

  function handleVisibleTasksUpdated(tasks: Task[]) {
    setVisibleTasks(tasks);
  }

  function findColumnByTaskId(taskId: string): STATE | undefined {
    return tasks.find((task) => task.id === taskId)?.status;
  }

  function findTaskById(taskId: string): Task {
    return tasks.find((task) => task.id === taskId) as Task;
  }

  return (
    <Container maxWidth={false}>
      <DashboardSidebar
        drawerWidth={drawerWidth}
        isOpen={sidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        style={{ padding: "0px" }}
      >
        <Box
          style={{
            transition: "margin 250ms ease-out",
            marginLeft: sidebarOpen ? `${drawerWidth}px` : "0",
          }}
        >
          <Box
            sx={{
              marginBottom: 5,
            }}
          >
            <DashBoardHeader
              tasks={tasks}
              handleVisibleTasksUpdated={handleVisibleTasksUpdated}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "0px",
            }}
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              {columns.map((column) => (
                <TaskColumn
                  key={column}
                  title={column}
                  tasks={visibleTasks.filter((task) => task.status === column)}
                />
              ))}
              <DragOverlay dropAnimation={dropAnimation}>
                {activeId ? (
                  <TaskCard key={activeId} task={findTaskById(activeId)} />
                ) : (
                  <></>
                )}
              </DragOverlay>
            </DndContext>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Dashboard;
