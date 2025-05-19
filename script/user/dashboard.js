let logo = document.getElementById("logo");

logo.onclick = function () {
    window.location.reload();
}

let myCourseLetter = document.getElementById("myCourseLetter");
myCourseLetter.onclick = function () {
    window.location.href = "myCourse.html";
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

            courseDiv.appendChild(courseImgDiv);
            courseDiv.appendChild(courseDetails);

            courseContainer.appendChild(courseDiv);

            courseDiv.onclick = function () {

                window.location.href = `learning.html?id=${course.id}`

            }


        })


    } catch (error) {
        console.log(error);
    }
}

loadCourses();


