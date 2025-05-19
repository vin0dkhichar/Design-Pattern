# A real-life example of the Composite Pattern inspired by a file system, where both files and 
# folders can be treated uniformly.

# Composite Pattern: Composes objects into tree structures to represent part-whole hierarchies, making
#                    it easier to work with individual objects and compositions.


from abc import ABC, abstractmethod

# Component
class FileSystemComponent(ABC):
    def __init__(self, name):
        self.name = name

    @abstractmethod
    def display(self, indent=0):
        pass

# Leaf
class File(FileSystemComponent):
    def display(self, indent=0):
        print(" " * indent + f"File: {self.name}")

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

    root.display()
