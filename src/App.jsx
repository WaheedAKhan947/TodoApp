import { useEffect, useState } from "react";
import { MdOutlineDelete, MdCheck } from "react-icons/md";
const App = () => {
  const [greenButton, setGreenButton] = useState(false);

  const [allTasks, setAllTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleAddTodo = () => {
    if (newTitle.trim() === "" && newDescription.trim() === "") {
      return alert("Cannot Create Empty Task...! \nKindly add title and Description....!")
    }
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };
    let updatedTodoArr = [...allTasks];
    updatedTodoArr.push(newTodoItem);
    setAllTasks(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (index) => {
    let reducedTodoArr = [...allTasks];
    reducedTodoArr.splice(index,1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodoArr));
    setAllTasks(reducedTodoArr);
  };
  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + mm + "-" + yy + " at " + h + ":" + m + ":" + s;

    let filteredTasks = {
      ...allTasks[index],
      completedOn: completedOn,
    };
    let updatedCompletedArr = [...completedTasks];
    updatedCompletedArr.push(filteredTasks);
    setCompletedTasks(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedlist", JSON.stringify(updatedCompletedArr));
  };
  const handleDeleteCompletedTasks=index=>{
    let reducedTodoArr = [...completedTasks];
    reducedTodoArr.splice(index,1);
    localStorage.setItem("completedlist", JSON.stringify(reducedTodoArr));
    setCompletedTasks(reducedTodoArr);
  }
  useEffect(() => {
    let savedList = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedList = JSON.parse(localStorage.getItem("completedlist"));
    if (savedList) {
      setAllTasks(savedList);
    }
    if (savedCompletedList) {
      setCompletedTasks(savedCompletedList);
    }
  }, []);
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-center">Your Todo App</h1>
        <div className="bg-gray-800 m-8 p-8 flex flex-col items-start gap-8 w-fit">
          <div className="flex justify-center items-start md:items-end flex-col md:flex-row gap-8 text-white">
            <div className="flex flex-col gap-y-3 text-xl md:text-lg">
              <label htmlFor="">Title</label>
              <input
                className="p-2 text-black focus:border-red-300"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Title of your Task?"
              />
            </div>
            <div className="flex flex-col gap-y-3 text-xl md:text-lg">
              <label htmlFor="">Description</label>
              <input
                className="p-2 text-black"
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Description of your Task?"
              />
            </div>
            <div className="  bg-green-500 text-xl md:text-lg hover:bg-green-800">
              <button type="button" className="p-2" onClick={handleAddTodo}>
                Add
              </button>
            </div>
          </div>
          <div className="flex ">
            <div className="  text-xl md:text-lg ">
              <button
                type="button"
                className={`p-2 ${
                  greenButton === false ? "bg-green-500" : "bg-gray-500"
                }`}
                onClick={() => setGreenButton(false)}
              >
                To do
              </button>
            </div>
            <div className="  text-xl md:text-lg ">
              <button
                type="button"
                className={`p-2 ${
                  greenButton === true ? "bg-green-500" : "bg-gray-500"
                }`}
                onClick={() => setGreenButton(true)}
              >
                Completed
              </button>
            </div>
          </div>

          {greenButton === false &&
            allTasks.map((item, index) => {
              return (
                <div
                  className="flex items-center justify-between w-64 h-auto md:w-4/5 bg-gray-700 p-3 shadow-2xl shadow-black"
                  key={index}
                >
                  <div className="flex flex-col w-44 md:w-4/5 text-wrap">
                    <h2 className="text-green-500 md:text-3xl text-lg overflow-hidden uppercase">
                      {item.title}
                    </h2>
                    <p className="text-gray-400 md:text-lg text-xs overflow-hidden">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex text-2xl cursor-pointer">
                    <MdOutlineDelete
                      className="text-red-700 hover:text-red-900"
                      onClick={() => handleDeleteTodo(index)}
                    />
                    <MdCheck
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleComplete(index)}
                    />
                  </div>
                </div>
              );
            })}
          {greenButton === true &&
            completedTasks.map((item, index) => {
              return (
                <div
                  className="flex items-center justify-between w-56 md:w-96 bg-gray-700 p-3 shadow-2xl shadow-black"
                  key={index}
                >
                  <div className="">
                    <h2 className="text-green-500 md:text-3xl text-lg uppercase">
                      {item.title}
                    </h2>
                    <p className="text-gray-400 md:text-lg text-md">
                      {item.description}
                    </p>
                    <p>
                      <small>Completed on: {item.completedOn}</small>
                    </p>
                  </div>
                  <div className="flex text-2xl cursor-pointer">
                    <MdOutlineDelete
                      className="text-red-700 hover:text-red-900"
                      onClick={() => handleDeleteCompletedTasks(index)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default App;
