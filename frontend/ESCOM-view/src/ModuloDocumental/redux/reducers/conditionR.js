import { GET_LIST_CONDITIONS, EDIT_CONDITION, ADD_MESSAGE_EDIT, ADD_MESSAGE_ADD,GET_CONDITIONS_PER, GET_CONDITION_ID, ADD_CONDITION, DISABLE_CONDITION, ADD_MESSAGE_DISABLE } from '../actions/conditionA.js'

const initialState = {
    listConditions: [],
    listConditionsPer: [],
    conditionR: [],
    messageEdit: '',
    messageAdd: '',
    messageDisable: ''
}

export function reducersCondition(state = initialState, action) {

    switch (action.type) {
        case GET_LIST_CONDITIONS:
            return Object.assign({}, state, { listConditions: action.payload })
        case GET_CONDITIONS_PER:
            return Object.assign({}, state, { listConditionsPer: action.payload })
        case GET_CONDITION_ID:
            return Object.assign({}, state, { conditionR: action.payload })
        case DISABLE_CONDITION:
            return Object.assign({}, state, { messageDisable: action.payload })
        case ADD_CONDITION:
            return Object.assign({}, state, { messageAdd: action.payload })
        case EDIT_CONDITION:
            return Object.assign({}, state, { messageEdit: action.payload })
        case ADD_MESSAGE_EDIT:
            return Object.assign({}, state, { messageEdit: action.payload })
        case ADD_MESSAGE_ADD:
            return Object.assign({}, state, { messageAdd: action.payload })
        case ADD_MESSAGE_DISABLE:
            return Object.assign({}, state, { messageDisable: action.payload })
        default:
            return state
    }

}
