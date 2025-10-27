# # Command Pattern -> Encapsulates a request as an object, thereby letting you parameterize
# #                    client with different requests and support undoable operations.
# #                    When you need decouple an object making to requests from the objects
# #                    that know how to perform the requests, use the Command Pattern


# from abc import ABC, abstractmethod

# # Command Interface
# class Command(ABC):
#     @abstractmethod
#     def execute(self):
#         pass

#     @abstractmethod
#     def undo(self):
#         pass

# # Receiver
# class Light:
#     def __init__(self, location=""):
#         self.location = location

#     def on(self):
#         print(f"{self.location} Light is ON")

#     def off(self):
#         print(f"{self.location} Light is OFF")

# # Command Implementations
# class LightOnCommand(Command):
#     def __init__(self, light):
#         self.light = light

#     def execute(self):
#         self.light.on()

#     def undo(self):
#         self.light.off()

# class LightOffCommand(Command):
#     def __init__(self, light):
#         self.light = light

#     def execute(self):
#         self.light.off()

#     def undo(self):
#         self.light.on()

# class NoCommand(Command):
#     def execute(self):
#         pass

#     def undo(self):
#         pass

# # Invoker with Undo
# class RemoteControlWithUndo:
#     def __init__(self):
#         self.on_commands = [NoCommand()] * 7
#         self.off_commands = [NoCommand()] * 7
#         self.undo_command = NoCommand()

#     def set_command(self, slot, on_command, off_command):
#         self.on_commands[slot] = on_command
#         self.off_commands[slot] = off_command

#     def on_button_was_pushed(self, slot):
#         self.on_commands[slot].execute()
#         self.undo_command = self.on_commands[slot]

#     def off_button_was_pushed(self, slot):
#         self.off_commands[slot].execute()
#         self.undo_command = self.off_commands[slot]

#     def undo_button_was_pushed(self):
#         self.undo_command.undo()

#     def __str__(self):
#         result = "\n------ Remote Control -------\n"
#         for i, (on, off) in enumerate(zip(self.on_commands, self.off_commands)):
#             result += f"[slot {i}] {type(on).__name__} | {type(off).__name__}\n"
#         result += f"[undo] {type(self.undo_command).__name__}\n"
#         return result

# if __name__ == "__main__":
#     remote_control = RemoteControlWithUndo()

#     living_room_light = Light("Living Room")
#     light_on = LightOnCommand(living_room_light)
#     light_off = LightOffCommand(living_room_light)

#     remote_control.set_command(0, light_on, light_off)

#     remote_control.on_button_was_pushed(0)
#     remote_control.off_button_was_pushed(0)
#     print(remote_control)
#     remote_control.undo_button_was_pushed()

#     remote_control.off_button_was_pushed(0)
#     remote_control.on_button_was_pushed(0)
#     print(remote_control)
#     remote_control.undo_button_was_pushed()


from abc import ABC, abstractmethod
from datetime import datetime


# === Receiver (Business Logic Layer) ===
class OrderService:
    def __init__(self):
        self.orders = {}  # order_id → status

    def place_order(self, order_id: str):
        self.orders[order_id] = "PLACED"
        print(f"✅ Order {order_id} placed at {datetime.now().strftime('%H:%M:%S')}")

    def cancel_order(self, order_id: str):
        if self.orders.get(order_id) == "PLACED":
            self.orders[order_id] = "CANCELLED"
            print(f"❌ Order {order_id} cancelled at {datetime.now().strftime('%H:%M:%S')}")
        else:
            print(f"⚠️ Cannot cancel order {order_id} (status: {self.orders.get(order_id)})")

    def ship_order(self, order_id: str):
        if self.orders.get(order_id) == "PLACED":
            self.orders[order_id] = "SHIPPED"
            print(f"📦 Order {order_id} shipped at {datetime.now().strftime('%H:%M:%S')}")
        else:
            print(f"⚠️ Cannot ship order {order_id} (status: {self.orders.get(order_id)})")


# === Command Interface ===
class Command(ABC):
    @abstractmethod
    def execute(self):
        pass

    @abstractmethod
    def undo(self):
        pass


# === Concrete Commands ===
class PlaceOrderCommand(Command):
    def __init__(self, order_service: OrderService, order_id: str):
        self.order_service = order_service
        self.order_id = order_id

    def execute(self):
        self.order_service.place_order(self.order_id)

    def undo(self):
        self.order_service.cancel_order(self.order_id)


class CancelOrderCommand(Command):
    def __init__(self, order_service: OrderService, order_id: str):
        self.order_service = order_service
        self.order_id = order_id
        self.prev_status = None

    def execute(self):
        self.prev_status = self.order_service.orders.get(self.order_id)
        self.order_service.cancel_order(self.order_id)

    def undo(self):
        if self.prev_status == "PLACED":
            self.order_service.place_order(self.order_id)
        else:
            print(f"Cannot undo cancel for order {self.order_id}")


class ShipOrderCommand(Command):
    def __init__(self, order_service: OrderService, order_id: str):
        self.order_service = order_service
        self.order_id = order_id
        self.prev_status = None

    def execute(self):
        self.prev_status = self.order_service.orders.get(self.order_id)
        self.order_service.ship_order(self.order_id)

    def undo(self):
        if self.prev_status == "PLACED":
            self.order_service.place_order(self.order_id)
        else:
            print(f"Cannot undo shipping for order {self.order_id}")


# === Invoker ===
class CommandManager:
    def __init__(self):
        self._history = []

    def execute_command(self, command: Command):
        command.execute()
        self._history.append(command)

    def undo_last(self):
        if self._history:
            last_command = self._history.pop()
            print("↩️ Undoing last command...")
            last_command.undo()
        else:
            print("⚠️ No commands to undo")


# === Client Code ===
if __name__ == "__main__":
    service = OrderService()
    manager = CommandManager()

    # Create commands
    place = PlaceOrderCommand(service, "ORD-1001")
    ship = ShipOrderCommand(service, "ORD-1001")
    cancel = CancelOrderCommand(service, "ORD-1001")

    # Execute actions
    manager.execute_command(place)
    manager.execute_command(ship)
    manager.execute_command(cancel)  # should fail because shipped

    print("\n🧾 Undoing last command...")
    manager.undo_last()  # Undo cancel (if valid)

    print("\n📜 Final Order States:")
    print(service.orders)
