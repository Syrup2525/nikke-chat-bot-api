const { Request, Response } = require('express')
const { isBlank } = require('../../util/commonUtil.js')
const { apiKey } = require('../../config.json')

require('dotenv').config()

/**
 *  Header 토큰 인증 체크
 * @param {Request} req 
 * @param {Response} res 
 * @param {*} next 
 * @returns 
 */
const header = async (req, res, next) => {
    if (process.env.BUILD_MODE == "DEBUG") {
        return next()
    }

    let authKey = req.header('Authorization')

    // authKey 값이 비어있지 않다면
    if (!isBlank(authKey)) {
        // Bearer 로 시작하는지 검사
        if (authKey.startsWith('Bearer ')) {
            authKey = authKey.split('Bearer ')[1]
        } else { // Bearer 로 시작안하면 없다고판단
            authKey = undefined
        }
    }

    // authKey 비어있는경우
    if (isBlank(authKey)) {
        return res.status(401).send({
            message: "인증 정보가 존재하지 않습니다."
        })
    }

    // 인증키 일치 여부 확인
    if (apiKey !== authKey) {
        return res.status(401).send({
            message: "인증 정보가 존재하지 않습니다."
        }) 
    }

    next()
}

module.exports = {
    header,
}