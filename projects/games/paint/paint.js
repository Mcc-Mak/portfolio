const GRID_SIZE = 64;
const CELL_SIZE = 1;
const CELL_MARGIN = 0;

let paintGrid = document.getElementById('paint-grid');
paintGrid.style.width = GRID_SIZE + 'px';
paintGrid.style.height = GRID_SIZE + 'px';

for (let j = 0; j < GRID_SIZE / (CELL_SIZE + 2 * CELL_MARGIN); j++) {
    let row = document.createElement('div');
    row.className = 'paint-row';
    row.style.height = CELL_SIZE + 'px';
    for (let i = 0; i < GRID_SIZE / (CELL_SIZE + 2 * CELL_MARGIN); i++) {
        let cell = document.createElement('div');
        cell.className = 'paint-cell';
        cell.style.width = CELL_SIZE + 'px';
        cell.style.height = CELL_SIZE + 'px';
        cell.style.margin = CELL_MARGIN + 'px';
        cell.style.float = 'left';
        cell.style.position = 'relative';
        cell.setAttribute('data-row', j);
        cell.setAttribute('data-col', i);
        cell.addEventListener('mouseout', function() {
            this.style.backgroundColor = 'black';
        });
        row.append(cell);
    }
    paintGrid.append(row);
}
