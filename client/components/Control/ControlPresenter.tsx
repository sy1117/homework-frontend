import React from 'react'
import { getWeek, yyyymmdd } from '../../utils/Date';
import { ViewType, MonthList } from '../../types'

const ControlPresenter = ({viewType, currentDate, changeDate, changeView})=>{

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let date = currentDate.getDate();
    let [ firstday, lastday ] = getWeek(currentDate);
    
    const isMonthlyView = viewType === ViewType.MONTHLY;
    const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

    const prevHandler = ()=>{
		if(isMonthlyView){
			if(month === 0) changeDate(new Date(year-1, 11, date))
			else changeDate(new Date(year, month-1, date))
		}else{
            let sevenDaysAgo = new Date(currentDate - SEVEN_DAYS); // 7 days ago
            changeDate(sevenDaysAgo)
		}
	}

	const nextHandler = ()=>{
		if(isMonthlyView){
            if(month ===11) changeDate(new Date(year+1, 0, date))
			else changeDate(new Date(year, month+1, date))
		}else{
            let _temp = currentDate.getTime();
			changeDate(new Date(_temp + SEVEN_DAYS));
		}
	}
    return (
        <caption>
            <button onClick={prevHandler}>&lt;</button>
            {isMonthlyView
                ?`${MonthList[month]} ${year}`
                : `${yyyymmdd(firstday)} ~ ${yyyymmdd(lastday)}`
            }
            <button onClick={nextHandler}>&gt;</button>
            <div className={"view-toggle"}>
                <button onClick={changeView} disabled={viewType == ViewType.MONTHLY}>월</button>
                <button onClick={changeView} disabled={viewType == ViewType.WEEKLY}>주</button>
            </div>
        </caption>
    )
}

export default ControlPresenter