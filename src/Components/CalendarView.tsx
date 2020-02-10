import React from 'react'
import MonthlyView from './MonthlyView';

interface IProps {
    date : Date
}

const CalendarView:React.SFC<IProps> = ({date})=>{
    return (
        <MonthlyView date={date}/>
    )
}

export default CalendarView