const { command } = require('./config.json')

const commandList = {
    help: {
        commands: ["명령어"],
    },
    normalGacha: {
        type: "normalGacha",
        description: `일반 10명 모집 시뮬레이션\n${command}일반뽑기 (또는 ${command}뽑)`,
        commands: ["일반뽑기", "일뽑", "일", "뽑"],
    },
    pickUpGacha: {
        type: "pickUpGacha",
        description: `픽업 10명 모집 시뮬레이션\n[메어리 : 베이 갓데스] ${command}수어리\n[네온 : 블루 오션] ${command}수네온`,
        list: [
            {
                commands: ["수어리"],
                nikke: {
                    company: "TETRA",
                    name: "메어리 : 베이 갓데스",
                },
            },
            {
                commands: ["수네온"],
                nikke: {
                    company: "ELYSION",
                    name: "네온 : 블루 오션",
                },
            }
        ]
    }
}

const helpMessage = () => {
    let message = ""
    message += "< 사용 가능한 명령어 리스트 >\n"
    message += "\n"
    message += "사용 방법 \n"
    message += "- 띄어쓰기에 유의하여 주세요. \n"
    message += "\n"
    message += `▶ ${commandList.normalGacha.description} \n`
    message += "\n"
    message += `▶ ${commandList.pickUpGacha.description}`

    return message
}

module.exports = {
    commandList: commandList,
    helpMessage: helpMessage(),
}