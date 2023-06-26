const { Request, Response } = require('express')
const { isBlank, getRandomNumber } = require('../../util/commonUtil.js')
const { commandList, helpMessage} = require('../../const/string.js')
const percentage = require('../../const/percentage.js')
const nikke = require('../../model/nikke.js')

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const run = async (req, res) => {
    let command = req.body.command

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

    command = commandSplit[0]

    if (commandList.help.commands.includes(command)) {
        return res.send({
            code: 0,
            message: "success",
            result: helpMessage,
        })
    } else if (command === "홍련") {
        const isFullCore = commandSplit.length == 2 && ["풀코강", "풀돌", "풀코", "풀코돌"].includes(commandSplit[1])

        let count = 0

        let r = 0
        let sr = 0
        let ssr = 0
        let pilgrim = 0
        let target = 0

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
                target += 1

                if (isFullCore) {
                    if (target == 11) {
                        break
                    }
                } else {
                    break
                }
            }
        }

        let message = ""

        if (isFullCore) {
            message += `지휘관은 홍련이 ${count.toLocaleString()}회 뽑기 만에 풀코강에 성공했어요.\n`
        } else {
            message += `지휘관은 홍련이 ${count.toLocaleString()}회 뽑기 만에 나왔네요\n`
        }

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
        switch (commandSplit.length) {
            case 1:
                return executeGacha(res, 10, false, null)

            case 2:
                const count = Number(commandSplit[1])

                if (!isNaN(count)) {
                    return executeGacha(res, count, false, null)
                }
                break

            default:
                break
        }
    } else {
        // 픽업 가챠 확인
        for (const pickUpGacha of commandList.pickUpGacha.list) {
            if (pickUpGacha.commands.includes(command)) {
                switch (commandSplit.length) {
                    case 1:
                        return executeGacha(res, 10, true, pickUpGacha.nikke)
        
                    case 2:
                        const count = Number(commandSplit[1])

                        if (!isNaN(count)) {
                            return executeGacha(res, count, true, pickUpGacha.nikke)
                        }
                        break
        
                    default:
                        break
                }
            }
        }
    }

    res.send({
        code: -404,
        message: "해당하는 명령어가 없습니다."
    })
}

/**
 * 뽑기 실행 후 res.send 실행
 * @param {Response} res express response 객체 
 * @param {number} count 뽑기 횟수
 * @param {boolean} isPickUp 픽업 뽑기 여부
 * @param {Object} pickUpNikke 픽업 대상 니케
 * @returns 결과 문자열
 */
const executeGacha = (res, count, isPickUp, pickUpNikke) => {
    const items = []

    for (let i = 0; i < count; i++) {
        items.push(gacha(isPickUp, pickUpNikke))
    }

    // 뽑기 10회 초과시
    if (count > 10) {
        res.send({
            code: 0,
            message: "success",
            result: getGachaSimpleMessage(items),
        })
    } else {
        res.send({
            code: 0,
            message: "success",
            result: getGachaMessage(items),
        })
    }
}

/**
 * 뽑기 결과 요약 메시지 출력
 * @param {Array} items 
 */
const getGachaSimpleMessage = (items) => {
    let r = 0
    let sr = 0
    let ssr = 0

    const nikke = {}

    for (const item of items) {
        switch (item.rarity) {
            case "R":
                r += 1
                break

            case "SR":
                sr += 1
                break

            case "SSR":
                ssr += 1

                if (nikke[`[${item.nikke.company}] ${item.nikke.name}`] === undefined) {
                    nikke[`[${item.nikke.company}] ${item.nikke.name}`] = 1
                } else {
                    nikke[`[${item.nikke.company}] ${item.nikke.name}`] += 1
                }
                break

            default:
                break
        }
    }

    let message = ""
    message += `${items.length.toLocaleString()}회 뽑기 시뮬레이션 결과에요 \n`
    message += `R: ${r.toLocaleString()}\n`
    message += `SR: ${sr.toLocaleString()}\n`
    message += `SSR: ${ssr.toLocaleString()}\n`
    message += "\n"

    for (const key in nikke) {
        message += `${key} ${nikke[key]} \n`
    }

    return message.trim()
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

    if (number <= percentage.SSR) {
        if (isPickUp) {
            if (number <= percentage.PICK_UP) {
                return {
                    rarity: "SSR",
                    nikke: pickUpNikke,
                }
            }
        }

        if (number <= percentage.PILGRIM) {
            rarity = "SSR"
            nikkes = nikke.PILGRIM
        } else {
            rarity = "SSR"
            nikkes = nikke.SSR
        }
    } else if (number <= (percentage.SSR + percentage.SR)) {
        rarity = "SR"
        nikkes = nikke.SR
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