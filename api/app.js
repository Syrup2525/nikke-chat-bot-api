const { swaggerUsers, customCssUrl } = require('../config.json')
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const expressBasicAuth = require('express-basic-auth')
const path = require('path')
const YAML = require('yamljs')
const { v4: uuidv4 } = require('uuid')

const logger = require('../logger.js')
const { getLogData } = require('../util/commonUtil.js')

module.exports = () => {
    // exporess 객체 생성
    let app = express();
    app.use(express.json())

    app.use(function (req, res, next) {
        // 요청이 허용되는 URL을 route을 제외하고 적습니다. 이외의 URL로 부터 오는 요청은 거절됩니다. 단 *은 모든 요청을 허가시킵니다.
        res.header('Access-Control-Allow-Origin', '*')
        // 요청이 허용되는 HTTP verb 목록을 적습니다. 여기에 포함되지 않은 HTTP verb의 요청은 거절됩니다. *을 사용할 수 없습니다.
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
        // 요청이 허용되는 HTTP header 목록을 적습니다. 여기에 포함되지 않은 HTTP header는 사용할 수 없습니다. *을 사용할 수 없습니다.
        res.header('Access-Control-Allow-Headers', 'content-type, x-access-token')

        next()
    })

    // root path 설정
    app.get('/', (req, res) => {
        res.status(406).end()
    })

    /* Swagger */
    // swagger 는 별도 인증 로직 없음
    app.use('/api-docs',
        expressBasicAuth({
            challenge: true,
            users: swaggerUsers,
        }),
    )

    const swaggerSpec = YAML.load(path.join(__dirname, '../build/swagger.yaml'))

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        customCssUrl: customCssUrl,
    }))

    /* Client */
    // const check = require('./middleware/check.js')

    // 버전체크 (강제 업데이트)
    // app.use('/', check.header)
    app.use('/', (req, res, next) => {
        res.requestCode = uuidv4()

        logger.http(`[API] [Request]\n%s`, getLogData({
            url: req.url,
            method: req.method,
            header: {
                osType: req.header('OsType'),
                osVersion: req.header('OsVersion'),
                appVersion: req.header('AppVersion'),
                deviceName: req.header('DeviceName'),
                token: req.header('Authorization'),
                fcmToken: req.header('FcmToken'),
            },
            query: req.query,
            body: req.body,
            parmas: req.params,
            requestCode: res.requestCode,
            clusterId: process.pid
        }, false))

        next()
    })

    app.use('/', (req, res, next) => {
        let send = res.send
        res.send = c => {
            res.send = send
            res.send(c)

            return logger.http(`[API] [Response]\n%s`, getLogData({
                url: req.originalUrl,
                method: req.method,
                requestCode: res.requestCode,
                clusterId: process.pid,
                statusCode: res.statusCode,
                data: c
            }))
        }

        next()
    })

    app.all('*', (req, res) => {
        res.status(400).send({
            message: "Invalid Request"
        })
    })

    return app
}