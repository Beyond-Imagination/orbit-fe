# Orbit

>  Orbit은 [Slack Reminder](https://slack.com/intl/ko-kr/resources/using-slack/how-to-use-reminders-in-slack)에서 영감을 받아 탄생하였습니다.

orbit은 `space marketplace app`으로 space에 예약메시지 기능을 추가하는 project 입니다.



예약 메세지 등록은 2가지 타입을 제공합니다.

* `cron expression`
    * 등록 예시는 [여기](https://crontab.guru/examples.html)를 참고해주세요
* `weekly`
    * 특정 `요일` 과 `시간`에 예약 메세지를 발송합니다.



---



필수 등록 정보는 아래와 같습니다.

* `channelName` : 메세지를 보낼 채널의 이름 (기존 채널에만 예약 메세지 전송 예약 가능)
* `timezone`: 메세지를 전송할 시각에 대한 timezone 정보
* `message`: 예약 메세지의 content
* `type (cron 또는 weekly)`
    * `date, time`  (type이 weekly일 경우)
    * `cron` (type이 cron일 경우)



---

#### 등록 예시

* cron
    * <img src="https://raw.githubusercontent.com/joonamin/UpicImageRepo/master/uPic/Screenshot 2024-04-28 at 3.56.09 PM.png" alt="Screenshot 2024-04-28 at 3.56.09 PM" style="zoom:80%;" />

* weekly
    * <img src="https://raw.githubusercontent.com/joonamin/UpicImageRepo/master/uPic/Screenshot%202024-04-28%20at%203.58.04%E2%80%AFPM.png" alt="Screenshot 2024-04-28 at 3.58.04 PM" style="zoom:80%;" />



## 프로젝트 설명
### tech stack
[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1714288025635?alt=media&token=ac480fad-096c-4f90-abf0-17179bec9e8a)](https://github.com/msdio/stackticon)

### prerequisites

* `node.js` 18.17
* `yarn`



### config

실행을 위해서 .env 설정이 필요합니다.  
자세한 값들은 프로젝트 문서를 확인해주시기 바랍니다. ([문서](https://beyond-imagination.jetbrains.space/documents/R98H81SkA4o))

```shell
cp .env.template .env
```



### getting started

```shell
yarn install
yarn dev
```