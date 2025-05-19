# You want to export data into different formats (CSV, JSON), but the steps to export are mostly 
# the same:

# Template Method Pattern: Defines the structure of an algorithm in a superclass but lets subclasses 
#                          override specific steps of the algorithm.

from abc import ABC, abstractmethod

class DataExporter(ABC):
    def export(self, data):
        self.open_file()
        self.write_data(data)
        self.close_file()

    def open_file(self):
        print("Opening file")

    @abstractmethod
    def write_data(self, data):
        pass

    def close_file(self):
        print("Closing file")

class CSVExporter(DataExporter):
    def write_data(self, data):
        print("Writing data as CSV:")
        for row in data:
            print(",".join(str(x) for x in row))

class JSONExporter(DataExporter):
    def write_data(self, data):
        import json
        print("Writing data as JSON:")
        print(json.dumps(data))

# Client code
if __name__ == "__main__":
    data = [
        ["name", "age"],
        ["Alice", 30],
        ["Bob", 25]
    ]

    print("CSV Export:")
    exporter = CSVExporter()
    exporter.export(data)

    print("\nJSON Export:")
    exporter = JSONExporter()
    exporter.export(data)
