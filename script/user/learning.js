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

let myCourseLetter = document.getElementById("myCourseLetter");
myCourseLetter.onclick = function () {
    window.location.href = "myCourse.html";
}

let params = new URLSearchParams(window.location.search);
let courseId = params.get("id");

let learningContainer = document.getElementById("learningContainer");

let courseName = document.getElementById("courseName");
let description = document.getElementById("description");
let courseImg = document.getElementById("courseImg");

let modulesWrapper = document.createElement("div");
modulesWrapper.className = "modulesWrapper";

let enrollBtn = document.getElementById("enrollBtn");
enrollBtn.onclick = function () {
    addEnrolled(courseId);
}

async function getCourse(id) {
    try {
        let response = await fetch(`https://68218a3c259dad2655af85dc.mockapi.io/courses/${id}`)
        let course = await response.json();

        document.title = course.title + " - BrightPath";

        courseName.innerText = course.title;
        description.innerText = course.description;
        courseImg.setAttribute("src", course.thumbnailURL);

        let email = localStorage.getItem("email");
        let res = await fetch(`https://68218a3c259dad2655af85dc.mockapi.io/users?email=${email}`);
        let users = await res.json();
        let user = users[0];

        if (!user) {
            console.log("User not found.");
            return;
        }

        if (!user.enrolledCourses.includes(id)) {

            enrollBtn.style.display = "block"
            course.module.forEach(function (res) {

                let module = document.createElement("div");
                module.setAttribute("class", "notEnrollModuleDiv");

                let moduleName = document.createElement("h3");
                moduleName.setAttribute("class", "moduleName");
                moduleName.innerText = res.title;

                module.appendChild(moduleName);

                modulesWrapper.appendChild(module);

            });

            learningContainer.appendChild(modulesWrapper);
        } else {
            course.module.forEach(function (res) {

                enrollBtn.style.display = "none"

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
            learningContainer.appendChild(modulesWrapper);
        }



    } catch (error) {
        console.log(error);
    }
}


getCourse(courseId);




async function addEnrolled(id) {
    let email = localStorage.getItem("email");

    try {
        let response = await fetch(`https://68218a3c259dad2655af85dc.mockapi.io/users?email=${email}`);
        let users = await response.json();

        users.forEach(function (user) {

            if (!user.enrolledCourses.includes(id)) {
                user.enrolledCourses.push(id);

                fetch(`https://68218a3c259dad2655af85dc.mockapi.io/users/${user.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        enrolledCourses: user.enrolledCourses
                    })
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
}