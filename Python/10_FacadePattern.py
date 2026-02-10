# Facade Pattern: Provides a simplified interface to a complex subsystem, making it easier to use and 
#                 understand.


class Amplifier:
    def on(self):
        print("Amplifier on")

    def set_dvd(self, dvd):
        print(f"Amplifier setting DVD to {dvd}")

    def set_surround_sound(self):
        print("Amplifier surround sound on")

    def set_volume(self, volume):
        print(f"Amplifier volume set to {volume}")

    def off(self):
        print("Amplifier off")


class Tuner:
    def on(self):
        print("Tuner on")

    def off(self):
        print("Tuner off")


class DvdPlayer:
    def on(self):
        print("DVD Player on")

    def play(self, movie):
        print(f'DVD Player playing "{movie}"')

    def stop(self):
        print("DVD Player stopped")

    def eject(self):
        print("DVD Player eject")

    def off(self):
        print("DVD Player off")


class CdPlayer:
    def on(self):
        print("CD Player on")

    def off(self):
        print("CD Player off")


class Projector:
    def on(self):
        print("Projector on")

    def wide_screen_mode(self):
        print("Projector in widescreen mode")

    def off(self):
        print("Projector off")


class TheaterLights:
    def dim(self, level):
        print(f"Theater lights dimming to {level}%")

    def on(self):
        print("Theater lights on")


class Screen:
    def down(self):
        print("Screen going down")

    def up(self):
        print("Screen going up")


class PopcornPopper:
    def on(self):
        print("Popcorn Popper on")

    def pop(self):
        print("Popcorn Popper popping popcorn!")

    def off(self):
        print("Popcorn Popper off")


# Facade
class HomeTheaterFacade:
    def __init__(self, amp, tuner, dvd, cd, projector, screen, lights, popper):
        self.amp = amp
        self.tuner = tuner
        self.dvd = dvd
        self.cd = cd
        self.projector = projector
        self.screen = screen
        self.lights = lights
        self.popper = popper

    def watch_movie(self, movie):
        print("Get ready to watch a movie...")
        self.popper.on()
        self.popper.pop()
        self.lights.dim(10)
        self.screen.down()
        self.projector.on()
        self.projector.wide_screen_mode()
        self.amp.on()
        self.amp.set_dvd("DVD Player")
        self.amp.set_surround_sound()
        self.amp.set_volume(5)
        self.dvd.on()
        self.dvd.play(movie)

    def end_movie(self):
        print("Shutting movie theater down...")
        self.popper.off()
        self.lights.on()
        self.screen.up()
        self.projector.off()
        self.amp.off()
        self.dvd.stop()
        self.dvd.eject()
        self.dvd.off()


if __name__ == "__main__":
    amp = Amplifier()
    tuner = Tuner()
    dvd = DvdPlayer()
    cd = CdPlayer()
    projector = Projector()
    screen = Screen()
    lights = TheaterLights()
    popper = PopcornPopper()

    home_theater = HomeTheaterFacade(amp, tuner, dvd, cd, projector, screen, lights, popper)
    home_theater.watch_movie("Raiders of the Lost Ark")
    print()
    home_theater.end_movie()
