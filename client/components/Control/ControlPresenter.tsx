import React from 'react'
import { getWeek, yyyymmdd } from '../../utils/Date';
import { ViewType, MonthList } from '../../types'
import Monthly from '../Monthly'
import Weekly from '../Weekly'

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
    <table id={"calendar"}>
        <caption>
            <button onClick={onPrevHandler}>&lt;</button>
            {isMonthlyView
                ?`${MonthList[month]} ${year}`
                : `${yyyymmdd(firstday)} ~ ${yyyymmdd(lastday)}`
            }
            <button onClick={onNextHandler}>&gt;</button>
            <div className={"view-toggle"}>
                <button data-testid="btn-monthly" onClick={onChangeView} disabled={viewType == ViewType.MONTHLY}>월</button>
                <button data-testid="btn-weekly" onClick={onChangeView} disabled={viewType == ViewType.WEEKLY}>주</button>
            </div>
        </caption>
        {viewType === ViewType.MONTHLY ? <Monthly/> : <Weekly/>}
    </table>   
    )
}

export default ControlPresenter