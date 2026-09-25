const CONTAINER_LENGTH = 480;
const SIDE_LENGTH = 1;
const MARGIN = 0.5;

const container = document.getElementById('container');
container.style.width = CONTAINER_LENGTH + 'px';
container.style.height = CONTAINER_LENGTH + 'px';

const cellsPerRow = CONTAINER_LENGTH / (SIDE_LENGTH + 2 * MARGIN);

for (let j = 0; j < cellsPerRow; j++) {
    const row = document.createElement('div');
    row.className = 'row';
    row.style.height = SIDE_LENGTH + 'px';
    for (let i = 0; i < cellsPerRow; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.width = SIDE_LENGTH + 'px';
        cell.style.height = SIDE_LENGTH + 'px';
        cell.style.margin = MARGIN + 'px';
        row.append(cell);
    }
    container.append(row);
}
