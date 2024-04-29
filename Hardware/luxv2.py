import board
import adafruit_tsl2591
import json
from datetime import datetime

while True:
    # Get the current time in UTC
    current_time = datetime.utcnow()

    # Format the time as a string in the desired format (without the first two characters representing the year)
    time = current_time.strftime("%d%m%y%H%M%S")

    i2c = board.I2C()
    sensor = adafruit_tsl2591.TSL2591(i2c)
    print(time)
    print('Light: {0}lux'.format(sensor.lux))  # Format lux value to have 2 decimal places
    print('Visible: {0}'.format(sensor.visible))
    print('Infrared: {0}'.format(sensor.infrared))
    # Full spectrum (visible + IR) also range from 0-2147483647 (32-bit)
    full_spectrum = sensor.full_spectrum
    print("Full spectrum (IR + visible) light: {0}".format(full_spectrum))

    # Convert lux value to a string
    lux_str = str(sensor.lux)

    # Ensure the lux string has 8 characters, including the decimal point
    if len(lux_str) < 8:
        lux_str = lux_str + ("0" * (8 - len(lux_str)))
    else:
        lux_str = lux_str[:8]

    # Combine time and lux string to form the data string
    data = '{}{}'.format(time, lux_str)

    # Write the data to the file
    with open('data.txt', 'a') as f:
        f.write(data)
    
    time.sleep(5)
