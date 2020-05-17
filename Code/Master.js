// Master - The one on the back hand
//////////////////// Variable ////////////////////
let ridingTime = 0
let timeStop = 0
let timeStrat = 0

///////////////// Initialisation /////////////////
radio.setGroup(17)

///////////////////// Event1 /////////////////////
input.onPinPressed(TouchPin.P0, function () {
    radio.sendValue("LM", 2)
})

///////////////////// Event2 /////////////////////
radio.onReceivedValue(function (name, value) {
    if (name == "Timer") {
        if (value == 1) {
            timeStrat = input.runningTime()
        } else if (value == 0) {
            timeStop = input.runningTime()
            ridingTime = timeStop - timeStrat
            radio.sendValue("Timer", ridingTime)
        }
    }
})

///////////////////// Forever ////////////////////
basic.forever(function () {
    if (input.rotation(Rotation.Roll) >= 30) {
        radio.sendValue("LM", 1)
    } else if (input.rotation(Rotation.Roll) <= -30) {
        radio.sendValue("LM", 0)
    }
    basic.pause(500)
})
