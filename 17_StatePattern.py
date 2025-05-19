# State Pattern: Allows an object to change its behavior when its internal state changes, enabling 
#                cleaner, more maintainable conditional logic.

from abc import ABC, abstractmethod

# State interface
class State(ABC):
    def __init__(self, player):
        self.player = player

    @abstractmethod
    def press_play(self):
        pass

    @abstractmethod
    def press_pause(self):
        pass

    @abstractmethod
    def press_stop(self):
        pass

# Concrete States
class PlayingState(State):
    def press_play(self):
        print("Already playing.")

    def press_pause(self):
        print("Pausing playback.")
        self.player.state = self.player.paused_state

    def press_stop(self):
        print("Stopping playback.")
        self.player.state = self.player.stopped_state

class PausedState(State):
    def press_play(self):
        print("Resuming playback.")
        self.player.state = self.player.playing_state

    def press_pause(self):
        print("Already paused.")

    def press_stop(self):
        print("Stopping playback from paused state.")
        self.player.state = self.player.stopped_state

class StoppedState(State):
    def press_play(self):
        print("Starting playback.")
        self.player.state = self.player.playing_state

    def press_pause(self):
        print("Can't pause. Player is stopped.")

    def press_stop(self):
        print("Already stopped.")

# Context
class MusicPlayer:
    def __init__(self):
        self.playing_state = PlayingState(self)
        self.paused_state = PausedState(self)
        self.stopped_state = StoppedState(self)

        self.state = self.stopped_state

    def press_play(self):
        self.state.press_play()

    def press_pause(self):
        self.state.press_pause()

    def press_stop(self):
        self.state.press_stop()

# Client code
if __name__ == "__main__":
    player = MusicPlayer()

    player.press_play()   # Starting playback.
    player.press_pause()  # Pausing playback.
    player.press_play()   # Resuming playback.
    player.press_stop()   # Stopping playback.
    player.press_pause()  # Can't pause. Player is stopped.

























# State Pattern: Allows an object to change its behavior when its internal state changes, enabling 
#                cleaner, more maintainable conditional logic.


from abc import ABC, abstractmethod

class TCPState(ABC):
    def __init__(self, connection):
        self.connection = connection

    @abstractmethod
    def open(self):
        pass

    @abstractmethod
    def close(self):
        pass

    @abstractmethod
    def acknowledge(self):
        pass

class ClosedState(TCPState):
    def open(self):
        print("Opening connection: moving to Listen state")
        self.connection.state = self.connection.listen_state

    def close(self):
        print("Already closed")

    def acknowledge(self):
        print("No connection to acknowledge")

class ListenState(TCPState):
    def open(self):
        print("Already listening")

    def close(self):
        print("Closing connection: moving to Closed state")
        self.connection.state = self.connection.closed_state

    def acknowledge(self):
        print("Connection established: moving to Established state")
        self.connection.state = self.connection.established_state

class EstablishedState(TCPState):
    def open(self):
        print("Connection already established")

    def close(self):
        print("Closing connection: moving to Closed state")
        self.connection.state = self.connection.closed_state

    def acknowledge(self):
        print("Acknowledged connection in Established state")

class TCPConnection:
    def __init__(self):
        self.closed_state = ClosedState(self)
        self.listen_state = ListenState(self)
        self.established_state = EstablishedState(self)

        self.state = self.closed_state

    def open(self):
        self.state.open()

    def close(self):
        self.state.close()

    def acknowledge(self):
        self.state.acknowledge()

# Client code
if __name__ == "__main__":
    connection = TCPConnection()

    connection.open()         # Closed -> Listen
    connection.acknowledge()  # Listen -> Established
    connection.acknowledge()  # Established
    connection.close()        # Established -> Closed
    connection.close()        # Already closed
