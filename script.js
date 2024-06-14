container = document.querySelector('#container');
const DIM = 16;//remove later

function createRow(itemCount) {
    row = document.createElement('div');
    row.classList.add('row');
    row.style.display = 'flex';

    for (let i = 0; i < itemCount; i++){
        rowItem = createItem();
        row.appendChild(rowItem);
    }

    return row
}

function createItem() {
    item = document.createElement('div');
    item.classList.add('item');
    //might edit width and height
    item.style.height = '30px';
    item.style.width = '100%';
    item.style.border = '1px solid black';

    return item
}

//todo place in a function
for (let i = 0; i < DIM; i++){
    boardRow = createRow(DIM);
    container.appendChild(boardRow);
}