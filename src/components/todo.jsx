import classes from "./todo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import MainContext from "../store/MainContext";
import EditTaskForm from "./editTaskForm";
import Backdrop from "./backdrop";

function Todo(props) {
  //Gets context
  const taskCtx = useContext(MainContext);

  //Function for removing the task
  function removeTaskHandler(id) {
    //Passes in the id for it to be handled inside of context
    taskCtx.removeTask(id);
  }

  const [formIsOpen, setFormIsOpen] = useState(false);

  //Functions for opening and closing the form
  function openForm(id) {
    //Passes in the id of the task, that you want to edit, into context
    taskCtx.editTask(id);
    setFormIsOpen(true);
  }

  function closeForm() {
    setFormIsOpen(false);
  }

  function confirmForm() {
    setFormIsOpen(false);
  }

  //Creates the task component
  return (
    <div>
      <div className={classes.taskCard}>
        <div className={classes.cardTopBar}>
          <button
            className={classes.remove}
            onClick={() => removeTaskHandler(props.id)}
          >
            <FontAwesomeIcon icon="times" />
          </button>
          <button className={classes.edit} onClick={() => openForm(props.id)}>
            <FontAwesomeIcon icon="edit" />
          </button>
        </div>
        <div className={classes.cardContent}>
          <h3 className={classes.taskTitle}>{props.title}</h3>
          <p className={classes.description}>{props.description}</p>
        </div>
        <div className={classes.bottomContent}>
          <label className={classes.priority}>Priority: {props.priority}</label>
          <label className={classes.date}>Due: {props.due}</label>
        </div>
      </div>
      {formIsOpen && (
        <EditTaskForm onCancel={closeForm} onConfirm={confirmForm} />
      )}
      {formIsOpen && <Backdrop onCancel={closeForm} />}
    </div>
  );
}

export default Todo;
