const DEFAULT_DIMENSION = 16;//remove later

let resetBtn = document.querySelector('button');

resetBtn.addEventListener('click', () => {
    let new_dimension = prompt('enter new dimension');
    if (new_dimension != null) {
        while (new_dimension <= 0 || new_dimension > 100) {
            new_dimension = prompt('ERROR: enter a valid dimension');
        }
        
        let body = document.querySelector('body'); 
        let container = document.querySelector('#container'); //might remove
        body.removeChild(container); 
    
        let new_container = document.createElement('div');
        new_container.setAttribute('id', 'container');
        body.appendChild(new_container);
        
        createBoard(new_dimension);
    }
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

function getRandomColor() {
    const hexCharacters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    const colorCodeLength = 6;

    let colorCode = '#';

    for (let i = 0; i < colorCodeLength; i++){
        index = Math.floor(Math.random() * hexCharacters.length);
        colorCode += hexCharacters[index];
    }
    console.log(colorCode);
    return colorCode;
}

function createItem() {
    item = document.createElement('div');
    item.classList.add('item');
    item.style.height = '20px';
    item.style.width = '100%';
    item.style.border = '1px solid black';

    item.addEventListener('mouseover', function(event){
        event.target.style.backgroundColor = getRandomColor();
    });

    return item
}

function createBoard(dimension) {
    let container = document.querySelector('#container');
    for (let i = 0; i < dimension; i++){
        boardRow = createRow(dimension);
        container.appendChild(boardRow);
    }
}

createBoard(DEFAULT_DIMENSION);

