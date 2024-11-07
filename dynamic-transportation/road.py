class Road:
    def __init__(self, duration: int, locomotion_type: str = None):
        self.duration = duration
        self.locomotion_type = locomotion_type

    def __str__(self):
        return f"{self.duration}/{self.locomotion_type}"