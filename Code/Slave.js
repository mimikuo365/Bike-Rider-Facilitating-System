// Slave - On the back of the bike
//////////////////// Variables ///////////////////
let list: number[] = []
let Hr = 0
let realx = 0
let cos = 0
let Min = 0
let calPerMin = 0
let realz = 0
let velocity = 0
let sin = 0
let zero = 0
let acc: number[] = []
let Sec = 0
let angle = 0
let LightMode = 0
let i = 0
let realy = 0
let distance = 0
let radian = 0
let Time = 0
let cal = 0
let Sound = false
let distance_back = 0
//////////////////// Functions ///////////////////
function computeCal() {
    cal += Min * calPerMin
    cal += Hr * 60 * calPerMin
}
function timeConvertion() {
    Time = Math.floor(Time / 1000)
    Sec = Time % 60
    Time = Math.floor(Time / 60)
    Min = Time % 60
    Time = Math.floor(Time / 60)
    Hr = Time % 60
}
//////////////////// Measure Distance
function newvelocity() {
    acc[0] = zero
    i = 1
    for (let i0 = 0; i0 < 10; i0++) {
        acc[0] = acc[0] + acc[i] / 10
        i += 1
    }
    velocity += acc[0]
    newdistance()
}
function getsin() {
    radian = angle / 57.3
    sin = Math.sin(radian)
    cos = Math.cos(radian)
}
function newdistance() {
    distance += velocity
}
function getacc() {
    realy = input.acceleration(Dimension.Y) + 9.8 * sin
    realz = input.acceleration(Dimension.Z) + 9.8 * cos
    realx = input.acceleration(Dimension.X)
    newacc()
    acc[1] = Math.sqrt(realx * realx + realy * realy + realz * realz)
    newvelocity()
}
function newacc() {
    i = 10
    for (let i0 = 0; i0 < 9; i0++) {
        acc[i] = list[i - 1]
        i += -1
    }
}
//////////////////// Show LED
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
///////////////////// playAlarm
function playAlarm() {
    music.playTone(659, music.beat(BeatFraction.Whole))
    music.playTone(659, music.beat(BeatFraction.Whole))
    music.playTone(659, music.beat(BeatFraction.Whole))
    music.playTone(523, music.beat(BeatFraction.Double))
    music.rest(music.beat(BeatFraction.Whole))
    music.playTone(587, music.beat(BeatFraction.Whole))
    music.playTone(587, music.beat(BeatFraction.Whole))
    music.playTone(587, music.beat(BeatFraction.Whole))
    music.playTone(494, music.beat(BeatFraction.Double))
}

///////////////////// Event1 /////////////////////
radio.onReceivedValue(function (name, value) {
    if (name == "LM") {
        LightMode = value
    } else if (name == "Timer") {
        Time = value
        timeConvertion()
        computeCal()
        serial.writeValue("Calorie Consumed: ", cal)
        serial.writeValue("Time of Riding: ", Time)
        serial.writeValue("Distance: ", distance)
    }
})

///////////////////// Event2 /////////////////////
input.onButtonPressed(Button.A, function () {
    radio.sendValue("Timer", 1)
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue("Timer", 2)
})

///////////////// Initialisation /////////////////
radio.setGroup(17)
serial.redirect(
    SerialPin.P12,
    SerialPin.P13,
    BaudRate.BaudRate9600
)
LightMode = 1123
calPerMin = 4
acc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
pins.digitalWritePin(DigitalPin.P1, 0)
pins.digitalWritePin(DigitalPin.P2, 0)
pins.digitalWritePin(DigitalPin.P16, 0)
pins.digitalWritePin(DigitalPin.P15, 0)
pins.digitalWritePin(DigitalPin.P14, 0)

///////////////////// Forever ////////////////////
basic.forever(function () {
    angle = input.rotation(Rotation.Pitch)
    getsin()
    getacc()
    newacc()
    newvelocity()
    newdistance()
    basic.pause(1000)
})

basic.forever(function () {
    basic.showIcon(IconNames.Heart)
    if (LightMode == 0) {
        LeftLED()
    } else if (LightMode == 1) {
        RightLED()
    } else if (LightMode == 2) {
        CentralLED()
    }
    LightMode = 1123
})

basic.forever(function () {
    distance_back = sonar.ping(
        DigitalPin.P0,
        DigitalPin.P8,
        PingUnit.Centimeters
    )
    if (distance_back / 100 <= 3) {
        LightMode = 2
        Sound = true
    }
    // basic.showNumber(distance_back)
    basic.pause(500)
})

basic.forever(function () {
    if (Sound == true) {
        playAlarm()
    }
    basic.pause(500)
})
