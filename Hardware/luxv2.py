import board
import adafruit_tsl2591
import json
from datetime import datetime
from time import gmtime, strftime
time = strftime("%Y-%m-%d %H:%M:%S", gmtime())

'''time = datetime.now()'''
i2c = board.I2C()
sensor = adafruit_tsl2591.TSL2591(i2c)
print(time)
print('Light: {0}lux'.format(sensor.lux))
print('Visible: {0}'.format(sensor.visible))
print('Infrared: {0}'.format(sensor.infrared))
# Full spectrum (visible + IR) also range from 0-2147483647 (32-bit)
full_spectrum = sensor.full_spectrum
print("Full spectrum (IR + visible) light: {0}".format(full_spectrum))

jsonData = '{ "time":"%s", "light":"%s" }' % (str(time), str(sensor.lux))
jsonOutput = json.loads(jsonData)
'''filename = open('Data.txt', 'a')'''

with open('data.json', 'a') as f:
    json.dump(jsonOutput, f, ensure_ascii=False)
    f.write("\n")

'''filename.write(jsonOutput)
filename.write('Time: {0}'.format(str(time)))
filename.write('\nLight: {0}lux'.format(sensor.lux))
filename.write('\nVisible: {0}'.format(sensor.visible))
filename.write('\nInfrared: {0}'.format(sensor.infrared))
filename.write("\nFull spectrum (IR + visible) light: {0}".format(full_spectrum)) 
filename.write("\n\n")
filename.close()'''

