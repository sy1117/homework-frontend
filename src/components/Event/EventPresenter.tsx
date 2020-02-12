import React from 'react'

type IProps {
    startTime: number!,
    title: string!,
    id: number!,
    onDragStart: Function!
}

const EventPresenter: React.SFC<IProps> = ({startTime, title, id, onDragStart}) => {
    return (
        <div 
            className="event" 
            draggable={true} 
            onDragStart={onDragStart} 
            id={id}>
            <div className="event-time">
                {startTime++}시
            </div>
            <div className="event-desc">
                {title}
            </div>
        </div>
    )
}


export default EventPresenter;