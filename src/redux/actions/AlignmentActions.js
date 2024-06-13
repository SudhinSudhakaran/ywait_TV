const types = {
    SET_RTL: 'SET_RTL'
}

const setRTL = (option) => {
    return {
        type: types.SET_RTL,
        payload: option
    }
}



export default {
    types,
    setRTL,
}