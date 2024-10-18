# pixel-sketch


Design insights:

- Each grid-item (box inside the grid) is attached with event listeners mouseup, mousedown, mouseover - corresponding functions are `handleMouseDown`, `handleMouseUp`, `handleMouseOver`

- The functions change the appearance of each `grid-item` by resolving the active button states out of brush, erase, rainbow, shader.

