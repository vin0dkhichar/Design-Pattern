# Factory Method Pattern -> Deﬁnes an interface for creating an object, but lets subclasses decide 
#                           which class to instantiate. Factory Method lets a class defer instantiation
#                           to subclasses.


from abc import ABC, abstractmethod

# Product
class Document(ABC):
    @abstractmethod
    def render(self):
        pass

class PDFDocument(Document):
    def render(self):
        print("Rendering PDF document")

class WordDocument(Document):
    def render(self):
        print("Rendering Word document")

# Creator
class Application(ABC):
    @abstractmethod
    def create_document(self) -> Document:
        pass

    def render_document(self):
        doc = self.create_document()
        doc.render()

# Concrete Creators
class PDFApplication(Application):
    def create_document(self) -> Document:
        return PDFDocument()

class WordApplication(Application):
    def create_document(self) -> Document:
        return WordDocument()

# Client code
if __name__ == "__main__":
    app = PDFApplication()
    app.render_document()

    app = WordApplication()
    app.render_document()




from abc import ABC, abstractmethod

# -------------------------------
# Product
# -------------------------------
class PaymentProcessor(ABC):
    @abstractmethod
    def pay(self, amount: float):
        pass


class UPIPayment(PaymentProcessor):
    def pay(self, amount: float):
        print(f"[UPI] Paying ₹{amount}")


class CreditCardPayment(PaymentProcessor):
    def pay(self, amount: float):
        print(f"[Card] Paying ₹{amount}")


class WalletPayment(PaymentProcessor):
    def pay(self, amount: float):
        print(f"[Wallet] Paying ₹{amount}")


# -------------------------------
# Creator
# -------------------------------
class Checkout(ABC):
    @abstractmethod
    def create_payment_processor(self) -> PaymentProcessor:
        pass

    def complete_payment(self, amount: float):
        """
        Shared checkout flow.
        Factory Method is called here.
        """
        processor = self.create_payment_processor()
        processor.pay(amount)
        print("Payment successful\n")


# -------------------------------
# Concrete Creators
# -------------------------------
class UPICheckout(Checkout):
    def create_payment_processor(self) -> PaymentProcessor:
        return UPIPayment()


class CreditCardCheckout(Checkout):
    def create_payment_processor(self) -> PaymentProcessor:
        return CreditCardPayment()


class WalletCheckout(Checkout):
    def create_payment_processor(self) -> PaymentProcessor:
        return WalletPayment()


# -------------------------------
# Client Code
# -------------------------------
def get_checkout(method: str) -> Checkout:
    """
    Realistic entry point:
    could be user choice, API request, config, etc.
    """
    if method == "upi":
        return UPICheckout()
    if method == "card":
        return CreditCardCheckout()
    return WalletCheckout()


if __name__ == "__main__":
    checkout = get_checkout("upi")
    checkout.complete_payment(1500)

    checkout = get_checkout("card")
    checkout.complete_payment(3200)

    checkout = get_checkout("wallet")
    checkout.complete_payment(500)
