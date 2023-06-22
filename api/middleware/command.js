const { Request, Response } = require('express')
const { isBlank, getRandomNumber } = require('../../util/commonUtil.js')
const { commandList, helpMessage} = require('../../string.js')
const nikke = require('../../model/nikke.js')
const logger = require('../../logger.js')

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const run = async (req, res) => {
    const command = req.body.command

    if (isBlank(command)) {
        return res.status(400).send({
            message: "command 값은 필수 입니다."
        })
    }

    if (typeof command !== 'string') {
        return res.status(400).send({
            message: "command 값의 형태는 string 입니다."
        })
    }

    const commandSplit = command.split(" ")

    // 명령어 인자가 1개인 경우
    if (commandSplit.length === 1) {
        const command = commandSplit[0]

        if (commandList.help.commands.includes(command)) {
            return res.send({
                code: 0,
                message: "success",
                result: helpMessage,
            })
        } else if (command == "홍련") {
            let count = 0

            let r = 0
            let sr = 0
            let ssr = 0
            let pilgrim = 0

            while (true) {
                count += 1

                const item = gacha(false)

                switch (item.rarity) {
                    case "R":
                        r += 1
                        break

                    case "SR":
                        sr += 1
                        break

                    case "SSR":
                        ssr += 1
                        break

                    default:
                        break
                }

                if (item.nikke.company === "PILGRIM") {
                    pilgrim += 1
                }

                if (item.nikke.name === "홍련") {
                    break
                }
            }

            let message = ""
            message += `지휘관은 홍련이 ${count.toLocaleString()} 뽑기 만에 나왔네요\n`
            message += "\n" 
            message += `R: ${r.toLocaleString()}\n`
            message += `SR: ${sr.toLocaleString()}\n`
            message += `SSR: ${ssr.toLocaleString()}\n`
            message += `PILGRIM: ${pilgrim.toLocaleString()}`

            return res.send({
                code: 0,
                message: "success",
                result: message,
            })
        } else if (commandList.normalGacha.commands.includes(command)) {
            return executeGacha(res, false, null)
        } else {
            // 픽업 가챠 확인
            for (const pickUpGacha of commandList.pickUpGacha.list) {
                if (pickUpGacha.commands.includes(command)) {
                    return executeGacha(res, true, pickUpGacha.nikke)
                }
            }
        }
    }

    res.send({
        code: 404,
        message: "해당하는 명령어가 없습니다."
    })
}

/**
 * 10연 뽑기 실행 후 res.send 실행
 * @param {Response} res express response 객체 
 * @param {boolean} isPickUp 픽업 뽑기 여부
 * @param {Object} pickUpNikke 픽업 대상 니케
 * @returns 결과 문자열
 */
const executeGacha = (res, isPickUp, pickUpNikke) => {
    const items = []

    for (let i = 0; i < 10; i++) {
        items.push(gacha(isPickUp, pickUpNikke))
    }

    res.send({
        code: 0,
        message: "success",
        result: getGachaMessage(items),
    })
}

/**
 * 메시지 문자열 생성
 * @param {Array} items 니케 배열
 */
const getGachaMessage = (items) => {
    let message = ""

    for (const item of items) {
        switch (item.rarity) {
            case "SSR":
                message += "★"
                break

            case "SR":
                message += "☆"
                break

            case "R":
                message += "○"
                break

            default:
                break
        }
    }

    message += "\n\n"

    for (const item of items) {
        message += `[${item.rarity}] [${item.nikke.company}] ${item.nikke.name} \n`
    }

    return message.trim()
}

/**
 * 단발 뽑기
 * @param {boolean} isPickUp 픽업 뽑기 여부
 * @param {Object} pickUpNikke 픽업 대상 니케
 * @param {string} pickUpNikke.company 기업이름
 * @param {string} pickUpNikke.name 니케이름
 * @returns 
 */
const gacha = (isPickUp, pickUpNikke) => {
    let number = getRandomNumber(1, 1000)

    let rarity = ""
    let nikkes = []

    // 4% SSR
    if (number <= 40) {
        if (isPickUp) {
            // 2% 픽업
            if (number <= 20) {
                return {
                    rarity: "SSR",
                    nikke: pickUpNikke,
                }
            }
        }

        // 0.5% 필그림
        if (number <= 5) {
            rarity = "SSR"
            nikkes = nikke.PILGRIM
        // 3.5% SSR
        } else {
            rarity = "SSR"
            nikkes = nikke.SSR
        }
    // 43% SR
    } else if (number <= 470) {
        rarity = "SR"
        nikkes = nikke.SR
    // 53% R
    } else {
        rarity = "R"
        nikkes = nikke.R 
    }

    return {
        rarity: rarity,
        nikke: nikkes[getRandomNumber(0, nikkes.length - 1)],
    }
}

module.exports = {
    run,
}