import React from 'react'

interface IProps {
    hours: number,
    title: string,
    id: number,
    onDragStart: Function,
    onClick :Function,
}

const EventPresenter: React.SFC<IProps> = ({datetime, title, id, onDragStart, onClick}) => {
    let hours = new Date(datetime).getHours();
    return (
        <div 
            className="event" 
            draggable={true} 
            onClick={onClick}
            onDragStart={onDragStart} 
            id={id}>
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