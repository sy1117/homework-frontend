import React from 'react'

interface IProps {
    datetime: Date,
    title: string,
    onDragStart: React.DragEventHandler,
    onClick : React.MouseEventHandler,
}

const EventPresenter: React.SFC<IProps> = ({datetime, title, onDragStart, onClick}) => {
    let hours = new Date(datetime).getHours();
    return (
        <div 
            className="event" 
            draggable={true} 
            onClick={onClick}
            data-hours={hours}
            onDragStart={onDragStart} 
            >
            <div className="event-time">
                {hours}시
            </div>
            <div className="event-desc">
                {title}
            </div>
        </div>
    )
}


export default EventPresenter;