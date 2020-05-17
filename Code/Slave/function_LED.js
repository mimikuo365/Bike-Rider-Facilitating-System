// Name:        function_LED
// Version:     13:40 19.March
// Description: Flash Left, Right, Central LEDs

let LightMode = 0
function CentralLED() {
    for (let i = 0; i < 5; i++) {
        // White
        pins.digitalWritePin(DigitalPin.P16, 1)
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.digitalWritePin(DigitalPin.P14, 1)
        basic.pause(500)
        // Turn off
        pins.digitalWritePin(DigitalPin.P16, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P14, 0)
        basic.pause(500)
        // Red
        pins.digitalWritePin(DigitalPin.P14, 1)
        basic.pause(500)
        // White
        pins.digitalWritePin(DigitalPin.P14, 0)
        basic.pause(500)
    }
}
function LeftLED() {
    for (let i = 0; i < 5; i++) {
        pins.digitalWritePin(DigitalPin.P2, 1)
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P2, 0)
        basic.pause(500)
    }
}
function RightLED() {
    for (let i = 0; i < 5; i++) {
        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.pause(500)
    }
}
pins.digitalWritePin(DigitalPin.P1, 0)
pins.digitalWritePin(DigitalPin.P2, 0)
pins.digitalWritePin(DigitalPin.P16, 0)
pins.digitalWritePin(DigitalPin.P15, 0)
pins.digitalWritePin(DigitalPin.P14, 0)
basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    if (LightMode == 0) {
        LeftLED()
    } else if (LightMode == 1) {
        RightLED()
    } else if (LightMode == 2) {
        CentralLED()
    }
})
