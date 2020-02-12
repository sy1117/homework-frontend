import React from 'react'
import EventPresenter from './EventPresenter'

const EventContainer =({data}:{data:any})=>{
    let { id, hours, title } = data;

    const onDragStart = (e)=>{
        e.dataTransfer.setData('text', e.target.id)
    }

    return <EventPresenter {... {startTime:hours, title, id, onDragStart}}/>
}

export default EventContainer;

