let students = JSON.parse(localStorage.getItem("students")) || [];
let modules = JSON.parse(localStorage.getItem("modules")) || [];

if (!Array.isArray(students)) students = students && typeof students === "object" ? [students] : [];
if (!Array.isArray(modules)) modules = [];

document.addEventListener("DOMContentLoaded", function () {
    loadModules();
    document.getElementById("studentForm").addEventListener("submit", registerStudent);
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

function registerStudent(event) {
    event.preventDefault();

    const registrationNumber = document.getElementById("registrationnumber");
    const studentName = document.getElementById("studentName");
    const moduleSelect = document.getElementById("module");
    const regNumberError = document.getElementById("regNumberError");
    const studentNameError = document.getElementById("studentNameError");
    const moduleError = document.getElementById("moduleError");
    const message = document.getElementById("registrationMessage");

    [regNumberError, studentNameError, moduleError].forEach(function (element) {
        element.textContent = "";
    });
    [registrationNumber, studentName, moduleSelect].forEach(function (element) {
        element.classList.remove("input-error");
    });
    message.textContent = "";
    message.className = "message";

    let isValid = true;

    if (registrationNumber.value.trim() === "") {
        regNumberError.textContent = "Registration number is required";
        registrationNumber.classList.add("input-error");
        isValid = false;
    }

    if (studentName.value.trim() === "") {
        studentNameError.textContent = "Student name is required";
        studentName.classList.add("input-error");
        isValid = false;
    }

    if (moduleSelect.value === "") {
        moduleError.textContent = "Please select a module";
        moduleSelect.classList.add("input-error");
        isValid = false;
    }

    if (!isValid) return;

    const normalizedRegNumber = registrationNumber.value.trim().toUpperCase();
    const studentExists = students.some(function (student) {
        const savedRegNumber = String(student.regnumber || student.registrationnumber || "").trim().toUpperCase();
        const savedModule = String(student.moduleCode || student.module || "");
        return savedRegNumber === normalizedRegNumber && savedModule === moduleSelect.value;
    });

    if (studentExists) {
        regNumberError.textContent = "This student is already registered for this module";
        registrationNumber.classList.add("input-error");
        return;
    }

    students.push({
        regnumber: normalizedRegNumber,
        studentName: studentName.value.trim(),
        moduleCode: moduleSelect.value
    });

    localStorage.setItem("students", JSON.stringify(students));
    message.textContent = "Student registered successfully.";
    message.className = "message success";
    document.getElementById("studentForm").reset();
}
