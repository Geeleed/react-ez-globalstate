import React, { ReactNode } from "react";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Provider,
  useDispatch,
  useSelector,
  TypedUseSelectorHook,
} from "react-redux";

// ประเภทของ state
interface GlobalState {
  [key: string]: any; // คุณสามารถเปลี่ยนเป็นประเภทที่แน่นอนได้ เช่น string, number เป็นต้น
}

// สร้าง global state ด้วย createSlice
const globalState = createSlice({
  name: "globalState",
  initialState: {} as GlobalState,
  reducers: {
    setState: (state, action: PayloadAction<{ [key: string]: any }>) => {
      const [key, value] = Object.entries(action.payload)[0];
      state[key] = value;
    },
  },
});

const store = configureStore({
  reducer: { globalState: globalState.reducer },
});

// ประเภทของ RootState
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// กำหนด hook สำหรับ useSelector และ useDispatch ในแบบ typesafe
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook สำหรับการเข้าถึง global state
export function useGlobalState() {
  const state = useAppSelector((state) => state.globalState);
  const dispatch = useAppDispatch();
  const setState = (key: string, value: any) =>
    dispatch(globalState.actions.setState({ [key]: value }));
  return [state, setState] as const; // กำหนดประเภท tuple เพื่อป้องกันการเปลี่ยนแปลงค่าในภายหลัง
}

// ประเภทสำหรับ GlobalState component
interface GlobalStateProps {
  children: ReactNode;
}

// component GlobalState
export default function GlobalState({ children }: GlobalStateProps) {
  return <Provider store={store}>{children}</Provider>;
}
