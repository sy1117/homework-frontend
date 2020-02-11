import React from 'react'
import { daysInMonth } from '../Utils/Date';
import EventItem from './EventItem'
import { WeekDays } from '../types';

interface IProps {
    year : number,
    month : number,
}

const MonthlyView : React.SFC<IProps>= ({year:currentYear, month:currentMonth})=>{
    
    const THead = ()=>(
        <>
            <tr className={"weekdays"}>
                <th scope="col">Sunday</th>
                <th scope="col">Monday</th>
                <th scope="col">Tuesday</th>
                <th scope="col">Wednesday</th>
                <th scope="col">Thursday</th>
                <th scope="col">Friday</th>
                <th scope="col">Saturday</th>
            </tr>
        </>
    )

    const dropHandler = (e)=>{
        e.preventDefault();
        console.log("drop", e.dataTransfer.getData("text"));
    }

    const dragOverHandler = (e)=>{
        e.preventDefault();
    }

        
    const VISABLE_WEEKS = 5;
    const MILLISECS_IN_DAY = 1000 * 60 * 60 * 24;
    let _startDay = (new Date(currentYear, currentMonth)).getDay();
    let _currentDate = new Date( (new Date(currentYear, currentMonth, 1)) - MILLISECS_IN_DAY * (_startDay))
    
    const TDateCell = ({week, day})=>{
        
        let _currentMonthInt = _currentDate.getMonth();
        let _currentDateInt = _currentDate.getDate();
        // set to Next Day
        _currentDate.setTime(_currentDate.getTime() + MILLISECS_IN_DAY)

        return(
            <td className={`day`} 
                key={`${week}-${day}`} 
                onDragOver={dragOverHandler} 
                onDrop={dropHandler}>
                <div className={"date"}>
                    {_currentDateInt}
                </div>
                <EventItem id={"tes"}/>    
            </td>
        )
    }


    const TBody = ()=>(
        <tbody>
            {[0,1,2,3,4].map((week)=>( 
                <tr className={"days"} key={week}>
                    {[0,1,2,3,4,5,6].map((day)=><TDateCell week={week} day={day}/>)}
                </tr>
            ))}
        </tbody>
    )
        

    return (
        <>
            <THead/>
            <TBody/>
        </>
    )
}

export default MonthlyView 