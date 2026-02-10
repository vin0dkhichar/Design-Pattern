# Chain of Responsibility Pattern: Creates a chain of objects that can handle requests, avoiding 
#                                  coupling the sender with its receivers.


from abc import ABC, abstractmethod

# Handler Interface
class Handler(ABC):
    def __init__(self):
        self.next_handler = None

    def set_next(self, handler):
        self.next_handler = handler
        return handler  # allows chaining

    @abstractmethod
    def handle(self, request):
        pass

# Concrete Handlers
class LowLevelSupport(Handler):
    def handle(self, request):
        if request == "password reset":
            return "LowLevelSupport: Handling password reset."
        elif self.next_handler:
            return self.next_handler.handle(request)
        return "LowLevelSupport: Request unhandled."

class MidLevelSupport(Handler):
    def handle(self, request):
        if request == "software bug":
            return "MidLevelSupport: Handling software bug."
        elif self.next_handler:
            return self.next_handler.handle(request)
        return "MidLevelSupport: Request unhandled."

class HighLevelSupport(Handler):
    def handle(self, request):
        if request == "system crash":
            return "HighLevelSupport: Handling system crash."
        elif self.next_handler:
            return self.next_handler.handle(request)
        return "HighLevelSupport: Request unhandled."


# Client Code
if __name__ == "__main__":
    # Set up the chain
    low = LowLevelSupport()
    mid = MidLevelSupport()
    high = HighLevelSupport()

    low.set_next(mid).set_next(high)

    # Test different requests
    requests = ["password reset", "software bug", "system crash", "unknown issue"]
    for req in requests:
        print(f"Request: {req}")
        print("Result:", low.handle(req))
        print("-" * 40)
