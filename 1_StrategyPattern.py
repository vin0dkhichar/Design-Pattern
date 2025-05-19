# Strategy Pattern -> Defines a family of algorithms, encapsulates each one,
#                     and make them interchangeable. Strategy lets the algorithm
#                     vary independently from clients that use it.

from abc import ABC, abstractmethod

# Strategy Interface
class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amount: float):
        pass

# Concrete Strategy 1
class CreditCardPayment(PaymentStrategy):
    def __init__(self, card_number, cvv, expiry_date):
        self.card_number = card_number
        self.cvv = cvv
        self.expiry_date = expiry_date

    def pay(self, amount: float):
        print(f"Paid ${amount:.2f} using Credit Card ending in {self.card_number[-4:]}.")

# Concrete Strategy 2
class PayPalPayment(PaymentStrategy):
    def __init__(self, email):
        self.email = email

    def pay(self, amount: float):
        print(f"Paid ${amount:.2f} using PayPal account: {self.email}.")

# Concrete Strategy 3
class BitcoinPayment(PaymentStrategy):
    def __init__(self, wallet_address):
        self.wallet_address = wallet_address

    def pay(self, amount: float):
        print(f"Paid ${amount:.2f} using Bitcoin wallet: {self.wallet_address[:6]}...")

# Context
class PaymentProcessor:
    def __init__(self, strategy: PaymentStrategy):
        self.strategy = strategy

    def set_strategy(self, strategy: PaymentStrategy):
        self.strategy = strategy

    def checkout(self, amount: float):
        self.strategy.pay(amount)

# Example usage
if __name__ == "__main__":
    amount = 49.99

    # Pay with Credit Card
    credit_card = CreditCardPayment("1234567890123456", "123", "12/25")
    processor = PaymentProcessor(credit_card)
    processor.checkout(amount)

    # Switch to PayPal
    paypal = PayPalPayment("user@example.com")
    processor.set_strategy(paypal)
    processor.checkout(amount)

    # Switch to Bitcoin
    bitcoin = BitcoinPayment("1FfmbHfnpaZjKFvyi1okTjJJusN455paPH")
    processor.set_strategy(bitcoin)
    processor.checkout(amount)
