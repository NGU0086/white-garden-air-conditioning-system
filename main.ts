input.onButtonPressed(Button.A, function () {
    pins.servoWritePin(AnalogPin.P2, 180)
    basic.showString("OV")
})
input.onButtonPressed(Button.B, function () {
    pins.servoWritePin(AnalogPin.P2, 90)
    basic.showString("OV")
})
input.onPinPressed(TouchPin.P1, function () {
    pins.servoWritePin(AnalogPin.P2, 0)
    basic.showString("OV")
})
let temp = 0
OLED.init(128, 64)
basic.showLeds(`
    # # # # #
    # . # . #
    # # # # #
    # # . # #
    # # . # #
    `)
basic.pause(2000)
basic.showString(" ")
basic.showString("BEES-TEMP")
radio.setGroup(88)
basic.forever(function () {
    temp = input.temperature()
    basic.showNumber(input.temperature())
    basic.showString("*C")
    if (input.temperature() >= 35) {
        pins.digitalWritePin(DigitalPin.P2, 1)
        pins.servoWritePin(AnalogPin.P2, 90)
        basic.showString("WARNG HIGH")
        radio.sendString("TEMPERATURE VERY HIGH - WARNING ISSUED")
    }
    if (input.temperature() <= 25) {
        pins.servoWritePin(AnalogPin.P2, 180)
        basic.showString("STB")
    }
    if (input.temperature() <= 20) {
        pins.servoWritePin(AnalogPin.P2, 90)
        basic.showString("WARNG LOW")
        radio.sendString("TEMPERATURE VERY LOW - WARNING ISSUED")
    }
})
