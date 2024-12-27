// Core
import React from "react";

// State
import { useStore } from "../store/createFContext";

// Utils
import highlightMatch from "../utils/highlight";

// Style, Icons
import style from "./index.module.css";

// Components
import Item from "./Item";
import Loading from "./Loading";
import NoData from "./NoData";


export interface Option {
    id: string;
    name: string;
    img?: string;
}

const List: React.FC = () => {
    const [optionsFiltered, setStore] = useStore((store) => store.optionsFiltered);
    const [loading] = useStore((store) => store.loading);
    const [inputValue] = useStore((store) => store.inputValue);
    const [selectedIndex] = useStore((store) => store.selectedIndex);
    const [isShowButton] = useStore(store => store.isShowButton);

    if (!isShowButton) {
        return null;
    }

    const handleSelect = (option: Option) => {
        setStore({ inputValue: option?.name.toLowerCase(), isShowButton: false, selectedIndex: -1 });
    };

    if (loading) {
        return <div className={style.dropdown}>
            <Loading />
        </div>;
    }

    if (!optionsFiltered.length) {
        return <div className={style.dropdown}>
            <NoData />
        </div>;
    }

    return (
        <div className={style.dropdown}>
            {(optionsFiltered as Array<Option>)?.map((option, index) => (
                <Item
                    key={index}
                    option={option}
                    hightlight={highlightMatch(option, inputValue)}
                    onClick={handleSelect}
                    selected={index === selectedIndex}
                />
            ))}
        </div>
    );
};

export default List