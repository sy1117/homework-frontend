import React, { useContext } from 'react'
import WeeklyPresenter from './WeeklyPresenter'
import { ViewContext } from '../../context/ViewContext'
import { EventContext, modifyEvent } from '../../context/EventContext';

const WeeklyContainer = ()=>{
    const { event , dispatch }:{event:any, dispatch:any} = useContext(EventContext);
    const { currentDate } = useContext(ViewContext);

    const dropHandler = (e)=>{
        
        let data = JSON.parse(e.dataTransfer.getData('text')) 
        let { id } = data;
        let {currentTarget:{dataset:{year,month,date,hours}}} = e;
        e.preventDefault();
        let result = confirm(`'${year}/${parseInt(month)+1}/${date} ${hours}시'로 일정을 옮기시겠습니까?`);

        let datetime =new Date(year, month, date, hours).toISOString()
        if(result){
            modifyEvent(id, { datetime })(dispatch)
        }
    }

    const dragOverHandler = (e)=>{
        e.preventDefault();
    }

    return (
    <WeeklyPresenter 
        currentDate = {currentDate}
        data = { event.data }
        onDragOver={dragOverHandler} 
        onDrop={dropHandler}/>
    )
}

export default WeeklyContainer