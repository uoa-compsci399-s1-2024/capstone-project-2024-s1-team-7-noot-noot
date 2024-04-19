import board
import adafruit_tsl2591
from datetime import datetime

time = datetime.now()
i2c = board.I2C()
sensor = adafruit_tsl2591.TSL2591(i2c)

print('Light: {0}lux'.format(sensor.lux))
print('Visible: {0}'.format(sensor.visible))
print('Infrared: {0}'.format(sensor.infrared))
# Full spectrum (visible + IR) also range from 0-2147483647 (32-bit)
full_spectrum = sensor.full_spectrum
print("Full spectrum (IR + visible) light: {0}".format(full_spectrum))

filename = open('Data.txt', 'a')
filename.write(time)
filename.write('\nLight: {0}lux'.format(sensor.lux))
filename.write('\nVisible: {0}'.format(sensor.visible))
filename.write('\nInfrared: {0}'.format(sensor.infrared))
filename.write("\nFull spectrum (IR + visible) light: {0}".format(full_spectrum))
filename.write("\n\n")
filename.close()

