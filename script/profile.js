let logo = document.getElementById("logo");

logo.onclick = function () {
  window.location.reload();
}


let arrowIcon = document.getElementById("arrowIcon");
arrowIcon.onclick = function () {
  window.history.back();
}




async function loadUserProfile() {
  let email = localStorage.getItem("email");

  if (!email) {
    document.getElementById("profileSection").innerText = "Please log in to view your profile.";
    return;
  }

  try {
    let res = await fetch("https://68218a3c259dad2655af85dc.mockapi.io/users?email=" + email);
    let users = await res.json();


    let user = users[0];

    document.getElementById("userName").innerText = user.name;
    document.getElementById("userEmail").innerText = user.email;
    if (user.role === "role 2") {
      document.getElementById("userRole").innerText = "USER";

      let homeLetter = document.getElementById("homeLetter");
      homeLetter.onclick = function () {
        window.location.href = "../pages/user/dashboard.html"
      }

      let myCourseLetter = document.getElementById("myCourseLetter");
      myCourseLetter.onclick = function () {
        window.location.href = "../pages/user/myCourse.html";
      }
    }
    else {
      document.getElementById("userRole").innerText = user.role;

      let homeLetter = document.getElementById("homeLetter");
      homeLetter.onclick = function () {
        window.location.href = "../pages/admin/dashboard.html"
      }

      let myCourseLetter = document.getElementById("myCourseLetter");
      myCourseLetter.innerText = "Add Course"
      myCourseLetter.onclick = function () {
        window.location.href = "../pages/admin/addCourse.html";
      }

    }


    document.getElementById("logoutBtn").onclick = function () {
    alert("You have been logged out successfully.");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("email");
    window.location.href = "../index.html";
};



  } catch (error) {
    console.error("Failed to fetch user profile:", error);
  }
}

loadUserProfile();
