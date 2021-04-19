var btn_reg = document.querySelector('#_btn_reg');
var btn_enter = document.querySelector('#_btn_enter');
var btn_out = document.querySelector('#_btn_out');
var btn = document.querySelector('#_btn_target');

var my_form = document.querySelector('._my_form');
var tbl_all_users = document.querySelector('._tbl_all_users');
var tbody = tbl_all_users.getElementsByTagName("tbody")[0];

var mail = document.querySelector('#inputMail');
var pass = document.querySelector('#inputPass');
var cur_status = document.querySelector('._status');


function defaultShow ()
{
//querySelector запросы повторяются по тексту несколько раз, советую создавать переменную один раз и переиспользовать в разных фукнциях
    btn_reg.style.display = "block";
    btn_enter.style.display = "block";

    btn_out.style.display = "none";
    my_form.style.display = "none";
    tbl_all_users.style.display = "none";

    changeStatus("");
}

//_______________________________Single_user___________________________________

function showMyForm ()
{
    defaultShow();
    var type =  document.querySelector('#'+event.target.id).value;
    my_form.style.display = "block";

    var btn_name;
    if (type === "register") {
        btn_name = "Зарегистрироваться"
    }
    else{
        btn_name = "Войти"
    }

    btn.innerHTML = btn_name;
    btn.value = type;
}

function showEnter() {
    btn_reg.style.display = "none";
    btn_enter.style.display = "none";
    btn_out.style.display = "block";
}

function postRegAndLogin(mail, pass, type) {
    var data = {email:mail, password:pass};
    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://reqres.in/api/'+type, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhr.onload = function () {
        var r = JSON.parse(xhr.responseText);

        if (type==="register") {
            if (xhr.readyState == 4 && xhr.status == "201") {
                changeStatus("Пользователь успешно зарегестрирован");
                showEnter();
            } else {
                changeStatus(r.error);}
        }else{
            if (xhr.readyState == 4 && xhr.status == "200") {
                changeStatus("Вход выполнен");
                showEnter();
            } else {
                changeStatus(r.error); }
        }
    };
    xhr.send(json);
}
function readInput ()//post
{
    var type =  document.querySelector('#'+event.target.id).value;
    defaultShow ();
    postRegAndLogin(mail.value, pass.value, type);
}
//_______________________________All_users___________________________________________________

function addRow(img_path, name, sur_name){

    var row = document.createElement("TR");
    var img = document.createElement("img");
    img.src = img_path;

    var td1 = document.createElement("TD");
    td1.appendChild(img);
    var td2 = document.createElement("TD");
    td2.appendChild (document.createTextNode(name));
    var td3 = document.createElement("TD");
    td3.appendChild (document.createTextNode(sur_name));

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    tbody.appendChild(row);
}
function showTableAllUsers ()//get
{
    changeStatus("");
    tbl_all_users.style.display = "table";

    var xhr = new XMLHttpRequest();
    var r = {page:0};

    do{
        r.page++;
        xhr.open("GET", "https://reqres.in/api/users?page="+r.page, false);
        xhr.send();

        if (xhr.status !== 200) {
            changeStatus(xhr.status + ': ' + xhr.statusText);
        } else {
            r = JSON.parse(xhr.responseText);
            for (var i = 0; i<r.per_page; i++) {
                var user = r.data[i];
                addRow(user.avatar, user.first_name, user.last_name);
            }
        }
    } while((r.page !== r.total_pages)&&(r.total_pages !== undefined))
}
function changeStatus(text)
{
    cur_status.innerHTML = text;
}
//______________________________________________________________________________________

defaultShow ();

_btn_reg.onclick = showMyForm;
_btn_enter.onclick = showMyForm;
_btn_dismiss.onclick = defaultShow;
_btn_out.onclick = defaultShow;
_btn_target.onclick = readInput;
_btn_all_users.onclick = showTableAllUsers;