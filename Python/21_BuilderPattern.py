# # Builder Pattern: Separates the construction of a complex object from its representation, allowing the 
# #                  same construction process to create different representations.


# # --- Product ---
# class Computer:
#     def __init__(self):
#         self.cpu = None
#         self.gpu = None
#         self.ram = None
#         self.storage = None

#     def __str__(self):
#         return (
#             f"Computer Specs:\n"
#             f"  CPU: {self.cpu}\n"
#             f"  GPU: {self.gpu}\n"
#             f"  RAM: {self.ram}\n"
#             f"  Storage: {self.storage}"
#         )

# # --- Builder Interface ---
# from abc import ABC, abstractmethod

# class ComputerBuilder(ABC):
#     def __init__(self):
#         self.computer = Computer()

#     @abstractmethod
#     def add_cpu(self): pass

#     @abstractmethod
#     def add_gpu(self): pass

#     @abstractmethod
#     def add_ram(self): pass

#     @abstractmethod
#     def add_storage(self): pass

#     def get_computer(self):
#         return self.computer

# # --- Concrete Builders ---
# class GamingPCBuilder(ComputerBuilder):
#     def add_cpu(self):
#         self.computer.cpu = "Intel Core i9"

#     def add_gpu(self):
#         self.computer.gpu = "NVIDIA RTX 4090"

#     def add_ram(self):
#         self.computer.ram = "32GB DDR5"

#     def add_storage(self):
#         self.computer.storage = "1TB NVMe SSD"

# class OfficePCBuilder(ComputerBuilder):
#     def add_cpu(self):
#         self.computer.cpu = "Intel Core i5"

#     def add_gpu(self):
#         self.computer.gpu = "Integrated Graphics"

#     def add_ram(self):
#         self.computer.ram = "16GB DDR4"

#     def add_storage(self):
#         self.computer.storage = "512GB SSD"

# # --- Director ---
# class ComputerDirector:
#     def __init__(self, builder: ComputerBuilder):
#         self.builder = builder

#     def build_computer(self):
#         self.builder.add_cpu()
#         self.builder.add_gpu()
#         self.builder.add_ram()
#         self.builder.add_storage()
#         return self.builder.get_computer()

# # --- Client Code ---
# if __name__ == "__main__":
#     print("🏎️ Building Gaming PC:")
#     gaming_builder = GamingPCBuilder()
#     director = ComputerDirector(gaming_builder)
#     gaming_pc = director.build_computer()
#     print(gaming_pc)

#     print("\n💼 Building Office PC:")
#     office_builder = OfficePCBuilder()
#     director = ComputerDirector(office_builder)
#     office_pc = director.build_computer()
#     print(office_pc)


from dataclasses import dataclass, field
from typing import Dict, Any, Optional


# ---------------- Product ----------------
@dataclass
class HttpRequest:
    """The complex object being built."""
    method: str
    url: str
    headers: Dict[str, str] = field(default_factory=dict)
    params: Dict[str, str] = field(default_factory=dict)
    body: Optional[Any] = None
    auth: Optional[tuple] = None
    timeout: int = 30

    def __str__(self):
        return (
            f"🌐 HTTP Request:\n"
            f"  Method: {self.method}\n"
            f"  URL: {self.url}\n"
            f"  Headers: {self.headers}\n"
            f"  Params: {self.params}\n"
            f"  Body: {self.body}\n"
            f"  Auth: {self.auth}\n"
            f"  Timeout: {self.timeout}s\n"
        )


# ---------------- Fluent Builder ----------------
class HttpRequestBuilder:
    """Modern Builder with Fluent Interface."""

    def __init__(self, method: str, url: str):
        self._method = method
        self._url = url
        self._headers = {}
        self._params = {}
        self._body = None
        self._auth = None
        self._timeout = 30

    def add_header(self, key: str, value: str):
        self._headers[key] = value
        return self

    def add_param(self, key: str, value: str):
        self._params[key] = value
        return self

    def set_body(self, body: Any):
        self._body = body
        return self

    def set_auth(self, username: str, password: str):
        self._auth = (username, password)
        return self

    def set_timeout(self, seconds: int):
        self._timeout = seconds
        return self

    def build(self) -> HttpRequest:
        """Finalize and return the built HttpRequest."""
        return HttpRequest(
            method=self._method,
            url=self._url,
            headers=self._headers,
            params=self._params,
            body=self._body,
            auth=self._auth,
            timeout=self._timeout,
        )


# ---------------- Client Code ----------------
if __name__ == "__main__":
    # Fluent builder usage (method chaining)
    request = (
        HttpRequestBuilder("POST", "https://api.example.com/users")
        .add_header("Content-Type", "application/json")
        .add_header("Authorization", "Bearer 12345")
        .add_param("verbose", "true")
        .set_body({"name": "Alice", "role": "Admin"})
        .set_auth("alice", "secure_password")
        .set_timeout(10)
        .build()
    )

    print(request)
