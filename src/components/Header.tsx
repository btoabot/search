// Core
import { memo } from "react";

// State
import { useStore } from "../store/createFContext";

// Style, Icons
import style from "./index.module.css";


const Header = memo(() => {
    const [label] = useStore(store => store.label);
    
    return <label className={style.header}>{label}</label>;
});

export default Header