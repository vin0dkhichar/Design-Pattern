# # Decorator Pattern -> Attaches additional responsibilities to an object dynamically.
# #                      Decorators provide a ﬂexible alternative to subclassing for 
# #                      extending functionality.


# from abc import ABC, abstractmethod

# # Base Beverage class
# class Beverage(ABC):
#     def __init__(self):
#         self._description = "Unknown Beverage"

#     def get_description(self):
#         return self._description

#     @abstractmethod
#     def cost(self):
#         pass

# # Condiment Decorator abstract class
# class CondimentDecorator(Beverage):
#     @abstractmethod
#     def get_description(self):
#         pass

# # Concrete Beverage: Espresso
# class Espresso(Beverage):
#     def __init__(self):
#         self._description = "Espresso"

#     def cost(self):
#         return 1.99

# # Concrete Beverage: HouseBlend
# class HouseBlend(Beverage):
#     def __init__(self):
#         self._description = "House Blend Coffee"

#     def cost(self):
#         return 0.89

# # Concrete Beverage: DarkRoast
# class DarkRoast(Beverage):
#     def __init__(self):
#         self._description = "Dark Roast Coffee"

#     def cost(self):
#         return 0.99

# # Concrete Condiment: Mocha
# class Mocha(CondimentDecorator):
#     def __init__(self, beverage):
#         self.beverage = beverage

#     def get_description(self):
#         return self.beverage.get_description() + ", Mocha"

#     def cost(self):
#         return 0.20 + self.beverage.cost()

# # Concrete Condiment: Whip
# class Whip(CondimentDecorator):
#     def __init__(self, beverage):
#         self.beverage = beverage

#     def get_description(self):
#         return self.beverage.get_description() + ", Whip"

#     def cost(self):
#         return 0.10 + self.beverage.cost()

# # Concrete Condiment: Soy
# class Soy(CondimentDecorator):
#     def __init__(self, beverage):
#         self.beverage = beverage

#     def get_description(self):
#         return self.beverage.get_description() + ", Soy"

#     def cost(self):
#         return 0.15 + self.beverage.cost()

# # Main function to demonstrate
# if __name__ == "__main__":
#     beverage = Espresso()
#     print(f"{beverage.get_description()} ${beverage.cost():.2f}")

#     beverage2 = DarkRoast()
#     beverage2 = Mocha(beverage2)
#     beverage2 = Mocha(beverage2)
#     beverage2 = Whip(beverage2)
#     print(f"{beverage2.get_description()} ${beverage2.cost():.2f}")

#     beverage3 = HouseBlend()
#     beverage3 = Soy(beverage3)
#     beverage3 = Mocha(beverage3)
#     beverage3 = Whip(beverage3)
#     print(f"{beverage3.get_description()} ${beverage3.cost():.2f}")



from abc import ABC, abstractmethod
import time
import hashlib


# === Component Interface ===
class Handler(ABC):
    @abstractmethod
    def handle(self, request: dict) -> dict:
        pass


# === Concrete Component ===
class BaseHandler(Handler):
    def handle(self, request: dict) -> dict:
        # Simulate actual business logic
        user = request.get("user", "Guest")
        return {"status": 200, "message": f"Welcome, {user}!"}


# === Base Decorator ===
class HandlerDecorator(Handler):
    def __init__(self, handler: Handler):
        self._handler = handler

    def handle(self, request: dict) -> dict:
        return self._handler.handle(request)


# === Concrete Decorators ===
class LoggingDecorator(HandlerDecorator):
    def handle(self, request: dict) -> dict:
        print(f"[LOG] Request started: {request}")
        start = time.time()

        response = super().handle(request)

        end = time.time()
        print(f"[LOG] Response: {response} | Time: {(end - start)*1000:.2f}ms")
        return response


class AuthDecorator(HandlerDecorator):
    def handle(self, request: dict) -> dict:
        token = request.get("token")
        if not token or token != "SECRET123":
            print("[AUTH] Unauthorized access attempt!")
            return {"status": 401, "message": "Unauthorized"}
        print("[AUTH] User authenticated successfully.")
        return super().handle(request)


class CacheDecorator(HandlerDecorator):
    _cache = {}

    def handle(self, request: dict) -> dict:
        key = hashlib.md5(str(request).encode()).hexdigest()
        if key in self._cache:
            print("[CACHE] Returning cached response.")
            return self._cache[key]

        response = super().handle(request)
        self._cache[key] = response
        print("[CACHE] Response cached.")
        return response




# === Example Usage ===
if __name__ == "__main__":
    # Base handler (core logic)
    handler = BaseHandler()

    # Wrap with decorators dynamically
    decorated_handler =  CacheDecorator(
            LoggingDecorator(
                AuthDecorator(handler)
            )
        )

    # Simulated requests
    request_valid = {"user": "Alice", "token": "SECRET123"}
    request_invalid = {"user": "Bob"}  # missing token

    print("\n---- Request 1 ----")
    print(decorated_handler.handle(request_valid))

    print("\n---- Request 2 (cached) ----")
    print(decorated_handler.handle(request_valid))

    print("\n---- Request 3 (unauthorized) ----")
    print(decorated_handler.handle(request_invalid))
