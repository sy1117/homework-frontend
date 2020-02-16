import React, { useContext } from 'react'
import EventPresenter from './EventPresenter'
import { PopupContext } from '../../context/PopupContext';
import { PopupMode } from '../../types';


const EventContainer =({data}:{data:any})=>{
    let { id, title, datetime } = data;
    const { open } = useContext(PopupContext);

    const eventDragHandler :React.DragEventHandler = (e)=>{
        e.dataTransfer.setData('text', JSON.stringify(data))
    }

    const eventClickHandler : React.MouseEventHandler= (e)=>{
        e.preventDefault();
        e.stopPropagation();
        open(data);
    }

    return <EventPresenter 
        onClick={eventClickHandler} 
        datetime={datetime}
        title={title}
        onDragStart={eventDragHandler}
    />
}

export default EventContainer;

