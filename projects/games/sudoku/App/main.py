import cv2 as cv
import numpy as np
from pygame.math import Vector2

vec = Vector2


class ConstantFactory:
    def __init__(self, outer=None) -> None:
        self.outer = self
        self.RED = "Red"
        self.GREEN = "Green"
        self.BROWN = "Brown"
        self.PURPLE = "Purple"
        self.NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

constants = ConstantFactory()


class LoggerFactory:
    def __init__(self) -> None:
        self.IS_DEBUG = False

    def show_json(self, json_data):
        from json import dumps
        print(dumps(json_data, indent=2))

    def show_log(self, message):
        if self.IS_DEBUG:
            print(message)

logger = LoggerFactory()


class SudokuRegularFactory:
    class SolverFactory:
        class EasyFactory:
            def __init__(self, outer=None) -> None:
                # [Reservation] Future Development
                self.outer = outer

        class MediumFactory:
            class ConstantFactory:
                def __init__(self, outer=None) -> None:
                    self.outer = outer
                    self.FULL_SET_ANSWER = set(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
                    self.TOTAL_NO_OF_ROWS = 9
                    self.TOTAL_NO_OF_COLUMNS = 9
                    self.TOTAL_NO_OF_CELLS = self.TOTAL_NO_OF_ROWS * self.TOTAL_NO_OF_COLUMNS

            class UtilityFactory:
                def __init__(self, outer=None) -> None:
                    self.outer = outer

                def get_cell_id_by_cell(self, cell):
                    return 9 * cell.x + cell.y

                def get_cell_by_cell_id(self, cell_id):
                    return vec((int(cell_id / 9), cell_id % 9))

                def filter(self, data_set, exclude=None, remove_duplication=False):
                    if exclude is None:
                        exclude = []
                    res = [
                        data
                        for data in data_set
                        if data not in exclude
                    ]
                    if remove_duplication:
                        return set(res)
                    else:
                        return res

                def get_cells_in_same_grid_by_cell_id(self, cell_id):
                    cell = self.get_cell_by_cell_id(cell_id)
                    res = []
                    for i in range(3):
                        for j in range(3):
                            res += [vec((3 * int(cell.x / 3) + i, 3 * int(cell.y / 3) + j))]
                    return res

                def get_cells_in_same_row_or_column_or_grid_by_cell_id(self, cell_id):
                    cell = self.get_cell_by_cell_id(cell_id)
                    return [
                        vec((row_no, cell.y))
                        for row_no in range(self.outer.constant.TOTAL_NO_OF_ROWS)
                    ] + [
                        vec((cell.x, col_no))
                        for col_no in range(self.outer.constant.TOTAL_NO_OF_COLUMNS)
                    ] + self.get_cells_in_same_grid_by_cell_id(cell_id)

                def get_info_by_cell_id(self, cell_id, is_expect=False):
                    my_cell = self.get_cell_by_cell_id(cell_id)
                    if self.outer.board[int(my_cell.x)][int(my_cell.y)] == '.':
                        cells = self.filter(
                            self.get_cells_in_same_row_or_column_or_grid_by_cell_id(cell_id),
                            exclude=[self.get_cell_by_cell_id(cell_id)]
                        )
                        unexpected = [
                            self.outer.board[int(cell.x)][int(cell.y)]
                            for cell in cells
                        ]
                        unexpected = self.filter(
                            unexpected,
                            exclude=['.'],
                            remove_duplication=True
                        )
                        if is_expect:
                            return self.outer.constant.FULL_SET_ANSWER - unexpected
                        else:
                            return unexpected
                    else:
                        return set()

            class SystemFactory:
                def __init__(self, outer=None) -> None:
                    self.outer = outer
                    self.no_of_updated_cells_per_round = 0

                def run_rule_1(self):
                    # [Rule 1] Sole Candidate
                    for cell_id in range(self.outer.constant.TOTAL_NO_OF_CELLS):
                        expected = self.outer.utility.get_info_by_cell_id(cell_id, is_expect=True)
                        if len(expected) == 1:
                            cell = self.outer.utility.get_cell_by_cell_id(cell_id)
                            number = expected.pop()
                            self.outer.board[int(cell.x)][int(cell.y)] = number
                            self.no_of_updated_cells_per_round += 1
                            self.outer.outer.outer.data.system.output.data_changed.update({
                                cell_id: number
                            })

                def run_rule_2(self):
                    # [Rule 2] Unique Candidate
                    for my_cell_id in range(self.outer.constant.TOTAL_NO_OF_CELLS):
                        my_cell = self.outer.utility.get_cell_by_cell_id(my_cell_id)

                        if self.outer.board[int(my_cell.x)][int(my_cell.y)] != '.':
                            continue

                        # [Reset] <my_cell_expected>
                        my_cell_expected = self.outer.utility.get_info_by_cell_id(
                            cell_id=my_cell_id,
                            is_expect=True
                        )

                        # 1. View by ROW
                        other_cells_expected = [
                            set(
                                self.outer.utility.get_info_by_cell_id(
                                    cell_id=self.outer.utility.get_cell_id_by_cell(
                                        vec((int(my_cell.x), j))
                                    ),
                                    is_expect=True
                                )
                            )
                            for j in range(self.outer.constant.TOTAL_NO_OF_COLUMNS)
                        ]
                        for other_cell_expected in other_cells_expected:
                            my_cell_expected -= other_cell_expected
                        if len(my_cell_expected) == 1:
                            number = my_cell_expected.pop()
                            self.outer.board[int(my_cell.x)][int(my_cell.y)] = number
                            self.no_of_updated_cells_per_round += 1
                            self.outer.outer.outer.data.system.output.data_changed.update({
                                my_cell_id: number
                            })

                        # [Reset] <my_cell_expected>
                        my_cell_expected = self.outer.utility.get_info_by_cell_id(my_cell_id, True)

                        # 2. View by COLUMN
                        other_cells_expected = [
                            set(
                                self.outer.utility.filter(
                                    self.outer.utility.get_info_by_cell_id(
                                        cell_id=self.outer.utility.get_cell_id_by_cell(
                                            vec((i, int(my_cell.y)))
                                        ),
                                        is_expect=True
                                    ),
                                    exclude=['.']
                                )
                            )
                            for i in range(self.outer.constant.TOTAL_NO_OF_ROWS)
                        ]
                        for other_cell_expected in other_cells_expected:
                            my_cell_expected -= other_cell_expected
                        if len(my_cell_expected) == 1:
                            number = my_cell_expected.pop()
                            self.outer.board[int(my_cell.x)][int(my_cell.y)] = number
                            self.no_of_updated_cells_per_round += 1
                            self.outer.outer.outer.data.system.output.data_changed.update({
                                my_cell_id: number
                            })

                        # [Reset] <my_cell_expected>
                        my_cell_expected = self.outer.utility.get_info_by_cell_id(my_cell_id, True)

                        # 3. View by GRID
                        grid_cells = self.outer.utility.get_cells_in_same_grid_by_cell_id(my_cell_id)
                        other_cells_expected = [
                            set(
                                self.outer.utility.filter(
                                    self.outer.utility.get_info_by_cell_id(
                                        cell_id=self.outer.utility.get_cell_id_by_cell(
                                            vec((int(grid_cell.x), int(grid_cell.y)))
                                        ),
                                        is_expect=True
                                    ),
                                    exclude=['.']
                                )
                            )
                            for grid_cell in grid_cells
                            if grid_cell != my_cell
                        ]
                        for other_cell_expected in other_cells_expected:
                            my_cell_expected -= other_cell_expected
                        if len(my_cell_expected) == 1:
                            number = my_cell_expected.pop()
                            self.outer.board[int(my_cell.x)][int(my_cell.y)] = number
                            self.no_of_updated_cells_per_round += 1
                            self.outer.outer.outer.data.system.output.data_changed.update({
                                my_cell_id: number
                            })

            def __init__(self, outer=None) -> None:
                self.outer = outer
                self.board = None
                self.times_with_no_data_update = 0
                self.is_game_end = False
                self.constant = self.ConstantFactory(self)
                self.utility = self.UtilityFactory(self)
                self.system = self.SystemFactory(self)

            def is_valid(self):
                for i in range(self.constant.TOTAL_NO_OF_ROWS):
                    row = self.utility.filter(self.board[i], exclude=['.'])
                    if len(set(row)) != len(row):
                        print("ERROR: Invalid data - ROW(%s)" % i)
                        self.outer.show_board(self.board, prefix="[Faulty] Invalid ROW")
                        return False
                for j in range(self.constant.TOTAL_NO_OF_COLUMNS):
                    column = self.utility.filter(
                        [self.board[i][j] for i in range(self.constant.TOTAL_NO_OF_ROWS)],
                        exclude=['.']
                    )
                    if len(set(column)) != len(column):
                        print("ERROR: Invalid data - COLUMN(%s)" % j)
                        self.outer.show_board(self.board, prefix="[Faulty] Invalid COLUMN")
                        return False
                for cell_id in range(self.constant.TOTAL_NO_OF_CELLS):
                    grid = [
                        self.board[int(cell.x)][int(cell.y)]
                        for cell in self.utility.get_cells_in_same_grid_by_cell_id(cell_id)
                    ]
                    grid = [key for key in grid if key not in ['.']]
                    if len(set(grid)) != len(grid):
                        print("ERROR: Invalid data - GRID(%s)" % cell_id)
                        self.outer.show_board(self.board, prefix="[Faulty] Invalid GRID")
                        return False
                return True

            def is_game_end(self):
                self.is_game_end = True
                for row in self.board:
                    if '.' in row:
                        self.is_game_end = False
                return self.is_game_end

            def init_board(self, board):
                self.board = board

        class HardFactory:
            def __init__(self, outer=None) -> None:
                # [Reservation] Future Development
                self.outer = outer

        def __init__(self, outer=None) -> None:
            self.outer = outer
            self.easy = self.EasyFactory(self)
            self.medium = self.MediumFactory(self)
            self.hard = self.HardFactory(self)
            self.IS_DEBUG = False

        def show_board(self, board, prefix=None):
            if self.IS_DEBUG:
                if prefix:
                    print(prefix)
                lines = [' +-------+-------+-------+']
                for row_chunk in [board[:3], board[3:6], board[6:9]]:
                    lines.append('\n'.join([
                        ' | %s | %s | %s | ' % (
                            ' '.join(row[:3]),
                            ' '.join(row[3:6]),
                            ' '.join(row[6:])
                        ) for row in row_chunk
                    ]))
                    lines.append(' +-------+-------+-------+')
                print('\n'.join(lines))

    class DataFactory:
        class ConstantFactory:
            def __init__(self, outer=None) -> None:
                self.outer = outer
                # 1. Purpose: Provide "Data Source"
                self.DATA_SOURCE_PATH_TEMPLATE = "./Statics/Images/Data Source/Medium/Q_#%s.PNG"
                # 2. Purpose: Identify "Board"
                # 3. Purpose: Identify "Number"
                self.BOARD_FINGERPRINT_PATH = "./Statics/Images/Fingerprint/Board.PNG"
                self.NUMBER_FINGERPRINT_PATH_TEMPLATE = "./Statics/Images/Fingerprint/Number/#%s.PNG"
                # 4. Purpose: Answer by "Color Number" (i.e. Brown, Green, Purple, Red)
                self.COLOR_NUMBER_PATH_TEMPLATE = "./Statics/Images/Reference/%s/#%s.PNG"
                # 5. Purpose: Store "Output (PNG-file)"
                self.OUTPUT_PATH_TEMPLATE = './Statics/Images/Output/Medium/%s.PNG'

        class UtilityFactory:
            def __init__(self, outer=None) -> None:
                self.outer = outer

            def draw_one_number(self, large_image, partial_image, left_top):
                (Xc, Yc) = (int(left_top[0]), int(left_top[1]))

                shape_of_partial_image = partial_image.shape

                shape_of_large_image = large_image[
                    Xc:Xc + int(shape_of_partial_image[0]),
                    Yc:Yc + int(shape_of_partial_image[1])
                ].shape

                large_image[
                    Xc:Xc + int(shape_of_partial_image[0]),
                    Yc:Yc + int(shape_of_partial_image[1])
                ] = np.array(
                    partial_image[
                        :shape_of_large_image[0],
                        :shape_of_large_image[1]
                    ]
                )

                self.outer.system.output.image = large_image

        class SystemFactory:
            class InputFactory:
                def __init__(self, outer=None) -> None:
                    self.outer = outer

                def _identify_unique_object(self, large_image_path, small_image_path):
                    (large_image, small_image) = (
                        cv.imread(large_image_path, 0),
                        cv.imread(small_image_path, 0)
                    )
                    (W, H) = small_image.shape[::-1]
                    method = cv.TM_SQDIFF_NORMED
                    res = cv.matchTemplate(large_image, small_image, method)
                    top_left = cv.minMaxLoc(res)[2]
                    (Xo, Yo) = top_left
                    (Ws, Hs) = (W / 9, H / 9)
                    return ((Xo, Yo), (W, H), (Ws, Hs))

                def _identify_multiple_object(self, large_image_path, small_image_path):
                    (large_image, small_image) = (
                        cv.imread(large_image_path),
                        cv.imread(small_image_path, 0)
                    )
                    (W, H) = small_image.shape[::-1]
                    points = []
                    res = cv.matchTemplate(
                        cv.cvtColor(large_image, cv.COLOR_BGR2GRAY),
                        small_image,
                        cv.TM_CCOEFF_NORMED
                    )
                    threshold = 0.8
                    loc = np.where(res >= threshold)
                    for pt in zip(*loc[::-1]):
                        points += [(pt[0], pt[1])]
                    return points

                def get_data_source(self, question_id):
                    board_image = self.outer.outer.constant.DATA_SOURCE_PATH_TEMPLATE % question_id
                    board_fingerprint_image = self.outer.outer.constant.BOARD_FINGERPRINT_PATH
                    # [0] Initialize <DATA_SET>
                    data_set = [
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
                        ['.', '.', '.', '.', '.', '.', '.', '.', '.']
                    ]
                    # [1] Identify the <Sudoku>
                    ((Xo, Yo), (W, H), (Ws, Hs)) = self._identify_unique_object(
                        board_image, board_fingerprint_image
                    )
                    # [2] Identify each non-empty <Cell>
                    numbers = [1, 2, 8, 4, 6, 5, 7, 3, 9]
                    number_location = {}
                    for number in numbers:
                        number_fingerprint_path = (
                            self.outer.outer.constant.NUMBER_FINGERPRINT_PATH_TEMPLATE % number
                        )
                        cell_info = self._identify_multiple_object(
                            board_image, number_fingerprint_path
                        )
                        number_location.update({number: cell_info})
                    # [3] Calibrate the <DATA_SET>
                    for number in number_location:
                        for point in number_location[number]:
                            (X, Y) = (
                                int((point[0] - Xo) / Ws),
                                int((point[1] - Yo) / Hs)
                            )
                            data_set[Y][X] = str(number)
                    return data_set

            class OutputFactory:
                def __init__(self, outer=None) -> None:
                    self.outer = outer
                    self.IS_SHOW = True
                    self.IS_SAVE = True
                    self.data_changed = {}
                    self.image = None

                def draw_output(self, color=constants.GREEN):
                    board_image_path = (
                        self.outer.outer.constant.DATA_SOURCE_PATH_TEMPLATE
                        % self.outer.outer.outer.question_id
                    )
                    board_fingerprint_image = self.outer.outer.constant.BOARD_FINGERPRINT_PATH
                    self.image = cv.imread(board_image_path)
                    ((Xo, Yo), (W, H), (Ws, Hs)) = self.outer.input._identify_unique_object(
                        board_image_path, board_fingerprint_image
                    )
                    for cell_id in self.data_changed:
                        cell = (
                            self.outer.outer.outer.solver.medium.utility
                            .get_cell_by_cell_id(cell_id)
                        )
                        (Xn, Yn) = (
                            int(Xo + (cell.x + 1) * Ws),
                            int(Yo + (cell.y - 0.2) * Hs)
                        )
                        self.outer.outer.utility.draw_one_number(
                            self.image,
                            cv.imread(
                                self.outer.outer.constant.COLOR_NUMBER_PATH_TEMPLATE
                                % (str(color), self.data_changed[cell_id])
                            ),
                            (Xn, Yn)
                        )
                    output_id = '[Output] #%s' % self.outer.outer.outer.question_id
                    if self.IS_SAVE:
                        output_path = self.outer.outer.constant.OUTPUT_PATH_TEMPLATE % output_id
                        cv.imwrite(output_path, self.image)
                    if self.IS_SHOW:
                        cv.imshow(output_id, self.image)
                        cv.waitKey(0)

            def __init__(self, outer=None) -> None:
                self.outer = outer
                self.input = self.InputFactory(self)
                self.output = self.OutputFactory(self)

        def __init__(self, outer=None) -> None:
            self.outer = outer
            self.constant = self.ConstantFactory(self)
            self.utility = self.UtilityFactory(self)
            self.system = self.SystemFactory(self)

    def __init__(self, outer=None) -> None:
        self.outer = outer
        self.data = self.DataFactory(self)
        self.solver = self.SolverFactory(self)
        self.question_id = None
        self.no_of_samples = 0
        self.sample_pass = 0

    def compute_by_question_id(self, question_id):
        self.question_id = question_id
        self.data.system.output.IS_SAVE = False
        self.data.system.output.IS_SHOW = True
        self.data.system.output.data_changed = {}
        self.solver.medium.system.no_of_updated_cells_per_round = 0
        self.solver.medium.times_with_no_data_update = 0
        self.solver.medium.init_board(self.data.system.input.get_data_source(question_id))
        self.solver.show_board(
            self.solver.medium.board,
            prefix="[Init] Data Source"
        )
        self.no_of_samples += 1
        no_of_rounds = 0
        while True:
            self.solver.medium.system.run_rule_1()
            self.solver.medium.system.run_rule_2()
            self.solver.show_board(
                self.solver.medium.board,
                prefix="[%s] Result of Computation" % no_of_rounds
            )
            if not self.solver.medium.is_valid():
                # [Gameover] Failure: Invalid board
                if no_of_rounds == 0:
                    print("ERROR: Failure to get a valid data source")
                break
            else:
                if self.solver.medium.is_game_end():
                    # [Gameover] Success
                    self.solver.show_board(self.solver.medium.board, prefix="[Final] Result")
                    self.data.system.output.draw_output()
                    self.sample_pass += 1
                    break
                else:
                    if self.solver.medium.system.no_of_updated_cells_per_round == 0:
                        if self.solver.medium.times_with_no_data_update <= 3:
                            self.solver.medium.times_with_no_data_update += 1
                        else:
                            # [Gameover] Failure: non-resolvable
                            self.solver.show_board(
                                self.solver.medium.board,
                                prefix="Cannot resolve..."
                            )
                            break
                    else:
                        # Some data updated this round
                        self.solver.medium.system.no_of_updated_cells_per_round = 0
            no_of_rounds += 1
        accuracy = round(100 * (self.sample_pass / self.no_of_samples), 2)
        print("[Sample %s] Accuracy: %s%% (%s/%s)" % (
            question_id - 6000 + 1,
            accuracy,
            self.sample_pass,
            self.no_of_samples,
        ))


class SolutionFactory:
    def __init__(self) -> None:
        # Reference:
        #   https://valeur.org/sudoku/medium/a/free-printable-medium-sudoku-with-the-answer-6000.html
        #
        # [Template]
        #   URL_TEMPLATE = 'https://valeur.org/sudoku/medium/a/free-printable-medium-sudoku-with-the-answer-%s.html'
        self.sudoku_regular = SudokuRegularFactory()

    def run_single(self, question_id):
        self.sudoku_regular.compute_by_question_id(question_id=question_id)
        print()

    def run_all(self):
        for question_id in range(6000, 10000 + 1):
            self.sudoku_regular.compute_by_question_id(question_id=question_id)
            print()


if __name__ == '__main__':
    solution = SolutionFactory()
    solution.run_single(question_id=6000)
