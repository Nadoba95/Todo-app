"use strict";
const bgImage = document.querySelector(".background-img");
const headerIcon = document.querySelector(".header__icon");
const typeTodo = document.querySelector(".type-todo");
const list = document.querySelector(".todo-list");
const footer = document.querySelector(".footer");

const btn = document.querySelector(".header__icon");
const input = document.querySelector("#todo-input");

const counter = document.querySelector(".counter");

let todos = [];
let todoNames = [];

function newTodoItem(todo) {
  const listItem = document.createElement("div");
  const checkmark = document.createElement("div");
  const iconCheck = document.createElement("div");
  const checkbox = document.createElement("input");
  const text = document.createElement("p");
  const x = document.createElement("div");

  let obj = todos.find((t) => t.value === todo);

  text.textContent = todo;
  listItem.classList.add("list-item");
  checkmark.classList.add("checkmark");
  iconCheck.classList.add("icon-check");
  checkbox.setAttribute("type", "checkbox");
  x.classList.add("icon-x");

  list.appendChild(listItem);
  listItem.appendChild(checkmark);
  checkmark.appendChild(iconCheck);
  listItem.appendChild(checkbox);
  listItem.appendChild(text);
  listItem.appendChild(x);

  function checkItem() {
    if (checkbox.checked) {
      checkbox.checked = false;
      obj.checked = false;
      text.style.textDecoration = "none";
      text.style.opacity = "1";
      checkmark.classList.remove("checkmark-active");
      iconCheck.classList.remove("icon-check-active");
      countItems();
    } else {
      checkbox.checked = true;
      obj.checked = true;
      text.style.textDecoration = "line-through";
      text.style.opacity = "0.6";
      checkmark.classList.add("checkmark-active");
      iconCheck.classList.add("icon-check-active");
      countItems();
    }
  }

  function removeItem() {
    this.parentElement.remove();
    todos = todos.filter((t) => t !== obj);
    countItems();
  }

  function hover() {
    checkmark.style.border = "solid 1px";
    checkmark.style.borderLeftColor = "hsl(192, 100%, 67%)";
    checkmark.style.borderTopColor = "hsl(192, 100%, 67%)";
    checkmark.style.borderBottomColor = "hsl(280, 87%, 65%)";
    checkmark.style.borderRightColor = "hsl(280, 87%, 65%)";
  }

  function unhover() {
    checkmark.style.border = "hsl(234, 11%, 52%) solid 1px";
  }

  checkmark.addEventListener("click", checkItem);
  text.addEventListener("click", checkItem);
  x.addEventListener("click", removeItem);
  [text, checkmark].forEach((item) =>
    item.addEventListener("mouseover", hover)
  );
  [text, checkmark].forEach((item) =>
    item.addEventListener("mouseout", unhover)
  );
}

function changeTheme() {
  document.body.classList.toggle("body-active");
  bgImage.classList.toggle("background-img-active");
  headerIcon.classList.toggle("header__icon-active");
  typeTodo.classList.toggle("type-todo-active");
  list.classList.toggle("type-todo-active");
  footer.classList.toggle("footer-active");
}

function countItems() {
  const items = todos.filter((item) => item.checked === false).length;
  counter.textContent = `${items} items left`;
}

function showAll() {
  document.querySelectorAll(".filters li").forEach((item, i) => {
    if (i === 0) {
      item.classList.add("filter-active");
    } else {
      item.classList.remove("filter-active");
    }
  });

  document.querySelectorAll(".list-item").forEach((item) => {
    item.style.display = "grid";
  });
}
showAll();

function filterActive() {
  document.querySelectorAll(".filters li").forEach((item, i) => {
    if (i === 1) {
      item.classList.add("filter-active");
    } else {
      item.classList.remove("filter-active");
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
      item.classList.add("filter-active");
    } else {
      item.classList.remove("filter-active");
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
      item.remove();
    }
  });
}

input.addEventListener("keyup", (e) => {
  if (e.kay === "Enter" || e.keyCode === 13) {
    if (todoNames.includes(e.target.value)) {
      e.target.value = "";
      return;
    }
    if (e.target.value !== "") {
      todos.push({ value: e.target.value, checked: false });
      todoNames.push(e.target.value);
      newTodoItem(e.target.value);
      e.target.value = "";
      countItems();
    }
  }
});

btn.addEventListener("click", changeTheme);
