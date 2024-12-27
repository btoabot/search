// Core
import React from "react";

// Style, Icons
import style from "./index.module.css";

// Components
import Input from "./Input";
import Action from "./Action";
import Hint from "./Hint";

const InputContainer: React.FC = () => {
    return (
        <div className={style.inputContainer}>
            <Input />
            <Hint />
            <Action />
        </div>
    );
};

export default InputContainer;