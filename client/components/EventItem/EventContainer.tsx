import React, { useContext } from 'react'
import EventPresenter from './EventPresenter'
import { PopupContext } from '../../context/PopupContext';
import { PopupMode } from '../../types';


const EventContainer =({data}:{data:any})=>{
    let { id, title, datetime } = data;
    const { open } = useContext(PopupContext);

    const onDragStart = (e)=>{
        e.dataTransfer.setData('text', JSON.stringify(data))
    }

    const eventClickHandler = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        open(data);
    }

    return <EventPresenter 
        onClick={eventClickHandler} 
        {... {datetime, title, id, onDragStart}}/>
}

export default EventContainer;

