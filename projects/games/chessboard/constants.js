class GameConstants {
    constructor() {
        // Global Settings
        this.GLOBAL_SETTINGS_IMAGE_SOURCE = ['LOCAL', 'REMOTE'][0];

        // [0] Constant
        this.UP = 'UP';
        this.DOWN = 'DOWN';
        this.LEFT = 'LEFT';
        this.RIGHT = 'RIGHT';
        this.DEFAULT = 'DEFAULT';
        this.MAIN = 'MAIN';
        this.CLICKED = 'CLICKED';
        this.EXIT = 'EXIT';

        // [1] Chessboard
        // a. Chess
        this.CHESSBOARD_CHESS_ACTIVE_CLICKED_BACKGROUND_IMAGE_P1 = 'PLAYER_1.PNG';
        this.CHESSBOARD_CHESS_ACTIVE_CLICKED_BACKGROUND_IMAGE_P2 = 'PLAYER_2.PNG';
        this.CHESSBOARD_CHESS_ACTIVE_CLICKED_BACKGROUND_COLOR = '#73ad53';

        this.CHESSBOARD_CHESS_ACTIVE_NOT_CLICKED_BACKGROUND_IMAGE_P1 = 'PLAYER_1.PNG';
        this.CHESSBOARD_CHESS_ACTIVE_NOT_CLICKED_BACKGROUND_IMAGE_P2 = 'PLAYER_2.PNG';
        this.CHESSBOARD_CHESS_ACTIVE_NOT_CLICKED_BACKGROUND_COLOR = '';

        this.CHESSBOARD_CHESS_INACTIVE_BACKGROUND_IMAGE = '';
        this.CHESSBOARD_CHESS_INACTIVE_BACKGROUND_COLOR = '#999896';

        // b. Block
        this.CHESSBOARD_BLOCK_BACKGROUND_IMAGE_P1 = 'BLOCK_1.PNG';
        this.CHESSBOARD_BLOCK_BACKGROUND_IMAGE_P2 = 'BLOCK_2.PNG';
        this.CHESSBOARD_BLOCK_BACKGROUND_COLOR = '';

        // c. Trap
        this.CHESSBOARD_TRAP_NOT_TRIGGERED_BACKGROUND_IMAGE = '';
        this.CHESSBOARD_TRAP_NOT_TRIGGERED_BACKGROUND_COLOR = '';

        // d. Space
        this.CHESSBOARD_SPACE_CLICKED_UP_BACKGROUND_IMAGE = 'UP.PNG';
        this.CHESSBOARD_SPACE_CLICKED_UP_BACKGROUND_COLOR = '';

        this.CHESSBOARD_SPACE_CLICKED_DOWN_BACKGROUND_IMAGE = 'DOWN.PNG';
        this.CHESSBOARD_SPACE_CLICKED_DOWN_BACKGROUND_COLOR = '';

        this.CHESSBOARD_SPACE_CLICKED_LEFT_BACKGROUND_IMAGE = 'LEFT.PNG';
        this.CHESSBOARD_SPACE_CLICKED_LEFT_BACKGROUND_COLOR = '';

        this.CHESSBOARD_SPACE_CLICKED_RIGHT_BACKGROUND_IMAGE = 'RIGHT.PNG';
        this.CHESSBOARD_SPACE_CLICKED_RIGHT_BACKGROUND_COLOR = '';

        this.CHESSBOARD_SPACE_NOT_CLICKED_BACKGROUND_IMAGE = '';
        this.CHESSBOARD_SPACE_NOT_CLICKED_BACKGROUND_COLOR = '';

        // e. Explosion
        this.CHESSBOARD_EXPLOSION_BACKGROUND_IMAGE = 'EXPLOSION.PNG';
        this.CHESSBOARD_EXPLOSION_BACKGROUND_COLOR = '';

        // [2] Blockboard
        this.BLOCKBOARD_ACTIVE_CLICKED_BACKGROUND_IMAGE_P1 = 'BLOCK_1.PNG';
        this.BLOCKBOARD_ACTIVE_CLICKED_BACKGROUND_IMAGE_P2 = 'BLOCK_2.PNG';
        this.BLOCKBOARD_ACTIVE_CLICKED_BACKGROUND_COLOR = '#73ad53';
        this.BLOCKBOARD_ACTIVE_CLICKED_BORDER_STYLE = 'solid';

        this.BLOCKBOARD_ACTIVE_NOT_CLICKED_BACKGROUND_IMAGE_P1 = 'BLOCK_1.PNG';
        this.BLOCKBOARD_ACTIVE_NOT_CLICKED_BACKGROUND_IMAGE_P2 = 'BLOCK_2.PNG';
        this.BLOCKBOARD_ACTIVE_NOT_CLICKED_BACKGROUND_COLOR = '';
        this.BLOCKBOARD_ACTIVE_NOT_CLICKED_BORDER_STYLE = '';

        this.BLOCKBOARD_INACTIVE_BACKGROUND_IMAGE_P1 = 'BLOCK_1.PNG';
        this.BLOCKBOARD_INACTIVE_BACKGROUND_IMAGE_P2 = 'BLOCK_2.PNG';
        this.BLOCKBOARD_INACTIVE_BACKGROUND_COLOR = '#999896';
        this.BLOCKBOARD_INACTIVE_BORDER_STYLE = '';

        // [3] Trapboard
        this.TRAPBOARD_ACTIVE_CLICKED_BACKGROUND_IMAGE_P1 = 'TRAP_1.PNG';
        this.TRAPBOARD_ACTIVE_CLICKED_BACKGROUND_IMAGE_P2 = 'TRAP_2.PNG';
        this.TRAPBOARD_ACTIVE_CLICKED_BACKGROUND_COLOR = '#73ad53';
        this.TRAPBOARD_ACTIVE_CLICKED_BORDER_STYLE = 'solid';

        this.TRAPBOARD_ACTIVE_NOT_CLICKED_BACKGROUND_IMAGE_P1 = 'TRAP_1.PNG';
        this.TRAPBOARD_ACTIVE_NOT_CLICKED_BACKGROUND_IMAGE_P2 = 'TRAP_2.PNG';
        this.TRAPBOARD_ACTIVE_NOT_CLICKED_BACKGROUND_COLOR = '';
        this.TRAPBOARD_ACTIVE_NOT_CLICKED_BORDER_STYLE = '';

        this.TRAPBOARD_INACTIVE_BACKGROUND_IMAGE_P1 = 'TRAP_1.PNG';
        this.TRAPBOARD_INACTIVE_BACKGROUND_IMAGE_P2 = 'TRAP_2.PNG';
        this.TRAPBOARD_INACTIVE_BACKGROUND_COLOR = '#999896';
        this.TRAPBOARD_INACTIVE_BORDER_STYLE = '';

        // [4] Scoreboard
        this.SCOREBOARD_BACKGROUND_IMAGE_P1 = 'PLAYER_1.PNG';
        this.SCOREBOARD_BACKGROUND_IMAGE_P2 = 'PLAYER_2.PNG';

        // [5] Gameboard
        this.GAMEBOARD_BACKGROUND_COLOR = '#ebe1bc';

        // Size - Gameboard
        this.TOTAL_WIDTH = 777;
        this.TOTAL_HEIGHT = 777;
        this.TOTAL_ROW = 8;
        this.TOTAL_COLUMN = 8;
        this.WIDTH_PER_UNIT = (
            this.TOTAL_WIDTH - this.TOTAL_WIDTH % this.TOTAL_COLUMN
        ) / this.TOTAL_COLUMN;
        this.HEIGHT_PER_UNIT = (
            this.TOTAL_HEIGHT - this.TOTAL_HEIGHT % this.TOTAL_ROW
        ) / this.TOTAL_ROW;

        // SIZE - Blockboard
        this.BLOCK_WIDTH_PER_UNIT = 40;
        this.BLOCK_HEIGHT_PER_UNIT = 40;

        // Image (Url)
        this.IMAGE_URLS = {
            'PLAYER_1.PNG': 'https://drive.google.com/file/d/1SdJx7vVTP94JbQl2ZFTyHpRAMvW0Eh2O/view?usp=sharing',
            'BLOCK_1.PNG': 'https://drive.google.com/file/d/1sZtZp50JNVEF07UjslAIMfrocdpTfyME/view?usp=sharing',
            'TRAP_1.PNG': 'https://drive.google.com/file/d/1nge8H-lJ_jXF1gaYmbb0EO6_JnltCsNK/view?usp=sharing',
            'PLAYER_2.PNG': 'https://drive.google.com/file/d/177mzUL4pJvF2DBIwu4TlShMR7PHkM9HP/view?usp=sharing',
            'BLOCK_2.PNG': 'https://drive.google.com/file/d/1sSeMi9bOjtLlet2nkU4dIl-Ca3A-Keik/view?usp=sharing',
            'TRAP_2.PNG': 'https://drive.google.com/file/d/19t12K_LWd6mm_-hCu_m76khvJWt5cTnj/view?usp=sharing',
            'UP.PNG': 'https://drive.google.com/file/d/1iQF8Y3PHZU8c3ocszXUTHYC5Cwm-wjZS/view?usp=sharing',
            'DOWN.PNG': 'https://drive.google.com/file/d/1fDUuQ0kVqSG5apL4ONuTVVOYwfvg4Bg1/view?usp=sharing',
            'LEFT.PNG': 'https://drive.google.com/file/d/1b159snjM7OWBr7q7HRMviMH5spX19JKr/view?usp=sharing',
            'RIGHT.PNG': 'https://drive.google.com/file/d/1C_ZHNENYA9lARjLZv-8BdAtw3oC9o6nP/view?usp=sharing',
            'EXPLOSION.PNG': 'https://drive.google.com/file/d/1UrD9GUO-ubNZbqQdS8wi3D5StJDf8R9H/view?usp=sharing',
            '': ''
        };
    }

    getImage(path) {
        switch (this.GLOBAL_SETTINGS_IMAGE_SOURCE) {
            case 'LOCAL':
                return `./statics/img/${path}`;
            case 'REMOTE':
                return this.IMAGE_URLS[path];
        }
    }
}
