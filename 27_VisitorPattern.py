from abc import ABC, abstractmethod

# Visitor Interface 
class Visitor(ABC):
    @abstractmethod
    def visit_salaried(self, salaried_employee):
        pass

    @abstractmethod
    def visit_hourly(self, hourly_employee):
        pass

    @abstractmethod
    def visit_contract(self, contract_employee):
        pass

# Element Interface
class Employee(ABC):
    @abstractmethod
    def accept(self, visitor: Visitor):
        pass

# Concrete Element - SalariedEmployee
class SalariedEmployee(Employee):
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def accept(self, visitor: Visitor):
        visitor.visit_salaried(self)

# Concrete Element - HourlyEmployee
class HourlyEmployee(Employee):
    def __init__(self, name, hourly_rate, hours_worked):
        self.name = name
        self.hourly_rate = hourly_rate
        self.hours_worked = hours_worked

    def accept(self, visitor: Visitor):
        visitor.visit_hourly(self)

# Concrete Element - ContractEmployee
class ContractEmployee(Employee):
    def __init__(self, name, hourly_rate, contract_duration):
        self.name = name
        self.hourly_rate = hourly_rate
        self.contract_duration = contract_duration

    def accept(self, visitor: Visitor):
        visitor.visit_contract(self)

# Concrete Visitor - TaxVisitor
class TaxVisitor(Visitor):
    def visit_salaried(self, salaried_employee):
        tax = salaried_employee.salary * 0.25  # 25% tax for salaried
        print(f"Salaried employee {salaried_employee.name} tax: {tax}")

    def visit_hourly(self, hourly_employee):
        tax = hourly_employee.hourly_rate * hourly_employee.hours_worked * 0.15  # 15% tax for hourly
        print(f"Hourly employee {hourly_employee.name} tax: {tax}")

    def visit_contract(self, contract_employee):
        tax = contract_employee.hourly_rate * 40 * 0.10  # 10% tax for contract employees assuming 40 hours per week
        print(f"Contract employee {contract_employee.name} tax: {tax}")

# Client Code
if __name__ == "__main__":
    # Create employee objects
    employees = [
        SalariedEmployee("Alice", 60000),
        HourlyEmployee("Bob", 25, 160),
        ContractEmployee("Charlie", 50, 6)
    ]

    # Create visitor (Tax calculation)
    tax_visitor = TaxVisitor()

    # Visit each employee and calculate tax
    for employee in employees:
        employee.accept(tax_visitor)
