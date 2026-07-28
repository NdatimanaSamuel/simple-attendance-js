let modules=JSON.parse(localStorage.getItem("modules"))|| [];

displayModule();


function displayModule(){

    const tableBody=document.getElementById("moduleTablebody");

tableBody.innerHTML="";

modules.forEach(function(module,index){
  tableBody.innerHTML += `
  
  <tr>
<td>${index+1}</td>
<td>${module.code}</td>
<td>${module.name}</td>

<td>${module.academicyear}</td>
<td>${module.semester}</td>
<td>${module.lecturer}</td>
<td>
<button type="button" class="edit-btn">Edit</button>

<button type="button" class="delete-btn">Delete</button>
</td>
  </tr>
  
  `
})

}
