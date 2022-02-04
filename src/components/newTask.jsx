import classes from "./newTask.module.css";
import { useState } from "react";
import NewTaskForm from "./newTaskForm";
import Backdrop from "./backdrop";

function NewTask() {
  const [formIsOpen, setFormIsOpen] = useState(false);

  //Functions for opening and closing the form
  function openForm() {
    setFormIsOpen(true);
  }

  function closeForm() {
    setFormIsOpen(false);
  }

  function confirmForm() {
    setFormIsOpen(false);
  }

  return (
    <div>
      <button className={classes.newTaskCard} onClick={openForm}>
        <h3>Create New Task</h3>
        <p>
          Do you have task that needs to be done? Click on this tile to add a
          new task to the grid.
        </p>
      </button>
      {formIsOpen && (
        <NewTaskForm onCancel={closeForm} onConfirm={confirmForm} />
      )}
      {formIsOpen && <Backdrop onCancel={closeForm} />}
    </div>
  );
}

export default NewTask;
