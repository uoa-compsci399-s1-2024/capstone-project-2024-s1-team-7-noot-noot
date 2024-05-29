import board
import adafruit_tsl2591
from datetime import datetime
import time

while True:
    # Get the current time in UTC
    current_time = datetime.utcnow()

    # Format the time as a string in the desired format (without the first two characters representing the year)
    timeData = current_time.strftime("%Y%m%d%H%M%S")

    # Initialize I2C and sensor
    i2c = board.I2C()
    sensor = adafruit_tsl2591.TSL2591(i2c)

    # Read and calculate the lux value
    lux = sensor.lux * 1.5
    lux_value = int(lux)  # Convert to integer to get a whole number lux value
    lux_str = str(lux_value).zfill(5)  # Ensure the lux value is 5 digits long, zero-padded if necessary

    # Combine time and lux string to form the data string
    data = '{}{}.'.format(timeData, lux_str)

    # Write the data to the file
    # with open('data.txt', 'a') as f:
        # f.write(data)

    # Print debug information (optional)
    print(timeData)
    print('Light: {0} lux'.format(lux))  # Original lux value with 2 decimal places for reference
    print('Visible: {0}'.format(sensor.visible))
    print('Infrared: {0}'.format(sensor.infrared))
    print("Full spectrum (IR + visible) light: {0}".format(sensor.full_spectrum))

    # Sleep for 'x' seconds before recording the next data point
    x = 5
    time.sleep(x)
