# Builder Pattern: Separates the construction of a complex object from its representation, allowing the 
#                  same construction process to create different representations.


# --- Product ---
class Computer:
    def __init__(self):
        self.cpu = None
        self.gpu = None
        self.ram = None
        self.storage = None

    def __str__(self):
        return (
            f"Computer Specs:\n"
            f"  CPU: {self.cpu}\n"
            f"  GPU: {self.gpu}\n"
            f"  RAM: {self.ram}\n"
            f"  Storage: {self.storage}"
        )

# --- Builder Interface ---
from abc import ABC, abstractmethod

class ComputerBuilder(ABC):
    def __init__(self):
        self.computer = Computer()

    @abstractmethod
    def add_cpu(self): pass

    @abstractmethod
    def add_gpu(self): pass

    @abstractmethod
    def add_ram(self): pass

    @abstractmethod
    def add_storage(self): pass

    def get_computer(self):
        return self.computer

# --- Concrete Builders ---
class GamingPCBuilder(ComputerBuilder):
    def add_cpu(self):
        self.computer.cpu = "Intel Core i9"

    def add_gpu(self):
        self.computer.gpu = "NVIDIA RTX 4090"

    def add_ram(self):
        self.computer.ram = "32GB DDR5"

    def add_storage(self):
        self.computer.storage = "1TB NVMe SSD"

class OfficePCBuilder(ComputerBuilder):
    def add_cpu(self):
        self.computer.cpu = "Intel Core i5"

    def add_gpu(self):
        self.computer.gpu = "Integrated Graphics"

    def add_ram(self):
        self.computer.ram = "16GB DDR4"

    def add_storage(self):
        self.computer.storage = "512GB SSD"

# --- Director ---
class ComputerDirector:
    def __init__(self, builder: ComputerBuilder):
        self.builder = builder

    def build_computer(self):
        self.builder.add_cpu()
        self.builder.add_gpu()
        self.builder.add_ram()
        self.builder.add_storage()
        return self.builder.get_computer()

# --- Client Code ---
if __name__ == "__main__":
    print("🏎️ Building Gaming PC:")
    gaming_builder = GamingPCBuilder()
    director = ComputerDirector(gaming_builder)
    gaming_pc = director.build_computer()
    print(gaming_pc)

    print("\n💼 Building Office PC:")
    office_builder = OfficePCBuilder()
    director = ComputerDirector(office_builder)
    office_pc = director.build_computer()
    print(office_pc)
