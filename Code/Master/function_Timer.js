// Name:        function_Timer
// Version:     13:50 19.March
// Description: Record the riding time when recieving radio flag
// Return:		int/float, riding time in mini sec 

let ridingTime = 0
let timeStop = 0
let timeStrat = 0
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