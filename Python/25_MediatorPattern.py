# Mediator Interface
from abc import ABC, abstractmethod

class Mediator(ABC):
    @abstractmethod
    def send_message(self, message, colleague):
        pass

# Concrete Mediator
class ChatRoom(Mediator):
    def __init__(self):
        self.colleagues = []

    def add_colleague(self, colleague):
        self.colleagues.append(colleague)

    def send_message(self, message, colleague):
        for c in self.colleagues:
            if c != colleague:
                c.receive_message(message)

# Colleague Interface
class Colleague(ABC):
    def __init__(self, name, mediator):
        self.name = name
        self.mediator = mediator
        self.mediator.add_colleague(self)

    @abstractmethod
    def send_message(self, message):
        pass

    @abstractmethod
    def receive_message(self, message):
        pass

# Concrete Colleague
class User(Colleague):
    def send_message(self, message):
        print(f"{self.name} sends message: {message}")
        self.mediator.send_message(message, self)

    def receive_message(self, message):
        print(f"{self.name} receives message: {message}")

# Client: Demonstrating the mediator pattern with users in a chatroom
if __name__ == "__main__":
    chat_room = ChatRoom()

    user1 = User("Alice", chat_room)
    user2 = User("Bob", chat_room)
    user3 = User("Charlie", chat_room)

    user1.send_message("Hello, everyone!")
    user2.send_message("Hi, Alice!")
    user3.send_message("Hey Alice and Bob!")
