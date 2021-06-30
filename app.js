console.log("Welcome");
showNotes();

//function to add a note
var addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    var addText = document.getElementById("addText");
    var addTitle = document.getElementById("addTitle");
    var notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    var myObj = {
        title: addTitle.value,
        text: addText.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    addTitle.value = "";
    //console.log(notesObj);
    showNotes();

})

function showNotes() {
    var notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    var html = "";
    notesObj.forEach(function (element, index) {
        html += `
                    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                      <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.text} </p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>
        `;
    });
    var notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else{
        notesElm.innerHTML = `Nothing to Show. Please add a note!`;
    }
}

//function to delete a note
function deleteNote(index)
{
    //console.log("I am deleting a node", index);
    var notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

var search = document.getElementById("searchText");
search.addEventListener("input", function(){

    var inputVal = search.value.toLowerCase();
    //console.log("Input event fired", inputVal);
    var noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        var cardText = element.getElementsByTagName("p")[0].innerText;
        if(cardText.includes(inputVal))
        {
            element.style.display = "block";
        }
        else
        {
            element.style.display = "none";
        }
        //console.log(cardText);
    })
})