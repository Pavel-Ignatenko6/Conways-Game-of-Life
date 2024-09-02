// check if all cells are dead
export const checkCells = grid => grid.every(row => row.every(cell => cell === 0));
