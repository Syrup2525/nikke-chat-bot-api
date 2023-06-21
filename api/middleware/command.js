const { Request, Response } = require('express')
const { isBlank } = require('../../util/commonUtil.js')
const { commandList, helpMessage} = require('../../string.js')

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

        switch (command) {
            // 명령어
            case commandList.help:
                return res.send({
                    code: 0,
                    message: "success",
                    result: helpMessage,
                })

            default:
                break
        }
    }

    res.send({
        code: 404,
        message: "해당하는 명령어가 없습니다."
    })
}

module.exports = {
    run,
}