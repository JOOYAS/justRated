import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        info: null, //flags- info,islogged,load
        isLoggedIn: false,
        loading: true
    },
    reducers: {
        setUser: (state, action) => {
            state.info = action.payload
            state.isLoggedIn = !!action.payload
            state.loading = false
        },
        clearUser: (state) => {
            state.info = null
            state.isLoggedIn = false
            state.loading = false
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
});

export const { setUser, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;