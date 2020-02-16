# 웹개발 사전과제 (김소영)

## 설치 및 실행 방법
* 실행
```
npm install
npm start
```
* 개발 모드
    - hmd 적용
```
npm dev
```
* 단위 테스트
```
npm test
```

## 개발 환경 
* Frontend
    * React
    * Parcel 
* Backend
    * Sqlite
    * TypeORM
    * Express

### Folder Structure
```
.
│   index.html              # parcel 빌드의 진입 파일 
│   README.md               
│   ormconfig.json          # ORM 설정 
│   tsconfig.json           # Typescript 설정 
│
└─── client                 # 클라이언트 소스 (React) 
│   │
│   └─── components         # 화면 요소를 구성하는 React Component
│   │   │                   # 하나의 폴더가 기능적 컴포넌트로 구분
│   │   │  {cpnt_name}
│   │   │      index.ts                  # 모듈 export(import 편의를 위한 구성)
│   │   └───   {cpnt_name}Presenter.tsx  # 컴포넌트의 표현 구현
│   │   └───   {cpnt_name}Container.tsx  # 컴포넌트 기능 구현
│   │  
│   └─── context            # context 및 reducer 구현 
│   │   │   EventContext    # 일정 데이터의 CRUD action 및 서버와의 연동
│   │   │   PopupContext    # 일정 추가/수정 팝업 open/close
│   │   │   ViewContext     # 현재 뷰 타입(월,주 달력)
│   │   
│   └─── types              # 자주 사용되는 타입 정의 
│   └─── utils              # 자주 사용되는 유틸성 함수
│      
│   
└───server                  # 백앤드 소스
    │   index.ts            # express 서버 구현 
    │   routes.ts           # REST API와 컨트롤러 연결 설정 
    │  
    └─── controller         # 데이터 컨트롤러 
    │   │   Event.ts        
    │     
    └─── entity             # 모델 설계
        │   Event.ts        

```


## 문제 해결 전략 

* [x] Event 데이터 모델 설계 
    <pre><code>
    Event { 
        id : int,               # @PrimaryGeneratedInt
        title : text,           # 일정 타이틀
        datetime : datetime,    # 일정 날짜/시간, @Unique
        createdAt : datetime    # 생성 날짜/시간
    }</code></pre>

* [x] Backend REST API 구성 
    - GET  `/events` 일정 목록 조회
       - Response
            ```
            [
                {
                    "id":3,
                    "title":"meeting",
                    "datetime":"2020-01-28T16:00:00.000Z",
                    "createdAt":"2020-02-15T07:22:28.000Z"
                }, {...},{...}
            ]
            ```
    - POST `/events`일정 생성
        - Request
            ```
            {
                "title" :"meeting",
                "datetime" :"2020-02-01T15:00:00.000Z"
            }
            ```
        - Response
            ```
            {
                "id" : 2
                "title" :"meeting",
                "datetime" :"2020-02-01T15:00:00.000Z",
                "createdAt" : "2020-02-01T15:00:00.000Z"
            }
            ```
    - PATCH `/events/{:id}` 일정 수정
        - Request `/events/1`
            ```
            {
                "title" :"meeting modified",
                "datetime" :"2020-02-01T15:00:00.000Z",
            }
            ```
        - Response
            ```
            {
                "id" : 1
                "title" :"metting modified",
                "datetime" :"2020-02-01T15:00:00.000Z",
                "createdAt" : :"2020-02-01T15:00:00.000Z"
            }
            ```
    - DELETE `/events/{:id}` 일정 삭제
        - Request `/events/1`
        - Response
            ```
            {
                "title" :"metting modified",
                "datetime" :"2020-02-01T15:00:00.000Z",
                "createdAt" : :"2020-02-01T15:00:00.000Z"
            }
            ```

* [x] 컴포넌트 구성 
- App
    - Control : 캘린더 타입(월/주), 날짜 범위를 변경할 수 있는 컴포넌트 
        - Monthly : 월 달력 컴포넌트
        - Weekly : 주 달력 컴포넌트 
            - EventItem : 월/주 달력 칸 안에 표시되는 일정 컴포넌트
    - EventPopup : 일정 추가/수정/삭제를 위한 팝업

* [x] Reducer 를 통한 '일정' 컨텍스트 관리 
    - getEvents : 전체 일정을 서버에 요청하고,  성공 시 Response로 받아온 일정 목록을 컨텍스트에 반영
    - addEvent : 일정 추가를 서버에 요청하고, 성공 시 Response로 받아온 객체를 일정 목록에 추가 
    - modifyEvent : 일정 변경을 서버에 요청하여, 성공 시 Response 로 받아온 객체로 해당 일정 데이터에 업데이트
    - deleteEvent : 일정 삭제를 서버에 요청하고, 성공 시 해당 데이터를 일정 목록에서 제거 
        

* [x] UI 기능 구현 
    - [x] 월/주 단위 달력
        - [x] 드래그 드랍을 통한 일정 변경 
            - draggable 속성을 통해 드래그드랍 기능 구현
            - drag 이벤트 발생 시, `e.dataTransfer = JSON.stringify(eventDataObj)` 를 통해 데이터 전달
        - [x] 팝업을 통한 일정 추가/삭제/수정
            - [x] 일정 제목, 날짜 및 시간 validation Check 는 HTML Validations 기능을 통해 구현
            - [x] 일정 추가/수정 시 날짜/시간 중복 여부의 확인
                - `Event.datetime` 필드의 제약조건(unique)을 사용하여 중복된 일정인 경우, 서버 에러 발생(`Status Code: 409 Conflict`)
                - 서버 에러 발생 시, 팝업 내 표출

* [x] 컴포넌트 단위 테스트 
    - [x] Enzyme/Jest 기반의 단위 테스트 작성


