document.addEventListener("DOMContentLoaded", function () {
    let modules = JSON.parse(localStorage.getItem("modules")) || [];
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    if (!Array.isArray(modules)) modules = [];
    if (!Array.isArray(students)) students = students && typeof students === "object" ? [students] : [];
    if (!Array.isArray(attendance)) attendance = [];

    const today = new Date().toISOString().slice(0, 10);
    const presentToday = attendance.filter(function (record) {
        return record.dateKey === today;
    }).length;

    document.getElementById("totalModules").textContent = modules.length;
    document.getElementById("registeredStudents").textContent = students.length;
    document.getElementById("presentToday").textContent = presentToday;
    document.getElementById("attendanceRecords").textContent = attendance.length;
});
