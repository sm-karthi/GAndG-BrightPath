let logo = document.getElementById("logo");

logo.onclick = function () {
    window.location.reload();
}


let addCoureseLetter = document.getElementById("addCoureseLetter");

addCoureseLetter.onclick = function(){
    window.location.href = "addCourse.html"
}

let courseContainer = document.getElementById("courseContainer");

async function loadCourses() {

    try {
        let response = await fetch("https://68218a3c259dad2655af85dc.mockapi.io/courses");
        let courses = await response.json();

        courses.forEach(function (course) {
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

            let editAndDeleteBtns = document.createElement("div");
            editAndDeleteBtns.setAttribute("class", "editAndDeleteBtns");

            let editBtn = document.createElement("button");
            editBtn.setAttribute("class", "editBtn");
            editBtn.innerText = "Edit";

            let deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("class", "deleteBtn");
            deleteBtn.innerText = "Delete";

            editBtn.onclick = function(){
                window.location.href = `editCourse.html?id=${course.id}`;
            }

            deleteBtn.onclick = function () {
                deleteCourse(course.id, courseDiv);
            };

            editAndDeleteBtns.appendChild(editBtn);
            editAndDeleteBtns.appendChild(deleteBtn);

            courseDiv.appendChild(courseImgDiv);
            courseDiv.appendChild(courseDetails);
            courseDiv.appendChild(editAndDeleteBtns);

            courseContainer.appendChild(courseDiv);

        })


    } catch (error) {
        console.log(error);
    }
}

loadCourses();



async function deleteCourse(courseId, courseElement) {
    if (confirm("Are you sure you want to delete this course?")) {
        try {
            await fetch(`https://68218a3c259dad2655af85dc.mockapi.io/courses/${courseId}`, {
                method: "DELETE"
            });
            courseElement.remove();
            alert("Course deleted successfully.");
        } catch (error) {
            console.error("Error deleting course:", error);
            alert("Failed to delete course.");
        }
    }
}
