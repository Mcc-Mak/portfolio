from Global import ALL as Global

import pygame
from pygame.locals import *
pygame.init()

vec = pygame.math.Vector2


class ConfigurationFactory:
    class AppFactory:
        def __init__(self, outer) -> None:
            self.outer = outer
            self.NAME = 'Digimon'
            self.PATH = './Statics/Images/App/Icon/Image-0.PNG'
            Global.logger.log(f"[Init] PATH='{self.PATH}'", '1')

    class WorldFactory:
        class BackgroundFactory:
            class OneFactory:
                def __init__(self, outer) -> None:
                    self.outer = outer
                    self.SIZE = (1000, 410)
                    self.POSITION = (0, 0)
                    self.PATH = './Statics/Images/Background/One/Image-0.PNG'
                    Global.logger.log(f"[Init] PATH='{self.PATH}'", '1')
                    self.FRAME = Global.frame.get_scaled_frame(self.PATH, self.SIZE)

            class TwoFactory:
                def __init__(self, outer) -> None:
                    self.outer = outer
                    self.SIZE = (1000, 124)
                    self.POSITION = (0, 286 + 45)
                    self.PATH = './Statics/Images/Background/Two/Image-0.PNG'
                    Global.logger.log(f"[Init] PATH='{self.PATH}'", '1')
                    self.FRAME = Global.frame.get_scaled_frame(self.PATH, self.SIZE)

            class CastleFactory:
                class OneFactory:
                    def __init__(self, outer) -> None:
                        self.outer = outer
                        self.SIZE = (200, 136)
                        self.POSITION = (
                            100,
                            self.outer.outer.two.POSITION[1] - self.SIZE[1]
                        )
                        self.PATH = './Statics/Images/Background/StartButton/Castle-0.PNG'
                        Global.logger.log(f"[Init] PATH='{self.PATH}'", '1')
                        self.FRAME = Global.frame.get_scaled_frame(self.PATH, self.SIZE)
                        self.CLICKED_AREA = {
                            'TOP_LEFT': vec((170, 280)),
                            'SIZE': vec((60, 50))
                        }

                class TwoFactory:
                    def __init__(self, outer) -> None:
                        self.outer = outer
                        self.SIZE = (200, 202)
                        self.POSITION = (
                            400,
                            self.outer.outer.two.POSITION[1] - self.SIZE[1]
                        )
                        self.PATH = './Statics/Images/Background/StartButton/Castle-1b.PNG'
                        Global.logger.log(f"[Init] PATH='{self.PATH}'", '1')
                        self.FRAME = Global.frame.get_scaled_frame(self.PATH, self.SIZE)
                        self.CLICKED_AREA = {
                            'TOP_LEFT': vec((470, 280)),
                            'SIZE': vec((60, 50))
                        }

                class ThreeFactory:
                    def __init__(self, outer) -> None:
                        self.outer = outer
                        self.SIZE = (200, 139)
                        self.POSITION = (
                            700,
                            self.outer.outer.two.POSITION[1] - self.SIZE[1]
                        )
                        self.PATH = './Statics/Images/Background/StartButton/Castle-2.PNG'
                        Global.logger.log(f"[Init] PATH='{self.PATH}'", '1')
                        self.FRAME = Global.frame.get_scaled_frame(self.PATH, self.SIZE)
                        self.CLICKED_AREA = {
                            'TOP_LEFT': vec((770, 280)),
                            'SIZE': vec((60, 50))
                        }

                def __init__(self, outer) -> None:
                    self.outer = outer
                    self.one = self.OneFactory(self)
                    self.two = self.TwoFactory(self)
                    self.three = self.ThreeFactory(self)

            def __init__(self, outer) -> None:
                self.outer = outer
                self.hide = False
                self.one = self.OneFactory(self)
                self.two = self.TwoFactory(self)
                self.castle = self.CastleFactory(self)

        class OneFactory:
            def __init__(self, outer) -> None:
                self.outer = outer
                self.hide = True
                self.SIZE = (1000, 410)
                self.POSITION = (0, 0)
                self.PATH = './Statics/Images/World/One/Image-0.PNG'
                Global.logger.log(f"[Init] PATH='{self.PATH}'", '0')
                self.FRAME = Global.frame.get_scaled_frame(self.PATH, self.SIZE)

        class TwoFactory:
            def __init__(self, outer) -> None:
                self.outer = outer
                self.hide = True
                self.SIZE = (1000, 410)
                self.POSITION = (0, 0)
                self.PATH = './Statics/Images/World/Two/Image-0.PNG'
                Global.logger.log(f"[Init] PATH='{self.PATH}'", '0')
                self.FRAME = Global.frame.get_scaled_frame(self.PATH, self.SIZE)

        class ThreeFactory:
            def __init__(self, outer) -> None:
                self.outer = outer
                self.hide = True
                self.SIZE = (1000, 410)
                self.POSITION = (0, 0)
                self.PATH = './Statics/Images/World/Three/Image-0.PNG'
                Global.logger.log(f"[Init] PATH='{self.PATH}'", '0')
                self.FRAME = Global.frame.get_scaled_frame(self.PATH, self.SIZE)

        def __init__(self, outer) -> None:
            self.outer = outer
            self.TOTAL_NO_OF_WORLDS = 3
            self.background = self.BackgroundFactory(self)
            self.one = self.OneFactory(self)
            self.two = self.TwoFactory(self)
            self.three = self.ThreeFactory(self)

    class StageFactory:
        def __init__(self, outer) -> None:
            self.outer = outer
            self.TOTAL_NO_OF_STAGES = 25

    class PlayerFactory:
        class OneFactory:
            class ControllerFactory:
                class KeyboardFactory:
                    class MoveFactory:
                        def __init__(self) -> None:
                            self.LEFT = pygame.K_LEFT
                            self.RIGHT = pygame.K_RIGHT

                    def __init__(self, outer) -> None:
                        self.outer = outer
                        self.move = self.MoveFactory()
                        self.JUMP = pygame.K_SPACE
                        self.ATTACK = pygame.K_a
                        self.DEATH = pygame.K_d
                        self.SPIRIT_FIRE = pygame.K_q

                class MouseFactory:
                    def __init__(self, outer) -> None:
                        self.outer = outer

                def __init__(self, outer) -> None:
                    self.outer = outer
                    self.keyboard = self.KeyboardFactory(self)
                    self.mouse = self.MouseFactory(self)

            def __init__(self, outer) -> None:
                self.outer = outer
                self.controller = self.ControllerFactory(self)

        def __init__(self, outer) -> None:
            self.outer = outer
            self.one = self.OneFactory(self)

    def __init__(self) -> None:
        self.app = self.AppFactory(self)
        self.world = self.WorldFactory(self)
        self.stage = self.StageFactory(self)
        self.player = self.PlayerFactory(self)
        self.display_surface = pygame.display.set_mode((1000, 410))
        pygame.display.set_icon(
            Global.frame.get_frame(self.app.PATH)
        )
        pygame.display.set_caption(self.app.NAME)


ALL = ConfigurationFactory()
