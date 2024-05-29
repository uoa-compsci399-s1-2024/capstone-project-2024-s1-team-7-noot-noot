import RPi.GPIO as GPIO
import time

GPIO.setmode (GPIO.BCM)
GPIO.setup(17, GPIO.IN)
print(RPi.GPIO.input(17))

try:
	while True:
		uv_data = GPIO.input(17)
		print(uv_data)
		time.sleep(1)
except KeyboardInterrupt:
	print("Exiting program")
finally:
	GPIO.cleanup()


