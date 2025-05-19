let logo = document.getElementById("logo");

logo.onclick = function () {
    window.location.reload();
}


let arrowIcon = document.getElementById("arrowIcon");
arrowIcon.onclick = function () {
    window.history.back();
}


let addCoureseLetter = document.getElementById("addCoureseLetter");
addCoureseLetter.onclick = function () {
    window.location.reload();
}

let homeLetter = document.getElementById("homeLetter");
homeLetter.onclick = function () {
    window.location.href = "dashboard.html";
}

let profile = document.getElementById("profile");
profile.onclick = function(){
    window.location.href = "../../pages/profile.html"
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




addCourseForm.onsubmit = function (event){
    event.preventDefault();

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let category = document.getElementById("category").value;
    let thumbnailURL = document.getElementById("thumbnailUrl").value;

    let modules = [];
    let moduleBoxes = document.querySelectorAll(".moduleBox");

    moduleBoxes.forEach(function (moduleBox) {
        let moduleTitle = moduleBox.querySelector(".moduleTitle").value;
        let resourceGroups = moduleBox.querySelectorAll(".resourceGroup");

        let resources = [];
        resourceGroups.forEach(function (group) {
            let inputs = group.querySelectorAll("input");
            let resourceTitle = inputs[0].value;
            let resourceUrl = inputs[1].value;

            if (resourceTitle && resourceUrl) {
                resources.push({
                    title: resourceTitle,
                    url: resourceUrl
                });
            }
        });

        if (moduleTitle && resources.length > 0) {
            modules.push({
                title: moduleTitle,
                resources: resources
            });
        }
    });

    let courseData = {
        title,
        description,
        category,
        thumbnailURL,
        module: modules
    };

    addCourse(courseData);

    
}



async function addCourse(courseData){

     try {
        let response = await fetch("https://68218a3c259dad2655af85dc.mockapi.io/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(courseData)
        });

        let result = await response.json();
        console.log("Course submitted:", result);
    } catch (error) {
        console.error("Submission error:", error);
    }
}