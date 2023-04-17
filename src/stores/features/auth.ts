import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    name: string | null;
    role: string | null;
    user_id: number | null;
    isLogin: boolean;
}

type ResponseUser = {
    user_id: number;
    name: string;
    email: string;
    role: string;
    token: string;
};

const initialState: UserState = {
    name: 'kob',
    role: "Admin",
    user_id: 1,
    isLogin: true,

    // name: null,
    // role: null,
    // user_id: null,
    // isLogin: false,
};

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        storeLogin: (state, { payload }: PayloadAction<ResponseUser>) => {
            state.name = payload.name;
            state.role = payload.role;
            state.user_id = payload.user_id;
            state.isLogin = true;

            if (payload.token) {
                localStorage.setItem(
                    import.meta.env.VITE_APP_LOCAL_TOKEN,
                    payload.token
                );
            }
        },

        storeLogout: (state) => {
            state.name = null;
            state.role = null;
            state.user_id = null;
            state.isLogin = false;
            localStorage.removeItem(import.meta.env.VITE_APP_LOCAL_TOKEN);
        },
    },
});

export const { storeLogin, storeLogout } = auth.actions;
export default auth.reducer;
