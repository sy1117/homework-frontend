# 웹개발 사전과제 (김소영)

## 설치 및 실행 방법
* 실행
    ```
    npm install
    npm start
    ```
* 개발 모드(Hot Module Reload 적용
    ```
    npm dev
    ```
* 단위 테스트 수행
    ```
    npm test
    ```
* http://localhost:8080 접속 

## 개발 환경 
* Frontend
    * React
    * Parcel
    * axios 
    * Enzyme/Jest
* Backend
    * Sqlite
    * TypeORM
    * Express

* Browser Support
    * Chrome
    * Firefox
    * Safari
    - IE, IE Edge 에서는 다르게 보일 수 있음


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
    ```
    @Entity()
    @Unique(["datetime"])
    export class Event extends BaseEntity{

        @PrimaryGeneratedColumn()
        id: number;

        @Column({type:"text"})
        title: string;

        @Column({type:"datetime"})
        datetime : Date;

        @CreateDateColumn() createdAt: string;
    }
    ```
    - id 는 TypeORM 데코레이터 @PrimaryGeneratedColumn 를 사용하여, identifier의 역할 한다.
    - datetime 컬럼을 @Unique 데코레이터를 사용하여, 중복된 날짜/시간을 가진 일정이 추가되지 못하도록 제약 조건 구성

* [x] Backend REST API 구성 
    - Backend + Frontend 을 하나의 Express 서버로 구성하였으며,
    Backend API 는 `/api` 로 시작함
    - GET  `/api/events` 일정 목록 조회
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
    - POST `/api/events`일정 생성
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
    - PATCH `/api/events/{:id}` 일정 수정
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
    - DELETE `/api/events/{:id}` 일정 삭제
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
    -  기능 단위로 아래의 컴포넌트로 구성
        - Control : 캘린더 타입(월/주), 날짜 범위를 변경할 수 있는 컴포넌트 
            - Monthly : 월 달력 컴포넌트
            - Weekly : 주 달력 컴포넌트 
        - EventItem : 월/주 달력 칸 안에 표시되는 일정 컴포넌트
        - EventPopup : 일정 추가/수정/삭제를 위한 팝업
            - 팝업 open 시나리오 
                - EventItem 을 클릭할 경우, `open` 함수 호출 시, 해당 object 를 인자로 전달
                - Monthly/Weekly 의 td 클릭 시, `open` 함수 호출 시, 해당하는 날짜 및 시간을 데이터를 object 로 생성하여 인자로 전달
            - 팝업의 구분
                - *새 일정* : `data.id` 속성이 없는 경우, 취소/저장 버튼을 가진다
                - *일정 편집* : `data.id` 속성이 있는 경우, 취소/삭제/저장 버튼을 가진다
            

    - client/componets 하위에 컴포넌트 이름의 폴더(ex. `client/components/Monthly`) 로 구성되어 있으며, _Container + Pressenter Pattern_ 으로 개발함
        - Container 는 기능(logic), 데이터 연동과 관계 있으며, Presenter 은 prop에 따른 표현 방식과 관계 있음
        - 기능과 표현을 구분하여 개발하는 패턴


* [x] Reducer 를 통한 '일정' 컨텍스트 관리 
    - 과제의 요건에서 애플리케이션의 다중 접근에 대해서는 명시되어 있지 않아, 현재 애플리케이션에서는 단일 접근만 발생한다고 가정
        - 새 창으로 페이지를 띄워 일정 추가/삭제/수정을 할 경우, 원래 띄워 있던 화면은 새로고침 없이는 데이터가 변경이 보이지 않음
        - 실시간으로 반영되고자 할 경우, socket 통신으로 추가 구현 필요 
    - reducers
        - getEvents : 전체 일정을 서버에 요청하고,  성공 시 Response로 받아온 일정 목록을 컨텍스트에 반영
        - addEvent : 일정 추가를 서버에 요청하고, 성공 시 Response로 받아온 객체를 일정 목록에 추가 
        - modifyEvent : 일정 변경을 서버에 요청하여, 성공 시 Response 로 받아온 객체로 해당 일정 데이터에 업데이트
        - deleteEvent : 일정 삭제를 서버에 요청하고, 성공 시 해당 데이터를 일정 목록에서 제거 
        

* [x] 일정 추가/수정 시 날짜 및 시간 중복 여부의 확인
    - 클라이언트에서 처리할 경우, 일정 갯수가 많아지면 사용자의 액션에 delay 를 줄 가능성 있음 
    - 따라서 서버에 요청을 보내고, 그에 대한 응답 코드를 통해 중복 여부 확인 및 처리 
        - 정상 => `Status Code: 200 Ok`
        - 중복된 일정인 경우 => (`Status Code: 409 Conflict`)

* [x] Enzyme/Jest 기반의 컴포넌트 단위 테스트 작성
    - Container 안에서 컨텍스트 값을 참조하도록 개발되어 있어서,
    컨텍스트 선언 없이는 컴포넌트 렌더링이 불가능했다.
    - 일정 데이터를 관리하기 위해, React Context 안에 state와 dispatch 를 넣고 사용하고 었는데 이 부분으로 인해 단위 테스트 작성에 어려움이 있었음
    - 단위 테스트를 개발 완료 후에 작성한 부분이 아쉬운 부분임 



