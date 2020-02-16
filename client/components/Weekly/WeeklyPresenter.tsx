import React from 'react'
import { getWeek } from '../../utils/Date';
import { WeekDays } from '../../types';
import Event from '../EventItem'

interface IProps {
    currentDate: Date,
    onCellClick: React.MouseEventHandler,
    onDragOver : React.DragEventHandler,
    onDrop: React.DragEventHandler,
    data: Array<any>,
}

const WeeklyPresenter : React.SFC<IProps> = ({data, currentDate, onCellClick, onDragOver, onDrop})=>{
    const [ firstday, lastday ] = getWeek(currentDate);
    let _date = new Date(firstday);

    const MILLISECS_IN_DAY = 1000 * 60 * 60 * 24;
    let _currentDateArr = [0,1,2,3,4,5,6].map((day)=>{
        return new Date(new Date(firstday).getTime() + day * MILLISECS_IN_DAY)
    })

    const THead = ()=>(
    <thead>
        <tr className={"weekly weekdays"}>
            <th scope="col" className={"day"}></th>
            {[0,1,2,3,4,5,6].map((day)=>{
                let _tempMonth = _date.getMonth()+1;
                let _tempDate = _date.getDate();
                _date.setDate(_date.getDate() + 1);
                let weekday : string = WeekDays[day]
                return (
                    <th scope="col" className={"day"} key={day}>
                        {weekday}<br/>{_tempMonth} / {_tempDate}
                    </th>
                )
            })}
        </tr>
    </thead>
    )

    const TDateHourCell = ({day, hours}:{day:number, hours:number})=>{

        let _currentDate = _currentDateArr[day];
        let _currentYearInt = _currentDate.getFullYear();
        let _currentMonthInt = _currentDate.getMonth();
        let _currentDateInt = _currentDate.getDate();
        let _currentHoursInt = parseInt(hours+"");

        let _currentEvents;
        if(data){
            _currentEvents = data.filter(item=>{
                let dateObj = new Date( item.datetime);
                
                return (
                    _currentYearInt === dateObj.getFullYear() && 
                    _currentMonthInt === dateObj.getMonth() && 
                    _currentDateInt === dateObj.getDate() &&
                    _currentHoursInt === dateObj.getHours()
                )
            })
        }

        return(
            <td 
                scope="col" 
                className={"day"} 
                data-year ={_currentYearInt}
                data-month = {_currentMonthInt}
                data-date = {_currentDateInt}
                data-hours={_currentHoursInt}
                onClick={onCellClick}
                onDragOver={onDragOver} 
                onDrop={onDrop}>
                    {_currentEvents?.length ?
                         _currentEvents.map(item=><Event data={item} key={item.id}/>)
                        : ''
                    }
            </td>
        )
    }

    const THourRow = ({hours})=>(
        <tr className={"weekly"} key={hours}>
            <th scope="col" className={"day"}>{hours} 시</th>
            {[0,1,2,3,4,5,6].map((day)=>{
                let temp = _date.getDate();
                // set to next day
                _date.setDate(_date.getDate() + 1);
                return (
                    <TDateHourCell 
                        key={day}
                        day={day}
                        hours={hours} 
                    />
                )
            })}
        </tr>
    )

    const TBody = ()=>(
    <tbody>
        {// 24 hour
        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
            .map(hours=>(<THourRow hours={hours} key={hours}/>))
        }
    </tbody>
    )

    return (
        <>
            <THead/>
            <TBody/>
        </>
    )
}

export default WeeklyPresenter;