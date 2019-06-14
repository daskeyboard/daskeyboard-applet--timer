const q = require('daskeyboard-applet');
// to access to the logger
const logger = q.logger;

class Timer extends q.DesktopApp {

  constructor() {
    super();
    // run every seconds
    this.pollingInterval = 1000;
  }

  async applyConfig() {

    this.alreadySentASignal = false;
    this.mustBeADifferentDay = false;

    // Initialize configuration time
    var now = new Date();
    this.m = now.getMinutes();
    this.s = now.getSeconds();
    this.h = now.getHours();
    this.d = now.getDay();

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
      this.hours = this.hours-24;
      // Need to add a condition for the day
      this.mustBeADifferentDay = true;
    }

  }

  async run() {
    if(!this.alreadySentASignal){

      // Updating time values
      var now = new Date();

      // Testing if it's the right day
      if( (!this.mustBeADifferentDay) || ((this.mustBeADifferentDay) && (this.d!=now.getDay())) ){

        // Getting the time
        this.m = now.getMinutes();
        this.s = now.getSeconds();
        this.h = now.getHours();
  
        // Checking values with logs
        // logger.info(this.s+">="+this.seconds);
        // logger.info(this.m+">="+this.minutes);
        // logger.info(this.h+">="+this.hours);

        // Testing if it's the right time
        if ( (this.s >= this.seconds) && (this.m >= this.minutes) && (this.h >= this.hours) ) {
          // Send signal
          logger.info("Time is up. Sending signal.");
          // Just one signal need to be sent
          this.alreadySentASignal = true;
          return new q.Signal({
            points: [
              [new q.Point(this.config.color, this.config.effect)]
            ],
            name: 'Timer',
            message: "Time's up!",
            isMuted: false
          });
        } else {
          // not the right time
          return null;
        }

      } else {
        // not the right day
        return null;
      }
    } else {
      // Already sent a signal. Applet stop running.
      return null;
    }
  }
}


module.exports = {
  Timer: Timer
}

const applet = new Timer();