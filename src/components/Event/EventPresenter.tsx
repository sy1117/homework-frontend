import React from 'react'

type IProps {
    startTime: number!,
    title: string!,
    id: number!,
    onDragStart: Function!
}

const EventPresenter: React.SFC<IProps> = ({startTime, title, id, onDragStart}) => {
    return (
        <div draggable={true} onDragStart={onDragStarts} id={id}>
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


export default EventPresenter;