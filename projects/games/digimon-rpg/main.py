import pygame
from pygame.locals import *
pygame.init()

from Configuration import ALL as Config
from Global import ALL as Global
import ObjectPool

import numpy
import sys
import time


class EventHandlerFactory:
    def __init__(self) -> None:
        self.counter = 0
        self.pre_first_event = pygame.USEREVENT
        self.events = {}

    def insert_next_event(self, name):
        self.counter += 1
        if name not in self.events:
            self.events.update({
                name: self.pre_first_event + self.counter
            })


event_handler = EventHandlerFactory()


class GameFactory:
    def __init__(self) -> None:
        self.FPS_CLOCK = pygame.time.Clock()
        self.wait = False
        self.FPS = 80
        self.world = -1
        self.stage = -1
        self.stages = []
        self.player = None

    def setup_stages(self):
        self.wait = True
        self.stages = [
            ObjectPool.StageFactory(self.world, stage_no)
                for stage_no in range(Config.stage.TOTAL_NO_OF_STAGES)
        ]
        self.wait = False

    def is_player_death(self):
        if not self.player.argumon:
            return True
        else:
            if self.player.argumon.hide:
                return True

    def render(self):
        if not Config.world.background.hide:
            Config.display_surface.blit(
                Config.world.background.one.FRAME,
                Config.world.background.one.POSITION
            )
            Config.display_surface.blit(
                Config.world.background.castle.one.FRAME,
                Config.world.background.castle.one.POSITION
            )
            Config.display_surface.blit(
                Config.world.background.castle.two.FRAME,
                Config.world.background.castle.two.POSITION
            )
            Config.display_surface.blit(
                Config.world.background.castle.three.FRAME,
                Config.world.background.castle.three.POSITION
            )
            Config.display_surface.blit(
                Global.font.HEADING.render('[Pygame]', True, Global.color.DARK),
                (397, 5)
            )
            Config.display_surface.blit(
                Global.font.HEADING.render(Config.app.NAME, True, Global.color.DARK),
                (417, 60)
            )
            pygame.draw.rect(
                Config.display_surface,
                Global.color.YELLOW,
                pygame.Rect(
                    Config.world.background.castle.one.CLICKED_AREA['TOP_LEFT'].x,
                    Config.world.background.castle.one.CLICKED_AREA['TOP_LEFT'].y,
                    Config.world.background.castle.one.CLICKED_AREA['SIZE'].x,
                    Config.world.background.castle.one.CLICKED_AREA['SIZE'].y,
                ),
                width=2
            )
            pygame.draw.rect(
                Config.display_surface,
                Global.color.YELLOW,
                pygame.Rect(
                    Config.world.background.castle.two.CLICKED_AREA['TOP_LEFT'].x,
                    Config.world.background.castle.two.CLICKED_AREA['TOP_LEFT'].y,
                    Config.world.background.castle.two.CLICKED_AREA['SIZE'].x,
                    Config.world.background.castle.two.CLICKED_AREA['SIZE'].y,
                )
            )
            pygame.draw.rect(
                Config.display_surface,
                Global.color.YELLOW,
                pygame.Rect(
                    Config.world.background.castle.three.CLICKED_AREA['TOP_LEFT'].x,
                    Config.world.background.castle.three.CLICKED_AREA['TOP_LEFT'].y,
                    Config.world.background.castle.three.CLICKED_AREA['SIZE'].x,
                    Config.world.background.castle.three.CLICKED_AREA['SIZE'].y,
                )
            )
        else:
            if not Config.world.one.hide or not Config.world.two.hide or not Config.world.three.hide:
                if not Config.world.one.hide:
                    Config.display_surface.blit(
                        Config.world.one.FRAME,
                        Config.world.one.POSITION
                    )
                elif not Config.world.two.hide:
                    Config.display_surface.blit(
                        Config.world.two.FRAME,
                        Config.world.two.POSITION
                    )
                elif not Config.world.three.hide:
                    Config.display_surface.blit(
                        Config.world.three.FRAME,
                        Config.world.three.POSITION
                    )
                if not self.stages[self.stage].notification.begin.completed:
                    Config.display_surface.blit(
                        Global.font.HEADING.render('Stage Begin', True, Global.color.DARK),
                        (self.stages[self.stage].notification.begin.x, 140)
                    )
                    self.stages[self.stage].notification.begin.x += 10
                    if self.stages[self.stage].notification.begin.x >= Config.world.background.one.SIZE[0]:
                        self.stages[self.stage].notification.begin.completed = True
                else:
                    if not self.is_player_death():
                        self.status_bar.render()
                        self.player.render()
                        collided_on_enemy = self.player.argumon.plugin.argumon.is_collide_on_enemy(
                            [enemy.taction1.plugin.taction1 for enemy in self.stages[self.stage].list_of_enemy if enemy]
                        )
                        if collided_on_enemy == True:
                            if self.player.argumon.plugin.argumon.animation.direction == Global.constant.RIGHT:
                                self.player.argumon.plugin.argumon.newton.velocity.x -= 5
                            else:
                                self.player.argumon.plugin.argumon.newton.velocity.x += 5
                            self.player.experience += 1
                            self.player.coin += 1
                            for i in range(len(self.stages[self.stage].list_of_enemy)):
                                enemy = self.stages[self.stage].list_of_enemy[i]
                                if enemy:
                                    if self.player.argumon.plugin.argumon.rect.colliderect(enemy.taction1.plugin.taction1):
                                        self.stages[self.stage].list_of_enemy[i] = None
                                        break
                        elif collided_on_enemy == False:
                            if self.player.argumon._hp[0] <= 0:
                                self.player.argumon.plugin.argumon.newton.death()
                                self.player.argumon = None
                                self.player.cooldown = True
                            else:
                                if self.player.cooldown:
                                    event_handler.insert_next_event('EVENT_cooldown')
                                    pygame.time.set_timer(event_handler.events['EVENT_cooldown'], 1000, True)
                                else:
                                    self.player.argumon.plugin.argumon.newton.velocity.x = 0
                                    self.player.argumon.plugin.argumon.newton.acceleration.y -= 0.2
                                    if self.player.argumon.plugin.argumon.animation.direction == Global.constant.RIGHT:
                                        self.player.argumon.plugin.argumon.newton.position.x -= 100
                                    else:
                                        self.player.argumon.plugin.argumon.newton.position.x += 100
                                    self.player.argumon._hp[0] -= 1
                                    self.player.cooldown = True
                        if not self.is_player_death():
                            for enemy in self.stages[self.stage].list_of_enemy:
                                if enemy:
                                    enemy.render(self.player.argumon.plugin.argumon.newton.position)
                    else:
                        self.player.argumon = None
                        Config.display_surface.blit(
                            Global.font.EXTRA_LARGE.render('Gameover', True, Global.color.RED),
                            (346, 140)
                        )

                    if not self.stages[self.stage].notification.clear.completed and self.player.experience == self.stages[self.stage].enemy.total_no_of_generation:
                        if self.stage <= 25:
                            self.stage += 1
                            self.player.experience = 0
                            self.list_of_enemy = []
                            self.go_to_next_stage(self.world, self.stage)
                            Config.display_surface.blit(
                                Global.font.HEADING.render('Stage Clear', True, Global.color.DARK),
                                (self.stages[self.stage].notification.clear.x, 140)
                            )
                            self.stages[self.stage].notification.clear.x += 8
                            if self.stages[self.stage].notification.clear.x >= Config.world.background.one.SIZE[0]:
                                self.stages[self.stage].notification.clear.completed = True
                    else:
                        pass
        Config.display_surface.blit(
            Config.world.background.two.FRAME,
            Config.world.background.two.POSITION
        )

    def go_to_next_stage(self, world, stage, first=False):
        self.world = world
        self.stage = stage
        self.setup_stages()
        self.status_bar = ObjectPool.StatusBarFactory(self)
        if first:
            self.player = ObjectPool.PlayerFactory(self)
            event_handler.insert_next_event('EVENT_hp_rev')
            event_handler.insert_next_event('EVENT_mp_rev')
            event_handler.insert_next_event('EVENT_agi_rev')
            pygame.time.set_timer(event_handler.events['EVENT_hp_rev'], 5000)
            pygame.time.set_timer(event_handler.events['EVENT_mp_rev'], 5000)
            pygame.time.set_timer(event_handler.events['EVENT_agi_rev'], 3000)
        else:
            self.player.init()
        self.player.argumon.setup_argumon()
        event_handler.insert_next_event('EVENT_generate_enemy_taction1')
        pygame.time.set_timer(
            event_handler.events['EVENT_generate_enemy_taction1'],
            int(self.stages[self.stage].enemy.seconds_per_generation * 1000)
        )
        Config.world.background.hide = True
        Config.world.one.hide = False

    def run(self):
        self.render()

        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit()
                sys.exit()

            if event.type == pygame.MOUSEBUTTONDOWN:
                if not self.wait and not self.world > 0 and not self.player:
                    left, middle, right = pygame.mouse.get_pressed()
                    mouse_position = pygame.mouse.get_pos()
                    if left:
                        one_top_left = Config.world.background.castle.one.CLICKED_AREA['TOP_LEFT']
                        one_size = Config.world.background.castle.one.CLICKED_AREA['SIZE']
                        is_castle_one = (
                            one_top_left[0] <= mouse_position[0] <= one_top_left[0] + one_size[0] and
                            one_top_left[1] <= mouse_position[1] <= one_top_left[1] + one_size[1]
                        )
                        if is_castle_one:
                            self.go_to_next_stage(0, 0, first=True)

                        two_top_left = Config.world.background.castle.two.CLICKED_AREA['TOP_LEFT']
                        two_size = Config.world.background.castle.two.CLICKED_AREA['SIZE']
                        is_castle_two = (
                            two_top_left[0] <= mouse_position[0] <= two_top_left[0] + two_size[0] and
                            two_top_left[1] <= mouse_position[1] <= two_top_left[1] + two_size[1]
                        )
                        if is_castle_two and self.world >= 0:
                            self.world = 1
                            self.stage = 0
                            self.setup_stages()
                            self.status_bar = ObjectPool.StatusBarFactory(self)
                            Config.world.background.hide = True
                            Config.world.two.hide = False

                        three_top_left = Config.world.background.castle.three.CLICKED_AREA['TOP_LEFT']
                        three_size = Config.world.background.castle.three.CLICKED_AREA['SIZE']
                        is_castle_three = (
                            three_top_left[0] <= mouse_position[0] <= three_top_left[0] + three_size[0] and
                            three_top_left[1] <= mouse_position[1] <= three_top_left[1] + three_size[1]
                        )
                        if is_castle_three and self.world >= 1:
                            self.world = 2
                            self.stage = 0
                            self.setup_stages()
                            self.status_bar = ObjectPool.StatusBarFactory(self)
                            Config.world.background.hide = True
                            Config.world.three.hide = False

            if self.world >= 0 and self.world in [0]:
                if not self.is_player_death():
                    if event.type == pygame.KEYDOWN:
                        if event.key == Config.player.one.controller.keyboard.move.LEFT:
                            self.player.argumon.plugin.argumon.newton.act(Global.constant.MOVE, direction=Global.constant.LEFT)
                        elif event.key == Config.player.one.controller.keyboard.move.RIGHT:
                            self.player.argumon.plugin.argumon.newton.act(Global.constant.MOVE, direction=Global.constant.RIGHT)
                        elif event.key == Config.player.one.controller.keyboard.JUMP:
                            self.player.argumon.plugin.argumon.newton.act(Global.constant.JUMP)
                        elif event.key == Config.player.one.controller.keyboard.ATTACK:
                            self.player.argumon.plugin.argumon.newton.act(Global.constant.ATTACK)
                        elif event.key == Config.player.one.controller.keyboard.DEATH:
                            self.player.argumon.plugin.argumon.newton.act(Global.constant.DEATH)
                        elif event.key == Config.player.one.controller.keyboard.SPIRIT_FIRE:
                            self.player.argumon.plugin.argumon.newton.act(Global.constant.SPIRIT_FIRE)
                    if event.type == event_handler.events['EVENT_hp_rev']:
                        if self.player.argumon._hp[0] + self.player.argumon._hp[2] <= self.player.argumon._hp[1]:
                            self.player.argumon._hp[0] += self.player.argumon._hp[2]
                    if event.type == event_handler.events['EVENT_mp_rev']:
                        if self.player.argumon._mp[0] + self.player.argumon._mp[2] <= self.player.argumon._mp[1]:
                            self.player.argumon._mp[0] += self.player.argumon._mp[2]
                    if event.type == event_handler.events['EVENT_agi_rev']:
                        if self.player.argumon._agi[0] + self.player.argumon._agi[2] <= self.player.argumon._agi[1]:
                            self.player.argumon._agi[0] += self.player.argumon._agi[2]
                    if event.type == event_handler.events['EVENT_generate_enemy_taction1'] and self.stages[self.stage].notification.begin.completed:
                        if len(self.stages[self.stage].list_of_enemy) < self.stages[self.stage].enemy.total_no_of_generation:
                            spot = numpy.random.choice(
                                numpy.arange(
                                    1,
                                    len(self.stages[self.stage].enemy.probability_to_generate_in) + 1
                                ),
                                p=[
                                    self.stages[self.stage].enemy.probability_to_generate_in[key]
                                        for key in self.stages[self.stage].enemy.probability_to_generate_in
                                ]
                            )
                            shift = numpy.random.choice(
                                numpy.arange(
                                    1,
                                    len(self.stages[self.stage].enemy.probability_to_shift) + 1
                                ),
                                p=[
                                    self.stages[self.stage].enemy.probability_to_shift[key]
                                        for key in self.stages[self.stage].enemy.probability_to_shift
                                ]
                            )
                            if shift == 1:
                                distance = numpy.random.choice(numpy.arange(0, 10 + 1))
                            elif shift == 2:
                                distance = numpy.random.choice(numpy.arange(10, 40 + 1))
                            elif shift == 3:
                                distance = numpy.random.choice(numpy.arange(40, 50 + 1))
                            self.stages[self.stage].list_of_enemy += [ObjectPool.EnemyFactory(self)]
                            self.stages[self.stage].list_of_enemy[-1].taction1.setup_taction1(spot=spot, distance=distance)
                            self.stages[self.stage].sprites_of_enemy.add(
                                self.stages[self.stage].list_of_enemy[-1].taction1.plugin.taction1
                            )
                    if 'EVENT_cooldown' in event_handler.events:
                        if event.type == event_handler.events['EVENT_cooldown']:
                            self.player.cooldown = False

        pygame.display.update()
        self.FPS_CLOCK.tick(self.FPS)
        time.sleep(1 / self.FPS)


if __name__ == '__main__':
    game = GameFactory()
    pygame.mixer.music.load('./Statics/Audio/Background/LFO OST - Dojo (320 kbps).mp3')
    pygame.mixer.music.play(-1)
    while True:
        game.run()
