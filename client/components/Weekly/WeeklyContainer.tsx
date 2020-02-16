import React, { useContext } from 'react'
import WeeklyPresenter from './WeeklyPresenter'
import { ViewContext } from '../../context/ViewContext'
import { EventContext, modifyEvent } from '../../context/EventContext';
import { PopupContext } from '../../context/PopupContext';

const WeeklyContainer = ()=>{
    const { open : openPopup} = useContext(PopupContext);
    const { event , dispatch }:{event:any, dispatch:any} = useContext(EventContext);
    const { currentDate } = useContext(ViewContext);

    const dropHandler : React.DragEventHandler= (e)=>{
        
        let data = JSON.parse(e.dataTransfer.getData('text')) 
        let { id } = data;
        let {currentTarget:{dataset:{year,month,date,hours}}} = e;
        e.preventDefault();

        /**
         * 같은 시간에 이벤트가 있는 경우, 이동 x
         */
        if(e.currentTarget.children.length) return false;
        
        let result = confirm(`'${year}/${parseInt(month)+1}/${date} ${hours}시'로 일정을 옮기시겠습니까?`);

        let datetime = new Date(year, month, date, hours).toISOString()
        if(result){
            modifyEvent(id, { datetime })(dispatch)
        }
    }

    const cellClickHandler: React.MouseEventHandler = (e)=>{
        let {currentTarget:{dataset:{year,month,date,hours}}} = e;
        let currentDate = new Date(year,month,date,hours);
        // 현재 시간을 기본 시간으로 선택
        openPopup({datetime: currentDate.toISOString()});
    }

    const dragOverHandler = (e)=>{
        e.preventDefault();
    }

    return (
    <WeeklyPresenter 
        currentDate = {currentDate}
        data = { event?.data }
        onCellClick={cellClickHandler}
        onDragOver={dragOverHandler} 
        onDrop={dropHandler}/>
    )
}

export default WeeklyContainer