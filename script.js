const firePixelArray = []
let fireWidth = 80
let fireHeight = 40
let debug = false
let fireColorPallete = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]


let direction = "left"
function toLeft() {
    direction = "left"
}
function toCenter() {
    direction = "center"
}
function toRight() {
    direction = "right"
}

function start() {
    createFireDataStructure()
    createFireSource()
    renderFire()

    setInterval(calculateFirePropagation, 50)
}

function createFireDataStructure() {
    const numberOfPixels = fireWidth * fireHeight

    for (let i = 0; i < numberOfPixels; i++) {
        firePixelArray[i] = 0
    }
}

function calculateFirePropagation() {
    for (let column = 0; column < fireWidth; column++) {
        for (let row = 0; row < fireHeight; row++) {
            const pixelIndex = column + (fireWidth * row)

            updateFireIntensityPerPixel(pixelIndex)
        }
    }
    renderFire()
}

function updateFireIntensityPerPixel(currentPixelIndex) {
    const belowPixelIndex = currentPixelIndex + fireWidth

    if (belowPixelIndex >= fireWidth * fireHeight) {
        return ``
    }

    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = firePixelArray[belowPixelIndex]
    const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0



    if (direction == "left") {
        firePixelArray[currentPixelIndex - decay] = newFireIntensity
    } else if (direction == "right") {
        firePixelArray[currentPixelIndex + decay] = newFireIntensity
    } else if (direction == "center") {
        firePixelArray[currentPixelIndex] = newFireIntensity
    }

}

function renderFire() {

    let html = '<table cellpadding=0 cellspacing=0>'

    for (let row = 0; row < fireHeight; row++) {
        html += '<tr>'

        for (let column = 0; column < fireWidth; column++) {
            const pixelIndex = column + (fireWidth * row)
            const fireIntensity = firePixelArray[pixelIndex]
            const color = fireColorPallete[fireIntensity]
            const colorString = `${color.r},${color.g},${color.b}`

            if (debug === true) {
                html += '<td class="debugTdStyle">'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += `<div style="color: rgb(${colorString})">${fireIntensity}</div>`
                html += '</td>'
            } else {
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }

        }

        html += '</tr>'
    }

    html += '</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}

function createFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overFlowPixelIndex = fireWidth * fireHeight
        const pixelIndex = overFlowPixelIndex - fireWidth + column

        firePixelArray[pixelIndex] = 36
    }
}


function destroyFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        firePixelArray[pixelIndex] = 0
    }
}

function increaseFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overFlowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overFlowPixelIndex - fireWidth) + column
        const currentFireIntensity = firePixelArray[pixelIndex]

        if (currentFireIntensity < 36) {
            const increase = Math.floor(Math.random() * 14)
            const newFireIntensity = currentFireIntensity + increase >= 36 ? 36 : currentFireIntensity + increase

            firePixelArray[pixelIndex] = newFireIntensity
        }
    }
}

function decreaseFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
        const overFlowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overFlowPixelIndex - fireWidth) + column
        const currentFireIntensity = firePixelArray[pixelIndex]

        if (currentFireIntensity > 0) {
            const decay = Math.floor(Math.random() * 14)
            const newFireIntensity = currentFireIntensity - decay >= 0 ? currentFireIntensity - decay : 0

            firePixelArray[pixelIndex] = newFireIntensity
        }
    }
}

function toggleDebugMode() {
    if (debug === false) {
        fireWidth = 12
        fireHeight = 8
        debug = true
    } else {
        fireWidth = 60
        fireHeight = 40
        debug = false
    }

    createFireDataStructure()
    createFireSource()
}

start()










