import React, { useContext } from 'react'
import { daysInMonth } from '../../Utils/Date';
import Event from '../EventItem'
import { WeekDays } from '../../types';
import { ViewContext } from '../../context/ViewContext'

interface IProps {
    currentDate: Date,
    onClickDate : Function,
    onDragOver : Function,
    onDrop:Funtion,
    data: Array,
}

const MonthlyPresenter : React.SFC<IProps>= ({currentDate, onDragOver, onClickDate, onDrop, data})=>{

    const VISABLE_WEEKS = 5;
    const MILLISECS_IN_DAY = 1000 * 60 * 60 * 24;
    let year = currentDate.getFullYear(), month = currentDate.getMonth()

    let _startDay = (new Date(year, month)).getDay();
    let _currentDate = new Date( (new Date(year, month, 1)) - MILLISECS_IN_DAY * (_startDay))
    
    const THead = ()=>(
        <thead>
            <tr className={"weekdays"}>
                <th scope="col">Sunday</th>
                <th scope="col">Monday</th>
                <th scope="col">Tuesday</th>
                <th scope="col">Wednesday</th>
                <th scope="col">Thursday</th>
                <th scope="col">Friday</th>
                <th scope="col">Saturday</th>
            </tr>
        </thead>
    )     

    
    const TDateCell = ({week, day})=>{

        let _currentYearInt = _currentDate.getFullYear();
        let _currentMonthInt = _currentDate.getMonth();
        let _currentDateInt = _currentDate.getDate();
        _currentDate.setTime(_currentDate.getTime() + MILLISECS_IN_DAY);


        // [todo] filtering 개선
        let _currentEvents = false;
        if(data){
            _currentEvents = data.filter((item)=>{
                let dateObj = new Date(item.datetime);
                return (
                    _currentYearInt === dateObj.getFullYear() && 
                    _currentMonthInt === dateObj.getMonth() && 
                    _currentDateInt === dateObj.getDate()
                )
            }).sort(function (a, b) { 
                let ahours = new Date(a.datetime).getHours();
                let bhours = new Date(b.datetime).getHours();
                return ahours - bhours  
            });
        }

        return(
            <td 
                className={`day`} 
                data-year={_currentYearInt}
                data-month={_currentMonthInt}
                data-date={_currentDateInt}
                key={`${week}-${day}`} 
                onClick={onClickDate}
                onDragOver={onDragOver} 
                onDrop={onDrop}>
                <div className={"date"}>
                    {_currentDateInt === 1 
                        ? `${_currentMonthInt+1}/${_currentDateInt}`
                        : _currentDateInt
                    }
                </div>
                {_currentEvents.length 
                    ? _currentEvents.map(item=><Event data={item} key={`event--${item.id}`}/>
                    :''
                }
            </td>
        )
    }

    const TBody = ()=>(
        <tbody>
            {[0,1,2,3,4].map((week)=>( 
                <tr className={"days"} key={week}>
                    {[0,1,2,3,4,5,6].map((day)=><TDateCell week={week} day={day} key={`monthly-${week}-${day}`}/>)}
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