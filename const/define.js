const { command } = require('../config.json')

const gachaCommands = [
    {
        type: "normal",
        description: `일반 10명 모집 시뮬레이션 \n`
                    + `${command}일반뽑기 [뽑기횟수] \n`
                    + `(또는 ${command}뽑)\n `
                    + `예) !뽑 또는 !뽑 100`,
        list: [
            {
                commands: ["일반뽑기", "일뽑", "일", "뽑"],
                nikke: null,
            },
        ]
    },
    {
        type: "pickUp",
        description: `픽업 10명 모집 시뮬레이션\n`
                    + `${command}네로 [뽑기횟수]\n`
                    + `예) !마스트 또는 !마스트 100`,
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
]

const helpMessage = () => {
    let message = ""
    message += "< 사용 가능한 명령어 리스트 >\n"
    message += "\n"
    message += "사용 방법 \n"
    message += "- 띄어쓰기에 유의하여 주세요. \n"
    message += "- [] 표시는 선택 사항이에요. \n"
    message += "\n"

    for (const gachaCommand of gachaCommands) {
        message += `▶ ${gachaCommand.description} \n\n`
    }

    return message.trim()
}

const noticeMessage = () => {
    let message = ""
    message += "지휘관, 채팅방 공지를 알려 드릴게요. \n" 
    message += "\n"
    message += "1. 반말하지 말기, 형, 누나, 언니 등 호칭 금지 \n"
    message += "2. 기본 매너와 예의를 지킬 것 \n"
    message += "3. 정치, 종교 발언 금지 \n"
    message += "4. 도배, 광고 금지 \n"
    message += "5. 심한 욕설, 성드립, 뇌절, 분탕 및 선넘는 발언, 분위기를 흐리는 언행 금지 \n"
    message += "6. 매너 채팅 부탁드려요 \n"
    message += "\n"
    message += "공지 숙지 이후 닉네임을 인게임 이름으로 변경해주세요."

    return message
}

const normalCommands = [
    {
        type: "help",
        commands: ["명령어"],
        message: helpMessage(),
    },
    {
        type: "notice",
        commands: ["공지"],
        message: noticeMessage(),
    },
]

module.exports = {
    normalCommands: normalCommands,
    gachaCommands: gachaCommands,
}