
let toggleBorderButton = true;

// CSS grid variables
const gridContainer = document.querySelector('.grid-container');
const gridSizeInput = document.querySelector('.grid-size');
const gridSizeValue = document.querySelector('.grid-size-value');

function updateGrid(){
    // const gridSize = gridSizeInput.value;
    const gridSize = 100;
    // gridSizeValue.textContent = `${gridSize}x${gridSize}`;

 // Clear the grid container

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
}

updateGrid();

