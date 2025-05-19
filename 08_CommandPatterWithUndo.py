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

    @abstractmethod
    def undo(self):
        pass

# Receiver
class Light:
    def __init__(self, location=""):
        self.location = location

    def on(self):
        print(f"{self.location} Light is ON")

    def off(self):
        print(f"{self.location} Light is OFF")

# Command Implementations
class LightOnCommand(Command):
    def __init__(self, light):
        self.light = light

    def execute(self):
        self.light.on()

    def undo(self):
        self.light.off()

class LightOffCommand(Command):
    def __init__(self, light):
        self.light = light

    def execute(self):
        self.light.off()

    def undo(self):
        self.light.on()

class NoCommand(Command):
    def execute(self):
        pass

    def undo(self):
        pass

# Invoker with Undo
class RemoteControlWithUndo:
    def __init__(self):
        self.on_commands = [NoCommand()] * 7
        self.off_commands = [NoCommand()] * 7
        self.undo_command = NoCommand()

    def set_command(self, slot, on_command, off_command):
        self.on_commands[slot] = on_command
        self.off_commands[slot] = off_command

    def on_button_was_pushed(self, slot):
        self.on_commands[slot].execute()
        self.undo_command = self.on_commands[slot]

    def off_button_was_pushed(self, slot):
        self.off_commands[slot].execute()
        self.undo_command = self.off_commands[slot]

    def undo_button_was_pushed(self):
        self.undo_command.undo()

    def __str__(self):
        result = "\n------ Remote Control -------\n"
        for i, (on, off) in enumerate(zip(self.on_commands, self.off_commands)):
            result += f"[slot {i}] {type(on).__name__} | {type(off).__name__}\n"
        result += f"[undo] {type(self.undo_command).__name__}\n"
        return result

if __name__ == "__main__":
    remote_control = RemoteControlWithUndo()

    living_room_light = Light("Living Room")
    light_on = LightOnCommand(living_room_light)
    light_off = LightOffCommand(living_room_light)

    remote_control.set_command(0, light_on, light_off)

    remote_control.on_button_was_pushed(0)
    remote_control.off_button_was_pushed(0)
    print(remote_control)
    remote_control.undo_button_was_pushed()

    remote_control.off_button_was_pushed(0)
    remote_control.on_button_was_pushed(0)
    print(remote_control)
    remote_control.undo_button_was_pushed()
