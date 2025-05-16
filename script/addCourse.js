let logo = document.getElementById("logo");

logo.onclick = function () {
    window.location.reload();
}


let addCoureseLetter = document.getElementById("addCoureseLetter");
addCoureseLetter.onclick = function () {
    window.location.reload();
}

let homeLetter = document.getElementById("homeLetter");
homeLetter.onclick = function () {
    window.location.href = "dashboard.html";
}

let addCourseForm = document.getElementById("addCourseForm");

let moduleDiv = document.getElementById("moduleDiv");
let container = document.getElementById("container");
let addModuleBtn = document.getElementById("addModuleBtn");

function addResource(resourceContainer) {
    let resourceGroup = document.createElement("div");
    resourceGroup.setAttribute("class", "resourceGroup");

    let resourceTitle = document.createElement("label");
    resourceTitle.innerText = "Resource Title";
    let resourceTitleInput = document.createElement("input");
    resourceTitleInput.setAttribute("type", "text");
    resourceTitleInput.setAttribute("placeholder", "Enter resource title");

    let resourceUrl = document.createElement("label");
    resourceUrl.innerText = "Resource URL";
    let resourceUrlInput = document.createElement("input");
    resourceUrlInput.setAttribute("type", "text");
    resourceUrlInput.setAttribute("placeholder", "Enter resource URL");

    resourceGroup.appendChild(resourceTitle);
    resourceGroup.appendChild(resourceTitleInput);
    resourceGroup.appendChild(resourceUrl);
    resourceGroup.appendChild(resourceUrlInput);

    resourceContainer.appendChild(resourceGroup);
}



function createModule() {
    let moduleBox = document.createElement("div");
    moduleBox.setAttribute("class", "moduleBox");

    let moduleInput = document.createElement("input");
    moduleInput.setAttribute("type", "text");
    moduleInput.setAttribute("class", "moduleTitle");
    moduleInput.setAttribute("placeholder", "Module Title");

    let resourceContainer = document.createElement("div");
    resourceContainer.setAttribute("class", "resourceContainer");

    let addResourceBtn = document.createElement("button");
    addResourceBtn.setAttribute("type", "button");
    addResourceBtn.setAttribute("class", "addResourceBtn");
    addResourceBtn.innerText = "Add Resource";

    addResourceBtn.onclick = function () {
        addResource(resourceContainer);
    };

    moduleBox.appendChild(moduleInput);
    moduleBox.appendChild(resourceContainer);
    moduleBox.appendChild(addResourceBtn);

    container.appendChild(moduleBox);
}




let firstResourceContainer = document.querySelector(".resourceContainer");
let firstAddResourceBtn = document.querySelector(".addResourceBtn");

if (firstAddResourceBtn && firstResourceContainer) {

    firstAddResourceBtn.onclick = function () {
        addResource(firstResourceContainer);
    };
}

addModuleBtn.onclick = function () {
    createModule();
};



