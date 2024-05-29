import board
import adafruit_tsl2591
import json
from datetime import datetime
import time
import random

while True:
	randomValue = ran
    # Format the time as a string in the desired format (without the first two characters representing the year)
    timeData = current_time.strftime("%y%m%d%H%M%S")

    # Combine time and lux string to form the data string
    data = '{}{}'.format(timeData, lux_str)

    # Write the data to the file
    with open('data.txt', 'a') as f:
        f.write(data)
    
    # Records data every 'x' seconds
    x = 5
    time.sleep(x)
