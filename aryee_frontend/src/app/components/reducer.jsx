export const initialState = {
    user: null
}

const reducer = (state, action) => {

    switch(action.type) {
        
        case 'SET_USER':
            return {
                ...state, 
                user: action.user,
            }
        
        case 'REMOVE_USER':
            return {
                ...state, 
                user: null,
            }
        
    }
}

export default reducer;