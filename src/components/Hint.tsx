// Core
import React from "react";

// State
import { useStore } from "../store/createFContext";

// Style, Icons
import style from "./index.module.css";

const Hint: React.FC = () => {
    const [hint] = useStore((store) => store.hint);

    return <span className={style.hint}>{hint}</span>;
};

export default Hint