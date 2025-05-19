from abc import ABC, abstractmethod

# --- Command Pattern ---
class Command(ABC):
    @abstractmethod
    def execute(self): pass

# --- Observer Pattern ---
class Observer(ABC):
    @abstractmethod
    def update(self, device): pass

class Observable:
    def __init__(self):
        self._observers = []

    def register(self, observer):
        self._observers.append(observer)

    def notify(self, device):
        for obs in self._observers:
            obs.update(device)

# --- Device Interface ---
class Device(ABC):
    def __init__(self):
        self.observable = Observable()

    def register_observer(self, observer):
        self.observable.register(observer)

    def notify_observers(self):
        self.observable.notify(self)

    @abstractmethod
    def on(self): pass

    @abstractmethod
    def off(self): pass

# --- Concrete Devices ---
class Light(Device):
    def on(self):
        print("Light is ON")
        self.notify_observers()

    def off(self):
        print("Light is OFF")
        self.notify_observers()

class Thermostat(Device):
    def on(self):
        print("Thermostat is HEATING")
        self.notify_observers()

    def off(self):
        print("Thermostat is IDLE")
        self.notify_observers()

# --- Decorator: Add Logging to Devices ---
class UsageLogger(Device):
    def __init__(self, device):
        super().__init__()
        self.device = device
        self.usage = 0

    def on(self):
        self.usage += 1
        print(f"[LOG] Usage count: {self.usage}")
        self.device.on()
        self.notify_observers()

    def off(self):
        self.device.off()
        self.notify_observers()

# --- Composite: Device Group ---
class DeviceGroup(Device):
    def __init__(self):
        super().__init__()
        self.devices = []

    def add(self, device):
        self.devices.append(device)

    def on(self):
        for d in self.devices:
            d.on()
        self.notify_observers()

    def off(self):
        for d in self.devices:
            d.off()
        self.notify_observers()

# --- Commands ---
class OnCommand(Command):
    def __init__(self, device):
        self.device = device

    def execute(self):
        self.device.on()

class OffCommand(Command):
    def __init__(self, device):
        self.device = device

    def execute(self):
        self.device.off()

# --- Observer Implementation ---
class ActivityMonitor(Observer):
    def update(self, device):
        print(f"[Monitor] Activity detected on: {device.__class__.__name__}")

# --- Factory ---
class DeviceFactory:
    def create_light(self, log=False):
        light = Light()
        return UsageLogger(light) if log else light

    def create_thermostat(self, log=False):
        thermo = Thermostat()
        return UsageLogger(thermo) if log else thermo

# --- Client Code ---
if __name__ == "__main__":
    factory = DeviceFactory()

    monitor = ActivityMonitor()

    light1 = factory.create_light(log=True)
    light1.register_observer(monitor)

    thermostat = factory.create_thermostat(log=True)
    thermostat.register_observer(monitor)

    group = DeviceGroup()
    group.add(light1)
    group.add(thermostat)
    group.register_observer(monitor)

    # Use Command Pattern
    on_cmd = OnCommand(group)
    off_cmd = OffCommand(group)

    print("\nTurning on all devices:")
    on_cmd.execute()

    print("\nTurning off all devices:")
    off_cmd.execute()
