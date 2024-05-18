export function metadataReducer(state, action) {
    switch (action.type) {
        case "INIT":
            return action.payload;
        case "SET_HOSPITAL":
            return {hospital: action.hospital, attributes: action.attributes};
        case "TEXT_ATTRIBUTE":
            return {
                ...state, attributes: state.attributes.map((attribute) =>
                    attribute.name === action.name ? {...attribute, value: action.value} : attribute
                )
            }
        case "RANGE_ATTRIBUTE":
            return {
                ...state, attributes: state.attributes.map((attribute) =>
                    attribute.name === action.name ? {...attribute, start: action.start, end: action.end} : attribute
                )
            }
        case "CHECKBOX_ATTRIBUTE":
            return {
                ...state, attributes: state.attributes.map((attribute) =>
                    attribute.name === action.name ? {...attribute, value: action.value} : attribute
                )
            }
        case "RESET_ATTRIBUTE":
            return {
                ...state, attributes: state.attributes.map((attribute) => {
                    return {...attribute, value: "", start: "", end: ""}
                })
            }
        default:
            return state;
    }
}
