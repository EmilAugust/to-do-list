import { useRef, useContext } from "react";
import MainContext from "../store/MainContext";
import classes from "./newTaskForm.module.css";

function EditTaskForm(props) {
  //using the useRef hook to see what's inputted into the form inputs
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const priorityInputRef = useRef();
  const dueInputRef = useRef();
  const timeInputRef = useRef();

  //Gets context
  const submitCtx = useContext(MainContext);

  //submitHandler runs when the onSubmit event activates
  function submitHandler(event) {
    //Prevent the default behavior of a form. Prevents it from reloading the site.
    event.preventDefault();

    //Creates variables and set the value to the inputs
    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredPriority = priorityInputRef.current.value;
    const enteredDue = dueInputRef.current.value;
    const enteredTime = timeInputRef.current.value;

    //Formatting the due so that the enteredDue and enteredTime is the same string
    var formattedDue =
      enteredDue.split("-").reverse().join(".") + " - " + enteredTime;

    //Stores all the taskData in a hashmap
    const taskData = {
      title: enteredTitle,
      description: enteredDescription,
      priority: enteredPriority,
      due: formattedDue,
    };

    //Edits tasks by updating the data in firebase realtime database with the PATCH method from rest API
    fetch(
      `https://todo-list-5a67b-default-rtdb.firebaseio.com/tasks/${submitCtx.task}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(taskData),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(() => {
        //Using the onConfirm prop to close the form and passing taskData into context
        props.onConfirm();
        submitCtx.editTask(taskData);
      })
      //Handles errors and shows the error
      .catch((error) => {
        props.onConfirm();
        console.log(error);
        alert("Couldn't edit task\n" + error);
      });
  }

  return (
    <div className={classes.backdrop}>
      <div className={classes.lightbox}>
        <h3>Edit Task</h3>
        <form action="" onSubmit={submitHandler}>
          <div className={classes.input}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              required
              type="text"
              ref={titleInputRef}
              maxLength="50"
            />
          </div>
          <div className={classes.input}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              required
              rows="5"
              ref={descriptionInputRef}
              className={classes.desc}
              maxLength="150"
            ></textarea>
          </div>
          <div className={classes.input}>
            <label htmlFor="priority">Priority</label>
            <select
              name="Priority"
              required
              id="priority"
              ref={priorityInputRef}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className={classes.input}>
            <label htmlFor="due">Due</label>
            <div className={classes.due}>
              <input id="due" type="date" required ref={dueInputRef} />
              <input id="time" type="time" required ref={timeInputRef} />
            </div>
          </div>
          <div className={classes.buttons}>
            <button
              onClick={props.onCancel}
              type="button"
              className={classes.cancel}
            >
              Cancel
            </button>
            <button type="submit" className={classes.confirm}>
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskForm;
