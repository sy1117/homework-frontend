# 카카오페이 웹개발 사전과제 (김소영)

## 설치 및 실행 방법
```
npm install
npm start
```

## 개발 환경 
### Frontend
* React
* Parcel 

### Backend
* Sqlite
* TypeORM
* Express

## Folder Structure

# 문제 해결 전략 
[x] Event 데이터 모델 설계 
    ```
    Event { 
        id : int,
        title : text,
        datetime : datetime,
        createdAt : datetime
    }
    ```
[x] Backend RestAPI 구성 
    - GET  /events 이벤트 목록 조회
    - POST /events 이벤트 생성
    - PATCH /events/{:id} 이벤트 수정
    - DELETE /events/{:id} 이벤트 삭제


[x] 컴포넌트 구성 
- App
    - Control 
    - CalendarView 
        - Monthly
        - Weekly
    - EventPopup

[ ] 주요 기능 구현
    [x] 월/주 단위 달력
    [ ] Event 추가/삭제/수정
        [ ] Event 추가/수정 시 날짜/시간 중복 여부의 확인
    [ ] Event dragNdrop
