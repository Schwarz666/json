var xhr = new XMLHttpRequest();
xhr.open("GET", "https://reqres.in/api/users?per_page=100", true);
xhr.onload = function(){
    console.log(xhr.responseText);
};
xhr.send();