import React, { useState } from "react";

const InputComponent = () => {
  let functions = [];
  let categoryA = [];
  let categoryB = [];
  let categoryC = [];
  let categoryD = [];

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  function handleFunction(e) {
    e.preventDefault();
    let textId = document.querySelector("#textId");
    textId.value = "";
    let textAreaId = document.querySelector("#textAreaId");
    textAreaId.value = "";
    let functionContent = Function(`${content}`);
    console.log(content);
    let functionResult = functionContent();
    functions = JSON.parse(localStorage.getItem("functions") || "[]");
    functions.push({ name: name, logic: content, result: functionResult });
    localStorage.setItem("functions", JSON.stringify(functions));
    //changeName(name);
    addToCategoryA(name);
  }

  function addToCategoryA(name) {
    categoryA = JSON.parse(localStorage.getItem("categoryA") || "[]");
    categoryA.push({ name: name });
    localStorage.setItem("categoryA", JSON.stringify(categoryA));
    showA();
  }
  function showA() {
    let catA = document.querySelector("#catA");
    catA.innerHTML = "";
    let aArray = JSON.parse(localStorage.getItem("categoryA") || "[]");
    for (let i = 0; i < aArray.length; i++) {
      let text = aArray[i].name;
      let btn = document.createElement("button");
      btn.textContent = text;
      btn.draggable = true;
      btn.style.border = "1px solid black";
      btn.style.padding = "6px";
      btn.style.borderRadius = "5px";
      btn.id = text;
      btn.ondragstart = function (e) {
        let id = e.target.id;
        e.dataTransfer.setData("text/plain", id);
      };
      catA.appendChild(btn);
    }
    performOnClick("A");
  }
  function showB() {
    let catB = document.querySelector("#catB");
    catB.innerHTML = "";
    let bArray = JSON.parse(localStorage.getItem("categoryB") || "[]");
    for (let i = 0; i < bArray.length; i++) {
      let text = bArray[i].name;
      let btn = document.createElement("button");
      btn.textContent = text;
      btn.draggable = true;
      btn.style.border = "1px solid black";
      btn.style.padding = "6px";
      btn.style.borderRadius = "5px";
      btn.id = text;
      console.log(btn);
      btn.ondragstart = function (e) {
        console.log(e.target.id);
        let id = e.target.id;
        console.log(id);
        e.dataTransfer.setData("text/plain", id);
      };
      catB.appendChild(btn);
    }
    performOnClick("B");
  }

  function showC() {
    let catC = document.querySelector("#catC");
    catC.innerHTML = "";
    let cArray = JSON.parse(localStorage.getItem("categoryC") || "[]");
    for (let i = 0; i < cArray.length; i++) {
      let text = cArray[i].name;
      let btn = document.createElement("button");
      btn.textContent = text;
      btn.draggable = true;
      btn.style.border = "1px solid black";
      btn.style.padding = "6px";
      btn.style.borderRadius = "5px";
      btn.id = text;
      console.log(btn);
      btn.ondragstart = function (e) {
        console.log(e.target.id);
        let id = e.target.id;
        console.log(id);
        e.dataTransfer.setData("text/plain", id);
      };
      catC.appendChild(btn);
    }
    performOnClick("C");
  }
  function showD() {
    let catD = document.querySelector("#catD");
    catD.innerHTML = "";
    let dArray = JSON.parse(localStorage.getItem("categoryD") || "[]");
    for (let i = 0; i < dArray.length; i++) {
      let text = dArray[i].name;
      let btn = document.createElement("button");
      btn.textContent = text;
      btn.draggable = true;
      btn.style.border = "1px solid black";
      btn.style.padding = "6px";
      btn.style.borderRadius = "5px";
      btn.id = text;
      console.log(btn);
      btn.ondragstart = function (e) {
        console.log(e.target.id);
        let id = e.target.id;
        console.log(id);
        e.dataTransfer.setData("text/plain", id);
      };
      catD.appendChild(btn);
    }
    performOnClick("D");
  }

  function showAllCategories() {
    addAllListeners();
    showA();
    showB();
    showC();
    showD();
  }

  function addAllListeners() {
    let catA = document.querySelector("#catA");

    let catB = document.querySelector("#catB");

    let catC = document.querySelector("#catC");

    let catD = document.querySelector("#catD");
    let arr = [catA, catB, catC, catD];
    arr.forEach((eachEle) => {
      eachEle.ondragover = function (e) {
        console.log("ONDRAGOVER");
        e.preventDefault();
      };
      eachEle.ondrop = function (e) {
        console.log("ONDROP");
        let id = e.dataTransfer.getData("text");
        console.log(id);
        let draggable = document.getElementById(id);
        console.log(draggable);
        let srcId = draggable.parentElement.id;
        const dropzone = e.target;
        dropzone.appendChild(draggable);
        let targetId = e.target.id;

        updateLocalStorage(srcId, targetId, id);

        e.dataTransfer.clearData();
      };
    });
  }
  function updateLocalStorage(srcId, targetId, id) {
    let srcLocalStorage = "category" + srcId[3];
    let targetLocalStorage = "category" + targetId[3];
    let srcArray = JSON.parse(localStorage.getItem(srcLocalStorage) || "[]");
    let targetArray = JSON.parse(
      localStorage.getItem(targetLocalStorage) || "[]"
    );
    if (srcArray.length > 0) {
      let index = srcArray.findIndex((value) => value.name === id);
      srcArray.splice(index, 1);
      localStorage.setItem(srcLocalStorage, JSON.stringify(srcArray));
    }
    targetArray.push({ name: id });
    localStorage.setItem(targetLocalStorage, JSON.stringify(targetArray));
  }

  function performOnClick(char) {
    const parentId = "cat" + char;

    const parent = document.getElementById(parentId);
    const buttons = parent.childNodes;
    for (let i = 0; i < buttons.length; i++) {
      let textC = buttons[i].outerText;
      let objFound = searchFromLocalStorage(textC);
      buttons[i].onclick = () => {
        appendTheResult(objFound);
      };
    }
  }

  function searchFromLocalStorage(textC) {
    let functions = JSON.parse(localStorage.getItem("functions") || "[]");
    let index = functions.findIndex((obj) => {
      return obj.name === textC;
    });
    return functions[index];
  }

  function appendTheResult(objFound) {
    let resultArea = document.querySelector(".resultArea");
    resultArea.innerHTML = "";
    let header = document.createElement("p");
    let functionLogic = document.createElement("p");
    let functionResult = document.createElement("p");
    header.textContent = `The Logic of the function ${objFound.name} is as follows:`;
    header.style.padding = "3px";
    header.style.font = " italic 24px  cursive";
    header.style.backgroundColor = "green";
    header.style.borderRadius = "3px";
    header.style.margin = "5px";
    functionLogic.textContent = `${objFound.logic}`;

    functionLogic.style.padding = "3px";
    functionResult.textContent = `The Result of the function ${objFound.name} is : ${objFound.result}`;
    functionResult.style.padding = "3px";
    functionResult.style.font = " italic 18px  georgia";
    functionResult.style.backgroundColor = "plum";
    functionResult.style.borderRadius = "3px";
    functionResult.style.margin = "5px";

    resultArea.appendChild(header);
    resultArea.appendChild(functionLogic);
    resultArea.appendChild(functionResult);
  }

  return (
    <>
      {document.addEventListener("DOMContentLoaded", showAllCategories)}
      <form className="flex flex-col w-full  flex justify-start items-center gap-4 mt-8">
        <input
          type="text"
          placeholder="Enter the name of the function"
          className="border-4 border-black rounded-md p-5 focus:outline-none w-1/4 shadow-lg shadow-gray-400/50"
          onChange={(e) => setName(e.target.value)}
          id="textId"
        />
        <textarea
          placeholder="Enter your code here!"
          className="border-4 border-black rounded-md p-5 focus:outline-none w-1/4 shadow-lg shadow-gray-400/50"
          onChange={(e) => setContent(e.target.value)}
          id="textAreaId"
        />
        <button
          className="text-xl mt-4 border-gray-700 border-2 rounded-xl p-2 shadow-lg shadow-gray-600/50 hover:bg-gray-400 hover:text-white"
          id="saveBtn"
          onClick={handleFunction}
        >
          Save it
        </button>
      </form>
    </>
  );
};

export default InputComponent;
