let dimensionCount = 16;

let resetBtn = document.querySelector('#newBoard');
let colorBtn = document.querySelector('#rainbow');
let eraserBtn = document.querySelector('#eraser')
let gridBtn = document.querySelector('#gridlines');
let clearBtn = document.querySelector('#clear');
let brushBtn = document.querySelector('#brush')
let rowItems = null;


function getRandomColor() {
    const hexCharacters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    const colorCodeLength = 6;

    let colorCode = '#';

    for (let i = 0; i < colorCodeLength; i++){
        index = Math.floor(Math.random() * hexCharacters.length);
        colorCode += hexCharacters[index];
    }
   
    return colorCode;
}


function applyColor(event) {
    event.target.style.backgroundColor = getRandomColor();
}

function applyEraser(event) {
    event.target.style.backgroundColor = 'white';
}

function applyBlack(event) {
    event.target.style.backgroundColor = 'black';
}

resetBtn.addEventListener('click', () => {
    let new_dimension = prompt('enter new dimension');
    if (new_dimension != null) {
        while (new_dimension <= 0 || new_dimension > 100) {
            new_dimension = prompt('ERROR: enter a valid dimension');
        }
        dimensionCount = new_dimension
        let centerContainer = document.querySelector('#center');
        centerContainer.removeChild(container);
    
        let new_container = document.createElement('div');
        new_container.setAttribute('id', 'container');
        centerContainer.appendChild(new_container);
        
        createBoard(new_dimension);
    }
});

colorBtn.addEventListener('click', () => {
    rowItems.forEach(rowItem => {
        rowItem.removeEventListener('mouseover', applyEraser);
        rowItem.removeEventListener('mouseover', applyBlack);
        rowItem.addEventListener('mouseover', applyColor);
    }); 
});

eraserBtn.addEventListener('click', () => {
    rowItems.forEach(rowItem => {
        rowItem.removeEventListener('mouseover', applyColor);
        rowItem.removeEventListener('mouseover', applyBlack);
        rowItem.addEventListener('mouseover', applyEraser);
    });
});

brushBtn.addEventListener('click', () => {
    rowItems.forEach(rowItem => {
        rowItem.removeEventListener('mouseover', applyColor);
        rowItem.removeEventListener('mouseover', applyEraser);
        rowItem.addEventListener('mouseover', applyBlack);
    });
});

//items are set to border-box so adding a border does not make item any bigger
gridBtn.addEventListener('click', () => {
    rowItems.forEach(rowItem => {
        if (rowItem.style.border !== 'none')
            rowItem.style.border = 'none';
        else {
            rowItem.style.border = '1px solid black';
        }
    });
});

clearBtn.addEventListener('click', () => {
    rowItems.forEach(rowItem => {
        rowItem.style.backgroundColor = 'white';
    });
});



function calculateItemDimension() {
    let container = document.querySelector('#container');
    let boardDimension = container.offsetWidth;

    return boardDimension / dimensionCount;
}

function createItem() {
    item = document.createElement('div');
    item.classList.add('item');
    
    item.style.width = calculateItemDimension() + 'px';
    item.style.height = calculateItemDimension() + 'px';
    
    item.addEventListener('mouseover', applyColor);

    return item
}

function createRow(itemCount) {
    row = document.createElement('div');
    row.classList.add('row');

    for (let i = 0; i < itemCount; i++){
        let rowItem = createItem();
        row.appendChild(rowItem);
    }

    return row
}

function createBoard(dimension) {
    let container = document.querySelector('#container');
    for (let i = 0; i < dimension; i++){
        boardRow = createRow(dimension);
        container.appendChild(boardRow);
    }

    rowItems = document.querySelectorAll('.item');
}

createBoard(dimensionCount);