import { useState, useEffect, useContext } from "react";
import Loader from "../components/loader";
import TaskContainer from "../components/taskContainer";
import MainContext from "../store/MainContext";

var hasLoaded = false;

function TaskPage() {
  //Gets context to use variables inside of this this file.
  const taskCtx = useContext(MainContext);
  //Using the useState hook to update the variables.
  const [isLoading, setIsLoading] = useState(true);
  const [loadedTasks, setLoadedTasks] = useState([]);

  /*Gets tasks from firebase realtime database.
  useEffect prevents the code from running multiple times and creating an infinite loop.
  Instead it only runs at the start and when the value of the dependency changes.*/
  useEffect(() => {
    setIsLoading(true);
    //Fetches data from firebase and handling the response
    fetch("https://todo-list-5a67b-default-rtdb.firebaseio.com/tasks.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //Defines the list of
        const tasks = [];

        //For loop that goes through every task and adds the task to a list
        for (const key in data) {
          const task = {
            id: key,
            ...data[key],
          };
          //Adds the task to the list
          tasks.push(task);
        }

        setIsLoading(false);
        //Sets loadedTasks to tasks to be passed into TaskContainer
        setLoadedTasks(tasks);
      })
      //If there is an error, it get caught and outputs the error in the console. It also displays the loading animation. The catch method prevents the site from crashing upon an error.
      .catch((error) => {
        console.log(error);
        return <Loader />;
      });
  }, [taskCtx.task]); //useEffect will run every time this dependency changes its value

  //Display a loading animation while the tasks are being loaded
  if (isLoading && !hasLoaded) {
    hasLoaded = true;
    return (
      <section>
        <Loader />
      </section>
    );
  }

  //Returns a component that contains all of the tasks that has been loaded
  return (
    <div>
      <TaskContainer tasks={loadedTasks} />
    </div>
  );
}

export default TaskPage;
