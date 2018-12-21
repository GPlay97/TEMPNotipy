import json
import requests

def readConfig():
    configFile = open('config.json')
    return json.loads(configFile.read())

config = readConfig()

def readTemperature():
    temperatureFile = open('/sys/bus/w1/devices/' + config['SENSOR'] + '/w1_slave')
    return float(temperatureFile.read().split('\n')[1].split(' ')[9][2:]) / 1000

def sendTemperature(temperature):
    requests.post(config['RESTURL'] + '/temperature', json={"temperature": temperature})

i = 0

while i < 10:
    sendTemperature(readTemperature())
    i += 1