import pygame
from Global import ALL as Global

vec = pygame.math.Vector2


class PluginFactory:
    class ConfigurationFactory:
        def __init__(self) -> None:
            self.X_BOUND = 940
            self.Y_GROUND = 331

    class ArgumonFactory(pygame.sprite.Sprite):
        class NewtonFactory:
            def __init__(self, outer) -> None:
                self.outer = outer
                self.can_newton = True
                self.position = vec((-1, -1))
                self.velocity = vec((0, 0))
                self.acceleration = vec((0, 0))

                self.POSITION = (440, 250)
                self.X_BOUND = 940
                self.Y_GROUND = 331

                self.WALK_LOWEST_SPEED = 0.2
                self.RUN_LOWEST_SPEED = 6
                self.ATTACK_BACKWARD_OFFSET = 2

                self.AGI_PER_ATTACK = 2
                self.AGI_PER_SPIRIT_FIRE = 5

            def can_act(self, action):
                if self.can_newton:
                    (x_bound, y_ground) = self.get_boundary()
                    if self.outer.outer.outer._hp[0] > 0:
                        if action == Global.constant.MOVE:
                            return (
                                self.position.y == y_ground and
                                not self.outer.animation.status[Global.constant.ATTACK]
                            )
                        elif action == Global.constant.JUMP:
                            return (
                                not self.position.y < y_ground and
                                not self.outer.animation.status[Global.constant.ATTACK]
                            )
                        elif action == Global.constant.ATTACK:
                            return (
                                not self.outer.animation.status[Global.constant.ATTACK]
                                and self.outer.outer.outer._agi[0] >= self.AGI_PER_ATTACK
                                and not self.outer.outer.outer.outer.cooldown
                            )
                        elif action == Global.constant.DEATH:
                            return True
                    else:
                        return False

            def act(self, action, direction=None):
                if self.can_act(action):
                    if action == Global.constant.MOVE:
                        if direction == Global.constant.LEFT:
                            self.move(direction=Global.constant.LEFT)
                        else:
                            self.move(direction=Global.constant.RIGHT)
                    elif action == Global.constant.JUMP:
                        self.jump()
                    elif action == Global.constant.ATTACK:
                        self.attack()
                    elif action == Global.constant.SPIRIT_FIRE:
                        self.spirit_fire()
                    elif action == Global.constant.DEATH:
                        self.death()
                    else:
                        pass

            def move(self, direction):
                if direction == Global.constant.LEFT:
                    self.velocity.x -= self.outer.outer.outer._spd.x
                else:
                    self.velocity.x += self.outer.outer.outer._spd.x
                if self.outer.newton.velocity.x >= 0:
                    self.outer.animation.direction = Global.constant.RIGHT
                else:
                    self.outer.animation.direction = Global.constant.LEFT

            def jump(self):
                if abs(self.velocity.y) > 0:
                    pass
                else:
                    self.acceleration.y -= self.outer.outer.outer._spd.y

            def attack(self):
                self.outer.outer.outer._agi[0] -= self.AGI_PER_ATTACK
                self.outer.animation.change_status(Global.constant.ATTACK, True)

            def spirit_fire(self):
                self.outer.outer.outer._agi[0] -= self.AGI_PER_SPIRIT_FIRE
                self.outer.animation.change_status(Global.constant.SPIRIT_FIRE, True)

            def death(self):
                self.outer.animation.change_status(Global.constant.DEATH, True)
                self.can_newton = False

            def get_boundary(self):
                (negligible, size) = self.outer.animation.get_frame_info(self.velocity)
                return (
                    self.X_BOUND,
                    self.Y_GROUND - size[1]
                )

            def displace_x(self, y_ground):
                self.position.x += self.velocity.x
                friction_constant = {
                    True: self.outer.outer.outer.FRICTION_CONSTANT_AIR,
                    False: self.outer.outer.outer.FRICTION_CONSTANT_GROUND
                }[self.position.y < y_ground]
                self.velocity.x *= (1 + friction_constant)

            def displace_y(self, y_ground):
                self.position.y += self.velocity.y
                self.velocity.y *= (1 - self.outer.outer.outer.FRICTION_CONSTANT_AIR)
                self.velocity.y += self.acceleration.y
                if self.position.y < y_ground:
                    self.acceleration.y += self.outer.outer.outer.GRAVITY

            def reset_to_bound_of_x(self, x_bound):
                if self.position.x > x_bound:
                    self.position.x = x_bound
                    self.velocity.x = 0
                    self.acceleration.x = 0
                elif self.position.x < 0:
                    self.position.x = 0
                    self.velocity.x = 0
                    self.acceleration.x = 0
                else:
                    return None

            def reset_to_bound_of_y(self, y_ground):
                if self.position.y > y_ground:
                    self.position.y = y_ground
                    self.velocity.y = 0
                    self.acceleration.y = 0

            def update(self):
                if self.can_newton:
                    (x_bound, y_ground) = self.get_boundary()
                    self.displace_x(y_ground)
                    self.displace_y(y_ground)
                    self.reset_to_bound_of_y(y_ground)
                    self.reset_to_bound_of_x(x_bound)
                self.outer.update_collision_area()

        class AnimationFactory:
            class MoveFactory:
                class SlowOrStandFactory:
                    def __init__(self, outer) -> None:
                        self.SIZE = (60, 76)
                        self.ACTION = 'MOVE'
                        self.STATUS = 'STAND'
                        self.NO_OF_FRAMES = 1
                        self.FRAMES_PER_CYCLE = 1
                        self.PATH = './Statics/Images/Character/Argumon/Action/Move/Medium/%s/Image-%s.PNG'
                        self.ANIMATION = outer.setup_animation(self.PATH, self.SIZE, self.NO_OF_FRAMES)
                        Global.logger.log(self.ANIMATION, '1')

                class MediumFactory:
                    def __init__(self, outer) -> None:
                        self.SIZE = (60, 76)
                        self.ACTION = 'MOVE'
                        self.STATUS = 'WALK'
                        self.NO_OF_FRAMES = 5
                        self.FRAMES_PER_CYCLE = 13
                        self.PATH = './Statics/Images/Character/Argumon/Action/Move/Medium/%s/Image-%s.PNG'
                        self.ANIMATION = outer.setup_animation(self.PATH, self.SIZE, self.NO_OF_FRAMES)
                        Global.logger.log(self.ANIMATION, '1')

                class FastFactory:
                    def __init__(self, outer) -> None:
                        self.SIZE = (81, 76)
                        self.ACTION = 'MOVE'
                        self.STATUS = 'RUN'
                        self.NO_OF_FRAMES = 7
                        self.FRAMES_PER_CYCLE = 8
                        self.PATH = './Statics/Images/Character/Argumon/Action/Move/Fast/%s/Image-%s.PNG'
                        self.ANIMATION = outer.setup_animation(self.PATH, self.SIZE, self.NO_OF_FRAMES)
                        Global.logger.log(self.ANIMATION, '1')

                def __init__(self, outer) -> None:
                    self.status = {
                        Global.constant.MEDIUM: self.MediumFactory(outer),
                        Global.constant.FAST: self.FastFactory(outer),
                        Global.constant.SLOW_OR_FREEZE: self.SlowOrStandFactory(outer)
                    }

            class JumpFactory:
                class RiseFactory:
                    def __init__(self, outer) -> None:
                        self.SIZE = (83, 76)
                        self.ACTION = 'JUMP'
                        self.STATUS = 'RISE'
                        self.NO_OF_FRAMES = 1
                        self.FRAMES_PER_CYCLE = 1
                        self.PATH = './Statics/Images/Character/Argumon/Action/Jump/Rise/%s/Image-%s.PNG'
                        self.ANIMATION = outer.setup_animation(self.PATH, self.SIZE, self.NO_OF_FRAMES)
                        Global.logger.log(self.ANIMATION, '1')

                class FallFactory:
                    def __init__(self, outer) -> None:
                        self.SIZE = (83, 76)
                        self.ACTION = 'JUMP'
                        self.STATUS = 'FALL'
                        self.NO_OF_FRAMES = 1
                        self.FRAMES_PER_CYCLE = 1
                        self.PATH = './Statics/Images/Character/Argumon/Action/Jump/Fall/%s/Image-%s.PNG'
                        self.ANIMATION = outer.setup_animation(self.PATH, self.SIZE, self.NO_OF_FRAMES)
                        Global.logger.log(self.ANIMATION, '1')

                def __init__(self, outer) -> None:
                    self.status = {
                        Global.constant.RISE: self.RiseFactory(outer),
                        Global.constant.FALL: self.FallFactory(outer)
                    }

            class AttackFactory:
                def __init__(self, outer) -> None:
                    self.SIZE = (77, 76)
                    self.ACTION = 'ATTACK'
                    self.STATUS = None
                    self.NO_OF_FRAMES = 4
                    self.FRAMES_PER_CYCLE = 12
                    self.NEXT_ACTION = Global.constant.MOVE
                    self.PATH = './Statics/Images/Character/Argumon/Action/Attack/%s/Image-%s.PNG'
                    self.ANIMATION = outer.setup_animation(self.PATH, self.SIZE, self.NO_OF_FRAMES)
                    Global.logger.log(self.ANIMATION, '1')

            class DeathFactory:
                def __init__(self, outer) -> None:
                    self.SIZE = (63, 76)
                    self.ACTION = 'DEATH'
                    self.STATUS = None
                    self.NO_OF_FRAMES = 5
                    self.FRAMES_PER_CYCLE = 8
                    self.PATH = './Statics/Images/Character/Argumon/Action/Death/%s/Image-%s.PNG'
                    self.ANIMATION = outer.setup_animation(self.PATH, self.SIZE, self.NO_OF_FRAMES)
                    Global.logger.log(self.ANIMATION, '1')

            def __init__(self, outer) -> None:
                self.outer = outer
                self.actions = {
                    Global.constant.MOVE: self.MoveFactory(self),
                    Global.constant.JUMP: self.JumpFactory(self),
                    Global.constant.ATTACK: self.AttackFactory(self),
                    Global.constant.DEATH: self.DeathFactory(self)
                }
                self.status = {
                    Global.constant.JUMP: False,
                    Global.constant.ATTACK: False,
                    Global.constant.SPIRIT_FIRE: False,
                    Global.constant.DEATH: False
                }
                self.frame_no = 0
                self.direction = Global.constant.RIGHT

            def setup_animation(self, path, size, no_of_frames):
                return {
                    Global.constant.LEFT: [
                        (
                            Global.frame.get_scaled_frame(
                                path % (Global.constant.LEFT, frame_id),
                                size
                            ),
                            size
                        )
                            for frame_id in range(no_of_frames)
                    ],
                    Global.constant.RIGHT: [
                        (
                            Global.frame.get_scaled_frame(
                                path % (Global.constant.RIGHT, frame_id),
                                size
                            ),
                            size
                        )
                            for frame_id in range(no_of_frames)
                    ]
                }

            def change_status(self, action, status):
                if self.status[action] != status:
                    self.frame_no = 0
                    self.status[action] = status

            def _get_frame_info(self, _action, _status=None):
                if _status:
                    return self.actions[_action].status[_status].ANIMATION[self.direction]
                else:
                    return self.actions[_action].ANIMATION[self.direction]

            def _get_no_of_frames(self, _action, _status=None):
                if _status:
                    return self.actions[_action].status[_status].NO_OF_FRAMES
                else:
                    return self.actions[_action].NO_OF_FRAMES

            def _get_frames_per_cycle(self, _action, _status=None):
                if _status:
                    return self.actions[_action].status[_status].FRAMES_PER_CYCLE
                else:
                    return self.actions[_action].FRAMES_PER_CYCLE

            def shift_at_specific_frame_no(self, frames_per_cycle, offset, same_direction=True):
                if int(self.frame_no / frames_per_cycle) == 0:
                    self.outer.newton.position.x += ({
                        True: +1,
                        False: -1
                    }[
                        same_direction
                    ] * {
                        Global.constant.LEFT: -1,
                        Global.constant.RIGHT: +1
                    }[
                        self.direction
                    ] * offset)

            def quit_after_first_cycle(self, no_of_frames, frames_per_cycle, status):
                if self.frame_no == (no_of_frames * frames_per_cycle) - 1:
                    self.change_status(status, False)

            def destroy_after_first_cycle(self, no_of_frames, frames_per_cycle):
                if self.frame_no == (no_of_frames * frames_per_cycle) - 1:
                    self.outer.outer.outer.hide = True

            def get_next_frame_no(self, no_of_frames, frames_per_cycle):
                self.frame_no += 1
                self.frame_no %= (no_of_frames * frames_per_cycle)
                return int(self.frame_no / frames_per_cycle)

            def get_frame_info(self, velocity):
                if self.status[Global.constant.DEATH] == True:
                    Global.logger.log(f"[{Global.constant.DEATH}] {self.frame_no}", '1')
                    frame_info = self._get_frame_info(Global.constant.DEATH)
                    no_of_frames = self._get_no_of_frames(Global.constant.DEATH)
                    frames_per_cycle = self._get_frames_per_cycle(Global.constant.DEATH)
                    self.destroy_after_first_cycle(no_of_frames, frames_per_cycle)
                    self.quit_after_first_cycle(no_of_frames, frames_per_cycle, status=Global.constant.DEATH)
                elif self.status[Global.constant.SPIRIT_FIRE] == True:
                    Global.logger.log(f"[{Global.constant.SPIRIT_FIRE}] {self.frame_no}", '1')
                    frame_info = self._get_frame_info(Global.constant.ATTACK)
                    no_of_frames = self._get_no_of_frames(Global.constant.ATTACK)
                    frames_per_cycle = self._get_frames_per_cycle(Global.constant.ATTACK)
                    self.shift_at_specific_frame_no(frames_per_cycle, self.outer.newton.ATTACK_BACKWARD_OFFSET, same_direction=True)
                    self.quit_after_first_cycle(no_of_frames, frames_per_cycle, status=Global.constant.ATTACK)
                elif self.status[Global.constant.ATTACK] == True:
                    Global.logger.log(f"[{Global.constant.ATTACK}] {self.frame_no}", '1')
                    frame_info = self._get_frame_info(Global.constant.ATTACK)
                    no_of_frames = self._get_no_of_frames(Global.constant.ATTACK)
                    frames_per_cycle = self._get_frames_per_cycle(Global.constant.ATTACK)
                    self.shift_at_specific_frame_no(frames_per_cycle, self.outer.newton.ATTACK_BACKWARD_OFFSET, same_direction=True)
                    self.quit_after_first_cycle(no_of_frames, frames_per_cycle, status=Global.constant.ATTACK)
                elif abs(velocity.y) > 0:
                    if velocity.y < 0:
                        Global.logger.log(f"[{Global.constant.JUMP}] [{Global.constant.RISE}] {velocity}", '1')
                        frame_info = self._get_frame_info(Global.constant.JUMP, Global.constant.RISE)
                        no_of_frames = self._get_no_of_frames(Global.constant.JUMP, Global.constant.RISE)
                        frames_per_cycle = self._get_frames_per_cycle(Global.constant.JUMP, Global.constant.RISE)
                    else:
                        Global.logger.log(f"[{Global.constant.JUMP}] [{Global.constant.FALL}] {velocity}", '1')
                        frame_info = self._get_frame_info(Global.constant.JUMP, Global.constant.FALL)
                        no_of_frames = self._get_no_of_frames(Global.constant.JUMP, Global.constant.FALL)
                        frames_per_cycle = self._get_frames_per_cycle(Global.constant.JUMP, Global.constant.FALL)
                else:
                    if abs(velocity.x) >= self.outer.newton.RUN_LOWEST_SPEED:
                        Global.logger.log(f"[{Global.constant.MOVE}] [{Global.constant.FAST}] {velocity}", '1')
                        frame_info = self._get_frame_info(Global.constant.MOVE, Global.constant.FAST)
                        no_of_frames = self._get_no_of_frames(Global.constant.MOVE, Global.constant.FAST)
                        frames_per_cycle = self._get_frames_per_cycle(Global.constant.MOVE, Global.constant.FAST)
                    elif abs(velocity.x) >= self.outer.newton.WALK_LOWEST_SPEED:
                        Global.logger.log(f"[{Global.constant.MOVE}] [{Global.constant.MEDIUM}] {self.frame_no}", '1')
                        frame_info = self._get_frame_info(Global.constant.MOVE, Global.constant.MEDIUM)
                        no_of_frames = self._get_no_of_frames(Global.constant.MOVE, Global.constant.MEDIUM)
                        frames_per_cycle = self._get_frames_per_cycle(Global.constant.MOVE, Global.constant.MEDIUM)
                    else:
                        Global.logger.log(f"[{Global.constant.MOVE}] [{Global.constant.SLOW_OR_FREEZE}] {self.frame_no}", '1')
                        frame_info = self._get_frame_info(Global.constant.MOVE, Global.constant.SLOW_OR_FREEZE)
                        no_of_frames = self._get_no_of_frames(Global.constant.MOVE, Global.constant.SLOW_OR_FREEZE)
                        frames_per_cycle = self._get_frames_per_cycle(Global.constant.MOVE, Global.constant.SLOW_OR_FREEZE)
                index = self.get_next_frame_no(no_of_frames, frames_per_cycle)
                return (
                    frame_info[index][0],
                    frame_info[index][1]
                )

        def __init__(self, outer) -> None:
            self.outer = outer
            super().__init__()
            self.newton = self.NewtonFactory(self)
            self.animation = self.AnimationFactory(self)
            self.update_collision_area(vec((-1, -1)))

        def update_collision_area(self, position=None):
            if not position:
                position = self.newton.position
            frame = self.animation.get_frame_info(self.newton.velocity)[0]
            self.rect = frame.get_rect()
            self.rect.center = (position.x, position.y)

        def is_collide_on_enemy(self, list_of_enemy):
            for enemy in list_of_enemy:
                if self.rect.colliderect(enemy):
                    if self.animation.status[Global.constant.ATTACK]:
                        return True
                    else:
                        return False
            return None

    class Taction1Factory(pygame.sprite.Sprite):
        class NewtonFactory:
            def __init__(self, outer) -> None:
                self.outer = outer
                self.can_newton = True
                self.position = vec((-1, -1))
                self.velocity = vec((0, 0))
                self.acceleration = vec((0, 0))

                self.POSITION = (20, 200)
                self.X_BOUND = 940
                self.Y_GROUND = 331

            def move(self, direction):
                if direction == Global.constant.LEFT:
                    self.velocity.x -= self.outer.outer.outer._spd.x
                else:
                    self.velocity.x += self.outer.outer.outer._spd.x
                if self.outer.newton.velocity.x >= 0:
                    self.outer.animation.direction = Global.constant.RIGHT
                else:
                    self.outer.animation.direction = Global.constant.LEFT

            def death(self):
                self.outer.animation.change_status(Global.constant.DEATH, True)
                self.can_newton = False

            def get_boundary(self):
                (negligible, size) = self.outer.animation.get_frame_info(self.velocity)
                return (
                    self.X_BOUND,
                    self.Y_GROUND - size[1]
                )

            def displace_x(self, y_ground):
                self.position.x += self.velocity.x
                friction_constant = {
                    True: self.outer.outer.outer.FRICTION_CONSTANT_AIR,
                    False: self.outer.outer.outer.FRICTION_CONSTANT_GROUND
                }[self.position.y < y_ground]
                self.velocity.x *= (1 + friction_constant)

            def displace_y(self, y_ground):
                self.position.y += self.velocity.y
                self.velocity.y *= (1 - self.outer.outer.outer.FRICTION_CONSTANT_AIR)
                self.velocity.y += self.acceleration.y
                if self.position.y < y_ground:
                    self.acceleration.y += self.outer.outer.outer.GRAVITY

            def reset_to_bound_of_x(self, x_bound):
                if self.position.x > x_bound:
                    self.position.x = x_bound
                    self.velocity.x = 0
                    self.acceleration.x = 0
                    self.direction = Global.constant.LEFT
                elif self.position.x < 0:
                    self.position.x = 0
                    self.velocity.x = 0
                    self.acceleration.x = 0
                    self.direction = Global.constant.RIGHT
                else:
                    return None

            def reset_to_bound_of_y(self, y_ground):
                if self.position.y > y_ground:
                    self.position.y = y_ground
                    self.velocity.y = 0
                    self.acceleration.y = 0

            def update(self):
                if self.can_newton:
                    (x_bound, y_ground) = self.get_boundary()
                    self.displace_x(y_ground)
                    self.displace_y(y_ground)
                    self.reset_to_bound_of_y(y_ground)
                    self.reset_to_bound_of_x(x_bound)
                self.outer.update_collision_area()

        class AnimationFactory:
            class MoveFactory:
                class SlowOrStandFactory:
                    def __init__(self, outer) -> None:
                        self.SIZE = (60, 76)
                        self.ACTION = 'MOVE'
                        self.STATUS = 'STAND'
                        self.NO_OF_FRAMES = 1
                        self.FRAMES_PER_CYCLE = 1
                        self.PATH = './Statics/Images/Character/Swordsman/Action/Move/Slow/%s/Image-%s.PNG'
                        self.ANIMATION = outer.setup_animation(self.PATH, self.SIZE, self.NO_OF_FRAMES)
                        Global.logger.log(self.ANIMATION, '1')

                def __init__(self, outer) -> None:
                    self.status = {
                        Global.constant.SLOW_OR_FREEZE: self.SlowOrStandFactory(outer)
                    }

            def __init__(self, outer) -> None:
                self.outer = outer
                self.actions = {
                    Global.constant.MOVE: self.MoveFactory(self),
                }
                self.status = {
                    Global.constant.JUMP: False,
                    Global.constant.ATTACK: False,
                    Global.constant.DEATH: False
                }
                self.frame_no = 0
                self.direction = Global.constant.RIGHT

            def setup_animation(self, path, size, no_of_frames):
                return {
                    Global.constant.LEFT: [
                        (
                            Global.frame.get_scaled_frame(
                                path % (Global.constant.LEFT, frame_id),
                                size
                            ),
                            size
                        )
                            for frame_id in range(no_of_frames)
                    ],
                    Global.constant.RIGHT: [
                        (
                            Global.frame.get_scaled_frame(
                                path % (Global.constant.RIGHT, frame_id),
                                size
                            ),
                            size
                        )
                            for frame_id in range(no_of_frames)
                    ]
                }

            def change_status(self, action, status):
                if self.status[action] != status:
                    self.frame_no = 0
                    self.status[action] = status

            def _get_frame_info(self, _action, _status=None):
                if _status:
                    return self.actions[_action].status[_status].ANIMATION[self.direction]
                else:
                    return self.actions[_action].ANIMATION[self.direction]

            def _get_no_of_frames(self, _action, _status=None):
                if _status:
                    return self.actions[_action].status[_status].NO_OF_FRAMES
                else:
                    return self.actions[_action].NO_OF_FRAMES

            def _get_frames_per_cycle(self, _action, _status=None):
                if _status:
                    return self.actions[_action].status[_status].FRAMES_PER_CYCLE
                else:
                    return self.actions[_action].FRAMES_PER_CYCLE

            def shift_at_specific_frame_no(self, frames_per_cycle, offset, same_direction=True):
                if int(self.frame_no / frames_per_cycle) == 0:
                    self.outer.newton.position.x += ({
                        True: +1,
                        False: -1
                    }[
                        same_direction
                    ] * {
                        Global.constant.LEFT: -1,
                        Global.constant.RIGHT: +1
                    }[
                        self.direction
                    ] * offset)

            def quit_after_first_cycle(self, no_of_frames, frames_per_cycle, status):
                if self.frame_no == (no_of_frames * frames_per_cycle) - 1:
                    self.change_status(status, False)

            def destroy_after_first_cycle(self, no_of_frames, frames_per_cycle):
                if self.frame_no == (no_of_frames * frames_per_cycle) - 1:
                    self.outer.outer.outer.hide = True

            def get_next_frame_no(self, no_of_frames, frames_per_cycle):
                self.frame_no += 1
                self.frame_no %= (no_of_frames * frames_per_cycle)
                return int(self.frame_no / frames_per_cycle)

            def get_frame_info(self, velocity):
                Global.logger.log(f"[{Global.constant.MOVE}] [{Global.constant.SLOW_OR_FREEZE}] {self.frame_no}", '1')
                frame_info = self._get_frame_info(Global.constant.MOVE, Global.constant.SLOW_OR_FREEZE)
                no_of_frames = self._get_no_of_frames(Global.constant.MOVE, Global.constant.SLOW_OR_FREEZE)
                frames_per_cycle = self._get_frames_per_cycle(Global.constant.MOVE, Global.constant.SLOW_OR_FREEZE)

                index = self.get_next_frame_no(no_of_frames, frames_per_cycle)
                return (
                    frame_info[index][0],
                    frame_info[index][1]
                )

        def __init__(self, outer) -> None:
            self.outer = outer
            super().__init__()
            self.newton = self.NewtonFactory(self)
            self.animation = self.AnimationFactory(self)
            self.update_collision_area(vec((-1, -1)))

        def update_collision_area(self, position=None):
            if not position:
                position = self.newton.position
            frame = self.animation.get_frame_info(self.newton.velocity)[0]
            self.rect = frame.get_rect()
            self.rect.center = (position.x, position.y)

    def __init__(self, outer) -> None:
        self.outer = outer
        self.configuration = self.ConfigurationFactory()

    def init(self, character):
        if character == Global.player.name.ARGUMON:
            self.argumon = self.ArgumonFactory(self)
        elif character == Global.player.name.TACTION1:
            self.taction1 = self.Taction1Factory(self)
