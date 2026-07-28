let reportModules = JSON.parse(localStorage.getItem("modules")) || [];
let attendanceRecords = JSON.parse(localStorage.getItem("attendance")) || [];

if (!Array.isArray(reportModules)) reportModules = [];
if (!Array.isArray(attendanceRecords)) attendanceRecords = [];

document.addEventListener("DOMContentLoaded", function () {
    const moduleFilter = document.getElementById("reportModule");

    reportModules.forEach(function (item) {
        const option = document.createElement("option");
        option.value = item.code;
        option.textContent = item.code + " - " + item.name;
        moduleFilter.appendChild(option);
    });

    moduleFilter.addEventListener("change", displayAttendanceReport);
    displayAttendanceReport();
});

function displayAttendanceReport() {
    const selectedModule = document.getElementById("reportModule").value;
    const tableBody = document.getElementById("attendanceTableBody");
    const emptyReport = document.getElementById("emptyReport");
    const filteredRecords = attendanceRecords.filter(function (record) {
        return selectedModule === "" || record.moduleCode === selectedModule;
    });

    tableBody.innerHTML = "";
    document.getElementById("reportCount").textContent = filteredRecords.length;
    emptyReport.style.display = filteredRecords.length === 0 ? "block" : "none";

    filteredRecords.forEach(function (record, index) {
        const row = document.createElement("tr");
        [
            index + 1,
            record.regnumber,
            record.studentName,
            record.moduleCode,
            record.status,
            record.date
        ].forEach(function (value) {
            const cell = document.createElement("td");
            cell.textContent = value || "-";
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
}
