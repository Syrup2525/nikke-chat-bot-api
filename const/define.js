const { command } = require('../config.json')

const gachaCommands = [
    {
        type: "normal",
        description: `일반 10명 모집 시뮬레이션 \n`
                    + `${command}일반뽑기 [뽑기횟수] \n`
                    + `(또는 ${command}뽑)\n `
                    + `예) "!뽑" 또는 "!뽑 100"`,
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
                    + `예) "!마스트" 또는 "!마스트 100"`,
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
    message += "◆ (필독) 경고 없이 추방될 수 있습니다. \n"
    message += "\n"
    message += "- 🚧 기본 매너와 예의를 지킬 것 \n"
    message += "- 🚧 가급적 니케 관련된 이야기만 할 것 \n"
    message += "- 🚫 반말하지 말기, 서로 간 형, 누나, 언니 등의 호칭 및 실명 언급 금지 \n"
    message += "- 🚫 정치, 종교 발언 \n"
    message += "- 🚫 도배, 광고 \n"
    message += "- 🚫 심한 욕설, 성드립, 뇌절, 분탕 및 선넘는 발언, 분위기를 흐리는 언행 \n"
    message += "- 🚫 불법 촬영물, 🔞창작물 등 카카오 오픈 채팅방 정책 위반 행위 \n"
    message += "- 🚫 과도한 시프티 명령어 사용 \n"
    message += "\n"
    message += "🏷️ 미접으로 유니온에서 추방될 경우 오픈채팅방에서도 추방됩니다.\n"
    message += "\n"
    message += "◆ 공지 숙지 이후 닉네임을 인게임 이름으로 변경해주세요."

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