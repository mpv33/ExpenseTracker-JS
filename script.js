// Show_list()

function Save(){
   let title=document.getElementById("input_title").value
   document.getElementById("input_title").value=''

   let amount=document.getElementById("input_value").value
   document.getElementById("input_value").value=''

   let description=document.getElementById("input_about").value
   document.getElementById("input_about").value=''

   let date=document.getElementById("input_date").value
   document.getElementById("input_date").value=''
      
   const data={}
   data.title=title
   data.amount=amount
   data.description=description
   data.date=date

   let webtask = localStorage.getItem("localtask");
        if(webtask == null){
            taskObj = [];
        }
        else{
            taskObj = JSON.parse(webtask);
        }
        taskObj.push(data);
		//console.log(taskObj);
        localStorage.setItem("localtask", JSON.stringify(taskObj));
   //Total_Expense(data.amount)
   Show_list()

}


function Total_Expense(amount){
   // let amount = localStorage.getItem("amount");
    let ans=document.getElementById("ans").innerText
    ans = ans === '' ? 0 : ans
    amount = amount === '' ? 0 : amount
    ans=parseInt(ans)+parseInt(amount)
    document.getElementById("ans").innerText=ans
    
}

// show all result 
function Show_list(){
    
    let webtask = localStorage.getItem("localtask");
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
    }
    let html = ''
  
    taskObj.forEach((exp,index) => {
      //console.log(taskObj[index])
      Total_Expense(exp.amount)
      html += '<div class="card">'
      html+=`<h3>Title: ${exp.title} </h3>
             <h4> Date:  ${exp.date}</h4>
             <h3> Amount:  ${exp.amount}</h3>
             <h5> Note:  ${exp.description}</h5>
             <button type="submit" onclick="edit_item(${index})" id="edit_item"> Edit</button>
             <button type="submit" onclick="delete_item(${index})" id="delete_item"> Delete</button>
           </div>`
     

    });
    
    document.getElementById('list_cont').innerHTML = html
    
}

// edit item 
function edit_item(index){
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    let item =taskObj[index]
    console.log(`this item in editing mode : ${item}`)

    let title = document.getElementById("input_title");
    title.value = taskObj[index].title;

    let value = document.getElementById("input_value");
    value.value = taskObj[index].amount;

    let about = document.getElementById("input_about");
    about.value = taskObj[index].description;

    let date = document.getElementById("input_date");
    date.value = taskObj[index].date;

    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn");

    addtaskbtn.style.display="none";
    savetaskbtn.style.display="block";
     
    delete_item(index)
    //update()


}

// update task 

function update(){
     Save()
     Show_list()
    let addtaskbtn = document.getElementById("addtaskbtn");
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    console.log('updated ')
}

// delete item 
function delete_item(index){
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    let item =taskObj[index]
    console.log(item)
    taskObj.splice(index, 1);
    console.log(`succesfully deleted ${item.title} item`)
    
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    

    Show_list();


}

window.addEventListener('load', function() {
    console.log('All assets are loaded')
    Show_list()
})
