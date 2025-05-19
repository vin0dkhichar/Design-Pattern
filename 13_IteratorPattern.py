# Iterator Pattern: Provides a way to access elements of a collection without exposing its underlying 
#                   representation.

from collections.abc import Iterator, Iterable
import random

class Song:
    def __init__(self, title, artist):
        self.title = title
        self.artist = artist

    def __str__(self):
        return f"{self.title} by {self.artist}"

class PlaylistIterator(Iterator):
    def __init__(self, playlist):
        self._playlist = playlist
        self._index = 0
        self._order = list(range(len(self._playlist.songs)))  # normal order

    def set_shuffle(self):
        random.shuffle(self._order)
        self._index = 0

    def __next__(self):
        if self._index >= len(self._order):
            raise StopIteration
        song_index = self._order[self._index]
        self._index += 1
        return self._playlist.songs[song_index]

class Playlist(Iterable):
    def __init__(self):
        self.songs = []

    def add_song(self, song):
        self.songs.append(song)

    def __iter__(self):
        return PlaylistIterator(self)

# Client code
if __name__ == "__main__":
    playlist = Playlist()
    playlist.add_song(Song("Bohemian Rhapsody", "Queen"))
    playlist.add_song(Song("Imagine", "John Lennon"))
    playlist.add_song(Song("Billie Jean", "Michael Jackson"))

    iterator = iter(playlist)
    print("Playing songs in order:")
    for song in iterator:
        print(song)

    # Shuffle and play again
    iterator = iter(playlist)
    iterator.set_shuffle()
    print("\nPlaying songs shuffled:")
    for song in iterator:
        print(song)
