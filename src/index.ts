import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import * as inquirer from "inquirer";

let todos = [
  new TodoItem(1, "Kupić kwiaty"),
  new TodoItem(2, "Odebrać buty"),
  new TodoItem(3, "Zamówić Bilety"),
  new TodoItem(4, "Zadzwonić do Janka", true),
];

let collection = new TodoCollection("Lukasz", todos);
let showCompleted = true;

function displayTodoList(): void {
  console.log(
    `Lista ${collection.userName}a ` +
      `(liczba zadań pozostałych do zrobienia: ${
        collection.getItemsCounts().incomplete
      })`
  );
  collection.getTodoItems(showCompleted).forEach((item) => item.printDetails());
}

enum Commands {
  Add = "Dodaj nowe zadanie",
  Complete = "Wykonanie zadania",
  Toggle = "Pokaż lub ukryj wykonane",
  Purge = "Usuń wyklonane zadania",
  Quit = "Koniec",
}

function promptAdd(): void {
  console.clear();
  inquirer
    .prompt({
      type: "input",
      name: "add",
      message: "Podaj zadanie:",
    })
    .then((answers) => {
      if (answers["add"] !== "") {
        collection.addTodo(answers["add"]);
        promptUser();
      }
    });
}

function promptComplete(): void {
  console.clear();
  inquirer
    .prompt({
      type: "checkbox",
      name: "complete",
      message: "Oznaczenie zadań jako wykonanych",
      choices: collection.getTodoItems(showCompleted).map((item) => ({
        name: item.task,
        value: item.id,
        checked: item.complete,
      })),
    })
    .then((answers) => {
      let completedTasks = answers["complete"] as number[];
      collection
        .getTodoItems(true)
        .forEach((item) =>
          collection.markComplete(
            item.id,
            completedTasks.find((id) => id === item.id) != undefined
          )
        );
      promptUser;
    });
}

function promptUser(): void {
  console.clear();
  displayTodoList();
  inquirer
    .prompt({
      type: "list",
      name: "command",
      message: "Wybierz opcję",
      choices: Object.values(Commands),
    })
    .then((answers) => {
      switch (answers["command"]) {
        case Commands.Toggle:
          showCompleted = !showCompleted;
          promptUser();
          break;
        case Commands.Add:
          promptAdd();
          break;
        case Commands.Complete:
          if (collection.getItemsCounts().incomplete > 0) {
            promptComplete();
          } else {
            promptUser();
          }
          break;
        case Commands.Purge:
          collection.removeComplete();
          promptUser();
          break;
      }
    });
}
promptUser();
// console.clear();
// console.log(
//   `Lista ${collection.userName}a` +
//     ` (liczba zadań pozostałych do zrobienia: ${
//       collection.getItemsCounts().incomplete
//     })`
// );

// collection.removeComplete();
// collection.getTodoItems(true).forEach((item) => item.printDetails());
