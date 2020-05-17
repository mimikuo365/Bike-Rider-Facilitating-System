// Name:        function_TimerTrigger
// Version:     14:00 19.March
// Description: Send a trigger signal when A, B is pressed

input.onButtonPressed(Button.A, function () {
    radio.sendValue("Timer", 1)
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue("Timer", 0)
})
