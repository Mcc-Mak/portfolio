import pygame
from Configuration import ALL as Config
from Global import ALL as Global
from Plugin import PluginFactory

vec = pygame.math.Vector2


class StageFactory:
    class NotificationFactory:
        class BeginFactory:
            def __init__(self, outer) -> None:
                self.outer = outer
                self.completed = False
                self.x = -200

        class ClearFactory:
            def __init__(self, outer) -> None:
                self.outer = outer
                self.completed = False
                self.x = -200

        def __init__(self, outer) -> None:
            self.outer = outer
            self.begin = self.BeginFactory(self)
            self.clear = self.ClearFactory(self)

    class EnemyFactory:
        def __init__(self, outer) -> None:
            self.outer = outer
            self.seconds_per_generation = 1.5 - (0.8 * self.outer.stage / Config.stage.TOTAL_NO_OF_STAGES)
            self.probability_to_generate_each_type = {
                'TACTION1': 1,
                'SWORDSMAN': 0,
                'ARCHER': 0
            }
            self.probability_to_generate_in = {
                1: 0.4,
                2: 0.6
            }
            self.probability_to_shift = {
                1: 0.3,
                2: 0.4,
                3: 0.3
            }
            self.total_no_of_generation = 1 + 3 * self.outer.stage

        def get_string(self):
            return str(self.__dict__)

    class SupplementFactory:
        class AddHpFactory:
            def __init__(self, outer) -> None:
                self.outer = outer
                self.seconds_per_generation = 30
                self.probability_to_generate_each_type = (0.5 - (0.5 * (self.outer.outer.world / Config.world.TOTAL_NO_OF_WORLDS))) + 0.25 * (self.outer.outer.stage / 150)
                self.total_no_of_generation = 10 + 5 * (self.outer.outer.stage / ((Config.stage.TOTAL_NO_OF_STAGES - 1) * 0.5))
                self.pool = len([
                    True for i in range(int(self.probability_to_generate_each_type * 100))
                ] + [
                    False for i in range(100 - int(self.probability_to_generate_each_type * 100))
                ])

        class AddHpRevFactory:
            def __init__(self, outer) -> None:
                self.outer = outer
                self.seconds_per_generation = 60
                self.probability_to_generate_each_type = (0.25 - (0.25 * (self.outer.outer.world / Config.world.TOTAL_NO_OF_WORLDS))) + 0.25 * (self.outer.outer.stage / Config.stage.TOTAL_NO_OF_STAGES)
                self.total_no_of_generation = 10 + 5 * (self.outer.outer.stage / ((Config.stage.TOTAL_NO_OF_STAGES - 1) * 0.5))
                self.pool = [
                    True for i in range(int(self.probability_to_generate_each_type * 100))
                ] + [
                    False for i in range(100 - int(self.probability_to_generate_each_type * 100))
                ]

        def __init__(self, outer) -> None:
            self.outer = outer
            self.add_hp = self.AddHpFactory(self)
            self.add_hp_rev = self.AddHpRevFactory(self)

        def get_string(self):
            return '\n'.join([
                str(self.add_hp.__dict__),
                str(self.add_hp_rev.__dict__)
            ])

    def __init__(self, world, stage) -> None:
        self.world = world
        self.stage = stage
        (self.x_stage_begin, self.x_stage_clear) = (0, 0)
        self.notification = self.NotificationFactory(self)
        self.enemy = self.EnemyFactory(self)
        self.supplement = self.SupplementFactory(self)
        self.list_of_enemy = []
        self.sprites_of_enemy = pygame.sprite.Group()

    def get_string(self):
        return '\n'.join([
            f'[StageFactory] Stage: {self.stage}',
            self.enemy.get_string(),
            self.supplement.get_string()
        ])


class CharacterFactory:
    def __init__(self, outer) -> None:
        self.outer = outer
        self._hp = [-1, -1, -1]
        self._mp = [-1, -1, -1]
        self._str = -1
        self._def = -1
        self._agi = [-1, -1, -1]
        self._spd = vec((-1, -1))
        self.GRAVITY = 0.08
        self.FRICTION_CONSTANT_GROUND = -0.05
        self.FRICTION_CONSTANT_AIR = -0.003
        self.hide = None

    def setup_argumon(self):
        self._hp = [10, 10, 0.7]
        self._mp = [10, 10, 1]
        self._str = 1
        self._def = 0
        self._agi = [10, 10, 1]
        self._spd = vec((4.5, 1.0))
        self.hide = False
        self.action = None
        self.status = None
        self.plugin = PluginFactory(self)
        self.plugin.init(character=Global.player.name.ARGUMON)
        (
            self.plugin.argumon.newton.position.x,
            self.plugin.argumon.newton.position.y
        ) = (
            self.plugin.argumon.newton.POSITION[0],
            self.plugin.argumon.newton.POSITION[1]
        )

    def setup_taction1(self, spot=1, distance=0):
        self._hp = [10, 10, 0.7]
        self._mp = [10, 10, 1]
        self._str = 1
        self._def = 0
        self._agi = [10, 10, 1]
        self._spd = vec((2.5, 0.95))
        self.hide = False
        self.action = None
        self.status = None
        self.plugin = PluginFactory(self)
        self.plugin.init(character=Global.player.name.TACTION1)
        if spot == 1:
            xo = self.plugin.taction1.newton.POSITION[0] + distance
        else:
            xo = self.plugin.taction1.newton.X_BOUND - self.plugin.taction1.newton.POSITION[0] - distance
        (
            self.plugin.taction1.newton.position.x,
            self.plugin.taction1.newton.position.y
        ) = (
            xo + distance,
            self.plugin.taction1.newton.POSITION[1]
        )


