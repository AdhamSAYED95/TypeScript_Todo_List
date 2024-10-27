import "./css/style.css";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplate from "./templates/ListTemplates";

const appInitializer = (): void => {
  const fullList = FullList.instance;
  const listTemplate = ListTemplate.instance;

  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;

  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();

    const itemInput = document.getElementById("newItem") as HTMLInputElement;

    const newIntryText: string = itemInput.value.trim();

    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    const newItem = new ListItem(itemId.toString(), newIntryText);

    fullList.addItem(newItem);

    listTemplate.render(fullList);

    itemInput.value = "";
  });

  const clearItem = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;

  clearItem.addEventListener("click", (): void => {
    fullList.clearList();
    listTemplate.clear();
  });

  fullList.load();
  listTemplate.render(fullList);
};

document.addEventListener("DOMContentLoaded", appInitializer);
