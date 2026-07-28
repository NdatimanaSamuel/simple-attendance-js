document.addEventListener("DOMContentLoaded",function(){

    const loginForm=document.getElementById("loginForm");
    // const loginForm=document.addEventListener("submit",login);

    loginForm.addEventListener("submit", login)

})

function login(event){
    event.preventDefault();

    const username=document.getElementById("username");
    const password =document.getElementById("password");

    const usernameError=document.getElementById("usernameError");
    const passwordError=document.getElementById("passwordError");

    usernameError.textContent="";
    passwordError.textContent="";

    username.classList.remove("input-error");
    password.classList.remove("input-error");

    let isValid=true;

    if(username.value.trim()===""){
        usernameError.textContent="Username is required";
        username.classList.add("input-error");
        isValid=false;
    }

     if(password.value.trim()===""){
        passwordError.textContent="Password is required";
        password.classList.add("input-error");
        isValid=false;
    }

    if(isValid===false){
        return;
    }

    let validUsername="lecturer";
    let validPassword="12345";

    if(username.value===validUsername && password.value===validPassword){
        
        localStorage.setItem("loggedIn","true");

        window.location.href='dashboard.html';

    }

    else{
        passwordError.textContent='Invalid username or password';
        password.classList.add("input-error");
    }
}