class PlayerFactory:
    def __init__(self, outer) -> None:
        self.outer = outer
        self.character_level = 1
        self.experience = 0
        self.coin = 0
        self.cooldown = False
        self._equipment = []
        self.NAME = Global.player.name.ARGUMON
        self.argumon = None
        self.init()

    def init(self):
        self.argumon = CharacterFactory(self)

    def render(self):
        if not self.argumon.hide:
            (frame, size) = self.argumon.plugin.argumon.animation.get_frame_info(self.argumon.plugin.argumon.newton.velocity)
            self.argumon.plugin.argumon.newton.update()
            Config.display_surface.blit(
                frame,
                self.argumon.plugin.argumon.newton.position
            )


class EnemyFactory:
    def __init__(self, outer) -> None:
        self.outer = outer
        self.NAME = Global.player.name.TACTION1
        self.taction1 = CharacterFactory(self)

    def is_character_death(self):
        if not self.taction1:
            return True
        else:
            if self.taction1.hide:
                return True

    def update(self, position):
        if self.taction1.plugin.taction1.newton.position.x > position.x:
            self.taction1.plugin.taction1.animation.direction = Global.constant.LEFT
            if self.taction1.plugin.taction1.newton.position.x - position.x < 1:
                self.taction1.plugin.taction1.newton.position.x = position.x
            else:
                self.taction1.plugin.taction1.newton.velocity.x = -self.taction1._spd.x
        elif self.taction1.plugin.taction1.newton.position.x < position.x:
            self.taction1.plugin.taction1.animation.direction = Global.constant.RIGHT
            if position.x - self.taction1.plugin.taction1.newton.position.x < 1:
                self.taction1.plugin.taction1.newton.position.x = position.x
            else:
                self.taction1.plugin.taction1.newton.velocity.x = self.taction1._spd.x
        else:
            pass

    def render(self, position):
        if not self.taction1.hide:
            self.update(position)
            (frame, size) = self.taction1.plugin.taction1.animation.get_frame_info(self.taction1.plugin.taction1.newton.velocity)
            self.taction1.plugin.taction1.newton.update()
            Config.display_surface.blit(
                frame,
                self.taction1.plugin.taction1.newton.position
            )


class StatusBarFactory:
    def __init__(self, outer):
        self.outer = outer
        self.surf = pygame.Surface((90, 66))
        self.rect = self.surf.get_rect(center=(500, 10))

    def render(self):
        text = [
            Global.font.SMALL.render(f"World: {self.outer.world + 1}", True, Global.color.YELLOW),
            Global.font.SMALL.render(f"Stage: {self.outer.stage + 1}", True, Global.color.YELLOW),
            Global.font.SMALL.render(f"LV: {self.outer.player.character_level}", True, Global.color.GREEN),
            Global.font.SMALL.render(f"Exp: {self.outer.player.experience}", True, Global.color.DARK),
            Global.font.SMALL.render(f"Coin: {self.outer.player.coin}", True, Global.color.DARK)
        ]
        if self.outer.player.argumon:
            text += [
                Global.font.SMALL.render(
                    f"HP: {round(self.outer.player.argumon._hp[0], 1)}/{self.outer.player.argumon._hp[1]}, REV: {self.outer.player.argumon._hp[2]}",
                    True, Global.color.RED
                ),
                Global.font.SMALL.render(
                    f"MP: {round(self.outer.player.argumon._mp[0], 1)}/{self.outer.player.argumon._mp[1]}, REV: {self.outer.player.argumon._mp[2]}",
                    True, Global.color.BLUE
                ),
                Global.font.SMALL.render(
                    f"AGI: {round(self.outer.player.argumon._agi[0], 1)}/{self.outer.player.argumon._agi[1]}, REV: {self.outer.player.argumon._agi[2]}",
                    True, Global.color.BLUE
                )
            ]
        text += [
            Global.font.SMALL.render(f"FPS: {int(self.outer.FPS_CLOCK.get_fps())}", True, Global.color.DARK)
        ]

        pygame.draw.rect(
            Config.display_surface,
            Global.color.LIGHT,
            pygame.Rect(
                850,
                7,
                140,
                7 + 15 * len(text) - 4,
            )
        )

        for i in range(len(text)):
            Config.display_surface.blit(text[i], (850, 7 + 15 * i))
