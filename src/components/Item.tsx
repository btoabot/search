// Core
import React from "react";

// Style, Icons
import style from "./index.module.css";

// Types
import {Option} from "./List"

// component which just render dropdown items
const Item: React.FC<{
    option: Option;
    onClick?: (option: Option) => void;
    hightlight?: React.ReactNode;
    selected?: boolean;
}> = (props) => {
    const { option, onClick, hightlight, selected } = props;

    const handleClick = () => {
        onClick && onClick(option);
    };

    return (
        <div
            key={option.id}
            className={style.item}
            onClick={handleClick}
            style={{ backgroundColor: selected ? 'lightgray' : 'white' }}
        >
            {option.img && <img className={style.img} src={option.img} alt={`${option.name} image`} />}
            <span>{hightlight || option.name}</span>
        </div>
    );
}

export default Item;