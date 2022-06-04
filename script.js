
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    var notesObj = JSON.parse(localStorage.getItem("allEntries"));
    if (notesObj == null) notesObj = [];

    var entryText = document.getElementById("addTxt").value;
    var tittle = document.getElementById("tittle").value;

    var entry = {
        "text": entryText,
        "tittle": tittle,
    };
    localStorage.setItem("entry", JSON.stringify(entry));
    // Save allEntries back to local storage
    notesObj.push(entry);
    localStorage.setItem("allEntries", JSON.stringify(notesObj));
    document.getElementById("addTxt").value = "";
    document.getElementById("tittle").value = "";
    // console.log(notesObj);
    showNotes();
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("allEntries");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1} :${element.tittle}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    });




    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

// Function to delete a note
function deleteNote(index) {
    //   console.log("I am deleting", index);

    let notes = localStorage.getItem("allEntries");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("allEntries", JSON.stringify(notesObj));
    showNotes();
}

function setClipboard(value){
    var newelm=document.createElement("input");
    newelm.style = "position: absolute; left: -1000px; top: -1000px";
    newelm.value=value;
    document.body.appendChild(newelm);
    newelm.select();
    document.execCommand("copy");
    document.body.removeChild(newelm);
    var tooltip=document.getElementById("myTooltip");
    tooltip.innerHTML="Mail copied!";
}
function outFunc(){
    var tooltip=document.getElementById("myTooltip");
    tooltip.innerHTML="Copy to clipboard"
}

function scrollbg(){
    var navhead=document.getElementById('navhead');
    var scrollvalue=window.scrollY;
    console.log(scrollvalue);
    if(scrollvalue>85){
        navhead.classList.add('sticky');
    }
    else{
        navhead.classList.remove('sticky');
    }
}
window.addEventListener('scroll',scrollbg);