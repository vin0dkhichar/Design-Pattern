# Flyweight Pattern: Shares instances of objects to support large numbers of fine-grained objects 
#                    efficiently.


from typing import Dict

# Flyweight
class TreeType:
    def __init__(self, name, color, texture):
        self.name = name        # Intrinsic state
        self.color = color
        self.texture = texture

    def draw(self, x, y):       # Extrinsic state
        print(f"Drawing {self.name} tree at ({x},{y}) with color {self.color} and texture {self.texture}")

# Flyweight Factory
class TreeFactory:
    _tree_types: Dict[str, TreeType] = {}

    @classmethod
    def get_tree_type(cls, name, color, texture):
        key = (name, color, texture)
        if key not in cls._tree_types:
            cls._tree_types[key] = TreeType(name, color, texture)
            print(f"Creating new TreeType: {key}")
        return cls._tree_types[key]

# Context
class Tree:
    def __init__(self, x, y, tree_type: TreeType):
        self.x = x  # Extrinsic
        self.y = y
        self.type = tree_type

    def draw(self):
        self.type.draw(self.x, self.y)

# Client
class Forest:
    def __init__(self):
        self.trees = []

    def plant_tree(self, x, y, name, color, texture):
        tree_type = TreeFactory.get_tree_type(name, color, texture)
        tree = Tree(x, y, tree_type)
        self.trees.append(tree)

    def draw(self):
        for tree in self.trees:
            tree.draw()

# Test
if __name__ == "__main__":
    forest = Forest()
    forest.plant_tree(10, 20, "Oak", "Green", "Rough")
    forest.plant_tree(15, 25, "Oak", "Green", "Rough")  # Same type — reused
    forest.plant_tree(20, 30, "Pine", "Dark Green", "Smooth")
    forest.draw()
