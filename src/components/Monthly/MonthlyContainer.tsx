import React, { useContext } from 'react'
import MonthlyPresenter from './MonthlyPresenter';
import { ViewContext } from '../../context/ViewContext'
import { EventContext, modifyEvent } from '../../context/EventContext';
import { PopupContext } from '../../context/PopupContext';
import { PopupMode } from '../../types';

const MonthlyContainer:React.SFC = ()=>{
    const { currentDate } = useContext(ViewContext);
    const { event , dispatch }:{event:any, dispatch:any} = useContext(EventContext);
    const { open : openPopup} = useContext(PopupContext);

    const dropHandler = async (e:DragEvent)=>{
        e.preventDefault();

        let data = JSON.parse(e.dataTransfer.getData('text'))
        let { id, hours } = data;
        let {currentTarget:{dataset:{year,month,date}}} = e;

        let result = confirm(`${year}/${parseInt(month)+1}/${date}로 일정을 옮기시겠습니까?`);
        let datetime = new Date(year,month,date,hours).toISOString();

        if(result){
            modifyEvent(id, { datetime })(dispatch)
        }
    }

    const dragOverHandler = (e)=>{
        e.preventDefault();
    }

    const dateClickHandler = (e)=>{
        let {currentTarget:{dataset:{year,month,date}}} = e;
        let currentDate = new Date(year,month,date);
        // 현재 시간을 기본 시간으로 선택
        // currentDate.setHours(new Date().getHours())
        openPopup({datetime: currentDate.toISOString()});
    }

    return (
        <MonthlyPresenter 
            data = {event.data}
            currentDate={currentDate} 
            onClickDate={dateClickHandler}
            onDrop={dropHandler} 
            onDragOver={dragOverHandler}
            />
    )
}

export default MonthlyContainer;