# Bridge Pattern: Decouples an abstraction from its implementation, allowing both to evolve 
#                 independently.


from abc import ABC, abstractmethod

# Implementor Interface
class Device(ABC):
    @abstractmethod
    def turn_on(self): pass

    @abstractmethod
    def turn_off(self): pass

    @abstractmethod
    def set_volume(self, volume: int): pass


# Concrete Implementors
class TV(Device):
    def turn_on(self):
        print("TV is ON")

    def turn_off(self):
        print("TV is OFF")

    def set_volume(self, volume: int):
        print(f"TV volume set to {volume}")


class Radio(Device):
    def turn_on(self):
        print("Radio is ON")

    def turn_off(self):
        print("Radio is OFF")

    def set_volume(self, volume: int):
        print(f"Radio volume set to {volume}")


# Abstraction
class RemoteControl:
    def __init__(self, device: Device):
        self.device = device

    def toggle_power(self):
        print("Toggling power")
        self.device.turn_on()

    def volume_up(self):
        print("Increasing volume")
        self.device.set_volume(10)


# Refined Abstraction
class AdvancedRemoteControl(RemoteControl):
    def mute(self):
        print("Muting device")
        self.device.set_volume(0)


# Client Code
if __name__ == "__main__":
    tv = TV()
    radio = Radio()

    print("=== TV Remote ===")
    remote_tv = AdvancedRemoteControl(tv)
    remote_tv.toggle_power()
    remote_tv.volume_up()
    remote_tv.mute()

    print("\n=== Radio Remote ===")
    remote_radio = AdvancedRemoteControl(radio)
    remote_radio.toggle_power()
    remote_radio.volume_up()
    remote_radio.mute()
