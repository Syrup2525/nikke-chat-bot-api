# Shifty - KakaoTalk Chat Bot API

Swagger 빌드
---
```
npm run predev
```

config.json
---
```json
{
    "command": "<시작 명령어>",
    "swaggerUsers": "<Swagger 접속 아이디> : <Swagger 접속 비밀번호>",
    "customCssUrl": "<Swagger 테마 CSS URL>",
    "apiKey": "API 인증 키 (고정)",
}
```

.env
---
```env
BUILD_MODE=<DEBUG | RELEASE>
API_SERVER_PORT=<사용할 포트 번호 >
SWAGGER_REQUEST_URLS=<스웨거 요청 URL "," 로 구분>
CLUSTER_MODE=<SINGLE | MULTI>
LOG_LEVEL=<error | warn | info | debug | http>
```