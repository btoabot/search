// Core
import { useRef, memo } from "react";

// State
import { useStore } from "../store/createFContext";

// Components
import Header from "./Header"
import InputContainer from "./InputContainer";
import List from "./List";

// Hooks
import useClickOutside from "../hooks/useClickOutside";

// Style, Icons
import style from "./index.module.css";


const Wrapper = memo(() => {
    const SearchRef = useRef<HTMLDivElement>(null);
    const [, setStore] = useStore(() => { });

    useClickOutside(SearchRef, () => {
        setStore({ isShowButton: false, hint: "" });
    });

    return (
        <div className={style.search} ref={SearchRef} >
            <Header />
            <InputContainer />
            <List />
        </div>
    );
});

export default Wrapper;