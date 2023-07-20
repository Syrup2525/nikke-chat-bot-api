const { command } = require('../config.json')

const commandList = {
    help: {
        commands: ["명령어"],
    },
    normalGacha: {
        type: "normalGacha",
        description: `일반 10명 모집 시뮬레이션\n${command}일반뽑기 [뽑기횟수] \n(또는 ${command}뽑)\n예) !뽑 100`,
        commands: ["일반뽑기", "일뽑", "일", "뽑"],
    },
    pickUpGacha: {
        type: "pickUpGacha",
        description: `픽업 10명 모집 시뮬레이션\n${command}네로 [뽑기횟수]\n예) !네로 100`,
        list: [
            {
                commands: ["마스트", "센쵸"],
                nikke: {
                    company: "ELYSION",
                    name: "마스트",
                },
            },
        ]
    }
}

const helpMessage = () => {
    let message = ""
    message += "< 사용 가능한 명령어 리스트 >\n"
    message += "\n"
    message += "사용 방법 \n"
    message += "- 띄어쓰기에 유의하여 주세요. \n"
    message += "- [] 표시는 선택 사항이에요. \n"
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