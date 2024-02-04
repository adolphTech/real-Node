const EventEmitter = require("events")
 
class Emitter extends EventEmitter{ }


const myE = new Emitter();

myE.on("foo", () => {
  console.log("Event occured")
})

myE.emit("foo")  