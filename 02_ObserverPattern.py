# Observer Pattern -> Deﬁnes a one-to-many dependency between objects so that when one
#                     object changes state, all of its dependents are notiﬁed and updated
#                     automatically.


# from abc import ABC, abstractmethod


# class Observer(ABC):
#     @abstractmethod
#     def update(self, temperature: float, humidity: float, pressure: float):
#         pass

# class DisplayElement(ABC):
#     @abstractmethod
#     def display(self):
#         pass

# class Subject(ABC):
#     @abstractmethod
#     def register_observer(self, observer: Observer):
#         pass

#     @abstractmethod
#     def remove_observer(self, observer: Observer):
#         pass

#     @abstractmethod
#     def notify_observers(self):
#         pass



# class WeatherData(Subject):
#     def __init__(self):
#         self.observers: list[Observer] = []
#         self.temperature: float = 0.0
#         self.humidity: float = 0.0
#         self.pressure: float = 0.0

#     def register_observer(self, observer: Observer):
#         self.observers.append(observer)

#     def remove_observer(self, observer: Observer):
#         if observer in self.observers:
#             self.observers.remove(observer)

#     def notify_observers(self):
#         for observer in self.observers:
#             observer.update(self.temperature, self.humidity, self.pressure)

#     def measurements_changed(self):
#         self.notify_observers()

#     def set_measurements(self, temperature: float, humidity: float, pressure: float):
#         self.temperature = temperature
#         self.humidity = humidity
#         self.pressure = pressure
#         self.measurements_changed()




# class CurrentConditionsDisplay(Observer, DisplayElement):
#     def __init__(self, weather_data: Subject):
#         self.temperature = 0.0
#         self.humidity = 0.0
#         weather_data.register_observer(self)

#     def update(self, temperature, humidity, pressure):
#         self.temperature = temperature
#         self.humidity = humidity
#         self.display()

#     def display(self):
#         print(f"Current conditions: {self.temperature}F degrees and {self.humidity}% humidity")


# class StatisticsDisplay(Observer, DisplayElement):
#     def __init__(self, weather_data: Subject):
#         self.temps = []
#         weather_data.register_observer(self)

#     def update(self, temperature, humidity, pressure):
#         self.temps.append(temperature)
#         self.display()

#     def display(self):
#         avg_temp = sum(self.temps) / len(self.temps)
#         max_temp = max(self.temps)
#         min_temp = min(self.temps)
#         print(f"Avg/Max/Min temperature = {avg_temp:.1f}/{max_temp}/{min_temp}")



# class ForecastDisplay(Observer, DisplayElement):
#     def __init__(self, weather_data: Subject):
#         self.last_pressure = 29.92
#         self.current_pressure = 29.92
#         weather_data.register_observer(self)

#     def update(self, temperature, humidity, pressure):
#         self.last_pressure = self.current_pressure
#         self.current_pressure = pressure
#         self.display()

#     def display(self):
#         if self.current_pressure > self.last_pressure:
#             forecast = "Improving weather on the way!"
#         elif self.current_pressure == self.last_pressure:
#             forecast = "More of the same."
#         else:
#             forecast = "Watch out for cooler, rainy weather."
#         print(f"Forecast: {forecast}")



# def main():
#     weather_data = WeatherData()

#     current_display = CurrentConditionsDisplay(weather_data)
#     statistics_display = StatisticsDisplay(weather_data)
#     forecast_display = ForecastDisplay(weather_data)

#     # Simulate new weather measurements
#     weather_data.set_measurements(80, 65, 30.4)
#     weather_data.set_measurements(82, 70, 29.2)
#     # weather_data.remove_observer(current_display)
#     weather_data.set_measurements(78, 90, 29.2)

# if __name__ == "__main__":
#     main()





from abc import ABC, abstractmethod

# Observer base class
class Observer(ABC):
    @abstractmethod
    def update(self, product_name: str):
        pass

