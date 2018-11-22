# Homebridge HTU21D Plugin

This is an [Homebridge](https://github.com/nfarina/homebridge) accessory plugin
for HTU21D temperature and humidity sensor connected via i2c.

## Install

**Important: This plugin requires running under root for access to /dev/mem
(this is a requirement from [node-rpio](https://github.com/jperkin/node-rpio))**

## Example config.json

```json
{
  "bridge": {
    "name": "Homebridge",
    "username": "CC:22:3D:E3:CE:30",
    "port": 51826,
    "pin": "031-45-154"
  },

  "description": "This is an example configuration file for HTU21D plugin.",

  "accessories": [
    {
      "accessory": "HTU21D",
      "name": "htu21d"
    }
  ],

  "platforms": [
  ]
}
```
