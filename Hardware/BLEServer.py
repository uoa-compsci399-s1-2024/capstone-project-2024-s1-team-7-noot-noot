import time
import json
import sys
from pybleno import *

Sensor_RATE_UUID = 'A07498CA-AD5B-474E-940D-16F1FBE7E8CD'
Sensor_RATE_CHARACTERISTIC = '51FF12BB-3ED8-46E5-B4F9-D64E2FEC021B'

class SensorCharacteristic(Characteristic):
    def __init__(self):
        Characteristic.__init__(self, {
            'uuid': Sensor_RATE_CHARACTERISTIC,
            'properties': ['read', 'notify'],  
            'value': None
        })
        self._value = bytearray()
        self._updateValueCallback = None
        self._connected = False

    def onReadRequest(self, offset, callback):
        print('SensorCharacteristic - onReadRequest: value = ' + str(self._value))
        callback(Characteristic.RESULT_SUCCESS, self._value)

    def onSubscribe(self, maxValueSize, updateValueCallback):
        self._connected = True
        print('SensorCharacteristic - onSubscribe')
        print('MTU: ', maxValueSize)
        self._updateValueCallback = updateValueCallback

    def onUnsubscribe(self):
        print('SensorCharacteristic - onUnsubscribe')
        self._updateValueCallback = None

    def notifySensorValue(self):
        if not self._updateValueCallback:
            return
        print('SensorCharacteristic - notifySensorValue: value = ' + str(self._value))
        self._updateValueCallback(self._value)
    
    def isConnected(self):
        if self._connected:
            return self._connected
        

def onStateChange(state):
    print('on -> stateChange: ' + state)
    if (state == 'poweredOn'):
        bleno.startAdvertising('SightSaver', [Sensor_RATE_UUID])
    else:
        bleno.stopAdvertising()

def onAdvertisingStart(error):
    print('on -> advertisingStart: ' + ('error ' + str(error) if error else 'success'))
    if not error:
        bleno.setServices([
            BlenoPrimaryService({
                'uuid': Sensor_RATE_UUID,
                'characteristics': [
                    sensor_characteristic  
                ]
            })
        ])
        
def onAccept(clientAddress):
    print('Client Address: ', clientAddress)
    
def onDisconnect(clientAddress):
    print('Client Disconnected: ', clientAddress)


bleno = Bleno()
sensor_characteristic = SensorCharacteristic()  
bleno.on('stateChange', onStateChange)
bleno.on('advertisingStart', onAdvertisingStart)
bleno.on('accept', onAccept)
bleno.on('disconnect', onDisconnect)

bleno.start()

while not sensor_characteristic.isConnected():
    time.sleep(5)
    print('Waiting for Connection')
    
with open('data.txt', 'rb') as file:
    while True:
        chunk = file.read(20)
        if not chunk:
            break
        sensor_characteristic._value = chunk
        sensor_characteristic.notifySensorValue()

    # Handle the last chunk if it's less than 20 bytes
    last_chunk = file.read()
    if last_chunk:
        sensor_characteristic._value = last_chunk
        sensor_characteristic.notifySensorValue()
