$(document).ready(function () {

    // ----------------------------------------------
    // [Procedures]
    //  - [Intro] Init - Method Declaration
    //      > Generate HTML
    //      > Refresh screen
    //      > Check movable
    //  - [Session-I] Init - HTML
    //  - [Session-II] Init - Display UI
    //  - [Session-III] Init - Event handler(s)
    //  - [Session-IV] Init - Notification
    // ----------------------------------------------
    // [Q&A]
    // ----------------------------------------------
    // Q1: What is the getter and setter of 'data-value'?
    // A1:
    //  this.getAttribute('data-value')
    //  this.setAttribute('data-value', value)
    // ----------------------------------------------
    // Q2: What is the getter and setter of 'data-status'?
    // A2:
    //  this.getAttribute('data-status')
    //  this.setAttribute('data-status', status)
    // ----------------------------------------------
    // Q3: What is the getter and setter of 'data-name'?
    // A3:
    //  this.getAttribute('data-name')
    //  this.setAttribute('data-name', name)
    // ----------------------------------------------
    // Q4: What is the getter and setter of 'data-row'?
    // A4:
    //  this.getAttribute('data-row')
    //  this.setAttribute('data-row', row)
    // ----------------------------------------------
    // Q5: What is the getter and setter of 'data-col'?
    // A5:
    //  this.getAttribute('data-col')
    //  this.setAttribute('data-col', col)
    // ----------------------------------------------

    // Global Constant & Configuration
    var constants = new GameConstants();

    // Variable
    var game = new Game();

    // [Introduction] Init - Method Declaration
    //      > Generate HTML
    function getInitChessboard() {
        let table = document.createElement('table');
        table.className = 'chessboard';
        for (let row = 0; row < constants.TOTAL_ROW; row++) {
            let tr = document.createElement('tr');
            tr.className = 'chessboard';
            for (let col = 0; col < constants.TOTAL_COLUMN; col++) {
                let td = document.createElement('td');
                td.style.width = constants.WIDTH_PER_UNIT;
                td.style.height = constants.HEIGHT_PER_UNIT;
                td.className = 'chessboard chess-cell';
                td.setAttribute('data-row', row);
                td.setAttribute('data-col', col);
                td.setAttribute('data-status', 'DEFAULT');
                if (col == 0) {
                    td.setAttribute('data-value', '1');
                    td.setAttribute('data-name', '1');
                } else if (col == 7) {
                    td.setAttribute('data-value', '1');
                    td.setAttribute('data-name', '2');
                } else {
                    td.setAttribute('data-value', '0');
                    td.setAttribute('data-name', '-1');
                }
                tr.append(td);
            }
            table.append(tr);
        }
        return table;
    }

    //      > Refresh screen
    function refreshChessboard() {
        $('td.chess-cell').each(function () {
            switch (this.getAttribute('data-value')) {
                case '0':
                    // Space
                    switch (this.getAttribute('data-status')) {
                        // Default
                        case constants.DEFAULT:
                            this.style.backgroundColor = constants.CHESSBOARD_SPACE_NOT_CLICKED_BACKGROUND_COLOR;
                            this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_SPACE_NOT_CLICKED_BACKGROUND_IMAGE)}")`;
                            break;
                        // Suggest Move
                        case constants.UP:
                            this.style.backgroundColor = constants.CHESSBOARD_SPACE_CLICKED_UP_BACKGROUND_COLOR;
                            this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_SPACE_CLICKED_UP_BACKGROUND_IMAGE)}")`;
                            break;
                        case constants.DOWN:
                            this.style.backgroundColor = constants.CHESSBOARD_SPACE_CLICKED_DOWN_BACKGROUND_COLOR;
                            this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_SPACE_CLICKED_DOWN_BACKGROUND_IMAGE)}")`;
                            break;
                        case constants.LEFT:
                            this.style.backgroundColor = constants.CHESSBOARD_SPACE_CLICKED_LEFT_BACKGROUND_COLOR;
                            this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_SPACE_CLICKED_LEFT_BACKGROUND_IMAGE)}")`;
                            break;
                        case constants.RIGHT:
                            this.style.backgroundColor = constants.CHESSBOARD_SPACE_CLICKED_RIGHT_BACKGROUND_COLOR;
                            this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_SPACE_CLICKED_RIGHT_BACKGROUND_IMAGE)}")`;
                            break;
                    }
                    break;
                case '1':
                    // Chess
                    if (game.turn == this.getAttribute('data-name')) {
                        // Active Chess
                        switch (this.getAttribute('data-status')) {
                            case constants.DEFAULT:
                                if (this.getAttribute('data-name') == 1) {
                                    this.style.backgroundColor = constants.CHESSBOARD_CHESS_ACTIVE_NOT_CLICKED_BACKGROUND_COLOR;
                                    this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_CHESS_ACTIVE_NOT_CLICKED_BACKGROUND_IMAGE_P1)}")`;
                                } else {
                                    this.style.backgroundColor = constants.CHESSBOARD_CHESS_ACTIVE_NOT_CLICKED_BACKGROUND_COLOR;
                                    this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_CHESS_ACTIVE_NOT_CLICKED_BACKGROUND_IMAGE_P2)}")`;
                                }
                                break;
                            case constants.CLICKED:
                                if (this.getAttribute('data-name') == 1) {
                                    this.style.backgroundColor = constants.CHESSBOARD_CHESS_ACTIVE_CLICKED_BACKGROUND_COLOR;
                                    this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_CHESS_ACTIVE_CLICKED_BACKGROUND_IMAGE_P1)}")`;
                                } else {
                                    this.style.backgroundColor = constants.CHESSBOARD_CHESS_ACTIVE_CLICKED_BACKGROUND_COLOR;
                                    this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_CHESS_ACTIVE_CLICKED_BACKGROUND_IMAGE_P2)}")`;
                                }
                                break;
                        }
                    } else {
                        // Inactive Chess
                        this.style.backgroundColor = constants.CHESSBOARD_CHESS_INACTIVE_BACKGROUND_COLOR;
                        this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_CHESS_INACTIVE_BACKGROUND_IMAGE)}")`;
                    }
                    break;
                case '2':
                    // Trap
                    switch (this.getAttribute('data-status')) {
                        // Default
                        case constants.DEFAULT:
                            this.style.backgroundColor = constants.CHESSBOARD_TRAP_NOT_TRIGGERED_BACKGROUND_COLOR;
                            this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_TRAP_NOT_TRIGGERED_BACKGROUND_IMAGE)}")`;
                            break;
                        // Suggest Move
                        case constants.UP:
                            this.style.backgroundColor = constants.CHESSBOARD_SPACE_CLICKED_UP_BACKGROUND_COLOR;
                            this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_SPACE_CLICKED_UP_BACKGROUND_IMAGE)}")`;
                            break;
                        case constants.DOWN:
                            this.style.backgroundColor = constants.CHESSBOARD_SPACE_CLICKED_DOWN_BACKGROUND_COLOR;
                            this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_SPACE_CLICKED_DOWN_BACKGROUND_IMAGE)}")`;
                            break;
                        case constants.LEFT:
                            this.style.backgroundColor = constants.CHESSBOARD_SPACE_CLICKED_LEFT_BACKGROUND_COLOR;
                            this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_SPACE_CLICKED_LEFT_BACKGROUND_IMAGE)}")`;
                            break;
                        case constants.RIGHT:
                            this.style.backgroundColor = constants.CHESSBOARD_SPACE_CLICKED_RIGHT_BACKGROUND_COLOR;
                            this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_SPACE_CLICKED_RIGHT_BACKGROUND_IMAGE)}")`;
                            break;
                    }
                    break;
                case '3':
                    // Block
                    if (this.getAttribute('data-name') == 1) {
                        this.style.backgroundColor = constants.CHESSBOARD_BLOCK_BACKGROUND_COLOR;
                        this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_BLOCK_BACKGROUND_IMAGE_P1)}")`;
                    } else {
                        this.style.backgroundColor = constants.CHESSBOARD_BLOCK_BACKGROUND_COLOR;
                        this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_BLOCK_BACKGROUND_IMAGE_P2)}")`;
                    }
                    break;
                case '4':
                    // Explosion
                    this.style.backgroundColor = constants.CHESSBOARD_EXPLOSION_BACKGROUND_COLOR;
                    this.style.backgroundImage = `url("${constants.getImage(constants.CHESSBOARD_EXPLOSION_BACKGROUND_IMAGE)}")`;
                    break;
            }
        });
    }

    function refreshSkillboard() {
        // Blockboard
        $('img.block-cell').each(function () {
            if (this.getAttribute('data-name') == game.turn) {
                // Active
                switch (this.getAttribute('data-name')) {
                    case '1':
                        // Player 1
                        switch (this.getAttribute('data-status')) {
                            case constants.DEFAULT:
                                // Not Clicked
                                this.src = `${constants.getImage(constants.BLOCKBOARD_ACTIVE_NOT_CLICKED_BACKGROUND_IMAGE_P1)}`;
                                this.style.borderStyle = constants.BLOCKBOARD_ACTIVE_NOT_CLICKED_BORDER_STYLE;
                                break;
                            case constants.CLICKED:
                                // Clicked
                                this.src = `${constants.getImage(constants.BLOCKBOARD_ACTIVE_CLICKED_BACKGROUND_IMAGE_P1)}`;
                                this.style.borderStyle = constants.BLOCKBOARD_ACTIVE_CLICKED_BORDER_STYLE;
                                break;
                        }
                        break;
                    case '2':
                        // Player 2
                        switch (this.getAttribute('data-status')) {
                            case constants.DEFAULT:
                                // Not Clicked
                                this.src = `${constants.getImage(constants.BLOCKBOARD_ACTIVE_NOT_CLICKED_BACKGROUND_IMAGE_P2)}`;
                                this.style.borderStyle = constants.BLOCKBOARD_ACTIVE_NOT_CLICKED_BORDER_STYLE;
                                break;
                            case constants.CLICKED:
                                // Clicked
                                this.src = `${constants.getImage(constants.BLOCKBOARD_ACTIVE_CLICKED_BACKGROUND_IMAGE_P2)}`;
                                this.style.borderStyle = constants.BLOCKBOARD_ACTIVE_CLICKED_BORDER_STYLE;
                                break;
                        }
                        break;
                }
                this.parentElement.style.backgroundColor = constants.BLOCKBOARD_ACTIVE_NOT_CLICKED_BACKGROUND_COLOR;
            } else {
                // Inactive
                switch (this.getAttribute('data-name')) {
                    case '1':
                        // Player 1
                        this.src = `${constants.getImage(constants.BLOCKBOARD_INACTIVE_BACKGROUND_IMAGE_P1)}`;
                        break;
                    case '2':
                        // Player 2
                        this.src = `${constants.getImage(constants.BLOCKBOARD_INACTIVE_BACKGROUND_IMAGE_P2)}`;
                        break;
                }
                this.parentElement.style.backgroundColor = constants.BLOCKBOARD_INACTIVE_BACKGROUND_COLOR;
                this.style.borderStyle = constants.BLOCKBOARD_INACTIVE_BORDER_STYLE;
            }
        });

        // Trapboard
        $('img.trap-cell').each(function () {
            if (this.getAttribute('data-name') == game.turn) {
                // Active
                switch (this.getAttribute('data-name')) {
                    case '1':
                        // Player 1
                        switch (this.getAttribute('data-status')) {
                            case constants.DEFAULT:
                                // Not Clicked
                                this.src = `${constants.getImage(constants.TRAPBOARD_ACTIVE_NOT_CLICKED_BACKGROUND_IMAGE_P1)}`;
                                this.style.borderStyle = constants.TRAPBOARD_ACTIVE_NOT_CLICKED_BORDER_STYLE;
                                break;
                            case constants.CLICKED:
                                // Clicked
                                this.src = `${constants.getImage(constants.TRAPBOARD_ACTIVE_CLICKED_BACKGROUND_IMAGE_P1)}`;
                                this.style.borderStyle = constants.TRAPBOARD_ACTIVE_CLICKED_BORDER_STYLE;
                                break;
                        }
                        break;
                    case '2':
                        // Player 2
                        switch (this.getAttribute('data-status')) {
                            case constants.DEFAULT:
                                // Not Clicked
                                this.src = `${constants.getImage(constants.TRAPBOARD_ACTIVE_NOT_CLICKED_BACKGROUND_IMAGE_P2)}`;
                                this.style.borderStyle = constants.TRAPBOARD_ACTIVE_NOT_CLICKED_BORDER_STYLE;
                                break;
                            case constants.CLICKED:
                                // Clicked
                                this.src = `${constants.getImage(constants.TRAPBOARD_ACTIVE_CLICKED_BACKGROUND_IMAGE_P2)}`;
                                this.style.borderStyle = constants.TRAPBOARD_ACTIVE_CLICKED_BORDER_STYLE;
                                break;
                        }
                        break;
                }
                this.parentElement.style.backgroundColor = constants.TRAPBOARD_ACTIVE_NOT_CLICKED_BACKGROUND_COLOR;
            } else {
                // Inactive
                switch (this.getAttribute('data-name')) {
                    case '1':
                        // Player 1
                        this.src = `${constants.getImage(constants.TRAPBOARD_INACTIVE_BACKGROUND_IMAGE_P1)}`;
                        break;
                    case '2':
                        // Player 2
                        this.src = `${constants.getImage(constants.TRAPBOARD_INACTIVE_BACKGROUND_IMAGE_P2)}`;
                        break;
                }
                this.parentElement.style.backgroundColor = constants.TRAPBOARD_INACTIVE_BACKGROUND_COLOR;
                this.style.borderStyle = constants.TRAPBOARD_INACTIVE_BORDER_STYLE;
            }
        });
    }

    function refreshTurnboard() {
        $('td.turn-board').each(function () {
            // Image
            this.children[0].src = (
                (game.turn == 1) ?
                    constants.getImage(constants.SCOREBOARD_BACKGROUND_IMAGE_P1) :
                    constants.getImage(constants.SCOREBOARD_BACKGROUND_IMAGE_P2)
            );
            // Name
            this.children[2].innerText = `Player ${game.turn}`;
        });
    }

    function refreshScoreboard() {
        $('td.score-board > pre').each(function () {
            // Score
            this.innerText = game.player[parseInt(this.parentElement.getAttribute('data-name'))].score;
        });
    }

    function refreshScreen() {
        // Refresh all
        refreshTurnboard();
        refreshScoreboard();
        refreshSkillboard();
        refreshChessboard();
    }

    //      > Check movable
    function isMovable(object) {
        return (
            (
                object.getAttribute('data-value') == 0 ||
                object.getAttribute('data-value') == 2
            ) &&
            [
                constants.UP,
                constants.DOWN,
                constants.LEFT,
                constants.RIGHT
            ].includes(object.getAttribute('data-status'))
        );
    }

    //      > Declare victory
    function declareVictory() {
        Swal.fire({
            title: 'Victory',
            html: `Player ${game.turn}!`,
            icon: 'success'
        });
        $('td').each(function () {
            this.setAttribute('data-value', -1);
            this.setAttribute('data-name', -1);
            this.setAttribute('data-status', constants.EXIT);
        });
    }

    // [Session-I] Init - HTML
    let layoutTable = document.createElement('table');
    layoutTable.className = 'game-layout';
    for (let r = 0; r < 7; r++) {
        let tr = document.createElement('tr');
        for (let c = 0; c < 7; c++) {
            let td = document.createElement('td');
            td.style.textAlign = 'center';
            td.style.borderBlockStyle = 'groove';
            switch (r) {
                case 0:
                    if (c == 0) {
                        td.colSpan = 2;
                        td.innerHTML = '<b><pre>Player Turn</pre></b>';
                        tr.append(td);
                    } else if (c == 1) {
                        td.className = 'turn-board';
                        td.innerHTML = `\
<img style="width: 40px; height: 40px;" alt="player-img" class="turn-board"/>\
<hr>\
<label>\
<pre>Player ${game.turn}</pre>\
</label>\
`;
                        tr.append(td);
                    } else if (c == 2) {
                        td.rowSpan = 7;
                        td.className = 'chessboard-container';
                        td.style.backgroundColor = constants.GAMEBOARD_BACKGROUND_COLOR;
                        td.append(
                            getInitChessboard()
                        );
                        tr.append(td);
                    }
                    break;
                case 1:
                    if (c == 0) {
                        td.rowSpan = 2;
                        td.innerHTML = '<b><pre>Score</pre></b>';
                        tr.append(td);
                    } else if (c == 1) {
                        td.innerHTML = '<b>Player 1</b>';
                        tr.append(td);
                    } else if (c == 2) {
                        td.className = 'score-board';
                        td.setAttribute('data-name', 1);
                        td.innerHTML = `<pre>${game.player[1].score}</pre>`;
                        tr.append(td);
                    }

                    break;
                case 2:
                    if (c == 0) {
                        td.innerHTML = '<b>Player 2</b>';
                        tr.append(td);
                    } else if (c == 1) {
                        td.className = 'score-board';
                        td.setAttribute('data-name', 2);
                        td.innerHTML = `<pre>${game.player[2].score}</pre>`;
                        tr.append(td);
                    }
                    break;
                case 3:
                    if (c == 0) {
                        td.rowSpan = 4;
                        td.innerHTML = '<b><pre>Skill</pre></b>';
                        tr.append(td);
                    } else if (c == 1) {
                        td.rowSpan = 2;
                        td.innerHTML = '<b>Player 1</b>';
                        tr.append(td);
                    } else if (c == 2) {
                        td.className = 'block-board';
                        for (let idx = 0; idx < 3; idx++) {
                            let image = document.createElement('img');
                            image.alt = 'block-board-img-1';
                            image.className = 'block-board block-cell';
                            image.style.width = constants.BLOCK_WIDTH_PER_UNIT;
                            image.style.height = constants.BLOCK_HEIGHT_PER_UNIT;
                            image.setAttribute('data-value', '-1');
                            image.setAttribute('data-name', '1');
                            image.setAttribute('data-status', 'DEFAULT');
                            td.append(image);
                            if (idx != 2) {
                                td.innerHTML += '<hr>';
                            }
                        }
                        tr.append(td);
                    }

                    break;
                case 4:
                    if (c == 0) {
                        td.className = 'trap-board';
                        for (let idx = 0; idx < 3; idx++) {
                            let image = document.createElement('img');
                            image.alt = 'trap-board-img-1';
                            image.className = 'trap-board trap-cell';
                            image.style.width = constants.BLOCK_WIDTH_PER_UNIT;
                            image.style.height = constants.BLOCK_HEIGHT_PER_UNIT;
                            image.setAttribute('data-value', '-1');
                            image.setAttribute('data-name', '1');
                            image.setAttribute('data-status', 'DEFAULT');
                            td.append(image);
                            if (idx != 2) {
                                td.innerHTML += '<hr>';
                            }
                        }
                        tr.append(td);
                    }

                    break;
                case 5:
                    if (c == 0) {
                        td.rowSpan = 2;
                        td.innerHTML = '<b>Player 2</b>';
                        tr.append(td);
                    } else if (c == 1) {
                        td.className = 'block-board';
                        for (let idx = 0; idx < 3; idx++) {
                            let image = document.createElement('img');
                            image.alt = 'block-board-img-2';
                            image.className = 'block-board block-cell';
                            image.style.width = constants.BLOCK_WIDTH_PER_UNIT;
                            image.style.height = constants.BLOCK_HEIGHT_PER_UNIT;
                            image.setAttribute('data-value', '-1');
                            image.setAttribute('data-name', '2');
                            image.setAttribute('data-status', 'DEFAULT');
                            td.append(image);
                            if (idx != 2) {
                                td.innerHTML += '<hr>';
                            }
                        }
                        tr.append(td);
                    }
                    break;
                case 6:
                    if (c == 0) {
                        td.className = 'trap-board';
                        for (let idx = 0; idx < 3; idx++) {
                            let image = document.createElement('img');
                            image.alt = 'trap-board-img-2';
                            image.className = 'trap-board trap-cell';
                            image.style.width = constants.BLOCK_WIDTH_PER_UNIT;
                            image.style.height = constants.BLOCK_HEIGHT_PER_UNIT;
                            image.setAttribute('data-value', '-1');
                            image.setAttribute('data-name', '2');
                            image.setAttribute('data-status', 'DEFAULT');
                            td.append(image);
                            if (idx != 2) {
                                td.innerHTML += '<hr>';
                            }
                        }
                        tr.append(td);
                    }
                    break;
            }
        }
        layoutTable.append(tr);
    }
    $('.main-container')[0].append(layoutTable);

    // [Session-II] Init - Display
    refreshScreen();

    // [Session-III] Init - Event handler(s)
    function isAnyActiveChessCellClicked() {
        // Return 'true' if any active chess-cell clicked (data-value=1, data-name=playerTurn, data-status=CLICKED)
        return $('td.chess-cell').filter(function () {
            if (
                this.getAttribute('data-value') == 1 &&
                this.getAttribute('data-name') == game.turn &&
                this.getAttribute('data-status') == constants.CLICKED
            ) {
                return true;
            }
        }).length > 0;
    }

    function isAnyActiveBlockCellClicked() {
        // Return 'true' if any active block-cell clicked (data-value=-1, data-name=playerTurn, data-status=CLICKED)
        return $('img.block-cell').filter(function () {
            if (
                this.getAttribute('data-value') == -1 &&
                this.getAttribute('data-name') == game.turn &&
                this.getAttribute('data-status') == constants.CLICKED
            ) {
                return true;
            }
        }).length > 0;
    }

    function isAnyActiveTrapCellClicked() {
        // Return 'true' if any active trap-cell clicked (data-value=-1, data-name=playerTurn, data-status=CLICKED)
        return $('img.trap-cell').filter(function () {
            if (
                this.getAttribute('data-value') == -1 &&
                this.getAttribute('data-name') == game.turn &&
                this.getAttribute('data-status') == constants.CLICKED
            ) {
                return true;
            }
        }).length > 0;
    }

    function isAnyActiveCellClicked() {
        // Return 'true' if any active cell clicked
        return (
            isAnyActiveChessCellClicked() ||
            isAnyActiveBlockCellClicked() ||
            isAnyActiveTrapCellClicked()
        );
    }

    // Clicked chessboard
    $('td.chess-cell').on('click', function () {
        if (!isAnyActiveCellClicked()) {
            // Condition: No active cells clicked

            if (
                this.getAttribute('data-value') == 1 &&
                this.getAttribute('data-name') == game.turn &&
                this.getAttribute('data-status') == constants.DEFAULT
            ) {
                // [Target] Clicked chess-cell is active and not clicked (data-value=1, data-name=playerTurn, data-status=DEFAULT)

                let clickedCell = [
                    parseInt(this.getAttribute('data-row')),
                    parseInt(this.getAttribute('data-col'))
                ];

                // [A.0-1] Action: Click on an active non-clicked chess-cell
                // Status - Clicked
                this.setAttribute('data-status', constants.CLICKED);
                // Status - Neighboring
                $('td.chess-cell').each(function () {
                    // Not clicked
                    if (this.getAttribute('data-status') == constants.DEFAULT) {
                        switch (this.getAttribute('data-value')) {
                            // Space
                            case '0':
                            // Trap
                            case '2':
                                // Neighboring Cells
                                if ((clickedCell[0] - 1 == this.getAttribute('data-row') && clickedCell[1] == this.getAttribute('data-col'))) {
                                    // Upper cell
                                    this.setAttribute('data-status', constants.UP);
                                } else if ((clickedCell[0] + 1 == this.getAttribute('data-row') && clickedCell[1] == this.getAttribute('data-col'))) {
                                    // Lower cell
                                    this.setAttribute('data-status', constants.DOWN);
                                } else if ((clickedCell[0] == this.getAttribute('data-row') && clickedCell[1] - 1 == this.getAttribute('data-col'))) {
                                    // Left cell
                                    this.setAttribute('data-status', constants.LEFT);
                                } else if ((clickedCell[0] == this.getAttribute('data-row') && clickedCell[1] + 1 == this.getAttribute('data-col'))) {
                                    // Right cell
                                    this.setAttribute('data-status', constants.RIGHT);
                                }
                                break;
                        }
                    }
                });
                refreshScreen();
            }
        } else {
            // Condition: Some active cells clicked
            if (isAnyActiveChessCellClicked()) {
                // Some active chess-cell clicked (data-value=1, data-name=playerTurn, data-status=CLICKED)
                if (
                    this.getAttribute('data-value') == 1 &&
                    this.getAttribute('data-name') == game.turn &&
                    this.getAttribute('data-status') == constants.CLICKED
                ) {
                    // [Target] Clicked chess is active and clicked (data-value=1, data-name=playerTurn, data-status=CLICKED)

                    let clickedCell = [
                        parseInt(this.getAttribute('data-row')),
                        parseInt(this.getAttribute('data-col'))
                    ];

                    // [A.1-4] Action: Redo the clicking of active chess-cell
                    // Status - Clicked
                    this.setAttribute('data-status', constants.DEFAULT);
                    // Status - Neighboring
                    $('td.chess-cell').each(function () {
                        switch (this.getAttribute('data-value')) {
                            // Space
                            case '0':
                            // Trap
                            case '2':
                                // Neighboring Cells
                                if ((clickedCell[0] - 1 == this.getAttribute('data-row') && clickedCell[1] == this.getAttribute('data-col'))) {
                                    // Upper cell
                                    this.setAttribute('data-status', constants.DEFAULT);
                                } else if ((clickedCell[0] + 1 == this.getAttribute('data-row') && clickedCell[1] == this.getAttribute('data-col'))) {
                                    // Lower cell
                                    this.setAttribute('data-status', constants.DEFAULT);
                                } else if ((clickedCell[0] == this.getAttribute('data-row') && clickedCell[1] - 1 == this.getAttribute('data-col'))) {
                                    // Left cell
                                    this.setAttribute('data-status', constants.DEFAULT);
                                } else if ((clickedCell[0] == this.getAttribute('data-row') && clickedCell[1] + 1 == this.getAttribute('data-col'))) {
                                    // Right cell
                                    this.setAttribute('data-status', constants.DEFAULT);
                                }
                                break;
                        }
                    });
                    refreshScreen();
                } else if (isMovable(this)) {
                    // Moving to a movable point
                    //  1. trap or space
                    //  2. up, down, left, right

                    if (game.player[game.turn].isAbleToMove()) {
                        // With count to move

                        // Consume move count
                        game.player[game.turn].move();

                        // Chess
                        let chess = $('td.chess-cell').filter(function () {
                            if (this.getAttribute('data-status') == constants.CLICKED) {
                                // Reset chess
                                this.setAttribute('data-value', 0);
                                this.setAttribute('data-name', -1);
                                this.setAttribute('data-status', constants.DEFAULT);
                                return this;
                            }
                        })[0];
                        switch (this.getAttribute('data-value')) {
                            // Space
                            case '0':
                                // Update position
                                this.setAttribute('data-value', 1);
                                this.setAttribute('data-name', game.turn);
                                break;
                            // Trap
                            case '2':
                                // Update position
                                this.setAttribute('data-value', 4);
                                this.setAttribute('data-name', -1);
                                break;
                        }
                        // Score
                        if (this.getAttribute('data-value') == 1) {
                            // Not Explosion
                            if (this.getAttribute('data-col') == game.end_game_position[game.turn]) {
                                // Reach destination
                                game.player[game.turn].score += 1;

                                // Reset status again
                                this.setAttribute('data-value', 0);
                                this.setAttribute('data-name', -1);
                            }
                        }
                        // Neighboring cells
                        $('td.chess-cell').each(function () {
                            switch (this.getAttribute('data-status')) {
                                case constants.UP:
                                case constants.DOWN:
                                case constants.LEFT:
                                case constants.RIGHT:
                                    // Reset suggested space or trap status
                                    this.setAttribute('data-status', constants.DEFAULT);
                                    break;
                            }
                        });
                        // Game End Condition
                        if (game.player[game.turn].score >= game.game_end_condition) {
                            refreshScreen();
                            // Born of Victory!
                            declareVictory();
                        } else {
                            // Next turn
                            game.swapTurn();
                            game.resetRound();
                        }

                        refreshScreen();
                    }
                }
            } else if (isAnyActiveBlockCellClicked()) {
                // Some active block-cell clicked (data-name=playerTurn, data-status=CLICKED)

                if (game.player[game.turn].isAbleToBlock()) {
                    // Able to block

                    // [A.2-9] (a) Action: Place a block
                    // [A.2-10] (a) Action: Replace a trap by block
                    // Consume a block
                    game.player[game.turn].consumeBlock();

                    switch (this.getAttribute('data-value')) {
                        // Space
                        case '0':
                        // Trap
                        case '2':
                            // Place a block
                            this.setAttribute('data-value', 3);

                            // Consume a block
                            break;
                    }
                    // Reset block-cell status
                    $('img.block-cell').each(function () {
                        if (this.getAttribute('data-status') == constants.CLICKED) {
                            this.setAttribute('data-status', constants.DEFAULT);
                            this.style.display = 'none';
                        }
                    });
                    refreshScreen();
                }
            } else if (isAnyActiveTrapCellClicked()) {
                // Some active trap-cell clicked (data-name=playerTurn, data-status=CLICKED)

                if (game.player[game.turn].isAbleToTrap()) {
                    // Able to trap

                    // [A.2-9] (b) Action: Place a trap
                    // Consume a trap
                    game.player[game.turn].consumeTrap();

                    switch (this.getAttribute('data-value')) {
                        // Space
                        case '0':
                            // Place a trap
                            this.setAttribute('data-value', 2);
                            break;
                    }
                    // Reset trap-cell status
                    $('img.trap-cell').each(function () {
                        if (this.getAttribute('data-status') == constants.CLICKED) {
                            this.setAttribute('data-status', constants.DEFAULT);
                            this.style.display = 'none';
                        }
                    });
                    refreshScreen();
                }
            }
        }
    });

    // Clicked blockboard
    $('img.block-cell').on('click', function () {
        if (!isAnyActiveCellClicked()) {
            // Condition: No active cells clicked

            if (
                this.getAttribute('data-name') == game.turn &&
                this.getAttribute('data-status') == constants.DEFAULT
            ) {
                // [Target] Clicked block-cell is active and not clicked (data-name=playerTurn, data-status=DEFAULT)

                if (game.player[game.turn].isAbleToBlock()) {
                    // Able to Block

                    // [A.0-2] Action: Click on an active non-clicked block-cell
                    // Status - Clicked
                    this.setAttribute('data-status', constants.CLICKED);
                    refreshScreen();
                }
            }
        } else {
            // Condition: Some active cells clicked

            if (isAnyActiveBlockCellClicked()) {
                // Any active block-cell clicked (data-name=playerTurn, data-status=CLICKED)
                if (
                    this.getAttribute('data-name') == game.turn &&
                    this.getAttribute('data-status') == constants.CLICKED
                ) {
                    // [Target] Clicked block is active and clicked (data-name=playerTurn, data-status=CLICKED)

                    // [A.2-5] Action: Redo the clicking of active block-cell
                    // Status - Clicked
                    this.setAttribute('data-status', constants.DEFAULT);
                    refreshScreen();
                }
            }
        }
    });

    // Clicked trapboard
    $('img.trap-cell').on('click', function () {
        if (!isAnyActiveCellClicked()) {
            // Condition: No active cells clicked

            if (
                this.getAttribute('data-name') == game.turn &&
                this.getAttribute('data-status') == constants.DEFAULT
            ) {
                // [Target] Clicked trap-cell is active and not clicked (data-name=playerTurn, data-status=DEFAULT)

                if (game.player[game.turn].isAbleToTrap()) {
                    // Able to Trap

                    // [A.0-3] Action: Click on an active non-clicked trap-cell
                    // Status - Clicked
                    this.setAttribute('data-status', constants.CLICKED);
                    refreshScreen();
                }
            }
        } else {
            // Condition: Some active cells clicked

            if (isAnyActiveTrapCellClicked()) {
                // Any active trap-cell clicked (data-name=playerTurn, data-status=CLICKED)
                if (
                    this.getAttribute('data-name') == game.turn &&
                    this.getAttribute('data-status') == constants.CLICKED
                ) {
                    // [Target] Clicked trap is active and clicked (data-name=playerTurn, data-status=CLICKED)

                    // [A.2-6] Action: Redo the clicking of active trap-cell
                    // Status - Clicked
                    this.setAttribute('data-status', constants.DEFAULT);
                    refreshScreen();
                }
            }
        }
    });

    // [Session-IV] Init - Notification
    Swal.fire({
        title: '',
        html: '\
        <style>p {text-align: left}</style>\
        <h1>Rule(s)</h1>\
        <hr>\
        <p>1. Next turn whenever any chess moved once</p>\
        <p>2. 3 traps and 3 blocks given to each player per game, and 1 trap and 1 block usable for each turn</p>\
        <p>3. 1 point obtained for reaching opposite side</p>\
        <p>4. Victory declared for the player first reaching 5 points!</p>\
        '
    }).then(() => {
        Swal.fire({
            title: 'Enjoy the game!',
            icon: 'success'
        });
    });
});
