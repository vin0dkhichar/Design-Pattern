from collections.abc import Iterator as PyIterator
from abc import ABC, abstractmethod

class MenuItem:
    def __init__(self, name, description, vegetarian, price):
        self.name = name
        self.description = description
        self.vegetarian = vegetarian
        self.price = price

    def get_name(self):
        return self.name

    def get_description(self):
        return self.description

    def is_vegetarian(self):
        return self.vegetarian

    def get_price(self):
        return self.price


class DinerMenuIterator(PyIterator):
    def __init__(self, items):
        self.items = items
        self.position = 0

    def __next__(self):
        if self.position >= len(self.items) or self.items[self.position] is None:
            raise StopIteration
        item = self.items[self.position]
        self.position += 1
        return item

    def __iter__(self):
        return self

    def remove(self):
        if self.position <= 0:
            raise Exception("You can't remove an item until you've done at least one next()")
        if self.items[self.position - 1] is not None:
            for i in range(self.position - 1, len(self.items) - 1):
                self.items[i] = self.items[i + 1]
            self.items[-1] = None
            self.position -= 1


class Menu(ABC):
    @abstractmethod
    def create_iterator(self):
        pass


class DinerMenu(Menu):
    MAX_ITEMS = 6

    def __init__(self):
        self.menu_items = [None] * self.MAX_ITEMS
        self.number_of_items = 0
        self.add_item("Vegetarian BLT", "Fakin’ Bacon with lettuce & tomato", True, 2.99)
        self.add_item("BLT", "Bacon with lettuce & tomato", False, 2.99)
        self.add_item("Soup of the day", "Soup with side salad", False, 3.29)

    def add_item(self, name, description, vegetarian, price):
        if self.number_of_items >= self.MAX_ITEMS:
            print("Menu is full, can’t add item.")
        else:
            self.menu_items[self.number_of_items] = MenuItem(name, description, vegetarian, price)
            self.number_of_items += 1

    def create_iterator(self):
        return DinerMenuIterator(self.menu_items)


class PancakeHouseMenu(Menu):
    def __init__(self):
        self.menu_items = []
        self.add_item("Pancakes", "Pancakes with syrup", True, 2.99)
        self.add_item("Blueberry Pancakes", "Pancakes with blueberries", True, 3.49)

    def add_item(self, name, description, vegetarian, price):
        self.menu_items.append(MenuItem(name, description, vegetarian, price))

    def create_iterator(self):
        return iter(self.menu_items)  # Uses Python's built-in iterator


class Waitress:
    def __init__(self, pancake_menu: Menu, diner_menu: Menu):
        self.pancake_menu = pancake_menu
        self.diner_menu = diner_menu

    def print_menu(self):
        print("MENU\n----\nBREAKFAST")
        self._print_menu(self.pancake_menu.create_iterator())
        print("\nLUNCH")
        self._print_menu(self.diner_menu.create_iterator())

    def _print_menu(self, iterator):
        for item in iterator:
            print(f"{item.get_name()}, {item.get_price()} -- {item.get_description()}")


if __name__ == "__main__":
    pancake_menu = PancakeHouseMenu()
    diner_menu = DinerMenu()
    waitress = Waitress(pancake_menu, diner_menu)
    waitress.print_menu()
