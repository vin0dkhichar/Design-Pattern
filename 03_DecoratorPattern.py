# Decorator Pattern -> Attaches additional responsibilities to an object dynamically.
#                      Decorators provide a ﬂexible alternative to subclassing for 
#                      extending functionality.


from abc import ABC, abstractmethod

# Base Beverage class
class Beverage(ABC):
    def __init__(self):
        self._description = "Unknown Beverage"

    def get_description(self):
        return self._description

    @abstractmethod
    def cost(self):
        pass

# Condiment Decorator abstract class
class CondimentDecorator(Beverage):
    @abstractmethod
    def get_description(self):
        pass

# Concrete Beverage: Espresso
class Espresso(Beverage):
    def __init__(self):
        self._description = "Espresso"

    def cost(self):
        return 1.99

# Concrete Beverage: HouseBlend
class HouseBlend(Beverage):
    def __init__(self):
        self._description = "House Blend Coffee"

    def cost(self):
        return 0.89

# Concrete Beverage: DarkRoast
class DarkRoast(Beverage):
    def __init__(self):
        self._description = "Dark Roast Coffee"

    def cost(self):
        return 0.99

# Concrete Condiment: Mocha
class Mocha(CondimentDecorator):
    def __init__(self, beverage):
        self.beverage = beverage

    def get_description(self):
        return self.beverage.get_description() + ", Mocha"

    def cost(self):
        return 0.20 + self.beverage.cost()

# Concrete Condiment: Whip
class Whip(CondimentDecorator):
    def __init__(self, beverage):
        self.beverage = beverage

    def get_description(self):
        return self.beverage.get_description() + ", Whip"

    def cost(self):
        return 0.10 + self.beverage.cost()

# Concrete Condiment: Soy
class Soy(CondimentDecorator):
    def __init__(self, beverage):
        self.beverage = beverage

    def get_description(self):
        return self.beverage.get_description() + ", Soy"

    def cost(self):
        return 0.15 + self.beverage.cost()

# Main function to demonstrate
if __name__ == "__main__":
    beverage = Espresso()
    print(f"{beverage.get_description()} ${beverage.cost():.2f}")

    beverage2 = DarkRoast()
    beverage2 = Mocha(beverage2)
    beverage2 = Mocha(beverage2)
    beverage2 = Whip(beverage2)
    print(f"{beverage2.get_description()} ${beverage2.cost():.2f}")

    beverage3 = HouseBlend()
    beverage3 = Soy(beverage3)
    beverage3 = Mocha(beverage3)
    beverage3 = Whip(beverage3)
    print(f"{beverage3.get_description()} ${beverage3.cost():.2f}")
