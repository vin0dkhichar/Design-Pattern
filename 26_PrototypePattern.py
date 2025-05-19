import copy

# Prototype Class with a clone method
class Prototype:
    def clone(self):
        raise NotImplementedError("You should implement the 'clone' method.")

# Concrete Prototype Class
class ConcretePrototype(Prototype):
    def __init__(self, name, value):
        self.name = name
        self.value = value

    def __str__(self):
        return f"Prototype [Name: {self.name}, Value: {self.value}]"

    # Implementing the clone method
    def clone(self):
        # Creating a deep copy of the object
        return copy.deepcopy(self)

# Client code demonstrating the Prototype Pattern
if __name__ == "__main__":
    # Create a prototype object
    original = ConcretePrototype("Original Prototype", 42)
    print("Original Prototype:", original)

    # Clone the prototype
    clone1 = original.clone()
    clone2 = original.clone()

    # Modify the cloned objects
    clone1.name = "Cloned Prototype 1"
    clone1.value = 100
    clone2.name = "Cloned Prototype 2"
    clone2.value = 200

    # Print the cloned objects
    print("\nCloned Prototypes:")
    print(clone1)
    print(clone2)

    # Original remains unchanged
    print("\nOriginal Prototype after cloning:")
    print(original)
