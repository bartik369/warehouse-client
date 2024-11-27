import { configureStore } from "../../node_modules/@reduxjs/toolkit/dist/index";

const store = configureStore({
    reducer: {

    }
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 