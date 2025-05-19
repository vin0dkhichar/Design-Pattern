# Command Pattern -> Encapsulates a request as an object, thereby letting you parameterize
#                    client with different requests and support undoable operations.
#                    When you need decouple an object making to requests from the objects
#                    that know how to perform the requests, use the Command Pattern


from abc import ABC, abstractmethod

# Command Interface
class Command(ABC):
    @abstractmethod
    def execute(self):
        pass

# Receiver classes
class Light:
    def __init__(self, location=""):
        self.location = location

    def on(self):
        print(f"{self.location} Light is ON")

    def off(self):
        print(f"{self.location} Light is OFF")

class Stereo:
    def __init__(self, location=""):
        self.location = location

    def on(self):
        print(f"{self.location} Stereo is ON")

    def off(self):
        print(f"{self.location} Stereo is OFF")

    def set_cd(self):
        print("CD is set")

    def set_volume(self, level):
        print(f"Volume is set to {level}")

class CeilingFan:
    def __init__(self, location=""):
        self.location = location

    def on(self):
        print(f"{self.location} Ceiling Fan is ON")

    def off(self):
        print(f"{self.location} Ceiling Fan is OFF")

class GarageDoor:
    def __init__(self, location=""):
        self.location = location

    def up(self):
        print("Garage Door is UP")

    def down(self):
        print("Garage Door is DOWN")

# Command implementations
class LightOnCommand(Command):
    def __init__(self, light):
        self.light = light

    def execute(self):
        self.light.on()

class LightOffCommand(Command):
    def __init__(self, light):
        self.light = light

    def execute(self):
        self.light.off()

class StereoOnWithCDCommand(Command):
    def __init__(self, stereo):
        self.stereo = stereo

    def execute(self):
        self.stereo.on()
        self.stereo.set_cd()
        self.stereo.set_volume(11)

class StereoOffCommand(Command):
    def __init__(self, stereo):
        self.stereo = stereo

    def execute(self):
        self.stereo.off()

class CeilingFanOnCommand(Command):
    def __init__(self, fan):
        self.fan = fan

    def execute(self):
        self.fan.on()

class CeilingFanOffCommand(Command):
    def __init__(self, fan):
        self.fan = fan

    def execute(self):
        self.fan.off()

class GarageDoorUpCommand(Command):
    def __init__(self, door):
        self.door = door

    def execute(self):
        self.door.up()

class GarageDoorDownCommand(Command):
    def __init__(self, door):
        self.door = door

    def execute(self):
        self.door.down()

class NoCommand(Command):
    def execute(self):
        print("No command assigned")

# Invoker
class RemoteControl:
    def __init__(self):
        self.on_commands = [NoCommand()] * 7
        self.off_commands = [NoCommand()] * 7

    def set_command(self, slot, on_command, off_command):
        self.on_commands[slot] = on_command
        self.off_commands[slot] = off_command

    def on_button_was_pushed(self, slot):
        self.on_commands[slot].execute()

    def off_button_was_pushed(self, slot):
        self.off_commands[slot].execute()

    def __str__(self):
        result = "\n------ Remote Control -------\n"
        for i in range(len(self.on_commands)):
            result += f"[slot {i}] {type(self.on_commands[i]).__name__} | {type(self.off_commands[i]).__name__}\n"
        return result

if __name__ == "__main__":
    remote_control = RemoteControl()

    living_room_light = Light("Living Room")
    kitchen_light = Light("Kitchen")
    ceiling_fan = CeilingFan("Living Room")
    garage_door = GarageDoor("Garage")
    stereo = Stereo("Living Room")

    remote_control.set_command(0, LightOnCommand(living_room_light), LightOffCommand(living_room_light))
    remote_control.set_command(1, LightOnCommand(kitchen_light), LightOffCommand(kitchen_light))
    remote_control.set_command(2, CeilingFanOnCommand(ceiling_fan), CeilingFanOffCommand(ceiling_fan))
    remote_control.set_command(3, StereoOnWithCDCommand(stereo), StereoOffCommand(stereo))

    print(remote_control)

    remote_control.on_button_was_pushed(0)
    remote_control.off_button_was_pushed(0)
    remote_control.on_button_was_pushed(1)
    remote_control.off_button_was_pushed(1)
    remote_control.on_button_was_pushed(2)
    remote_control.off_button_was_pushed(2)
    remote_control.on_button_was_pushed(3)
    remote_control.off_button_was_pushed(3)
