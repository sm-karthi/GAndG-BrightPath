let logo = document.getElementById("logo");

logo.onclick = function () {
    window.location.reload();
}

let myCourseLetter = document.getElementById("myCourseLetter");
myCourseLetter.onclick = function () {
    window.location.reload();
}

let homeLetter = document.getElementById("homeLetter");
homeLetter.onclick = function(){
    window.location.href = "dashboard.html"
}

let arrowIcon = document.getElementById("arrowIcon");
arrowIcon.onclick = function () {
    window.history.back();
}

let profile = document.getElementById("profile");
profile.onclick = function(){
    window.location.href = "../../pages/profile.html"
}


let courseContainer = document.getElementById("courseContainer");
let emptyLetter = document.getElementById("emptyLetter");


let email = localStorage.getItem("email");


async function loadCourses() {
    try {

        let res = await fetch(`https://68218a3c259dad2655af85dc.mockapi.io/users?email=${email}`);
        let users = await res.json();
        let user = users[0];

        let enrollIds = user.enrolledCourses || [];

        if (enrollIds.length === 0) {
            emptyLetter.style.display = "block";
        }
        else {

            for (let i = 0; i < enrollIds.length; i++) {

                let response = await fetch(`https://68218a3c259dad2655af85dc.mockapi.io/courses/${enrollIds[i]}`);

                let course = await response.json();

                let courseDiv = document.createElement("div");
                courseDiv.setAttribute("class", "course");

                let courseImgDiv = document.createElement("div");
                courseImgDiv.setAttribute("class", "courseImgDiv");

                let img = document.createElement("img");
                img.setAttribute("class", "image");
                img.setAttribute("src", course.thumbnailURL);
                img.setAttribute("draggable", "false");

                courseImgDiv.appendChild(img);

                let courseDetails = document.createElement("div");
                courseDetails.setAttribute("class", "courseDetails");

                let courseName = document.createElement("h3");
                courseName.setAttribute("class", "courseName");
                courseName.innerText = course.title;

                let description = document.createElement("p");
                description.setAttribute("class", "description");
                description.innerText = course.description;

                courseDetails.appendChild(courseName);
                courseDetails.appendChild(description);

                courseDiv.appendChild(courseImgDiv);
                courseDiv.appendChild(courseDetails);

                courseDiv.onclick = function(){
                    window.location.href = `learning.html?id=${course.id}`;
                }

                courseContainer.appendChild(courseDiv);
            }
        }

    } catch (error) {
        console.log(error);
    }
}

loadCourses();
