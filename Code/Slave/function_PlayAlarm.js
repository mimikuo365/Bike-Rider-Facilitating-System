// Name:        function_PlayAlarm
// Version:     14:30 19.March
// Description: Play alarm when Sound == true

let Sound = false
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
Sound = false
basic.forever(function () {
    if (Sound == true) {
        playAlarm()
    }
    basic.pause(500)
})