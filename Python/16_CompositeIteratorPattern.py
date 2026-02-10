# Composite Pattern: Composes objects into tree structures to represent part-whole hierarchies, making
#                    it easier to work with individual objects and compositions.

from abc import ABC, abstractmethod
from collections.abc import Iterator

# Component
class FileSystemComponent(ABC):
    def __init__(self, name):
        self.name = name

    @abstractmethod
    def display(self, indent=0):
        pass

    @abstractmethod
    def __iter__(self):
        pass

# Leaf
class File(FileSystemComponent):
    def display(self, indent=0):
        print(" " * indent + f"File: {self.name}")

    def __iter__(self):
        # Iterator that yields itself once
        yield self

# Composite
class Folder(FileSystemComponent):
    def __init__(self, name):
        super().__init__(name)
        self.children = []

    def add(self, component: FileSystemComponent):
        self.children.append(component)

    def remove(self, component: FileSystemComponent):
        self.children.remove(component)

    def display(self, indent=0):
        print(" " * indent + f"Folder: {self.name}")
        for child in self.children:
            child.display(indent + 4)

    def __iter__(self):
        # Yield itself first
        yield self
        # Then yield all descendants recursively
        for child in self.children:
            yield from child  # recursively yield from child's iterator

# Client code
if __name__ == "__main__":
    file1 = File("file1.txt")
    file2 = File("file2.txt")
    file3 = File("file3.txt")

    folder1 = Folder("Documents")
    folder1.add(file1)
    folder1.add(file2)

    folder2 = Folder("Photos")
    folder2.add(file3)

    root = Folder("Root")
    root.add(folder1)
    root.add(folder2)
    root.add(File("readme.md"))

    print("Display structure:")
    root.display()

    print("\nIterate over all components:")
    for component in root:
        if isinstance(component, Folder):
            print(f"Folder: {component.name}")
        else:
            print(f"File: {component.name}")
