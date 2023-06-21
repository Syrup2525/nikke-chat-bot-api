const { Request, Response } = require('express')
const { startsWithCommand } = require('../../config.json')
const { isBlank } = require('../../util/commonUtil.js')

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

    if (!command.startsWith(startsWithCommand)) {
        return res.status(400).send({
            message: `command 값은 ${startsWithCommand} 으로 시작되어야 합니다.`
        })
    }

    res.send({
        code: 0,
        message: "success",
        result: "",
    })
}

module.exports = {
    run,
}