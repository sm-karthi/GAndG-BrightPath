let logo = document.getElementById("logo");

logo.onclick = function () {
    window.location.reload();
}

let arrowIcon = document.getElementById("arrowIcon");
arrowIcon.onclick = function () {
    window.history.back();
}

let homeLetter = document.getElementById("homeLetter");
homeLetter.onclick = function () {
    window.location.href = "dashboard.html"
}

let addCourseLetter = document.getElementById("addCourseLetter");
addCourseLetter.onclick = function () {
    window.location.href = "addCourse.html";
}

let params = new URLSearchParams(window.location.search);
let courseId = params.get("id");

let courseContainer = document.getElementById("courseContainer");

let courseName = document.getElementById("courseName");
let description = document.getElementById("description");
let courseImg = document.getElementById("courseImg");

let modulesWrapper = document.createElement("div");
modulesWrapper.className = "modulesWrapper";


let editCourseBtn = document.getElementById("editCourseBtn");
editCourseBtn.onclick = function(){
    window.location.href = `editCourse.html?id=${courseId}`;
}



async function getCourse(id) {
    try {
        let response = await fetch(`https://68218a3c259dad2655af85dc.mockapi.io/courses/${id}`)
        let course = await response.json();


        courseName.innerText = course.title;
        description.innerText = course.description;
        courseImg.setAttribute("src", course.thumbnailURL);

        document.title = `${course.title} Course Details - BrightPath`;

        course.module.forEach(function (res) {


            let module = document.createElement("div");
            module.setAttribute("class", "moduleDiv");

            let moduleName = document.createElement("h3");
            moduleName.setAttribute("class", "moduleName");
            moduleName.innerText = res.title;

            module.appendChild(moduleName);

            res.resources.forEach(function (detail) {

                let resource = document.createElement("div");
                resource.setAttribute("class", "resourceDiv");

                let resourceName = document.createElement("a");
                resourceName.setAttribute("class", "resourceName");
                resourceName.setAttribute("href", detail.url);
                resourceName.setAttribute("target", "_blank");
                resourceName.innerText = detail.title;

                resource.appendChild(resourceName);
                module.appendChild(resource);

            });

            modulesWrapper.appendChild(module);



        });
        courseContainer.appendChild(modulesWrapper);




    } catch (error) {
        console.log(error);
    }
}


getCourse(courseId);
