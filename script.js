const DEFAULT_DIMENSION = 16;//remove later
container = document.querySelector('#container');
resetBtn = document.querySelector('button');

resetBtn.addEventListener('click', () => {
    container.remove();
    
});

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
    item.style.height = '30px';
    item.style.width = '100%';
    item.style.border = '1px solid black';

    item.addEventListener('mouseover', function(event){
        event.target.style.backgroundColor = 'cyan';
    });

    return item
}

//todo place in a function
function createBoard(dimension) {
    for (let i = 0; i < dimension; i++){
        boardRow = createRow(dimension);
        container.appendChild(boardRow);
    }
}

createBoard(DEFAULT_DIMENSION);

