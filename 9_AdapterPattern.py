# Your application uses a unified PaymentProcessor interface, but different third-party gateways 
# (e.g., Stripe, PayPal) each have different APIs.

# You want to adapt each external API to your app’s expected interface — this is where the Adapter 
# Pattern shines.


# Target interface
class PaymentProcessor:
    def pay(self, amount: float):
        pass

# Adaptees: 3rd-party APIs with different interfaces
class StripeAPI:
    def charge_card(self, amount):
        print(f"💳 Charged ${amount} using Stripe")

class PayPalAPI:
    def make_payment(self, value):
        print(f"💰 Paid ${value} using PayPal")

# Adapters: adapt 3rd-party APIs to PaymentProcessor interface
class StripeAdapter(PaymentProcessor):
    def __init__(self, stripe_api: StripeAPI):
        self.stripe = stripe_api

    def pay(self, amount: float):
        self.stripe.charge_card(amount)

class PayPalAdapter(PaymentProcessor):
    def __init__(self, paypal_api: PayPalAPI):
        self.paypal = paypal_api

    def pay(self, amount: float):
        self.paypal.make_payment(amount)

# Client code using the target interface
def checkout(payment_processor: PaymentProcessor, amount: float):
    print("Processing payment...")
    payment_processor.pay(amount)
    print("✅ Payment complete.\n")

# Example usage
if __name__ == "__main__":
    stripe_adapter = StripeAdapter(StripeAPI())
    paypal_adapter = PayPalAdapter(PayPalAPI())

    checkout(stripe_adapter, 50.0)
    checkout(paypal_adapter, 75.5)
