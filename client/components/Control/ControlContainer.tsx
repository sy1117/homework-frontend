import React , { useContext } from 'react'
import { ViewContext } from '../../context/ViewContext'
import ControlPresenter from './ControlPresenter'
import { ViewType } from '../../types';

const ControlContainer = ()=>{

    const { viewType, currentDate, changeView, changeDate } = useContext(ViewContext);
    const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;
    const isMonthlyView = viewType === ViewType.MONTHLY;

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let date = currentDate.getDate();

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
        <ControlPresenter {...{ 
            viewType, 
            currentDate, 
            onChangeView :changeView, 
            onPrevHandler : prevHandler,
            onNextHandler : nextHandler 
        }} />
    )

}

export default ControlContainer