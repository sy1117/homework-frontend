import React, { useContext, useEffect } from 'react';
import PopupPresenter from './PopupPresenter';
import { PopupContext } from '../../context/PopupContext';
import { PopupMode } from '../../types/index';
import { addEvent, EventContext, modifyEvent, deleteEvent } from '../../context/EventContext';
import { yyyymmdd } from '../../utils/Date';

const PopupContainer : React.SFC = ({})=>{

    const {
        isShown,
        data,
        open,
        close,
    } = useContext(PopupContext)

    let {id, title, datetime} = data;
    let dateObj = new Date(datetime);
    let date = yyyymmdd(dateObj);
    let hours = id ? dateObj.getHours() : 0 ;

    const { dispatch } = useContext(EventContext)

    const cancelHandler = ()=>{
        close();
    }

    const deleteHandler = async(e, formData)=>{
        let { id } = formData;
        console.
        await deleteEvent(id)(dispatch);
        close();
    }

    const saveHandler = async (e, data)=>{
        let {title, date, hours} = data;
        let datetimeObj = new Date(date);
        datetimeObj.setHours(hours)
        let postData = {
            title,
            datetime : datetimeObj.toISOString()
        }
        
        if(data.id){
            await modifyEvent(id, postData)(dispatch);
            close();
        }else{
            await addEvent(postData)(dispatch);
            close();
        }
    }

    return isShown &&
        <PopupPresenter {...{
                id,
                title,
                date,
                hours,
                onCancel:cancelHandler,
                onDelete:deleteHandler,
                onSave:saveHandler
            }
        }/>
    
}

export default PopupContainer