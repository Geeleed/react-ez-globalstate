"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGlobalState = useGlobalState;
exports.default = GlobalState;
const react_1 = __importDefault(require("react"));
const toolkit_1 = require("@reduxjs/toolkit");
const react_redux_1 = require("react-redux");
// สร้าง global state ด้วย createSlice
const globalState = (0, toolkit_1.createSlice)({
    name: "globalState",
    initialState: {},
    reducers: {
        setState: (state, action) => {
            const [key, value] = Object.entries(action.payload)[0];
            state[key] = value;
        },
    },
});
const store = (0, toolkit_1.configureStore)({
    reducer: { globalState: globalState.reducer },
});
// กำหนด hook สำหรับ useSelector และ useDispatch ในแบบ typesafe
const useAppSelector = react_redux_1.useSelector;
const useAppDispatch = () => (0, react_redux_1.useDispatch)();
// Hook สำหรับการเข้าถึง global state
function useGlobalState() {
    const state = useAppSelector((state) => state.globalState);
    const dispatch = useAppDispatch();
    const setState = (key, value) => dispatch(globalState.actions.setState({ [key]: value }));
    return [state, setState]; // กำหนดประเภท tuple เพื่อป้องกันการเปลี่ยนแปลงค่าในภายหลัง
}
// component GlobalState
function GlobalState({ children }) {
    return react_1.default.createElement(react_redux_1.Provider, { store: store }, children);
}
