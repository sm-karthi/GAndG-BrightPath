var role = localStorage.getItem("isLogin");
var pathname = window.location.pathname;

function showAccessDenied(redirectURL, buttonText) {
    document.body.style.margin = "0";
    document.body.style.fontFamily = "'Poppins', sans-serif";
    document.body.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f8f9fa;
            text-align: center;
        ">

            <img src="https://indexsy.com/wp-content/uploads/2023/05/What-is-404-error.jpg" alt="Access Denied" style=" width: 600px; margin-bottom: 30px;">

            <h2 style="color: #333; margin-bottom: 10px;">Access Denied</h2>

            <p style="color: #666; margin-bottom: 20px;">You do not have permission to access this page.</p>
            
            <button onclick="window.location.href='${redirectURL}'" style="
                padding: 12px 24px;
                font-size: 16px;
                background-color: #f44b4b;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            ">${buttonText}</button>
        </div>
    `;
}

if (role === "USER" && pathname.includes("/admin/")) {
    showAccessDenied("/pages/user/dashboard.html", "Go to Dashboard");
}

if (role === "ADMIN" && pathname.includes("/user/")) {
    showAccessDenied("/pages/admin/dashboard.html", "Go to Dashboard");
}
