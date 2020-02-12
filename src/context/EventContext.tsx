import React, { createContext, useReducer, useContext, useState } from 'react';
import axios from 'axios';

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
const success = data => ({
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
}
export const EventContext = React.createContext(initialState);

export const EventReducer = (state, action)=>{
    switch (action.type) {
        case EventAction.GET_EVENTS:
            return loadingState;
        case EventAction.GET_EVENTS_SUCCESS:
            return success(action.data);
        case EventAction.GET_EVENTS_ERROR:
            return error(action.error);
        default:
            throw new Error(`Unhandled action type ${action.type}`);
    }
}

export const EventProvider = ({ children }) =>{
    const [event, dispatch] = useReducer(EventReducer, initialState);

    return (
        <EventContext.Provider value={{event, dispatch}}>
            {children}
        </EventContext.Provider>
    )
}

export const getEvents = async (dispatch)=>{
    dispatch({
        type: EventAction.GET_EVENTS,
    });
    
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
        }
    }   
}