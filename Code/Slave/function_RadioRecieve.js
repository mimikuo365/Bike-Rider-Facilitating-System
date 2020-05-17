// Name:        function_RadioRecieve
// Version:     14:50 19.March
// Description: Process the recieved info and send with bluetooth

let LightMode = 0
let Min = 0
let Time = 0
let Sec = 0
let Hr = 0
let cal = 0
let calPerMin = 4
function timeConvertion() {
    Time = Math.floor(Time / 1000)
    Sec = Time % 60
    Time = Math.floor(Time / 60)
    Min = Time % 60
    Time = Math.floor(Time / 60)
    Hr = Time % 60
}

function computeCal() {
    cal += Min * calPerMin
    cal += Hr * 60 * calPerMin
}
radio.onReceivedValue(function (name, value) {
    if (name == "LM") {
        LightMode = value
    } else if (name == "Timer") {
        Time = value
        timeConvertion()
        computeCal()
        // Bluetooth send
    }
})
Sec = 0
Min = 0
Hr = 0
LightMode = 1123
