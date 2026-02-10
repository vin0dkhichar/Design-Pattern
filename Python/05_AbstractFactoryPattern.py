# Abstract Factory Pattern -> Provides an interface for creating families of related or 
#                             dependent objects without specifying their concrete classes.


from abc import ABC, abstractmethod

# Abstract products
class Button(ABC):
    @abstractmethod
    def paint(self):
        pass

class Checkbox(ABC):
    @abstractmethod
    def paint(self):
        pass

# Concrete products for Windows
class WindowsButton(Button):
    def paint(self):
        print("Rendering a button in Windows style")

class WindowsCheckbox(Checkbox):
    def paint(self):
        print("Rendering a checkbox in Windows style")

# Concrete products for Mac
class MacButton(Button):
    def paint(self):
        print("Rendering a button in Mac style")

class MacCheckbox(Checkbox):
    def paint(self):
        print("Rendering a checkbox in Mac style")

# Abstract Factory
class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button:
        pass

    @abstractmethod
    def create_checkbox(self) -> Checkbox:
        pass

# Concrete factories
class WindowsFactory(GUIFactory):
    def create_button(self) -> Button:
        return WindowsButton()

    def create_checkbox(self) -> Checkbox:
        return WindowsCheckbox()

class MacFactory(GUIFactory):
    def create_button(self) -> Button:
        return MacButton()

    def create_checkbox(self) -> Checkbox:
        return MacCheckbox()

# Client code
def client(factory: GUIFactory):
    button = factory.create_button()
    checkbox = factory.create_checkbox()
    button.paint()
    checkbox.paint()

if __name__ == "__main__":
    print("Client: Testing client with Windows factory:")
    client(WindowsFactory())

    print("\nClient: Testing client with Mac factory:")
    client(MacFactory())
