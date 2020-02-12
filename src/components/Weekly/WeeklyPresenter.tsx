import React from 'react'
import { getWeek } from '../../utils/Date';
import { WeekDays } from '../../types';
import Event from '../Event'

const WeeklyPresenter : React.SFC<IProps> = ({currentDate, onDragOver, onDrop})=>{
    const [ firstday, lastday ] = getWeek(currentDate);
    let _date = new Date(firstday);

    const THead = ()=>(
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
    )

    const TDateHourCell = ({date, day, hours})=>(
        <td 
            scope="col" 
            className={"day"} 
            key={day} 
            onDragOver={onDragOver} 
            onDrop={onDrop}>
            {/* <EventItem id={`t-${date}-${day}`}/> */}
        </td>
    )

    const THourRow = ({hours})=>(
        <tr className={"weekly"} key={hours}>
            <th scope="col" className={"day"}>{hours} 시</th>
            {[0,1,2,3,4,5,6].map((day)=>{
                let temp = _date.getDate();
                _date.setDate(_date.getDate() + 1);
                return (<TDateHourCell date={_date} day={day} hours={hours} key={`date-${day}-${hours}`}/>)
            })}
        </tr>
    )

    const TBody = ()=>(
    <tbody>
        {// 24 hour
        [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
            .map(hours=>(<THourRow hours={hours}/>))
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