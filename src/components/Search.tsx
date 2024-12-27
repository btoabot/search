// Core
import React from "react";

// State
import { Provider } from "../store/createFContext";

// Components
import Wrapper from "./Wrapper"

// Types
import { Option } from "./List" 

interface SearchProps {
    options?: Option[];
    asyncAction?: (value: string) => Promise<Option[]>;
    debounceTime?: number;
    label?: string;
    maxResults?: number;
    onChange: (value: string) => void;
}

const Search: React.FC<SearchProps> = (props) => {
    return (
        <Provider
            value={{
                isShowButton: false,
                inputValue: "",
                options: props.options,
                optionsFiltered: [],
                asyncAction: props.asyncAction,
                loading: false,
                debounceTime: props.debounceTime || 800,
                hint: "",
                label: props.label || "",
                maxResults: props.maxResults || 5,
                selectedIndex: -1,
                onChange: props.onChange
            }}
        >
            <Wrapper />
        </Provider >
    );
};

export default Search; 