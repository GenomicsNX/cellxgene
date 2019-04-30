import platform

from PyQt5.QtCore import QObject, pyqtSignal

# Detect OS
WINDOWS = (platform.system() == "Windows")
LINUX = (platform.system() == "Linux")
MAC = (platform.system() == "Darwin")


class WorkerSignals(QObject):
    """
    Defines the signals available from a running worker thread.
    Supported signals are:
        finished
        error - `str` error message
        result - `object` data returned from processing, anything
    """
    finished = pyqtSignal()
    error = pyqtSignal(str)
    result = pyqtSignal(object)
