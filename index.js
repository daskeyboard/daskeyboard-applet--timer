const q = require('daskeyboard-applet');
// to access to the logger
const logger = q.logger;

class Countdown extends q.DesktopApp {

  constructor() {
    super();
    // run every seconds
    this.pollingInterval = 1000;
  }

  async applyConfig() {
    var now = new Date();
    this.m = now.getMinutes();
    this.s = now.getSeconds();
    this.h = now.getHours();
    logger.info("Showing the time into ApplyConfi(): "+now.getTime());

    // Creating triggered values
    this.seconds = this.s + parseInt(this.config.seconds);
    this.minutes = this.m +  parseInt(this.config.minutes);
    this.hours = this.h +  parseInt(this.config.hours);

    // Need to update the value when there are 65 seconds or minutes.

  }

  async run() {

    // Updating time values
    var now = new Date();
    this.m = now.getMinutes();
    this.s = now.getSeconds();
    this.h = now.getHours();

    if ( (this.s >= this.seconds) && (this.m >= this.minutes) && (this.h >= this.hours)) {

      logger.info("Countdown, Time. Sending signal.");

      return new q.Signal({
        points: [
          [new q.Point('#FF0000', q.Effects.BLINK)]
        ],
        name: 'Countdown',
        message: 'Ringggg Rinnng Rinngg',
        isMuted: false
      });
    } else {
      // not time
      return null;
    }
  }
}


module.exports = {
  Countdown: Countdown
}

const applet = new Countdown();