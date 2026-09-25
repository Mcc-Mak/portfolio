class Game {
    constructor() {
        // Dependency Injection - Inject "Player" into "Game"
        this.turn = 1;
        this.player = {
            1: new Player(),
            2: new Player()
        };
        this.end_game_position = {
            1: 7,
            2: 0
        };
        this.game_end_condition = 1;
    }

    isTurnEnd() {
        if (this.player[this.turn].isPlayerTurnEnd()) {
            return true;
        }
        return false;
    }

    resetRound() {
        this.player[this.turn].resetPlayerRound();
    }

    swapTurn() {
        this.turn = {1: 2, 2: 1}[this.turn];
    }
}

class Player {
    constructor() {
        // Score
        this.score = 0;

        // Per Game
        this.block_per_game = 3;
        this.trap_per_game = 3;

        // Per Round
        this.move_per_round = 1;
        this.block_per_round = 1;
        this.trap_per_round = 1;
    }

    isPlayerTurnEnd() {
        return this.move_per_round == 0;
    }

    resetPlayerRound() {
        this.move_per_round = 1;
        this.block_per_round = 1;
        this.trap_per_round = 1;
    }

    isAbleToMove() {
        return this.move_per_round > 0;
    }

    isAbleToBlock() {
        return this.block_per_round > 0 && this.block_per_game > 0;
    }

    isAbleToTrap() {
        return this.trap_per_round > 0 && this.trap_per_game > 0;
    }

    move() {
        this.move_per_round -= 1;
    }

    consumeBlock() {
        this.block_per_game -= 1;
        this.block_per_round -= 1;
    }

    consumeTrap() {
        this.trap_per_game -= 1;
        this.trap_per_round -= 1;
    }
}
