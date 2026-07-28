let modules = JSON.parse(localStorage.getItem("modules")) || [];
let students = JSON.parse(localStorage.getItem("students")) || [];
let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

if (!Array.isArray(modules)) modules = [];
if (!Array.isArray(students)) students = students && typeof students === "object" ? [students] : [];
if (!Array.isArray(attendance)) attendance = [];

document.addEventListener("DOMContentLoaded", function () {
    loadModules();
    document.getElementById("attendanceForm").addEventListener("submit", markAttendance);
});

function loadModules() {
    const moduleSelect = document.getElementById("module");

    modules.forEach(function (item) {
        const option = document.createElement("option");
        option.value = item.code;
        option.textContent = item.code + " - " + item.name;
        moduleSelect.appendChild(option);
    });
}

function markAttendance(event) {
    event.preventDefault();

    const moduleSelect = document.getElementById("module");
    const registrationInput = document.getElementById("registrationNumber");
    const moduleError = document.getElementById("moduleError");
    const registrationNumberError = document.getElementById("registrationNumberError");
    const message = document.getElementById("attendanceMessage");
    const selectedModule = moduleSelect.value;
    const registrationNumber = registrationInput.value.trim().toUpperCase();

    moduleError.textContent = "";
    registrationNumberError.textContent = "";
    message.textContent = "";
    message.className = "message";
    moduleSelect.classList.remove("input-error");
    registrationInput.classList.remove("input-error");

    if (selectedModule === "") {
        moduleError.textContent = "Please select a module";
        moduleSelect.classList.add("input-error");
        return;
    }

    if (registrationNumber === "") {
        registrationNumberError.textContent = "Enter a registration number";
        registrationInput.classList.add("input-error");
        return;
    }

    const student = students.find(function (item) {
        const savedRegNumber = String(item.regnumber || item.registrationnumber || "").trim().toUpperCase();
        const savedModule = String(item.moduleCode || item.module || "");
        return savedRegNumber === registrationNumber && savedModule === selectedModule;
    });

    if (!student) {
        message.textContent = "Registration number not found for this module.";
        message.className = "message error-message";
        registrationInput.classList.add("input-error");
        document.getElementById("studentName").textContent = "-";
        document.getElementById("status").textContent = "Not Found";
        return;
    }

    document.getElementById("studentName").textContent = student.studentName;
    document.getElementById("status").textContent = "Present";

    const today = new Date().toISOString().slice(0, 10);
    const alreadyRecorded = attendance.some(function (item) {
        return String(item.regnumber).trim().toUpperCase() === registrationNumber &&
            item.moduleCode === selectedModule &&
            item.dateKey === today;
    });

    if (alreadyRecorded) {
        message.textContent = "Attendance has already been recorded today.";
        message.className = "message error-message";
        return;
    }

    attendance.push({
        regnumber: registrationNumber,
        studentName: student.studentName,
        moduleCode: selectedModule,
        status: "Present",
        date: new Date().toLocaleDateString(),
        dateKey: today
    });

    localStorage.setItem("attendance", JSON.stringify(attendance));
    message.textContent = "Attendance recorded successfully.";
    message.className = "message success";
    registrationInput.value = "";
}
