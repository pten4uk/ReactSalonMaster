const initialState = {
    active: false,
    clientInfoActive: true,
    tableItem: null,
    chosenVisitId: null,
    defaultTimeStart: {
        hour: undefined,
        minutes: undefined
    },
    defaultMaster: {
        pk: undefined,
        name: undefined,
        lastName: undefined,
    },
    chosenDuration: 30,
    mastersList: [],
}

export default function addClientWindow(state = initialState, action) {
    switch (action.type) {
        case "SET_ADD_CLIENT_WINDOW_CLIENT_INFO_ACTIVE":
            return {...state, clientInfoActive: action.payload}
        case "SET_ADD_CLIENT_WINDOW_CHOSEN_CLIENT_ID":
            return {...state, chosenVisitId: action.payload}
        case "SET_ADD_CLIENT_WINDOW_TABLE_ITEM":
            return {...state, tableItem: action.payload.tableItemId}
        case "SET_ADD_CLIENT_WINDOW_ACTIVE":
            if (action.payload === false) return {...state, active: action.payload, chosenVisitId: null}
            return {...state, active: action.payload}
        case "SET_ADD_CLIENT_WINDOW_DEFAULT_TIME_START":
            return {...state, defaultTimeStart: {hour: action.payload.hour, minutes: action.payload.minutes}}
        case "SET_ADD_CLIENT_WINDOW_DEFAULT_MASTER":
            return {...state, defaultMaster: {pk: action.pk, name: action.name, lastName: action.lastName}}
        case "SET_CHOSEN_DURATION":
            return {...state, chosenDuration: action.payload}
        case "SET_ADD_CLIENT_WINDOW_MASTERS_LIST":
            return {...state, mastersList: action.payload}
        default:
            return state
    }
}