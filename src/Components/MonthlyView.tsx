import React from 'react'

import { daysInMonth } from '../Utils/Date'
import ControlView from './ControlView';

interface IProps {
    date : Date
}

const MonthlyView : React.SFC<IProps>= ({date:current})=>{
    console.log(current)
    const VISABLE_WEEKS = 5;
    // const current = new Date();
    const currentMonth = current.getMonth();
    const currentYear = current.getFullYear();
    let firstDay = (new Date(currentYear, currentMonth)).getDay();
    let _date = 1;

    return (
        <table id={"calendar"}>
            <caption>August 2014</caption>
            {/* <ControlView/> */}
            <tr className={"weekdays"}>
                <th scope="col">Sunday</th>
                <th scope="col">Monday</th>
                <th scope="col">Tuesday</th>
                <th scope="col">Wednesday</th>
                <th scope="col">Thursday</th>
                <th scope="col">Friday</th>
                <th scope="col">Saturday</th>
            </tr>
            {[0,1,2,3,4].map((week)=>(
                <tr className={"days"}>
                    {[0,1,2,3,4,5,6].map((day)=>{
                        if (week === 0 && day < firstDay) {
                            return (<td className={"day other-month"}></td>)
                        }else if (_date > daysInMonth(currentMonth, currentYear)) {
                            return (<td className={"day"}></td>)
                        }else {
                            return (
                            <td className={"day"}>
                                <div className={"date"}>{_date++}</div>
                            </td>
                            )
                        }
                    })}
                </tr>
            ))}
        </table>
    )
}

export default MonthlyView 