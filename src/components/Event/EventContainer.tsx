import React from 'react'
import EventPresenter from './EventPresenter'

const EventContainer =({startTime, title, id, onDragStart})=>{
    const onDragStart = (e)=>{
        e.dataTransfer.setData('text', e.target.id)
    }

    return <EventPresenter {... {startTime, title, id, onDragStart}}/>
}

export default EventContainer;

