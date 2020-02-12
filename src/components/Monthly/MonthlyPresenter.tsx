import React, { useContext } from 'react'
import { daysInMonth } from '../Utils/Date';
import EventItem from './EventItem'
import { WeekDays } from '../types';
import { ViewContext } from '../context/ViewContext'

interface IProps {
    currentDate: Date,
    onDragOver : Function,
    onDrop:Funtion,
}

const MonthlyPresenter : React.SFC<IProps>= ({currentDate, onDragOver, onDrop})=>{

    const VISABLE_WEEKS = 5;
    const MILLISECS_IN_DAY = 1000 * 60 * 60 * 24;
    let year = currentDate.getFullYear(), month = currentDate.getMonth()

    let _startDay = (new Date(year, month)).getDay();
    let _currentDate = new Date( (new Date(year, month, 1)) - MILLISECS_IN_DAY * (_startDay))
    
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
    
    const TDateCell = ({week, day})=>{
        
        let _currentMonthInt = _currentDate.getMonth();
        let _currentDateInt = _currentDate.getDate();
        _currentDate.setTime(_currentDate.getTime() + MILLISECS_IN_DAY)

        return(
            <td className={`day`} 
                key={`${week}-${day}`} 
                onDragOver={onDragOver} 
                onDrop={onDrop}>
                <div className={"date"}>
                    {_currentDateInt === 1 
                        ? `${_currentMonthInt+1}/${_currentDateInt}`
                        : _currentDateInt
                    }
                </div>
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

export default MonthlyPresenter 