# 웹개발 사전과제 (김소영)

## 설치 및 실행 방법
```
npm install
npm start
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
│   ormconfig.json          
│   tsconfig.json
│
└─── client                 # 클라이언트 소스 (React) 
│   │
│   └─── components         # 화면 요소 
│   │  
│   └─── context            # context 및 reducer 구현 
│   │   │   EventContext    # 일정 데이터의 CRUD action 및 서버 연동
│   │   │   PopupContext    # 일정 추가/수정 팝업 open/close
│   │   │   ViewContext     # 현재 뷰 타입(월,주 달력)
│   │   
│   └─── types              # 자주 사용되는 타입 정의 
│   └─── utils              # 자주 사용되는 유틸성 함수
│      
│   
└───server                  # 백앤드 소스
    │   index.ts            # 
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
}
</code></pre>

* [x] Backend REST API 구성 
    - GET  /events 이벤트 목록 조회
    - POST /events 이벤트 생성
    - PATCH /events/{:id} 이벤트 수정
    - DELETE /events/{:id} 이벤트 삭제

* [x] 컴포넌트 구성 
- App
    - Control 
    - CalendarView 
        - Monthly
        - Weekly
    - EventPopup

* [x] 주요 기능 구현 
    - [x] 월/주 단위 달력
        - [x] 드래그 드랍을 통한 일정 변경 
            - draggable 속성을 통해 일정 요소의 이동
        - [x] 팝업을 통한 일정 추가/삭제/수정
            - [x] 일정 제목, 날짜 및 시간 validation Check
            - [x] 일정 추가/수정 시 날짜/시간 중복 여부의 확인
                - `Event.datetime` 필드의 제약조건(unique)을 사용하여 중복된 일정인 경우, 서버 에러 발생(`Status Code: 409 Conflict`)
                - 서버 에러를 팝업 내 표출

* [ ] 컴포넌트 단위 테스트 
    - [ ]

