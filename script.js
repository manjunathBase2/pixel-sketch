
let toggleBorderButton = true;

// buttons and buttonStates

let buttonStates = {
    brush: false,
    shade: false,
    rainbow: false,
    erase: false,
};

const buttons = document.querySelectorAll(
    ".brush-button, .shade-button, .rainbow-button, .erase-button, .clear-button"
);


// Specific Button nodes
const borderButton = document.querySelector('.border-button');
const brushButton = document.querySelector('.brush-button');
const eraseButton = document.querySelector('.erase-button');
const clearButton = document.querySelector('.clear-button');


// Color variables
let hexColor = "#000000";
const colorChange = document.querySelector("#base");


isMousedown = false;

// CSS grid variables
const gridContainer = document.querySelector('.grid-container');
const gridSizeInput = document.querySelector('#grid-size');
const gridSizeValue = document.querySelector('#grid-size-value');



/* <----------- Functions ------------> */


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
    
    boxesListener(toggleBorderButton);
}

// render the grid for the first time
updateGrid();


function handleMouseDown(){
    isMousedown = true;

    if(buttonStates["erase"]){
        eraser(this);
    }
    else if(buttonStates["shade"]){
        //TODO: Reset the opacity to 0.1 if the color is changed
        this.style.backgroundColor = hexColor;
        this.style.opacity = Number(this.style.opacity) + 0.1;
    }

    else if(buttonStates["rainbow"]){
        hexColor = rainbowMode();
        colorChange.value = hexColor; // setting the brush color same as the last random color in rainbow
        this.style.backgroundColor = hexColor;
        this.style.opacity = 1;
    }
    else{
        this.style.backgroundColor = hexColor;
        this.style.opacity = 1;
    }

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




function eraser(div){
    // div.removeAttribute("background-color");
    // div.removeAttribute("opacity");
    div.style.backgroundColor = "#FFFFFF";
    // div.style.opacity = 0.01;
}


/* <---------- Toggle Borders ----------> */

function toggleBorders() {
  !toggleBorderButton
    ? (toggleBorderButton = true)
    : (toggleBorderButton = false);
  console.log(`Border Button: ${toggleBorderButton}`);

  boxesListener(toggleBorderButton);
}

function toggleButton(event){
    console.clear();
    const clickedButtonId = event.target.id;
    const isAlreadyActive = event.target.classList.contains("active");

    buttons.forEach((button) => button.classList.remove("active"));

    for (const buttonId in buttonStates) {
        if (buttonId !== clickedButtonId || isAlreadyActive){

            buttonStates[buttonId] = false;  // sets all the other buttons to false one by one in loop

            if(isAlreadyActive || clickedButtonId === "clear"){
                brushButton.classList.add("active");  // If button clicked is already active, it will toggle off and brush button will ON by default
                buttonStates["brush"] = true;
            }

        } else {
            // Set the state of clicked button to true; if above conditional fails
            buttonStates[buttonId] = true;
            event.target.classList.add("active");

        }

        console.log(`${buttonId} : ${buttonStates[buttonId]}`);
    }



}


/* <----------- Random Hex Generator ------------> */
function rainbowMode(){
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i<6 ; i++){
        color += letters [Math.floor(Math.random()*16)];
    }
    return color;
}


/* <----------- Event Listeners ------------> */

function boxesListener(gridBorder){
    const boxes = document.querySelectorAll('.grid-item');
    boxes.forEach((box) => {
        box.addEventListener("mousedown",handleMouseDown);
        // box.addEventListener("mouseup",handleMouseUp);
        box.addEventListener("mouseenter",handleMouseEnter);


        if(gridBorder){
            box.classList.add("grid-border");
            borderButton.classList.add("active");
        }else{
            box.classList.remove("grid-border");
            borderButton.classList.remove("active");
        }
    });

}



colorChange.addEventListener("input",function(){ hexColor = this.value; });   // updates the brush color based on input from #base i.e. color palette
buttons.forEach((button) => button.addEventListener('click',toggleButton));
borderButton.addEventListener("click",toggleBorders);
gridSizeInput.addEventListener('input', updateGrid);
clearButton.addEventListener("click",updateGrid);

