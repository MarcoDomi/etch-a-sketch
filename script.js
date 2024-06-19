let dimensionCount = 16;

let resetBtn = document.querySelector('#newBoard');
let leftMenu = document.querySelector('#left-menu');
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

function applyColor(elem) {
    elem.style.backgroundColor = getRandomColor();
}

function applyEraser(elem) {
    elem.style.backgroundColor = 'white';
}

function applyBlack(elem) {
    elem.style.backgroundColor = 'black';
}


let prevBehavior = applyBlack; 

function setContainerEvent(container, currentAction) {
    container.addEventListener('mouseover', (event) => {
        let target = event.target;
        currentAction(target);
    }); 
}
//use event delegation to set behavior of cursor when interacting w/ board
leftMenu.addEventListener('click', (event) => {

    let target = event.target;
    let container = document.querySelector('#container');
    
    if (target.id !== 'gridlines' && target.id !== 'clear') {
        let prevTarget = document.querySelector('.draw-active');
        target.classList.toggle('draw-active');
        prevTarget.classList.toggle('draw-active');

        container.removeEventListener('mouseover', prevBehavior);
    }
    switch (target.id) {
        case 'brush':
            prevBehavior = applyBlack
            setContainerEvent(container, prevBehavior);
            break;
        
        case 'rainbow':
            prevBehavior = applyColor
            setContainerEvent(container, prevBehavior);
            break;
        
        case 'eraser':
            prevBehavior = applyEraser
            setContainerEvent(container, prevBehavior);
            break;
        
        case 'gridlines'://items are set to border-box so dont need to worry about border making elements bigger
            rowItems.forEach(rowItem => {
                if (rowItem.style.border !== 'none')
                    rowItem.style.border = 'none';
                else {
                    rowItem.style.border = '1px solid lightgray';
                }
            });
            target.classList.toggle('grid-active');
            break;
        
        case 'clear':
            rowItems.forEach(rowItem => {
                rowItem.style.backgroundColor = 'white';
            });
            break;
    }
});

function setDefaultBtnColor() {
    let brushBtn = document.querySelector('#brush');
    let activeBtn = document.querySelector('.draw-active');
    let gridBtn = document.querySelector('#gridlines');

    activeBtn.classList.remove('draw-active');
    brushBtn.classList.add('draw-active');

    if (!gridBtn.classList.contains('grid-active')) {
        gridBtn.classList.add('grid-active');
    }

}

resetBtn.addEventListener('click', () => {
    let dimensionInput = prompt('enter new dimension');
    if (dimensionInput != null) {
        while (dimensionInput <= 0 || dimensionInput > 100) {
            dimensionInput = prompt('ERROR: enter a valid dimension');
        }
        dimensionCount = dimensionInput
        let centerContainer = document.querySelector('#center');
        centerContainer.removeChild(container);
    
        let new_container = document.createElement('div');
        new_container.setAttribute('id', 'container');
        centerContainer.appendChild(new_container);

       
        setDefaultBtnColor();
        createBoard(dimensionInput);
    }
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
    
    item.addEventListener('mouseover', applyBlack);

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

    setContainerEvent(container, applyBlack);
    rowItems = document.querySelectorAll('.item');
    
}

createBoard(dimensionCount);