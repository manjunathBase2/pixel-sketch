
let toggleBorderButton = true;

// Color variables
let hexColor = "#000000";

isMousedown = false;

// CSS grid variables
const gridContainer = document.querySelector('.grid-container');
const gridSizeInput = document.querySelector('#grid-size');
const gridSizeValue = document.querySelector('#grid-size-value');

function updateGrid(){
    const gridSize = gridSizeInput.value;
    // const gridSize = 100;
    gridSizeValue.textContent = `${gridSize}x${gridSize}`;

    gridContainer.innerHTML = '' // Clear the grid container

    for(let i = 1;i <= gridSize ** 2; i++){
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        // gridItem.textContent = i;
        gridContainer.appendChild(gridItem);
    } 
    const itemSize = `${100 / gridSize}%`;
    const gridItems = document.querySelectorAll(".grid-item");
    gridItems.forEach((item) => {
    item.style.width = itemSize;
    item.style.height = itemSize;
    });
    
    boxesListener();
}

// render the grid for the first time
updateGrid();



function handleMouseDown(){
    isMousedown = true;

    this.style.backgroundColor = hexColor;

}

// function handleMouseUp() {
//   isMouseDown = false;
// }

function handleMouseEnter(event) {
//   if (isMouseDown) {
//     handleMouseDown.call(this, event);
//   }
    handleMouseDown.call(this, event);
}



/* <----------- Event Listeners ------------> */

function boxesListener(){
    const boxes = document.querySelectorAll('.grid-item');
    boxes.forEach((box) => {
        box.addEventListener("mousedown",handleMouseDown);
        // box.addEventListener("mouseup",handleMouseUp);
        box.addEventListener("mouseenter",handleMouseEnter);
    });
}

gridSizeInput.addEventListener('input', updateGrid);

