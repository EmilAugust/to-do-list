import { createContext, useState } from "react";

//Creates context
const MainContext = createContext();

export function MainContextProvider(props) {
  const [task, setTask] = useState([]);
  //Stores the firebase URL to fetch from in a variable
  const baseUrl = "https://todo-list-5a67b-default-rtdb.firebaseio.com/tasks";

  //Sets task to the id of the new task so the useEffect will trigger in taskPage.jsx
  function addTaskHandler(task) {
    setTask(() => {
      return task;
    });
    console.log(task);
  }

  //Removes the task
  function removeTaskHandler(task) {
    //Navigates from the baseURL into the task that shall be removed. It uses the DELETE method from rest API.
    fetch(`${baseUrl}/${task}.json`, { method: "DELETE" })
      .then(() => {
        setTask(() => {
          return task;
        });
        console.log(task);
      })
      //Returns an error message upon an error
      .catch((error) => {
        console.log(error);
        alert("Couldn't remove task\n" + error);
      });
  }

  //Sets task to the id of the edited task so the useEffect will trigger in taskPage.jsx
  function editTaskHandler(task) {
    setTask(() => {
      return task;
    });
    console.log(task);
  }

  /*Defines variables and functions with keys and values.
  The keys are what will be accesible in other files, because context is passed into MainContext.Provider*/
  const context = {
    task: task,
    addTask: addTaskHandler,
    removeTask: removeTaskHandler,
    editTask: editTaskHandler,
  };

  //Returns MainContext.Provider and everything inside with props.children.
  return (
    <MainContext.Provider value={context}>
      {props.children}
    </MainContext.Provider>
  );
}

export default MainContext;
