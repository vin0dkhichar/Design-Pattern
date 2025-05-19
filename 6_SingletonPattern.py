# Singleton Pattern -> Ensures a class has only one instance, and provides a global point
#                      of access to it.


class Singleton:
    _unique_instance = None

    def __new__(cls):
        if cls._unique_instance is None:
            cls._unique_instance = super().__new__(cls)
        return cls._unique_instance


if __name__ == "__main__":
    s1 = Singleton()
    s2 = Singleton()

    print("Are both instances the same?", s1 is s2)  # True
