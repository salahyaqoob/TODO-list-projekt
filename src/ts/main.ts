
import { Box } from "./models/content";

let input = document.getElementById("insertTask") as HTMLInputElement;
let form = document.getElementById("addTask") as HTMLFormElement;
let tasksDiv = document.getElementById("newTasks") as HTMLDivElement;
let readytask = document.querySelector("newAddTasks") as HTMLDivElement;
let btn = document.getElementById("save") as HTMLButtonElement;
let textErorr = document.getElementById("error") as HTMLSpanElement;
let sortedBtn = document.getElementById("sort") as HTMLSpanElement;


//Array&list&localstorage
//********************************************************************************* */

let listOfTasks: Box[] = [];

if (localStorage.getItem("newTasks")) {
  listOfTasks = JSON.parse(localStorage.getItem("newTasks"));
}

btn.addEventListener("click", () => {
  if (input.value !== null) {
    addTaskToList(input.value);
    input.value = "";
  }
});
function addTaskToList(x: string) {
  let task = new Box(
    Date.now().toString(),
    x,
    false,
  );
  listOfTasks.push(task);


  //Sorted list

  sortedBtn.addEventListener("click", () => {
    sortedFunction(listOfTasks);

  });
  function sortedFunction(listOfTasks: Box[]) {
    let sortedById = (listOfTasks: Box[]) =>
      listOfTasks.sort((taskA: Box, taskB: Box) => {
        if (taskA.title.toLowerCase() > taskB.title.toLowerCase()) return -1;
        if (taskA.title.toLowerCase() < taskB.title.toLowerCase()) return 1;
        return 0;
      });

    // console.log(task.id);
    let sortedList = sortedById(listOfTasks)
    console.log(sortedById);
    addElementsToPageFrom(sortedList.reverse());

    addElementsToLocalStorage(sortedList);

  }



  // console.log(task.id);
  //  let sortedList=sortedById(listOfTasks)
  //  console.log(sortedById);
  addElementsToPageFrom(listOfTasks);

  addElementsToLocalStorage(listOfTasks);

}



//********************************************************************************* */




//make tasks
//********************************************************************************** */
function addElementsToPageFrom(listOfTasks: Box[]) {
  tasksDiv.innerHTML = " ";
  listOfTasks.forEach((t) => {

    let newDiv = document.createElement("div");
    newDiv.className = "newAddTask";

    if (t.completed) {
      newDiv.className = "newAddTask done";
    }

    newDiv.setAttribute("data-id", t.id);
    newDiv.appendChild(document.createTextNode(t.title));


    let delSpan = document.createElement("span");
    delSpan.className = "del";
    delSpan.appendChild(document.createTextNode("Delete"));//write text(delete) in span
    newDiv.appendChild(delSpan);
    tasksDiv.appendChild(newDiv);



  });

}


//********************************************************************************** */





//LocalStorage
//********************************************************************************** */
getDataFromLocalStorage();

function addElementsToLocalStorage(listOfTasks: Box[]) {
  localStorage.setItem("newTasks", JSON.stringify(listOfTasks));
}

function getDataFromLocalStorage() {
  let data = localStorage.getItem("newTasks");
  if (data) {
    let saveData = JSON.parse(data);
    addElementsToPageFrom(saveData);
  }
}
//********************************************************************************** */




//Delete button
//********************************************************************************** */
tasksDiv.addEventListener("click", (e: Event) => {
  let item = e.target as HTMLSpanElement
  if (item.classList.contains("del")) {
    item.parentElement.remove();//from dom

    deleteTaskFromLocalStorage(item.parentElement.getAttribute("data-id"));
    console.log(item.parentElement.getAttribute("data-id"));
  }

  // ready task
  else if (item.classList.contains("newAddTask")) {
    item.classList.toggle("done");

    toggleReadytTask(item.getAttribute("data-id"));
  }


});

function deleteTaskFromLocalStorage(taskId: string) {
  // listOfTasks.forEach((t)=> {
  //   console.log(t.id+'='+taskId)
  // });
  listOfTasks = listOfTasks.filter((t) => t.id != taskId);
  addElementsToLocalStorage(listOfTasks);
}

//********************************************************************************** */


//Ready button
//********************************************************************************** */

function toggleReadytTask(taskId: string) {
  for (let i = 0; i < listOfTasks.length; i++) {
    let status = listOfTasks[i];

    if (status.id == taskId) {
      status.completed == false ? (status.completed = true) : (status.completed = false);

    }
  }
  addElementsToLocalStorage(listOfTasks);
}


//********************************************************************************** */

//text warning
//********************************************************************************** */
input.addEventListener("input", () => {
  checkLength();
});

function checkLength() {
  let maxLength = input.value.length;
  let length: number = 60;
  if (maxLength == length) {
    textErorr.hidden = false;
    input.classList.add("warning")

  } else {
    textErorr.hidden = true;
    input.classList.remove("warning")
  }
};
//********************************************************************************** */

