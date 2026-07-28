let modules=JSON.parse(localStorage.getItem("modules")) || [];

if (!Array.isArray(modules)) {
    modules = [];
}

document.addEventListener("DOMContentLoaded",function(){

    const moduleform = document.getElementById("moduleform");

    moduleform.addEventListener("submit",saveModule);

})


function saveModule(event){

  event.preventDefault();

  // module infor
  const moduleCode=document.getElementById("modulecode");
  const moduleName=document.getElementById("modulename");

  const academicYear=document.getElementById("academicyear");
  const Semester=document.getElementById("semester");
  const lecturerName=document.getElementById("lecturername");

// erros 


  const moduleCodeError=document.getElementById("moduleCodeError");
 const moduleNameError=document.getElementById("moduleNameError");

  const academicYearError=document.getElementById("academicYearError");
  const semesterError=document.getElementById("semesterError");
  const lecturerNameError=document.getElementById("lecturerNameError");

  //clear the previous 
moduleCodeError.textContent="";
moduleNameError.textContent="";
academicYearError.textContent="";
semesterError.textContent="";
lecturerNameError.textContent="";


// clear the module info
moduleCode.classList.remove("input-error");
moduleName.classList.remove("input-error");
academicYear.classList.remove("input-error");
Semester.classList.remove("input-error");
lecturerName.classList.remove("input-error");

let isValid=true;

if(moduleCode.value.trim()===""){
    moduleCodeError.textContent="Module code  is required";
    moduleCode.classList.add("input-error");
    isValid=false;
}


if(moduleName.value.trim()===""){
    moduleNameError.textContent="Module Name is required";
    moduleName.classList.add("input-error");
    isValid=false;
}


if(academicYear.value.trim()===""){
    academicYearError.textContent="Academic Year  is required";
    academicYear.classList.add("input-error");
    isValid=false;
}


if(Semester.value.trim()===""){
    semesterError.textContent="Semester is required";
    Semester.classList.add("input-error");
    isValid=false;
}

if(lecturerName.value.trim()===""){
    lecturerNameError.textContent="Module is required";
    lecturerName.classList.add("input-error");
    isValid=false;
}


if(!isValid){
  return;
}

//check module duplicate

let moduleExists=modules.find(function(module){
    return module.code.toLowerCase()===moduleCode.value.trim().toLowerCase();
})

if(moduleExists){
    moduleCodeError.textContent="Module code is exist";
    moduleCode.classList.add("input-error");
    return;

}

let module={
    code:moduleCode.value.trim(),
    name:moduleName.value.trim(),
    academicyear:academicYear.value.trim(),
    semester:Semester.value,
    lecturer:lecturerName.value.trim()

}
modules.push(module);
localStorage.setItem("modules",

    JSON.stringify(modules)
)
alert("Module Created Successfully");

document.getElementById("moduleform").reset();

}
