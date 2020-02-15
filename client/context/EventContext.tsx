import React, { createContext, useReducer, useContext, useState } from 'react';
import axios from 'axios';
import { stat } from 'fs';

const initialState = {
    isLoad: null,
    data: null,
    error: null,
};

// 로딩중 상태
const loadingState = {
    isLoad: true,
    data: null,
    error: null,
};

// 성공시 상태
const success = data=> ({
    isLoad: false,
    data,
    error: null,
});

// 실패시 상태
const error = error => ({
    isLoad: false,
    data: null,
    error: error,
});


const EventAction =  {
    GET_EVENTS : 'GET_EVENTS',
    GET_EVENTS_SUCCESS :'GET_EVENTS_SUCCESS',
    GET_EVENTS_ERROR : 'GET_EVENTS_ERROR',

    CREATE_EVENT: 'CREATE_EVENT',
    CREATE_EVENT_SUCCESS : 'CREATE_EVENT_SUCCESS',
    CREATE_EVENT_ERROR: 'CREATE_EVENT_ERROR',

    UPDATE_EVENT : 'UPDATE_EVENT',
    UPDATE_EVENT_SUCCESS : 'UPDATE_EVENT_SUCCESS',
    UPDATE_EVENT_ERROR : 'UPDATE_EVENT_ERROR',

    DELETE_EVENT : 'DELETE_EVENT',
    DELETE_EVENT_SUCCESS : 'DELETE_EVENT_SUCCESS',
    DELETE_EVENT_ERROR : 'DELETE_EVENT_ERROR',
}
export const EventContext = React.createContext(initialState);

export const EventReducer = (state, action)=>{
    switch (action.type) {
        /**
         * get all events 
         */
        case EventAction.GET_EVENTS:
            return loadingState;
        case EventAction.GET_EVENTS_SUCCESS:
            return success(action.data);
        case EventAction.GET_EVENTS_ERROR:
            return error(action.error);

        /**
         * add event
         */
        case EventAction.CREATE_EVENT :
            return state;
        case EventAction.CREATE_EVENT_SUCCESS :
            state.data[state.data.length] = action.data;
            return success(state.data);
        case EventAction.CREATE_EVENT_ERROR:
            return error(action.error);

        /**
         * update
         */
        case EventAction.UPDATE_EVENT :
            return state;
        case EventAction.UPDATE_EVENT_SUCCESS :
            let { data } = action;
            let idx = state.data.findIndex(s=>s.id===data.id);
            state.data[idx] = data;
            return success(state.data);
        case EventAction.UPDATE_EVENT_ERROR :
            return error(action.error);


        /**
         * delete
         */
        case EventAction.DELETE_EVENT :
            return state;
        case EventAction.DELETE_EVENT_SUCCESS :
            let { data : id } = action;
            let idx = state.data.findIndex(s=>s.id=== id);
            state.data.splice(idx, 1)
            return success(state.data);
        case EventAction.DELETE_EVENT_ERROR :
            return error(action.error);

        default:
            throw new Error(`Unhandled action type ${action.type}`);
    }
}

export const EventProvider = ({ children  }) =>{
    const [event, dispatch] = useReducer(EventReducer, initialState);
    return (
        <EventContext.Provider value={{event, dispatch}}>
            {children}
        </EventContext.Provider>
    )
}


export const getEvents = async (dispatch)=>{
    dispatch({type: EventAction.GET_EVENTS});
    
    try {
        const { data } = await axios.get('/api/events');
        dispatch({
            type: EventAction.GET_EVENTS_SUCCESS,
            data
        });
    } catch (error) {
        dispatch({
            type: EventAction.GET_EVENTS_ERROR,
            error,
        })
    }   
}

export const addEvent = (param:any)=> async(dispatch:any)=>{
    dispatch({type:EventAction.CREATE_EVENT});

    try {
        let { data } = await axios.post('/api/events', param);
        dispatch({
            type:EventAction.CREATE_EVENT_SUCCESS,
            data
        })
    } catch (error) {
        dispatch({
            type:EventAction.CREATE_EVENT_ERROR,
            error:error.message
        })
    }
}

export const modifyEvent = (id:number, param:any)=> async (dispatch:any)=>{
    dispatch({type:EventAction.UPDATE_EVENT})

    try {
        let { data } = await axios.patch(`/api/events/${id}`,param);
        dispatch({
            type: EventAction.UPDATE_EVENT_SUCCESS,
            data
        })
    } catch (error) {
        dispatch({
            type: EventAction.UPDATE_EVENT_ERROR,
            error,
        })
    }
}

export const deleteEvent = (id:number)=> async(dispatch:any)=>{
    dispatch({type:EventAction.DELETE_EVENT})

    try {
        await axios.delete(`/api/events/${id}`);
        dispatch({
            type: EventAction.DELETE_EVENT_SUCCESS,
            data : {id}
        })
    } catch (error) {
        dispatch({
            type: EventAction.DELETE_EVENT_ERROR,
            error,
        })
    }
}