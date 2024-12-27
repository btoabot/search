// Core
import { memo } from "react";

// State
import { useStore } from "../store/createFContext";

// Style, Icons
import style from "./index.module.css";
import spiner from "./icons/spiner.svg";
import close from "./icons/close.svg";

const Action = memo(() => {
    const [isShowButton, setStore] = useStore(store => store.isShowButton);
    const [loading] = useStore(store => store.loading);

    const handleClear = () => {
        setStore({ inputValue: "", isShowButton: false, hint: "" });
    };

    if (!isShowButton) {
        return null;
    }

    if (loading) {
        return <span className={`${style.action} ${style.loading}`}><img src={spiner} alt="loading" /></span>;
    }

    return <span className={`${style.action} ${style.close}`} onClick={handleClear}><img src={close} alt="close" /></span>;
});

export default Action;