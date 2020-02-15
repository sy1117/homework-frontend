import React from 'react'

interface IProps {
    datetime: Date,
    title: string,
    onDragStart: Function,
    onClick :Function,
}

const EventPresenter: React.SFC<IProps> = ({datetime, title, onDragStart, onClick}) => {
    let hours = new Date(datetime).getHours();
    return (
        <div 
            className="event" 
            draggable={true} 
            onClick={onClick}
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