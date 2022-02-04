import TaskPage from "./pages/taskPage";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { MainContextProvider } from "./store/MainContext";

//Allows the code to use font awesome icons
library.add(fas);

function App() {
  //Returns everything on the app
  return (
    //Wrapping the code in MainContextProvider to allow values to work accross components
    <MainContextProvider>
      <div className="App">
        <div className="pageTop">
          <h1 className="title">Task Board</h1>
        </div>
        <TaskPage />
      </div>
    </MainContextProvider>
  );
}

export default App;
