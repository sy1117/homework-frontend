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

    const dropHandler:React.DragEventHandler = async (e:React.DragEvent<HTMLElement>)=>{
        e.preventDefault();

        let data = JSON.parse(e.dataTransfer.getData('text'))
        let { id, datetime } = data;
        let {currentTarget:{dataset:{year,month,date}}} = e;


        /**
         * 같은 날짜인 경우, 이동 x
         */
        let originDate = new Date(datetime);
        let hours = originDate.getHours();
        if(
            originDate.getDate()==parseInt(date) && 
            originDate.getMonth()==parseInt(month) && 
            originDate.getFullYear()== parseInt(year)
        ) return false;


        /**
         * 날짜 확인
         */
        if(confirm(`${year}/${parseInt(month)+1}/${date}로 일정을 옮기시겠습니까?`)){
            let changedDatetime = new Date(parseInt(year),parseInt(month),parseInt(date),hours).toISOString();
            let res = await modifyEvent(id, { datetime: changedDatetime })(dispatch)
            if(!res) alert("중복된 일정입니다. 일정을 옮길 수 없습니다")
        }            

    }

    const dragOverHandler:React.DragEventHandler = (e)=>{
        e.preventDefault();
    }

    const dateClickHandler:React.MouseEventHandler = (e:React.MouseEvent<HTMLInputElement>):void=>{
        let {currentTarget:{dataset:{year,month,date}}} = e;
        let currentDate = new Date(parseInt(year),parseInt(month),parseInt(date));
        // 현재 시간을 기본 시간으로 선택
        // currentDate.setHours(new Date().getHours())
        openPopup({datetime: currentDate.toISOString()});
    }

    return (
        <MonthlyPresenter 
            data = {event?.data}
            currentDate={currentDate} 
            onClickDate={dateClickHandler}
            onDrop={dropHandler} 
            onDragOver={dragOverHandler}
            />
    )
}

export default MonthlyContainer;