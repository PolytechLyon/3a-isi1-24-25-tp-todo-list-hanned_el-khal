const liste = document.getElementById('todo-list')
const newItemDiv = document.getElementById('new-item')
const newItem = document.getElementById('new-todo-item-title')
const add = document.getElementById('new-todo-item-add')
const editItemDiv = document.getElementById('edit-item')
const editItem = document.getElementById('edit-todo-item-title')
const edit = document.getElementById('edit-todo-item-confirm')
const noEdit = document.getElementById('edit-todo-item-cancel')

let item = null;



add.addEventListener('click', ajouter);
newItem.addEventListener("keypress", (event) => {
    if (event.key === "Enter"){
        ajouter();
    }
});

function ajouter(click){
    const element = newItem.value.trim();
    if (!element) return;

    const listElem = document.createElement('li');
    listElem.className = 'todo-list';
    listElem.textContent = element;

    const boutonSuppr = document.createElement('button');
    boutonSuppr.textContent = 'SUPP'
    boutonSuppr.addEventListener('click', supprimer)
    function supprimer(click){listElem.remove()}
    listElem.appendChild(boutonSuppr)

    const boutonEdit = document.createElement('button');
    boutonEdit.textContent = 'EDIT';
    boutonEdit.addEventListener('click', modifier)
    function modifier() {
        const listElem = this.parentElement;
        const originalText = listElem.firstChild.textContent;
        newItem.value = originalText;

        const originalButtonText = add.textContent;
        add.textContent = 'CONFIRMER';
        add.removeEventListener('click', ajouter);
        add.addEventListener('click', confirmEdit);

        function confirmEdit() {
            listElem.firstChild.textContent = newItem.value;
            add.textContent = originalButtonText;
            add.removeEventListener('click', confirmEdit);
            add.addEventListener('click', ajouter);
            newItem.value = '';
        }
    }
    listElem.appendChild(boutonEdit)

    liste.appendChild(listElem)
    newItem.value = '';


}