# Product Interface
class ProductInterface(ABC):
    @abstractmethod
    def subscribe(self, observer: Observer):
        pass

    @abstractmethod
    def unsubscribe(self, observer: Observer):
        pass

    @abstractmethod
    def notify_observers(self):
        pass

    @abstractmethod
    def set_stock(self, status: bool):
        pass

# Concrete Observer (User)
class User(Observer):
    def __init__(self, username: str):
        self.username = username

    def update(self, product_name: str):
        print(f"Notification to {self.username}: '{product_name}' is back in stock!")

# Concrete Product Class implementing the Interface
class Product(ProductInterface):
    def __init__(self, name: str):
        self.name = name
        self.in_stock = False
        self._observers = []

    def subscribe(self, observer: Observer):
        self._observers.append(observer)

    def unsubscribe(self, observer: Observer):
        self._observers.remove(observer)

    def notify_observers(self):
        for observer in self._observers:
            observer.update(self.name)

    def set_stock(self, status: bool):
        self.in_stock = status
        if status:
            print(f"Product '{self.name}' is now in stock.")
            self.notify_observers()
        else:
            print(f"Product '{self.name}' is out of stock.")

# Example usage
if __name__ == "__main__":
    iphone = Product("iPhone 15 Pro Max")
    alice = User("Alice")
    bob = User("Bob")

    iphone.subscribe(alice)
    iphone.subscribe(bob)

    iphone.set_stock(True)

    iphone.unsubscribe(bob)
    iphone.set_stock(False)
    iphone.set_stock(True)









































# Observer Pattern: Defines a dependency between objects, ensuring that when one object changes state, 
#                   all its dependents are notified and updated automatically.


from abc import ABC, abstractmethod

# Observer base class
class Observer(ABC):
    @abstractmethod
    def update(self, product_name: str):
        pass

# Concrete Observer (User)
class User(Observer):
    def __init__(self, username: str):
        self.username = username

    def update(self, product_name: str):
        print(f"[Notification] {self.username}, '{product_name}' is back in stock!")

# ProductInterface: Core functionality
class ProductInterface(ABC):
    @abstractmethod
    def set_stock(self, status: bool):
        pass

    @abstractmethod
    def is_in_stock(self) -> bool:
        pass

    @abstractmethod
    def get_name(self) -> str:
        pass

# Concrete Product: Core product logic
class Product(ProductInterface):
    def __init__(self, name: str):
        self._name = name
        self._in_stock = False

    def set_stock(self, status: bool):
        self._in_stock = status
        print(f"[Product] Stock status changed: {self._name} - {'In stock' if status else 'Out of stock'}")

    def is_in_stock(self) -> bool:
        return self._in_stock

    def get_name(self) -> str:
        return self._name

# NotifiableProduct: Adds notification capabilities
class NotifiableProduct(ProductInterface):
    def __init__(self, product: ProductInterface):
        self._product = product
        self._observers = []

    def subscribe(self, observer: Observer):
        self._observers.append(observer)

    def unsubscribe(self, observer: Observer):
        self._observers.remove(observer)

    def notify(self):
        for observer in self._observers:
            observer.update(self.get_name())

    def set_stock(self, status: bool):
        previous_status = self._product.is_in_stock()
        self._product.set_stock(status)

        if not previous_status and status:  # If product is now in stock, notify observers
            self.notify()

    def is_in_stock(self) -> bool:
        return self._product.is_in_stock()

    def get_name(self) -> str:
        return self._product.get_name()

# Example usage
if __name__ == "__main__":
    # Create a base product
    base_product = Product("PlayStation 6")
    
    # Wrap the base product with a NotifiableProduct for notification support
    product_with_notify = NotifiableProduct(base_product)

    # Create users (observers)
    alice = User("Alice")
    bob = User("Bob")

    # Subscribe users to product notifications
    product_with_notify.subscribe(alice)
    product_with_notify.subscribe(bob)

    # Product comes in stock and notifies users
    product_with_notify.set_stock(True)

    # Unsubscribe Bob and change stock status
    product_with_notify.unsubscribe(bob)
    product_with_notify.set_stock(False)  # No notifications sent because no one is subscribed
    product_with_notify.set_stock(True)   # Only Alice gets notified
