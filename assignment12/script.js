const task = document.getElementById('task'); 

const dataDisplay = document.getElementById('dataDisplay');

const addBtn = document.getElementById('addBtn'); 

const fileInput = document.getElementById('file');

const form = document.getElementById('form');

form.addEventListener('submit', (e) => { 
    e.preventDefault();
    const myform = e.target;
    // const tsk = task.value; 
    // // console.log(file.value);
    // const file = fileInput.files[0]; 
    // console.log(myform.tsk.value);
    const todo = {
        data: myform.tsk.value,
        id: new Date(),
        isChecked: false,
    }
    const formData = new FormData(myform);  
    // formData.append('file', file); 
    // console.log(file);
    // const todo = {data: tsk, id: new Date(), isChecked: false, file: formData}; 
    formData.append('data',JSON.stringify(todo));
    if(formData) { 
        fetch('/task-list', {
            method: "POST",
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: formData // body: JSON.stringify(todo)
        })
        .then(response => {
            if(response.status === 200){}
                reloadData()
        })
        .catch(err => {
            console.error(err);
        })
    }
})

function reloadData() {
    fetch('/load-data')
     .then(response => {
        if(response.status == 200) 
            return response.json();
        return new Error("server error");
     })
     .then(response => {
        dataDisplay.innerHTML = "";
        response.forEach(element => {
            displayTodo(element); 
        });
     })
     .catch(err => {
        console.log(err);
     })
}

reloadData() 

function displayTodo(task) {

    const tr = document.createElement('tr');
    tr.style.borderBottom = "2px solid black";
    tr.style.height = "50px";

    const td1 = document.createElement('td');
    td1.style.width = "60%";
    const val = task.data.toUpperCase(); 

    const td2 = document.createElement('td');
    const tick = document.createElement('input') 
    tick.setAttribute('type','checkbox');
    tick.style.marginTop = "8px";
    tick.addEventListener('click', () => {
        fetch('/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: task.id})
        })
        .then(() => {
            reloadData()
        })
    })

    if(task.isChecked) {
        const del = document.createElement('del');
        del.textContent = val;
        td1.appendChild(del);
        tick.setAttribute('checked','true');
    } else {
        td1.textContent = val;
    }

    td2.appendChild(tick);
    td2.style.textAlign = "center";
    
    const td3 = document.createElement('td');
    const cross = document.createElement('button')
    cross.innerText = 'x';
    cross.style.fontSize = "10px";
    cross.addEventListener('click', () => {
        fetch('/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: task.id})
        })
        .then(() => {
            // console.log('succesfully deleted')
            reloadData()
        })
    })
    td3.appendChild(cross);
    td3.style.textAlign = "center";

    const img = document.createElement('img');
    img.setAttribute('src',task.fileName);
    img.setAttribute('width','40px');
    img.setAttribute('height','40px');
    const td4 = document.createElement('td');
    td4.style.textAlign = "center";
    td4.appendChild(img);
    tr.appendChild(td1);
    tr.appendChild(td4);
    tr.appendChild(td2);
    tr.appendChild(td3);
    
    dataDisplay.appendChild(tr);
}