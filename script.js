function addmore() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let mark = document.getElementById("mark").value;
    if (name == "" || age == "" || mark == "") {
        alert("please enter fields");
    }
    else {
        let localitem = getdata();
        console.log(localitem);
        if (localitem == null) {
            records = [];
        }
        else {
            records = localitem;
        }
        records.push({ username: name, userage: age, usermark: mark });
        setdata(records);
        localStorage.setItem("duplicatedetails", JSON.stringify(records));
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("mark").value = "";
        showitem();
    }
}
function showitem() {
    let localitem = getdata()
    if (localitem == null) {
        records = [];
    }
    else {
        records = localitem;
    }
    let html = '';
    let itemshow = document.querySelector('.records');
    records.forEach((data, index) => {
        html += `
     <tr>
        <td><input type="text" value=${data.username}></td>
        <td><input type="text" value=${data.userage}></td>
        <td><input type="text" value=${data.usermark}></td>
        <td><button type="button" value="-" id="delete" onclick="deleterecord(${index})">-</button></td>
   <tr>
   <br>
   `})
    itemshow.innerHTML = html;
}
showitem();
function deleterecord(index) {
    let records = getdata();
    records.splice(index, 1);
    setdata(records);
    localStorage.setItem("duplicatedetails", JSON.stringify(records));
    showitem();
}
function clearTask() {
    if (confirm('Are you want to clear the records?')) {
        localStorage.clear();
        showitem();
        viewrecords(1);
        document.getElementById("paginationtable").style.display="none";
        // document.getElementById('pagination').innerHTML="";
        // document.querySelector('.paginationtable').innerHTML="";
    }
}
function getdata() {
    let records = JSON.parse(localStorage.getItem("userdetails"));
    return records;
}
function setdata(records) {
    localStorage.setItem("userdetails", JSON.stringify(records));
}
let pageCounting;
let cur_page = 1;
function goPrevious()
{
    if(cur_page > 1)
    {
        cur_page--;
        viewrecords(cur_page);
        SetPageButton(0,cur_page);
    }
}
function goNext()
{
    if(cur_page<Math.ceil(records.length / 5))
    {
        cur_page++;
        viewrecords(cur_page);

    }
}
function viewrecords(currentpage) {
    document.getElementById("paginationtable").style.display="block";
    let records = JSON.parse(localStorage.getItem("duplicatedetails"));
    if (records == null) {
        document.getElementById("tb").innerHTML = "";
    }
    else {
        document.getElementById("tb").innerHTML = "";
        currentpage--;
        let startindex = 5 * currentpage;
        let endindex = startindex + 5;
        let pageitems = records.slice(startindex, endindex);
        for (let j = 0; j < pageitems.length; j++) {
            let html =
                `<tr>
                <td>${pageitems[j].username}</td>
                <td>${pageitems[j].userage}</td>
                <td>${pageitems[j].usermark}</td>
                </tr> `
            document.getElementById("tb").innerHTML += html;
        }
        SetupPagination(records, currentpage);
    }
}

let i = 1;
function SetupPagination(details, current_page) {
    const pagination_element = document.getElementById('pagination');
     pageCounting = Math.ceil(details.length / 5);
    for (; i < pageCounting + 1; i++) {
        let numberbutton = SetPageButton(i, current_page);
        pagination_element.appendChild(numberbutton);

    }
}

function SetPageButton(index, current_page) {
    let button = document.createElement('button');
    button.innerText = index;
    if (current_page == cur_page) button.classList.add('active');
    button.addEventListener('click', function () {
        current_page = index;
        viewrecords(current_page);
        let current_button = document.querySelector(".pagenumbers button.active");
    if (current_button != null) {
        current_button.classList.remove("active");
        button.classList.add("active");
        cur_page = page;
    }
    });
    return button;
}
viewrecords(1);


let asc = true;
function sortbyname() {
    asc = !asc;
    if (asc == true) {
        let details = JSON.parse(localStorage.getItem("duplicatedetails"));
        details.sort(function (a, b) {
            if (a.username.toLowerCase() < b.username.toLowerCase()) return -1;
            if (a.username.toLowerCase() > b.username.toLowerCase()) return 1;
            return 0;
        });
        localStorage.setItem("duplicatedetails", JSON.stringify(details));
        viewrecords(1);
    }
    else {
        let details = JSON.parse(localStorage.getItem("duplicatedetails"));
        console.log(details);
        details.sort(function (a, b) {
            if (a.username.toLowerCase() > b.username.toLowerCase()) return -1;
            if (a.username.toLowerCase() < b.username.toLowerCase()) return 1;
            return 0;
        });
        localStorage.setItem("duplicatedetails", JSON.stringify(details));
        viewrecords(1);
    }
}
let sortage = true;
function sortbyage() {
    sortage = !sortage;
    if (sortage == true) {
        let details = JSON.parse(localStorage.getItem("duplicatedetails"));
        details.sort(function (a, b) {
            return parseInt(a.userage) - parseInt(b.userage);
        });
        localStorage.setItem("duplicatedetails", JSON.stringify(details));
        viewrecords(1);
    }
    else {
        let details = JSON.parse(localStorage.getItem("duplicatedetails"));
        details.sort(function (a, b) {
            return parseInt(b.userage) - parseInt(a.userage);
        });
        localStorage.setItem("duplicatedetails", JSON.stringify(details));
        viewrecords(1);
    }
}
let sortmark = true;
function sortbymark() {
    sortmark = !sortmark;
    if (sortmark == true) {
        let details = JSON.parse(localStorage.getItem("duplicatedetails"));
        details.sort(function (a, b) {
            return parseInt(a.usermark) - parseInt(b.usermark);
        });
        localStorage.setItem("duplicatedetails", JSON.stringify(details));
        viewrecords(1);
    }
    else {
        let details = JSON.parse(localStorage.getItem("duplicatedetails"));
        details.sort(function (a, b) {
            return parseInt(b.usermark) - parseInt(a.usermark);
        });
        localStorage.setItem("duplicatedetails", JSON.stringify(details));
        viewrecords(1);
    }
}
