const chalk = require('chalk');
const moment = require('moment');

class KabalLogger {
    static log(content, type = "log") {
        const timestamp = `[${moment().locale('tr').format("D/M/YY HH:mm:ss")}]:`;
        switch (type) {
             case "log": {
                return console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
            }
            case "warn": {
                return console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
            }
            case "error": {
                return console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `);
            }
            case "debug": {
                return console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `);
            }
            case "cmd": {
                return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
            }
            case "ready": {
                return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
            }
            default: throw new TypeError("Loglama tipi warn, debug, log, ready, cmd veya error olmalıdır.");
        }
    }

    static error(content) {
        return this.log(content, "error");
    }

    static warn(content) {
        return this.log(content, "warn");
    }

    static debug(content) {
        return this.log(content, "debug");
    }

    static cmd(content) {
        return this.log(content, "cmd");
    }
}

module.exports = KabalLogger;