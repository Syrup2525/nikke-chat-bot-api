const fs = require('fs')
const logger = require('./logger')

require('dotenv').config()

// 파일 읽기
fs.readFile('build/swagger.yaml', 'utf8', function (err, data) {
    if (err) {
        return logger.error(err)
    }

    let urlData = ""
    let serverCount = 0

    const urls = process.env.SWAGGER_REQUEST_URLS.split(',')

    for (const url of urls) {
        serverCount += 1

        urlData += `  - url: ${url}\n`
        urlData += `    description: server${serverCount}\n`
    }

    // 파일 내용 수정
    const newData = data.replace("  - url: '${SERVER_URL}'", urlData)

    // 파일 저장
    fs.writeFile('build/swagger.yaml', newData, (err) => {
        if (err) return logger.error(err)
    })
})