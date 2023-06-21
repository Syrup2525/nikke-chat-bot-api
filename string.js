const helpMessage = () => {
    let message = ""
    message += "< 사용 가능한 명령어 리스트 >\n"
    message += "\n"
    message += "(~˘▾˘)~♫•*¨*•.¸¸♪\n"
    message += "\n"
    message += "사용 방법 \n"
    message += "- 띄어쓰기에 유의하여 주세요. \n"
    message += "\n"
    message += "(~˘▾˘)~♫•*¨*•.¸¸♪ \n"
    message += "\n"
    message += "일반뽑기 시물레이션 \n"
    message += "=일반뽑기 (또는 =뽑) \n"
    message += "\n"
    message += "픽업뽁기 시뮬레이션 \n"
    message += "=픽업뽑기 (또는 =픽) \n"

    return message
}

module.exports = {
    commandList: {
        help: ["명령어"],
        normalGacha: ["일반뽑기", "뽑"]
    },
    helpMessage: helpMessage(),
}