function changeColorToOrange() {
    fireColorPallete = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]
}
function changeColorToRed() {
    fireColorPallete = [
        { "r": 7, "g": 7, "b": 7 },
        { "r": 31, "g": 7, "b": 7 },
        { "r": 47, "g": 7, "b": 7 },
        { "r": 71, "g": 7, "b": 7 },
        { "r": 87, "g": 7, "b": 7 },
        { "r": 103, "g": 15, "b": 7 },
        { "r": 119, "g": 15, "b": 7 },
        { "r": 143, "g": 23, "b": 7 },
        { "r": 159, "g": 23, "b": 7 },
        { "r": 175, "g": 31, "b": 7 },
        { "r": 191, "g": 31, "b": 7 },
        { "r": 199, "g": 39, "b": 7 },
        { "r": 223, "g": 39, "b": 7 },
        { "r": 223, "g": 47, "b": 7 },
        { "r": 223, "g": 47, "b": 7 },
        { "r": 215, "g": 55, "b": 15 },
        { "r": 215, "g": 55, "b": 15 },
        { "r": 215, "g": 63, "b": 15 },
        { "r": 207, "g": 71, "b": 15 },
        { "r": 207, "g": 79, "b": 15 },
        { "r": 207, "g": 87, "b": 23 },
        { "r": 207, "g": 95, "b": 23 },
        { "r": 199, "g": 95, "b": 23 },
        { "r": 199, "g": 103, "b": 31 },
        { "r": 199, "g": 111, "b": 31 },
        { "r": 191, "g": 119, "b": 39 },
        { "r": 191, "g": 119, "b": 39 },
        { "r": 191, "g": 127, "b": 47 },
        { "r": 191, "g": 135, "b": 47 },
        { "r": 191, "g": 143, "b": 55 },
        { "r": 183, "g": 151, "b": 55 },
        { "r": 183, "g": 159, "b": 63 },
        { "r": 183, "g": 167, "b": 71 },
        { "r": 207, "g": 183, "b": 135 },
        { "r": 223, "g": 207, "b": 175 },
        { "r": 239, "g": 223, "b": 215 },
        { "r": 255, "g": 255, "b": 255 }
    ]
}
function changeColorToBlue() {
    fireColorPallete = [
        { "r": 7, "g": 7, "b": 7 },
        { "r": 7, "g": 7, "b": 31 },
        { "r": 7, "g": 15, "b": 47 },
        { "r": 7, "g": 15, "b": 71 },
        { "r": 7, "g": 23, "b": 87 },
        { "r": 7, "g": 31, "b": 103 },
        { "r": 7, "g": 31, "b": 119 },
        { "r": 7, "g": 39, "b": 143 },
        { "r": 7, "g": 47, "b": 159 },
        { "r": 7, "g": 63, "b": 175 },
        { "r": 7, "g": 71, "b": 191 },
        { "r": 7, "g": 71, "b": 199 },
        { "r": 7, "g": 79, "b": 223 },
        { "r": 7, "g": 87, "b": 223 },
        { "r": 7, "g": 87, "b": 223 },
        { "r": 7, "g": 95, "b": 215 },
        { "r": 7, "g": 95, "b": 215 },
        { "r": 15, "g": 103, "b": 215 },
        { "r": 15, "g": 111, "b": 207 },
        { "r": 15, "g": 119, "b": 207 },
        { "r": 15, "g": 127, "b": 207 },
        { "r": 23, "g": 135, "b": 207 },
        { "r": 23, "g": 135, "b": 199 },
        { "r": 23, "g": 143, "b": 199 },
        { "r": 31, "g": 151, "b": 199 },
        { "r": 31, "g": 159, "b": 191 },
        { "r": 31, "g": 159, "b": 191 },
        { "r": 39, "g": 167, "b": 191 },
        { "r": 39, "g": 167, "b": 191 },
        { "r": 47, "g": 175, "b": 191 },
        { "r": 47, "g": 175, "b": 183 },
        { "r": 47, "g": 183, "b": 183 },
        { "r": 55, "g": 183, "b": 183 },
        { "r": 111, "g": 207, "b": 207 },
        { "r": 159, "g": 223, "b": 223 },
        { "r": 199, "g": 239, "b": 239 },
        { "r": 255, "g": 255, "b": 255 }
    ]
}
function changeColorToGreen() {
    fireColorPallete = [
        { "r": 7, "g": 7, "b": 7 },
        { "r": 7, "g": 31, "b": 7 },
        { "r": 15, "g": 47, "b": 7 },
        { "r": 15, "g": 71, "b": 7 },
        { "r": 23, "g": 87, "b": 7 },
        { "r": 31, "g": 103, "b": 7 },
        { "r": 31, "g": 119, "b": 7 },
        { "r": 39, "g": 143, "b": 7 },
        { "r": 47, "g": 159, "b": 7 },
        { "r": 63, "g": 175, "b": 7 },
        { "r": 71, "g": 191, "b": 7 },
        { "r": 71, "g": 199, "b": 7 },
        { "r": 79, "g": 223, "b": 7 },
        { "r": 87, "g": 223, "b": 7 },
        { "r": 87, "g": 223, "b": 7 },
        { "r": 95, "g": 215, "b": 7 },
        { "r": 95, "g": 215, "b": 7 },
        { "r": 103, "g": 215, "b": 15 },
        { "r": 111, "g": 207, "b": 15 },
        { "r": 119, "g": 207, "b": 15 },
        { "r": 127, "g": 207, "b": 15 },
        { "r": 135, "g": 207, "b": 23 },
        { "r": 135, "g": 199, "b": 23 },
        { "r": 143, "g": 199, "b": 23 },
        { "r": 151, "g": 199, "b": 31 },
        { "r": 159, "g": 191, "b": 31 },
        { "r": 159, "g": 191, "b": 31 },
        { "r": 167, "g": 191, "b": 39 },
        { "r": 167, "g": 191, "b": 39 },
        { "r": 175, "g": 191, "b": 47 },
        { "r": 175, "g": 183, "b": 47 },
        { "r": 183, "g": 183, "b": 47 },
        { "r": 183, "g": 183, "b": 55 },
        { "r": 207, "g": 207, "b": 111 },
        { "r": 223, "g": 223, "b": 159 },
        { "r": 239, "g": 239, "b": 199 },
        { "r": 255, "g": 255, "b": 255 }
    ]
}
function changeColorToPink() {
    fireColorPallete = [
        { "r": 7, "g": 7, "b": 7 },
        { "r": 20, "g": 7, "b": 30 },
        { "r": 30, "g": 7, "b": 45 },
        { "r": 40, "g": 10, "b": 60 },
        { "r": 50, "g": 10, "b": 75 },
        { "r": 60, "g": 15, "b": 90 },
        { "r": 70, "g": 15, "b": 105 },
        { "r": 80, "g": 20, "b": 120 },
        { "r": 90, "g": 20, "b": 135 },
        { "r": 100, "g": 25, "b": 150 },
        { "r": 110, "g": 25, "b": 165 },
        { "r": 120, "g": 30, "b": 180 },
        { "r": 130, "g": 30, "b": 195 },
        { "r": 140, "g": 35, "b": 210 },
        { "r": 150, "g": 35, "b": 225 },
        { "r": 160, "g": 40, "b": 235 },
        { "r": 170, "g": 40, "b": 240 },
        { "r": 180, "g": 45, "b": 245 },
        { "r": 190, "g": 50, "b": 250 },
        { "r": 200, "g": 55, "b": 255 },
        { "r": 210, "g": 60, "b": 255 },
        { "r": 220, "g": 70, "b": 255 },
        { "r": 225, "g": 80, "b": 255 },
        { "r": 230, "g": 90, "b": 255 },
        { "r": 235, "g": 100, "b": 255 },
        { "r": 240, "g": 110, "b": 255 },
        { "r": 240, "g": 120, "b": 255 },
        { "r": 245, "g": 135, "b": 255 },
        { "r": 245, "g": 150, "b": 255 },
        { "r": 250, "g": 165, "b": 255 },
        { "r": 250, "g": 180, "b": 255 },
        { "r": 250, "g": 195, "b": 255 },
        { "r": 255, "g": 205, "b": 255 },
        { "r": 255, "g": 215, "b": 255 },
        { "r": 255, "g": 225, "b": 255 },
        { "r": 255, "g": 240, "b": 255 },
        { "r": 255, "g": 255, "b": 255 }
    ]
}
function changeColorToCandy() {
    fireColorPallete = [
        { "r": 7, "g": 7, "b": 7 },
        { "r": 47, "g": 7, "b": 31 },
        { "r": 71, "g": 7, "b": 47 },
        { "r": 95, "g": 15, "b": 63 },
        { "r": 119, "g": 15, "b": 79 },
        { "r": 143, "g": 23, "b": 95 },
        { "r": 167, "g": 23, "b": 111 },
        { "r": 191, "g": 31, "b": 127 },
        { "r": 215, "g": 31, "b": 143 },
        { "r": 239, "g": 39, "b": 159 },
        { "r": 255, "g": 47, "b": 175 },
        { "r": 255, "g": 55, "b": 183 },
        { "r": 255, "g": 63, "b": 191 },
        { "r": 255, "g": 71, "b": 199 },
        { "r": 255, "g": 79, "b": 207 },
        { "r": 255, "g": 87, "b": 215 },
        { "r": 255, "g": 95, "b": 223 },
        { "r": 255, "g": 103, "b": 231 },
        { "r": 255, "g": 111, "b": 239 },
        { "r": 247, "g": 119, "b": 247 },
        { "r": 239, "g": 127, "b": 255 },
        { "r": 231, "g": 135, "b": 255 },
        { "r": 223, "g": 143, "b": 255 },
        { "r": 215, "g": 151, "b": 255 },
        { "r": 207, "g": 159, "b": 255 },
        { "r": 199, "g": 167, "b": 255 },
        { "r": 191, "g": 175, "b": 255 },
        { "r": 183, "g": 183, "b": 255 },
        { "r": 175, "g": 191, "b": 255 },
        { "r": 167, "g": 199, "b": 255 },
        { "r": 159, "g": 207, "b": 255 },
        { "r": 175, "g": 215, "b": 255 },
        { "r": 191, "g": 223, "b": 255 },
        { "r": 207, "g": 231, "b": 255 },
        { "r": 223, "g": 239, "b": 255 },
        { "r": 239, "g": 247, "b": 255 },
        { "r": 255, "g": 255, "b": 255 }
    ]
}
function changeColorToGrayscale() {
    fireColorPallete = [
        { "r": 7, "g": 7, "b": 7 },
        { "r": 14, "g": 14, "b": 14 },
        { "r": 21, "g": 21, "b": 21 },
        { "r": 28, "g": 28, "b": 28 },
        { "r": 35, "g": 35, "b": 35 },
        { "r": 42, "g": 42, "b": 42 },
        { "r": 49, "g": 49, "b": 49 },
        { "r": 56, "g": 56, "b": 56 },
        { "r": 63, "g": 63, "b": 63 },
        { "r": 70, "g": 70, "b": 70 },
        { "r": 77, "g": 77, "b": 77 },
        { "r": 84, "g": 84, "b": 84 },
        { "r": 91, "g": 91, "b": 91 },
        { "r": 98, "g": 98, "b": 98 },
        { "r": 105, "g": 105, "b": 105 },
        { "r": 112, "g": 112, "b": 112 },
        { "r": 119, "g": 119, "b": 119 },
        { "r": 126, "g": 126, "b": 126 },
        { "r": 133, "g": 133, "b": 133 },
        { "r": 140, "g": 140, "b": 140 },
        { "r": 147, "g": 147, "b": 147 },
        { "r": 154, "g": 154, "b": 154 },
        { "r": 161, "g": 161, "b": 161 },
        { "r": 168, "g": 168, "b": 168 },
        { "r": 175, "g": 175, "b": 175 },
        { "r": 182, "g": 182, "b": 182 },
        { "r": 189, "g": 189, "b": 189 },
        { "r": 196, "g": 196, "b": 196 },
        { "r": 203, "g": 203, "b": 203 },
        { "r": 210, "g": 210, "b": 210 },
        { "r": 217, "g": 217, "b": 217 },
        { "r": 224, "g": 224, "b": 224 },
        { "r": 231, "g": 231, "b": 231 },
        { "r": 238, "g": 238, "b": 238 },
        { "r": 245, "g": 245, "b": 245 },
        { "r": 250, "g": 250, "b": 250 },
        { "r": 255, "g": 255, "b": 255 }
    ]
}
function changeColorToRainbow() {
    fireColorPallete = [
        { "r": 7, "g": 7, "b": 7 },
        { "r": 20, "g": 0, "b": 30 },
        { "r": 40, "g": 0, "b": 60 },
        { "r": 60, "g": 0, "b": 90 },
        { "r": 80, "g": 0, "b": 120 },
        { "r": 100, "g": 0, "b": 150 },
        { "r": 120, "g": 0, "b": 180 },
        { "r": 140, "g": 0, "b": 210 },
        { "r": 160, "g": 0, "b": 240 },
        { "r": 100, "g": 0, "b": 255 },
        { "r": 0, "g": 0, "b": 255 },
        { "r": 0, "g": 40, "b": 255 },
        { "r": 0, "g": 80, "b": 255 },
        { "r": 0, "g": 120, "b": 255 },
        { "r": 0, "g": 160, "b": 255 },
        { "r": 0, "g": 200, "b": 255 },
        { "r": 0, "g": 240, "b": 255 },
        { "r": 0, "g": 255, "b": 255 },
        { "r": 0, "g": 255, "b": 200 },
        { "r": 0, "g": 255, "b": 150 },
        { "r": 0, "g": 255, "b": 100 },
        { "r": 0, "g": 255, "b": 50 },
        { "r": 0, "g": 255, "b": 0 },
        { "r": 50, "g": 255, "b": 0 },
        { "r": 100, "g": 255, "b": 0 },
        { "r": 150, "g": 255, "b": 0 },
        { "r": 200, "g": 255, "b": 0 },
        { "r": 255, "g": 255, "b": 0 },
        { "r": 255, "g": 200, "b": 0 },
        { "r": 255, "g": 150, "b": 0 },
        { "r": 255, "g": 100, "b": 0 },
        { "r": 255, "g": 50, "b": 0 },
        { "r": 255, "g": 0, "b": 0 },
        { "r": 255, "g": 100, "b": 100 },
        { "r": 255, "g": 180, "b": 180 },
        { "r": 255, "g": 220, "b": 220 },
        { "r": 255, "g": 255, "b": 255 }
    ]
}