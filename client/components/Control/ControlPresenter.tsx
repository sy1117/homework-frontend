import React from 'react'
import { getWeek, yyyymmdd } from '../../utils/Date';
import { ViewType, MonthList } from '../../types'

interface IProps {
    viewType: ViewType, 
    currentDate : Date, 
    onChangeView: Function, 
    onPrevHandler: Function,
    onNextHandler: Function,
}

const ControlPresenter = ({
    viewType, 
    currentDate, 
    onChangeView, 
    onPrevHandler, 
    onNextHandler
})=>{

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let date = currentDate.getDate();
    let [ firstday, lastday ] = getWeek(currentDate);

    const isMonthlyView = viewType === ViewType.MONTHLY;

    return (
        <caption>
            <button onClick={onPrevHandler}>&lt;</button>
            {isMonthlyView
                ?`${MonthList[month]} ${year}`
                : `${yyyymmdd(firstday)} ~ ${yyyymmdd(lastday)}`
            }
            <button onClick={onNextHandler}>&gt;</button>
            <div className={"view-toggle"}>
                <button onClick={onChangeView} disabled={viewType == ViewType.MONTHLY}>월</button>
                <button onClick={onChangeView} disabled={viewType == ViewType.WEEKLY}>주</button>
            </div>
        </caption>
    )
}

export default ControlPresenter