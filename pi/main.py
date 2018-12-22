import json
import requests
import time

def readConfig():
    configFile = open('config.json')
    return json.loads(configFile.read())

config = readConfig()

def readTemperature():
    try:
        temperatureFile = open('/sys/bus/w1/devices/' + config['SENSOR'] + '/w1_slave')
        return float(temperatureFile.read().split('\n')[1].split(' ')[9][2:]) / 1000
    except:
        print('Could not read sensor temperature')
        return False

def sendTemperature(temperature):
    if temperature == False:
        return
    try:
        requests.post(config['RESTURL'] + '/temperature', json={"temperature": temperature})
    except:
        print('Could not send temperature')

while True:
    sendTemperature(readTemperature())
    time.sleep(config['INTERVAL'])