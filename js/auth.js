if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".logout-link").forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            localStorage.removeItem("loggedIn");
            window.location.href = "index.html";
        });
    });
});
