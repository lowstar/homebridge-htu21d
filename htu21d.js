const rpio = require("rpio");

const readTemperature = () =>
  new Promise(resolve => {
    rpio.i2cBegin();
    rpio.i2cSetSlaveAddress(0x40);
    rpio.i2cSetBaudRate(100000);    /* 100kHz */
    rpio.i2cSetClockDivider(2500);  /* 250MHz / 2500 = 100kHz */

    rpio.i2cWrite(new Buffer([0xf3]));

    rpio.msleep(100);

    const rx = new Buffer(3);
    rpio.i2cRead(rx);
    rpio.i2cEnd();

    const temp = (rx[0] * 256 + rx[1]) & 0xFFFC;
    const sensorValue = temp / 65536.0;
    const value = -46.85 + (175.72 * sensorValue);

    resolve(value);
  });

const readHumidity = () =>
  new Promise(resolve => {
    rpio.i2cBegin();
    rpio.i2cSetSlaveAddress(0x40);
    rpio.i2cSetBaudRate(100000);    /* 100kHz */
    rpio.i2cSetClockDivider(2500);  /* 250MHz / 2500 = 100kHz */

    rpio.i2cWrite(new Buffer([0xf5]));

    rpio.msleep(100);

    const rx = new Buffer(3);
    rpio.i2cRead(rx);
    rpio.i2cEnd();

    const temp = (rx[0] * 256 + rx[1]) & 0xfffc;
    const sensorValue = temp / 65536.0;
    const value = -6.0 + (125.0 * sensorValue);
    resolve(value);
  });

module.exports = { readTemperature, readHumidity };
