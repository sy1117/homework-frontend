import React, { useContext } from 'react'
import MonthlyPresenter from './MonthlyPresenter';
import { ViewContext } from '../../context/ViewContext'
import { EventContext, modifyEvent } from '../../context/EventContext';

const MonthlyContainer:React.SFC = ()=>{
    const { currentDate } = useContext(ViewContext);
    const { event , dispatch }:{event:any, dispatch:any} = useContext(EventContext);

    const dropHandler = async (e:DragEvent)=>{
        let id = parseInt(e.dataTransfer.getData('text')) 
        let {currentTarget:{dataset:{year,month,date}}} = e;
        e.preventDefault();
        let result = confirm(`${year}/${parseInt(month)+1}/${date}로 일정을 옮기시겠습니까?`);

        console.log(modifyEvent,  new Date(year,month,date))
        let datetime =new Date(year,month,date).toISOString()
        if(result){
            modifyEvent(id, { datetime })(dispatch)
        }
    }

    const dragOverHandler = (e)=>{
        e.preventDefault();
    }

    return (
        <MonthlyPresenter 
            data = {event.data}
            currentDate={currentDate} 
            onDrop={dropHandler} 
            onDragOver={dragOverHandler}
            />
    )
}

export default MonthlyContainer;