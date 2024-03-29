const initialState = {}


export default function masters(state = initialState, action) {
    let newObj = {...state};
    switch (action.type) {
        case "ADD_MASTER":
            newObj[action.payload.pk] = {
                master: {name: action.payload.name, lastName: action.payload.lastName},
                tableItems: getHours().map(
                    (hour, index) => {
                        let minutes = ['00', '15', '30', '45'];
                        return {
                            active: false,
                            className: "table-item",
                            hour: hour,
                            minutes: minutes[index % 4],
                        }
                    })
            }
            return newObj;
        case "SWAP_TABLE_ITEM_TO_ACTIVE":
            const activeObj = newObj[action.payload.masterId].tableItems[action.payload.index];
            newObj[action.payload.masterId].tableItems[action.payload.index] = {
                ...activeObj,
                active: true,
                className: "table-item active",
            }
            return newObj;
        case "SWAP_TABLE_ITEM_TO_INACTIVE":
            const inactiveObj = newObj[action.payload.masterId].tableItems[action.payload.index];
            newObj[action.payload.masterId].tableItems[action.payload.index] = {
                ...inactiveObj,
                active: false,
                className: "table-item",
            }
            return newObj;
        default:
            return state
    }
}

function getHours() {
    let list = [];
    for (let hour = 9; hour <= 21; hour++) {
        list.push(hour, hour, hour, hour);
    }
    return list
}