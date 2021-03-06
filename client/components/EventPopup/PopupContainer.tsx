import React, { useContext, useEffect, useState } from 'react';
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
    }:{isShown:boolean, data:any, open:Function, close:Function} = useContext(PopupContext)

    let {id, title, datetime} = data;
    let dateObj = new Date(datetime);
    let date = yyyymmdd(dateObj);
    let hours = dateObj.getHours();
    const [ errorMsg, setErrorMsg] = useState(null);
    const { dispatch } = useContext(EventContext)

    const cancelHandler = ()=>{
        close();
    }

    const deleteHandler = async(e, formData)=>{
        if(confirm("일정을 삭제하시겠습니까?")){
            let { id } = formData;
            let res = await deleteEvent(id)(dispatch);
            res ? close() : alert("일정 삭제에 실패했습니다")
        }
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
            let res = await modifyEvent(id, postData)(dispatch);
            res ? close() : setErrorMsg("해당 일정을 추가할 수 없습니다");

        }else{
            let res = await addEvent(postData)(dispatch);
            res ? close() : setErrorMsg("해당 일정을 추가할 수 없습니다");
        }
    }

    const dataChangeHandler =(e)=>{
        setErrorMsg(null)
    }

    return isShown &&
        <PopupPresenter {...{
                id,
                title,
                date,
                hours,
                errorMessage:errorMsg,
                onCancel:cancelHandler,
                onDelete:deleteHandler,
                onSave:saveHandler,
                onDataChange:dataChangeHandler,
            }
        }/>
    
}

export default PopupContainer