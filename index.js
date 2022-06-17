const addBox = document.querySelector('.add-box'),
popupBox = document.querySelector('.popup-box'),
popupTitle = popupBox.querySelector('header p'),
closeBox = document.querySelector('header i'),
titleTag = popupBox.querySelector('input'),
descTag = popupBox.querySelector('textarea'),
addBtn = popupBox.querySelector('button');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] //storing months as an array for dates (below)

const notes = JSON.parse(localStorage.getItem('notes') || '[]'); //get locatStorage notes if they exist and parse them to JS object, else pass an empty array to notes
let isUpdate = false, updateId;



addBox.addEventListener('click', () => {
    titleTag.focus();
    popupBox.classList.add('show')
})

closeBox.addEventListener('click', () => {
    popupBox.classList.remove('show');
    isUpdate= false;
    titleTag.value = '';
    descTag.value = '';
    addBtn.innerText = 'Add Note';
    popupTitle.innerText = 'Add a new Note';
})

function showNotes() {
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = ` <li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${note.description}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick='showMenu(this)' class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li><i onclick="updateNote(${index}, '${note.title}', '${note.description}')" class="uil uil-pen"></i>Edit</li>
                                    <li><i onclick='deleteNote(${index})' class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}

showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add('show');
    document.addEventListener('click', e => {
        if(e.target.tagName != 'I' || e.target != elem) {
            elem.parentElement.classList.remove('show')
        }
    })
}

function deleteNote(noteId) {
    let confirmDel = confirm('Do you really want to delete this note?');
    if(!confirmDel) return;
    notes.splice(noteId, 1); //this removes the selected note from array
    localStorage.setItem('notes', JSON.stringify(notes)); //Saves updated notes to local storage
    showNotes()
}

function updateNote(noteId, title, desc) {
    isUpdate = true
    addBox.click();
    updateId = noteId;
    addBtn.innerText = 'Update Note';
    descTag.value = desc;
    titleTag.value = title;
    popupTitle.innerText = 'Update a Note';
    console.log(noteId, title, desc);
}

addBtn.addEventListener('click', e => {
    e.preventDefault();     //prevent form from submitting automatically
    let noteTitle = titleTag.value,
    noteDesc = descTag.value; 

    if(noteTitle || noteDesc) {
        let dateObj = new Date();
        month = months[dateObj.getMonth()], //get the month name from the array above
        day = dateObj.getDate(),
        year = dateObj.getFullYear();
        
        let noteInfo = {
            title: noteTitle,
            description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        
        if(!isUpdate){
            notes.push(noteInfo); // this adds a new note to Notes 
        }   else {
            isUpdate = false;
            notes[updateId] = noteInfo; //updates specific note
        }
        

        localStorage.setItem('notes', JSON.stringify(notes)); //save notes to local storage
        closeBox.click();
        showNotes();
    }
    
})

let switchButton = document.querySelector('.switcher-button');
switchButton.addEventListener('click', function() {
  document.querySelector('.color-switcher').classList.toggle('active')
});

let themeButtons = document.querySelectorAll('.theme-buttons') 

themeButtons.forEach(color => {
    color.addEventListener('click', () => {
        let dataColor = color.getAttribute('data-color');
        document.querySelector(':root').style.setProperty('--main-color', dataColor);
    })
})
