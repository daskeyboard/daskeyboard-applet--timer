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

    this.alreadySentASignal = false;

    var now = new Date();
    this.m = now.getMinutes();
    this.s = now.getSeconds();
    this.h = now.getHours();
    this.d = now.getDay();
    logger.info("Showing the time into ApplyConfi(): "+now.getTime());

    // Creating triggered values
    this.seconds = this.s + parseInt(this.config.seconds);
    this.minutes = this.m +  parseInt(this.config.minutes);
    this.hours = this.h +  parseInt(this.config.hours);

    // Need to update the value when there are 65 seconds or minutes.
    while(this.seconds>59){
      this.seconds = this.seconds-60;
      this.minutes = this.minutes+1;
    }
    while(this.minutes>59){
      this.minutes = this.minutes-60;
      this.hours = this.hours+1;
    }
    while(this.hours>23){
      this.hours-24;
      // Need to add a condition for the day
    }

  }

  async run() {
    if(!this.alreadySentASignal){

      // Updating time values
      var now = new Date();
      this.m = now.getMinutes();
      this.s = now.getSeconds();
      this.h = now.getHours();

      // Checking values with logs
      logger.info(this.s+">="+this.seconds);
      logger.info(this.m+">="+this.minutes);
      logger.info(this.h+">="+this.hours);

      if ( (this.s >= this.seconds) && (this.m >= this.minutes) && (this.h >= this.hours) ) {

        logger.info("Countdown, Time. Sending signal.");
        // Just one signal need to be sent
        this.alreadySentASignal = true;
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
    }else{
      // Already sent a signal. Applet stop running.
      return null;
    }
  }
}


module.exports = {
  Countdown: Countdown
}

const applet = new Countdown();