# # A real-life example of the Composite Pattern inspired by a file system, where both files and 
# # folders can be treated uniformly.

# # Composite Pattern: Composes objects into tree structures to represent part-whole hierarchies, making
# #                    it easier to work with individual objects and compositions.


# from abc import ABC, abstractmethod

# # Component
# class FileSystemComponent(ABC):
#     def __init__(self, name):
#         self.name = name

#     @abstractmethod
#     def display(self, indent=0):
#         pass

# # Leaf
# class File(FileSystemComponent):
#     def display(self, indent=0):
#         print(" " * indent + f"File: {self.name}")

# # Composite
# class Folder(FileSystemComponent):
#     def __init__(self, name):
#         super().__init__(name)
#         self.children = []

#     def add(self, component: FileSystemComponent):
#         self.children.append(component)

#     def remove(self, component: FileSystemComponent):
#         self.children.remove(component)

#     def display(self, indent=0):
#         print(" " * indent + f"Folder: {self.name}")
#         for child in self.children:
#             child.display(indent + 4)

# # Client code
# if __name__ == "__main__":
#     file1 = File("file1.txt")
#     file2 = File("file2.txt")
#     file3 = File("file3.txt")

#     folder1 = Folder("Documents")
#     folder1.add(file1)
#     folder1.add(file2)

#     folder2 = Folder("Photos")
#     folder2.add(file3)

#     root = Folder("Root")
#     root.add(folder1)
#     root.add(folder2)
#     root.add(File("readme.md"))

#     root.display()




# 15_CompositePattern.py

from abc import ABC, abstractmethod

# --- Component Interface ---
class Employee(ABC):
    @abstractmethod
    def show_details(self, indent=0):
        pass

    @abstractmethod
    def get_total_salary(self):
        pass


# --- Leaf Class (Individual Employee) ---
class Developer(Employee):
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def show_details(self, indent=0):
        print(" " * indent + f"👨‍💻 Developer: {self.name}, Salary: ${self.salary}")

    def get_total_salary(self):
        return self.salary


class Designer(Employee):
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def show_details(self, indent=0):
        print(" " * indent + f"🎨 Designer: {self.name}, Salary: ${self.salary}")

    def get_total_salary(self):
        return self.salary


# --- Composite Class (Manager with subordinates) ---
class Manager(Employee):
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        self.subordinates = []

    def add_employee(self, employee):
        self.subordinates.append(employee)

    def remove_employee(self, employee):
        self.subordinates.remove(employee)

    def show_details(self, indent=0):
        print(" " * indent + f"👔 Manager: {self.name}, Salary: ${self.salary}")
        for emp in self.subordinates:
            emp.show_details(indent + 4)

    def get_total_salary(self):
        total = self.salary
        for emp in self.subordinates:
            total += emp.get_total_salary()
        return total


# --- Client Code ---
if __name__ == "__main__":
    # Leaf employees
    dev1 = Developer("Alice", 90000)
    dev2 = Developer("Bob", 85000)
    des1 = Designer("Eve", 70000)

    # Mid-level manager
    mgr1 = Manager("Charlie", 120000)
    mgr1.add_employee(dev1)
    mgr1.add_employee(dev2)
    mgr1.add_employee(des1)

    # Senior manager
    ceo = Manager("Grace", 200000)
    ceo.add_employee(mgr1)
    ceo.add_employee(Designer("Zoe", 95000))

    # Display hierarchy
    print("\n🏢 Company Structure:\n")
    ceo.show_details()

    print("\n💰 Total Company Salary Expense:", ceo.get_total_salary())
