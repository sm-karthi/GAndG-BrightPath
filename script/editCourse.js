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




let params = new URLSearchParams(window.location.search);
let courseId = params.get("id");


async function populateCourseForm(courseId) {
    try {
        let response = await fetch(`https://68218a3c259dad2655af85dc.mockapi.io/courses/${courseId}`);
        let course = await response.json();

        container.innerHTML = "";

        document.getElementById("title").value = course.title;
        document.getElementById("description").value = course.description;
        document.getElementById("category").value = course.category;
        document.getElementById("thumbnailUrl").value = course.thumbnailURL;

        course.module.forEach(function (mod, index) {
            createModule();

            let moduleBoxes = document.querySelectorAll(".moduleBox");
            let currentModuleBox = moduleBoxes[index];
            let moduleTitleInput = currentModuleBox.querySelector(".moduleTitle");
            let resourceContainer = currentModuleBox.querySelector(".resourceContainer");

            moduleTitleInput.value = mod.title;

            mod.resources.forEach(function (resource, i) {
                addResource(resourceContainer);

                let resourceGroups = resourceContainer.querySelectorAll(".resourceGroup");
                let currentResourceGroup = resourceGroups[i];
                let inputs = currentResourceGroup.querySelectorAll("input");

                inputs[0].value = resource.title;
                inputs[1].value = resource.url;
            });
        });

    } catch (err) {
        console.error("Error loading course:", err);
    }
}

if (courseId) {
    populateCourseForm(courseId);
}






addCourseForm.onsubmit = function(e) {
    e.preventDefault();

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

    updateCourse(courseData);

};



async function updateCourse(courseData) {
    
    try {
        await fetch(`https://68218a3c259dad2655af85dc.mockapi.io/courses/${courseId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(courseData)
        });

        console.log("Course updated:", courseData);
        
        alert("Course updated successfully!");
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Update failed:", error);
    }
}