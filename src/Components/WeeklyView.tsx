import React from 'react'
import { getWeek } from '../utils/Date';
import { WeekDays } from '../types';

interface IProps {
    year : number,
    month : number,
    date : number,
}

const WeeklyView : React.SFC<IProps> = ({year, month, date})=>{
    console.log(year, month, date)
    const [ firstday, lastday ] = getWeek(new Date(year, month, date));
    // let firstDay = (new Date(currentYear, currentMonth)).getDay();
    let _date = new Date(firstday);

    return (
        <>
            <tr className={"weekly weekdays"}>
                <th scope="col" className={"day"}></th>
                {[0,1,2,3,4,5,6].map((day)=>{
                    // let _date = new Date(firstday);
                    let _tempMonth = _date.getMonth()+1;
                    let _tempDate = _date.getDate();
                    _date.setDate(_date.getDate() + 1);
                    let weekday : string = WeekDays[day]
                    return (
                        <th scope="col" className={"day"} key={day}>
                            {weekday}<br/>
                            {_tempMonth} / {_tempDate}
                        </th>
                    )
                })}
            </tr>
            {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,].map((hours)=>{
                return (
                    <tr className={"weekly"}>
                        <th scope="col" className={"day"}>{hours} 시</th>
                        {[0,1,2,3,4,5,6].map((day)=>{
                            let temp = _date.getDate();
                            _date.setDate(_date.getDate() + 1);
                            
                            return (
                                <td scope="col" className={"day"} key={day}>
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
        </>
    )
}

export default WeeklyView;