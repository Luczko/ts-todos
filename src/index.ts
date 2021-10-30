import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

let todos = [
  new TodoItem(1, "Kupić kwiaty"),
  new TodoItem(2, "Odebrać buty"),
  new TodoItem(3, "Zamówić Bilety"),
  new TodoItem(4, "Zadzwonić do Janka", true),
];

let collection = new TodoCollection("Lukasz", todos);

console.clear();
console.log(`Lista ${collection.userName}a`);

collection.getTodoItems(true).forEach((item) => item.printDetails());
