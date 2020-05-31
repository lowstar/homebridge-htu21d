const { readTemperature, readHumidity } = require("./htu21d");

var Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("HTU21D", TemperatureSensor);
};

class TemperatureSensor {
  constructor(log, config) {
    this.state = true;
    this.log = log;
    this.config = config;
    this.name = config.name;
    this.currentTemperature = 20;
    this.currentHumidity = 0;

    this.startReading = this.startReading.bind(this);
  }

  startReading() {
    readTemperature()
      .then(t => {
        this.currentTemperature = t;
        this.temperatureService.setCharacteristic(
          Characteristic.CurrentTemperature,
          this.currentTemperature
        );
      })
      .then(() => 
        readHumidity()
        .then(t => {
          this.currentHumidity = t;
          this.humidityService.setCharacteristic(
            Characteristic.CurrentRelativeHumidity,
            this.currentHumidity
          );
        })
        .then(() => setTimeout(this.startReading, 2000)));
  }

  getServices() {
    let informationService = new Service.AccessoryInformation();
    informationService
      .setCharacteristic(Characteristic.Manufacturer, "lowstar")
      .setCharacteristic(Characteristic.Model, "HTU21D")
      .setCharacteristic(Characteristic.SerialNumber, "000-000-000");

    const temperatureService = new Service.TemperatureSensor(this.name);

    temperatureService
      .getCharacteristic(Characteristic.Name)
      .on("get", callback => {
        callback(null, this.name);
      });

    temperatureService
      .getCharacteristic(Characteristic.CurrentTemperature)
      .on("get", callback => callback(null, this.currentTemperature));

    const humidityService = new Service.HumiditySensor(this.name);

    humidityService
      .getCharacteristic(Characteristic.Name)
      .on("get", callback => {
        callback(null, this.name);
      });

    humidityService
      .getCharacteristic(Characteristic.CurrentRelativeHumidity)
      .on("get", callback => callback(null, this.currentHumidity));

    this.informationService = informationService;
    this.temperatureService = temperatureService;
    this.humidityService = humidityService;

    this.startReading();

    return [informationService, temperatureService, humidityService];
  }
}
