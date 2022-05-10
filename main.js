"use strict";
const bgImage = document.querySelector(".background-img");
const headerIcon = document.querySelector(".header__icon");
const typeTodo = document.querySelector(".type-todo");
const footer = document.querySelector(".footer");
const filtersMob = document.querySelector(".filters-mobile");
const list = document.querySelector(".todo-list");
const btn = document.querySelector(".header__icon");
const input = document.querySelector("#todo-input");
const counter = document.querySelector(".counter");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderItems(items = []) {
  list.innerHTML = items
    .map((item, i) => {
      return `<div class="list-item drag-item ${
        item.checked ? "active" : ""
      }" draggable="true">
                <label>${item.text}</label>
                <div class="checkmark">
                  <span class="icon-check"></span>
                </div>
                <input type="checkbox" data-index=${i} ${
        item.checked ? "checked" : ""
      } />
                <span class="icon-x"></span>
              </div>`;
    })
    .join("");
}

function addItem(e) {
  if (e.kay === "Enter" || e.keyCode === 13) {
    const item = {
      text: e.target.value.trim(),
      checked: false,
    };

    if (item.text === "") {
      alert("Can't be empty.");
      return;
    }
    if (item.text.match(/<|>/g)) {
      alert("Can't contains < and > symbols, please enter valid input.");
      return;
    }

    todos.push(item);
    renderItems(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
    countItems();
    e.target.value = "";
  }
}

function checkItem(e) {
  if (
    e.target.matches("label") ||
    e.target.matches(".checkmark") ||
    e.target.matches(".icon-check")
  ) {
    const checkbox = e.target.closest(".list-item").querySelector("input");
    const listItem = e.target.closest(".list-item");

    if (checkbox.checked) {
      todos[checkbox.dataset.index].checked = false;
      listItem.classList.remove("active");
      renderItems(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
      countItems();
      showAll();
    } else {
      todos[checkbox.dataset.index].checked = true;
      listItem.classList.add("active");
      renderItems(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
      countItems();
      showAll();
    }
  } else if (e.target.matches(".icon-x")) {
    const { index } = e.target
      .closest(".list-item")
      .querySelector("input").dataset;

    e.target.parentElement.remove();
    todos.splice(index, 1);
    renderItems(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
    countItems();
  }
}

function countItems() {
  const items = todos.filter((item) => item.checked === false).length;
  counter.textContent = `${items} items left`;
}

function showAll() {
  document.querySelectorAll(".filters li").forEach((item, i) => {
    if (i === 0) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  document.querySelectorAll(".filters-mobile li").forEach((item, i) => {
    if (i === 0) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  document.querySelectorAll(".list-item").forEach((item) => {
    item.style.display = "grid";
  });
}

function filterActive() {
  document.querySelectorAll(".filters li").forEach((item, i) => {
    if (i === 1) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  document.querySelectorAll(".filters-mobile li").forEach((item, i) => {
    if (i === 1) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  document.querySelectorAll(".list-item").forEach((item) => {
    item.style.display = "grid";
    if (item.querySelector("input").checked) {
      item.style.display = "none";
    }
  });
}

function filterCompleted() {
  document.querySelectorAll(".filters li").forEach((item, i) => {
    if (i === 2) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  document.querySelectorAll(".filters-mobile li").forEach((item, i) => {
    if (i === 2) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  document.querySelectorAll(".list-item").forEach((item) => {
    item.style.display = "grid";
    if (!item.querySelector("input").checked) {
      item.style.display = "none";
    }
  });
}

function clearCompleted() {
  document.querySelectorAll(".list-item").forEach((item) => {
    if (item.querySelector("input").checked) {
      const { index } = item.querySelector("input").dataset;
      todos.splice(index, 1, "");
      item.remove();
    }
  });

  todos = todos.filter((t) => t !== "");
  renderItems(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
  showAll();
}

function dragStart(e) {
  e.target.classList.add("draggable-element");
}

function dragEnd(e) {
  e.target.classList.remove("draggable-element");

  document.querySelectorAll(".list-item").forEach((item, i) => {
    const text = item.querySelector("label").textContent;
    const bool = item.querySelector("input").checked ? true : false;

    todos[i].text = text;
    todos[i].checked = bool;
  });

  renderItems(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function dragOver(e) {
  e.preventDefault();

  const dragElement = document.querySelector(".draggable-element");
  const currentElement = e.target;

  const canSort =
    dragElement !== currentElement &&
    currentElement.classList.contains("drag-item");

  if (!canSort) return;

  const nextElement =
    currentElement === dragElement.nextElementSibling
      ? currentElement.nextElementSibling
      : currentElement;

  list.insertBefore(dragElement, nextElement);
}

function changeTheme() {
  document.body.classList.toggle("active");
  bgImage.classList.toggle("active");
  headerIcon.classList.toggle("active");
  typeTodo.classList.toggle("active");
  list.classList.toggle("active");
  footer.classList.toggle("active");
  filtersMob.classList.toggle("active");
}

showAll();
renderItems(todos);
countItems();

input.addEventListener("keyup", addItem);
list.addEventListener("click", checkItem);
list.addEventListener("dragstart", dragStart);
list.addEventListener("dragend", dragEnd);
list.addEventListener("dragover", dragOver);
btn.addEventListener("click", changeTheme);
