# React global state hook ez.

React ez global state

โปรเจ็กนี้ต้องการทำให้การจัดการ state ด้วย redux ทำได้ง่ายขึ้น จากเดิมที่เราชอบใช้ useState ก็เปลี่ยนมาใช้ useGlobalState แทน โดยวิธีใช้งานยังคงคล้ายเดิม

## การติดตั้ง

```bash
npm i @geeleed/react-ez-globalstate
```

เท่านี้ก็ได้ react component ```<GlobalState>``` และ hook คือ ```useGlobalState``` แล้ว

## การ setup ใน project (ตัวอย่างนี้ใช้ vite.js)

นำเข้า ```<GlobalState></GlobalState>``` มาครอบ ```<App/>```

```bash
import GlobalState from "@geeleed/react-ez-globalstate/dist/GlobalState";
```

```bash
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GlobalState from "@geeleed/react-ez-globalstate/dist/GlobalState";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalState>
      <App/>
    </GlobalState>
  </StrictMode>
);
```

## การใช้งาน

หลังจาก setup แล้วจะใช้งานใน component ต่าง ๆ ได้ เช่น ใช้ใน ```<App/>```
จะใช้ hook useGlobalState ในการอ่านและแก้ค่า state

```bash
import { useGlobalState } from "@geeleed/react-ez-globalstate/dist/GlobalState";
```

```bash
const [state, setState] = useGlobalState();
```

hook นี้เทียบเคียงได้กับการใช้ useState ของ react แต่จะไม่มี initial value หรือกำหนดค่าเริ่มต้น
การใช้งาน hook จะมีลักษณะดังนี้

```bash
setState(ชื่อคีย์,ค่า)
```

เช่น

```bash
setState("geeleed","hello world")
```

ก็จะเป็นการใส่ค่า "hello world" ลงใน state ด้วยคีย์ "geeleed"
หากจะดึงค่าจาก state ก็สามารถเรียกได้ผ่านคีย์โดยตรงเนื่องจากเป็น object

```bash
state["geeleed"] // "hello world"
```

### ตัวอย่าง

```bash

import React from "react";
import { useGlobalState } from "@geeleed/react-ez-globalstate/dist/GlobalState";

export default function App() {
  const [state, setState] = useGlobalState();
  const { key, value } = state;
  return (
    <div>
      <div>{`key is ${key}, value is ${value}`}</div>
      <input
        onChange={(e) => setState("key", e.target.value)}
        placeholder="key"
      />
      <input
        onChange={(e) => setState("value", e.target.value)}
        placeholder="value"
      />
      <button
        onClick={() => {
          console.log(key, value);
          setState(key, value);
        }}
      >
        Save
      </button>
      <button onClick={() => console.log(state)}>List State</button>
    </div>
  );
}

```

โปรเจ็กส่วนตัวอื่น ๆ
https://github.com/Geeleed
