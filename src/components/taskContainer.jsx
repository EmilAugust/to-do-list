import Todo from "./todo";
import NewTask from "./newTask";
import classes from "./taskContainer.module.css";

function TaskContainer(props) {
  //Loads all tasks from firebase realtime database
  return (
    <div className={classes.taskContainer}>
      <NewTask />
      {props.tasks.map((task) => ( //Creates an array of all of the tasks and returns them
        <Todo
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          due={task.due}
        />
      ))}
    </div>
  );
}

export default TaskContainer;
