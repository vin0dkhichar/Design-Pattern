# Factory Method Pattern -> Deﬁnes an interface for creating an object, but lets subclasses decide 
#                           which class to instantiate. Factory Method lets a class defer instantiation
#                           to subclasses.


from abc import ABC, abstractmethod

# Product
class Document(ABC):
    @abstractmethod
    def render(self):
        pass

class PDFDocument(Document):
    def render(self):
        print("Rendering PDF document")

class WordDocument(Document):
    def render(self):
        print("Rendering Word document")

# Creator
class Application(ABC):
    @abstractmethod
    def create_document(self) -> Document:
        pass

    def render_document(self):
        doc = self.create_document()
        doc.render()

# Concrete Creators
class PDFApplication(Application):
    def create_document(self) -> Document:
        return PDFDocument()

class WordApplication(Application):
    def create_document(self) -> Document:
        return WordDocument()

# Client code
if __name__ == "__main__":
    app = PDFApplication()
    app.render_document()

    app = WordApplication()
    app.render_document()
