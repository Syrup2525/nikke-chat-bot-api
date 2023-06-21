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

        if (commandList.help.includes(command)) {
            return res.send({
                code: 0,
                message: "success",
                result: helpMessage,
            })
        } else if (commandList.normalGacha.includes(command)) {
            return res.send({
                code: 0,
                message: "success",
                result: normalGacha(),
            })
        }
    }

    res.send({
        code: 404,
        message: "해당하는 명령어가 없습니다."
    })
}

const normalGacha = () => {
    let number = getRandomNumber(1, 100)

    let rarity = []

    // 4% SSR
    if (number <= 4) {
        number = getRandomNumber(1, 1000)

        // 0.5% 필그림
        if (number <= 5) {
            rarity = nikke.PILGRIM
        // 99.5% SSR
        } else {
            rarity = nikke.SSR
        }
    // 43% SR
    } else if (number <= 47) {
        rarity = nikke.SR
    // 53% R
    } else {
        rarity = nikke.R 
    }

    return rarity[getRandomNumber(0, rarity.length - 1)]
}

module.exports = {
    run,
}