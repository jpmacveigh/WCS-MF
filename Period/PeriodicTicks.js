Class PeriodicTicks(start, period) {
    this.start = start;
    this.period = period;
    this.function nextOne(time){
        var number = round.floor((time - start) / period);
        return period * number + period;
    }
    this.function lastOne(time){
        return round.floor((time - start) / period) * period
    }
}



Class PeriodicTicks(start, period) {
    this.start = start;
    this.period = period;
    this.function nextOne(time){
        var number = round.floor((time - start) / period);
        return period * number + period;
    }
    this.function lastOne(time){
        return round.floor((time - start) / period) * period
    }
}


class PeriodicTicks {
  constructor (start, period) {
    this.start=start;
    this.period=period;
  }
  nextOne (time) {
    var number = Math.floor((time-this.start)/this.period);
    return (number+1)*this.period + this.start;
  }
  lastOne (time){
   
}
}
var tick = new PeriodicTicks (0,60*60*6);
console.log (tick.start,tick.period);
console.log (tick.nextOne(42));
console.log (tick.lastOne(42));
console.log (Date.now().toUTCString());
console.log (tick.nextOne(Date.now()));
console.log (tick.lastOne(Date.now()));

