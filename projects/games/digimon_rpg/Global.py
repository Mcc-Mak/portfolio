import pygame

import numpy


class GlobalFactory:
    class LoggerFactory:
        def __init__(self, outer) -> None:
            self.outer = outer
            self.IS_DEBUG = True
            self.DEBUG_LEVEL = {
                '0': 'DEBUG',
                '1': 'INFO',
                '2': 'QUESTION',
                '3': 'WARN',
                '4': 'ERROR'
            }

        def log(self, message, debug_level='0'):
            if self.IS_DEBUG:
                if debug_level == '0':
                    print(
                        f'{self.DEBUG_LEVEL[debug_level]} - {message}'
                    )

    class FontFactory:
        def __init__(self) -> None:
            self.EXTRA_LARGE = pygame.font.SysFont('Verdana', 60)
            self.HEADING = pygame.font.SysFont('Verdana', 40)
            self.REGULAR = pygame.font.SysFont('Corbel', 25)
            self.SMALL = pygame.font.SysFont('Corbel', 16)

    class ColorFactory:
        def __init__(self) -> None:
            self.WHITE = (255, 255, 255)
            self.LIGHT = (170, 170, 170)
            self.DARK = (100, 100, 100)
            self.YELLOW = (255, 255, 0)
            self.RED = (255, 0, 0)
            self.GREEN = (0, 255, 0)
            self.BLUE = (0, 0, 255)

    class RandomizationFactory:
        def __init__(self) -> None:
            pass

        def get_any_one(self, pool):
            return numpy.random.choice(pool)

    class FrameFactory:
        def __init__(self) -> None:
            pass

        def get_frame(self, path):
            return pygame.image.load(path)

        def get_scaled_frame(self, path, size):
            return pygame.transform.scale(
                pygame.image.load(path),
                size
            )

    class ConstantFactory:
        def __init__(self) -> None:
            self.LEFT = 'LEFT'
            self.RIGHT = 'RIGHT'

            self.MOVE = 'MOVE'
            self.JUMP = 'JUMP'
            self.ATTACK = 'ATTACK'
            self.DEATH = 'DEATH'
            self.SPIRIT_FIRE = 'SPIRIT_FIRE'

            self.RISE = 'RISE'
            self.FALL = 'FALL'

            self.FAST = 'FAST'
            self.MEDIUM = 'MEDIUM'
            self.SLOW_OR_FREEZE = 'SLOW_OR_FREEZE'

    class PlayerFactory:
        class NameFactory:
            def __init__(self) -> None:
                self.ARGUMON = 'Argumon'
                self.SWORDSMAN1 = 'Swordsman1'
                self.TACTION1 = 'Taction1'

        def __init__(self) -> None:
            self.name = self.NameFactory()

    def __init__(self) -> None:
        self.logger = self.LoggerFactory(self)
        self.font = self.FontFactory()
        self.color = self.ColorFactory()
        self.randomization = self.RandomizationFactory()
        self.frame = self.FrameFactory()
        self.player = self.PlayerFactory()
        self.constant = self.ConstantFactory()


ALL = GlobalFactory()
