# A hook is an optional method in the base class that subclasses may override to customize or 
# extend behavior without changing the overall algorithm.

# Template Method Pattern: Defines the structure of an algorithm in a superclass but lets subclasses 
#                          override specific steps of the algorithm.

from abc import ABC, abstractmethod

class DataExporter(ABC):
    def export(self, data):
        self.open_file()
        self.write_data(data)
        self.compress()       # <-- Hook: optional step
        self.close_file()

    def open_file(self):
        print("Opening file")

    @abstractmethod
    def write_data(self, data):
        pass

    def compress(self):
        # Default hook: do nothing
        pass

    def close_file(self):
        print("Closing file")

class CSVExporter(DataExporter):
    def write_data(self, data):
        print("Writing data as CSV:")
        for row in data:
            print(",".join(str(x) for x in row))

    def compress(self):
        print("Compressing CSV file...")

class JSONExporter(DataExporter):
    def write_data(self, data):
        import json
        print("Writing data as JSON:")
        print(json.dumps(data))

    # No compress override — uses default (does nothing)

# Client code
if __name__ == "__main__":
    data = [
        ["name", "age"],
        ["Alice", 30],
        ["Bob", 25]
    ]

    print("CSV Export with compression:")
    exporter = CSVExporter()
    exporter.export(data)

    print("\nJSON Export without compression:")
    exporter = JSONExporter()
    exporter.export(data)
