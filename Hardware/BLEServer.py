import json
import time
from pybleno import *

class EchoCharacteristic(Characteristic):
    def __init__(self):
        Characteristic.__init__(self, {
            'uuid': 'ec0e',
            'properties': ['read', 'write'],
            'value': None
        })
        self._value = 0
        self._updateValueCallback = None

    def onReadRequest(self, offset, callback):
        with open('data.json', 'r') as f:
            data = json.load(f)
        callback(Characteristic.RESULT_SUCCESS, bytes(json.dumps(data), 'utf-8'))

    def onWriteRequest(self, data, offset, withoutResponse, callback):
        self._value = data
        print('EchoCharacteristic - onWriteRequest: value = ' + self._value)
        if self._updateValueCallback:
            print('EchoCharacteristic - onWriteRequest: notifying')
            self._updateValueCallback(self._value)
        callback(Characteristic.RESULT_SUCCESS)

    def onSubscribe(self, maxValueSize, updateValueCallback):
        print('EchoCharacteristic - onSubscribe')
        self._updateValueCallback = updateValueCallback

    def onUnsubscribe(self):
        print('EchoCharacteristic - onUnsubscribe')
        self._updateValueCallback = None

def onStateChange(state):
    print('on -> stateChange: ' + state)
    if (state == 'poweredOn'):
        bleno.startAdvertising('echo', ['ec00'])
    else:
        bleno.stopAdvertising()

def onAdvertisingStart(error):
    print('on -> advertisingStart: ' + ('error ' + error if error else 'success'))
    if not error:
        bleno.setServices([
            BlenoPrimaryService({
                'uuid': 'ec00',
                'characteristics': [
                    EchoCharacteristic()
                ]
            })
        ])

bleno = Bleno()
bleno.on('stateChange', onStateChange)
bleno.on('advertisingStart', onAdvertisingStart)

bleno.start()

while True:
    time.sleep(1)