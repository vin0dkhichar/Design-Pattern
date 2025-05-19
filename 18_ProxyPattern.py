# Proxy Pattern: provide a substitute or placeholder for another object to control access to the 
#                original object.

from abc import ABC, abstractmethod

# Subject interface
class BankAccount(ABC):
    @abstractmethod
    def view_balance(self):
        pass

    @abstractmethod
    def withdraw(self, amount):
        pass

# Real Subject
class RealBankAccount(BankAccount):
    def __init__(self, owner, balance):
        self.owner = owner
        self._balance = balance

    def view_balance(self):
        print(f"{self.owner}'s current balance is ${self._balance}")

    def withdraw(self, amount):
        if amount <= self._balance:
            self._balance -= amount
            print(f"${amount} withdrawn. New balance: ${self._balance}")
        else:
            print("Insufficient funds.")

# Protection Proxy
class BankAccountProxy(BankAccount):
    def __init__(self, real_account, current_user):
        self._real_account = real_account
        self._current_user = current_user

    def _is_authorized(self):
        return self._current_user == self._real_account.owner

    def view_balance(self):
        if self._is_authorized():
            self._real_account.view_balance()
        else:
            print("Access denied: unauthorized user.")

    def withdraw(self, amount):
        if self._is_authorized():
            self._real_account.withdraw(amount)
        else:
            print("Access denied: unauthorized user.")

# Client code
if __name__ == "__main__":
    account = RealBankAccount("Alice", 1000)

    print("Logged in as Alice:")
    alice_proxy = BankAccountProxy(account, "Alice")
    alice_proxy.view_balance()
    alice_proxy.withdraw(300)

    print("\nLogged in as Bob:")
    bob_proxy = BankAccountProxy(account, "Bob")
    bob_proxy.view_balance()
    bob_proxy.withdraw(200)
