// elementen opslaan
const clear = document.querySelector('.clear');
const dateElement = document.querySelector('#date');
const list = document.querySelector('#list');
const input = document.querySelector('input');
const check = 'fa-check-circle';
const uncheck = 'fa-circle-thin';
const line_through = 'lineThrough';

// Variables
let toDoStorage, id;

// Nieuwe todo als item toevoegen
const addToDo = (toDo, id, done, trash) => {
    if (trash) return;

    const gedaan = done ? check : uncheck;
    const lijntje = done ? line_through : '';
    const text = `<li class="item">
                    <i class="fa ${gedaan} co" job="complete" id="${id}" ></i>
                    <p class="text ${lijntje}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}" ></i>
                  </li>`;
    const position = 'beforeend';
    list.insertAdjacentHTML(position, text);
}

const loadList = (todos) => {
    console.log(todos);
    todos.forEach((item, index) => {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Array met objecten maken om storage op te slaan
// Deze array wordt opgeslagen in localStorage
let data = localStorage.getItem('TODO');
if (data) {
    toDoStorage = JSON.parse(data);
    id = toDoStorage.length;
    loadList(toDoStorage);
} else {
    // als data niet leeg is
    toDoStorage = [];
    id = 0;
}

// Op enter drukken is toDo toevoegen
document.addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        const toDo = input.value;
        // if todo is niet leeg
        if (toDo) {
            addToDo(toDo, id, false, false);
            toDoStorage.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                }
            );

            // Update LocalStorage
            localStorage.setItem('TODO', JSON.stringify(toDoStorage));

            id++;
        }
        input.value = '';
    }
});

// ToDo afvink functie
const completeToDo = (element) => {
    elementId = element.attributes.id.value;
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(line_through);
    toDoStorage[elementId].done ? toDoStorage[elementId].done = false : toDoStorage[elementId].done = true;
}

// ToDo verwijderen
const removeTodo = (element) => {
    elementId = element.attributes.id.value;
    element.parentNode.parentNode.removeChild(element.parentNode);
    toDoStorage[elementId].trash = true;
}

// luisteren naar de lijst
list.addEventListener('click', (event) => {
    let iconClicked = event.target.attributes.job.value; // delete or complete
    if (iconClicked == "complete") {
        completeToDo(event.target);
    } else if (iconClicked == "delete") {
        removeTodo(event.target);
    }

    // Update LocalStorage
    localStorage.setItem('TODO', JSON.stringify(toDoStorage));

})

// Storage leegmaken
clear.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})

// Datum plaatsen
let today = new Date();
let options = {weekday: 'long', month: 'short', day:'numeric'};
dateElement.innerHTML = today.toLocaleDateString('nl-NL', options);