import axios from 'axios';

import { desencriptar } from '../../../SuperAdministrador/componentes/general/Encriptar.js';

export const GET_LIST_CONDITIONS = 'GET_LIST_CONDITIONS';
export const GET_CONDITIONS_PER = 'GET_CONDITIONS_PER';
export const GET_CONDITION_ID = 'GET_CONDITION_ID';
export const ADD_CONDITION = 'ADD_CONDITION';
export const EDIT_CONDITION = 'EDIT_CONDITION';
export const DISABLE_CONDITION = 'DISABLE_CONDITION';

export const ADD_MESSAGE_ADD = 'ADD_MESSAGE_ADD';
export const ADD_MESSAGE_EDIT = 'ADD_MESSAGE_EDIT';
export const ADD_MESSAGE_DISABLE = 'ADD_MESSAGE_DISABLE';
export const ADD_MESSAGE = 'ADD_MESSAGE';

const URL_BASE = 'http://localhost:9090/proyectosESCOM-web';
const PERMIT_LIST_CONDITIONS = 'MD_Lista condiciones';
const PERMIT_LIST_CONDITIONS_PER = 'MD_Lista condiciones porcentaje';
const PERMIT_GET_CONDITION = 'MD_Obtiene condicion';
const PERMIT_ADD_CONDITION = 'MD_Agregar condicion';
const PERMIT_EDIT_CONDITION = 'MD_Editar condicion';
const PERMIT_DISABLE_CONDITION = 'MD_Inhabilitar condicion';

export function addMessageEdit(mensaje) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_MESSAGE_EDIT,
      mensaje: mensaje
    });
  };
}

export function addMessageAdd(mensaje) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_MESSAGE_ADD,
      mensaje: mensaje
    });
  };
}

export function addMessageDisable(mensaje) {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_MESSAGE_DISABLE,
      mensaje: mensaje
    });
  };
}

//MD_Lista condiciones
//returns the list of conditions of the selected document
export function getListConditions(token, idD) {
  const headers = {
    'Content-Type': 'application/json',
    'TokenAuto': desencriptar(token),
    'Permiso': PERMIT_LIST_CONDITIONS
  }
  return (dispatch, getState) => {
    axios.get(`${URL_BASE}/api/condition/list/${idD}`, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_LIST_CONDITIONS,
          payload: response.data
        });
      }).catch(error => {
        if (error.request.response === '') {
          dispatch({
            type: ADD_MESSAGE,
            payload: 'error server'
          });
        } else {
          if (error.request) {
            dispatch({
              type: ADD_MESSAGE,
              payload: 'error server'
            });
          }
        }
      });
  }
}

//MD_Lista condiciones porcentaje
//returns the list of conditions of the selected 
//document with the percentage of activities completed
export function getConditionsPer(token, idP) {
  const headers = {
    'Content-Type': 'application/json',
    'TokenAuto': desencriptar(token),
    'Permiso': PERMIT_LIST_CONDITIONS_PER
  }
  return (dispatch, getState) => {
    axios.get(`${URL_BASE}/api/condition/listPercentage/${idP}`, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_CONDITIONS_PER,
          payload: response.data
        })
      }).catch(error => {
        if (error.request.response === '') {
          dispatch({
            type: ADD_MESSAGE,
            payload: 'error server'
          });
        } else {
          if (error.request) {
            dispatch({
              type: ADD_MESSAGE,
              payload: 'error server'
            });
          }
        }
      });
  }
}

//MD_Obtiene condicion
//returns the information of the selected condition
export function getConditionId(token, id) {
  const headers = {
    'Content-Type': 'application/json',
    'TokenAuto': desencriptar(token),
    'Permiso': PERMIT_GET_CONDITION
  }
  return (dispatch, getState) => {
    axios.get(`${URL_BASE}/api/condition/getCondition/${id}`, { headers: headers })
      .then(response => {
        console.log(response)
        dispatch({
          type: GET_CONDITION_ID,
          payload: response.data
        })
      }).catch(error => {
        if (error.request.response === '') {
          dispatch({
            type: ADD_MESSAGE,
            payload: 'error server'
          });
        } else {
          if (error.request) {
            dispatch({
              type: ADD_MESSAGE,
              payload: 'error server'
            });
          }
        }

      });
  }
}

//MD_Agregar condicion
//add a new condition
export function addCondition(token, conditionN) {
  const headers = {
    'Content-Type': 'application/json',
    'TokenAuto': desencriptar(token),
    'Permiso': PERMIT_ADD_CONDITION
  }
  conditionN.requestData = {
    'ip': localStorage.getItem('Ip'),
    'token': desencriptar(token),
    'operacion': PERMIT_ADD_CONDITION
  };
  return (dispatch, getState) => {
    axios.post(`${URL_BASE}/api/condition/add`, conditionN, { headers: headers })
      .then(response => {
        dispatch({
          type: ADD_CONDITION,
          payload: response.data.data
        });
      }).catch(error => {
        if (error.request.response === '') {
          dispatch({
            type: ADD_MESSAGE_ADD,
            payload: 'error server'
          });
        } else {
          if (error.request) {
            dispatch({
              type: ADD_MESSAGE_ADD,
              payload: 'error server'
            });
          }
        }

      });

  }
}

//MD_Editar condicion
//edit condition
export function editCondition(token, conditionE) {
  const headers = {
    'Content-Type': 'application/json',
    'TokenAuto': desencriptar(token),
    'Permiso': PERMIT_EDIT_CONDITION
  }
  conditionE.requestData = {
    'ip': localStorage.getItem('Ip'),
    'token': desencriptar(token),
    'operacion': PERMIT_EDIT_CONDITION
  };
  return (dispatch, getState) => {
    axios.put(`${URL_BASE}/api/condition/edit`, conditionE, { headers: headers })
      .then(response => {
        dispatch({
          type: EDIT_CONDITION,
          payload: response.data.data
        });
      }).catch(error => {
        if (error.request.response === '') {
          dispatch({
            type: ADD_MESSAGE_EDIT,
            payload: 'error server'
          });
        } else {
          if (error.request) {
            dispatch({
              type: ADD_MESSAGE_EDIT,
              payload: 'error server'
            });
          }
        }

      });
  }
}

//MD_Inhabilitar condicion
//disable the selected condition
export function disableCondition(token, id) {
  const headers = {
    'Content-Type': 'application/json',
    'TokenAuto': desencriptar(token),
    'Permiso': PERMIT_DISABLE_CONDITION
  }
  const requestData = {
    'ip': localStorage.getItem('Ip'),
    'token': desencriptar(token),
    'operacion': PERMIT_DISABLE_CONDITION
  };
  return (dispatch, getState) => {
    axios.put(`${URL_BASE}/api/condition/disable/${id}`,requestData, { headers: headers })
      .then(response => {
        dispatch({
          type: DISABLE_CONDITION,
          payload: response.data.data
        })
      }).catch(error => {
        if (error.request.response === '') {
          dispatch({
            type: ADD_MESSAGE_DISABLE,
            payload: 'error server'
          });
        } else {
          if (error.request) {
            dispatch({
              type: ADD_MESSAGE_DISABLE,
              payload: 'error server'
            });
          }
        }

      });
  }
}
