# Expression
from abc import ABC, abstractmethod

class Expression(ABC):
    @abstractmethod
    def interpret(self, context):
        pass

# Terminal Expression: Literal (like numbers)
class NumberExpression(Expression):
    def __init__(self, value):
        self.value = value

    def interpret(self, context):
        return self.value

# Non-terminal Expression: Operation (like addition or multiplication)
class AddExpression(Expression):
    def __init__(self, left, right):
        self.left = left
        self.right = right

    def interpret(self, context):
        return self.left.interpret(context) + self.right.interpret(context)

class MultiplyExpression(Expression):
    def __init__(self, left, right):
        self.left = left
        self.right = right

    def interpret(self, context):
        return self.left.interpret(context) * self.right.interpret(context)

# Context (optional in this case, could be used for more complex languages)
class Context:
    pass

# Client: Interpreting a mathematical expression
if __name__ == "__main__":
    # (5 + 3) * 2
    five = NumberExpression(5)
    three = NumberExpression(3)
    two = NumberExpression(2)
    
    addition = AddExpression(five, three)
    multiplication = MultiplyExpression(addition, two)

    # Interpreting the expression
    context = Context()  # Can be used to pass additional data, but not necessary in this case
    result = multiplication.interpret(context)
    print(f"Result of expression: {result}")  # Output: Result of expression: 16
