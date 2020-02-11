import React from 'react'
import Draggable, { DraggableEventHandler } from 'react-draggable';

interface IProps {
    startTime: number!,
    title: string!,
    id: number!,
}

type DraggableData = {
    node: HTMLElement,
    // lastX + deltaX === x
    x: number, y: number,
    deltaX: number, deltaY: number,
    lastX: number, lastY: number
};

const EventItem: React.SFC<IProps> = ({ startTime, title, id }) => {
    const dragStartHandler = (e)=>{
        e.dataTransfer.setData('text', e.target.id)
    }


    return (
        <div draggable={true} onDragStart={dragStartHandler} id={id}>
            <div className="event">
                <div className="event-time">
                    1:00pm
            </div>
                <div className="event-desc">
                    HTML 5 lecture with Brad Traversy from Eduonix
            </div>
            </div>
        </div>
    )
}

export default EventItem;