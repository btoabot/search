// Core
import React, { useEffect, useMemo, useCallback } from "react";

// State
import { useStore } from "../store/createFContext";

// Hooks
import useKeyboardNavigation from "../hooks/useKeyboardNavigation";

// Utils
import debounce from "../utils/debounce";
import filter from "../utils/filter";
import hintPrediction from "../utils/hint";


const Input: React.FC = () => {
    const [isShowButton] = useStore(store => store.isShowButton);
    const [inputValue, setStore] = useStore((store) => store.inputValue);
    const [options] = useStore((store) => store.options);
    const [optionsFiltered] = useStore((store) => store.optionsFiltered);
    const [asyncAction] = useStore((store) => store.asyncAction);
    const [debounceTime] = useStore((store) => store.debounceTime);
    const [maxResults] = useStore((store) => store.maxResults);
    const [selectedIndex] = useStore((store) => store.selectedIndex);
    const [onChange] = useStore((store) => store.onChange);

    const { handleKeyDown } = useKeyboardNavigation();
    const debounceAsyncAction = useCallback(debounce(asyncAction, debounceTime), []);
    const debounceOnChange = useCallback(debounce(onChange, debounceTime), []);

    // async action wrapper
    useEffect(() => {
        if (inputValue && isShowButton) {
            if (asyncAction) {
                setStore({ loading: true });
                debounceAsyncAction(inputValue).then((res: any) => {
                    const resultList = res?.slice(0, maxResults);
                    setStore({
                        optionsFiltered: resultList,
                        loading: false,
                    });
                }).catch(() => {
                    setStore({
                        optionsFiltered: [],
                        loading: false,
                    });
                });
            } else {
                const optionsFiltered = inputValue ? filter(options, inputValue).slice(0, maxResults) : [];
                setStore({
                    optionsFiltered: optionsFiltered
                });
            }

        }

        if (inputValue) {
            debounceOnChange(inputValue);
        }
    }, [inputValue]);

    // hint prediction 
    const hintList = useMemo(() => hintPrediction(inputValue, optionsFiltered, selectedIndex),
        [inputValue, optionsFiltered, selectedIndex]
    );

    useEffect(() => {
        setStore({
            hint: hintList
        });
    }, [selectedIndex, optionsFiltered, inputValue]);

    //  simple input handler 
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setStore({
            inputValue: value.toLowerCase(),
            isShowButton: !!value,
        });
    };

    return <input onKeyDown={handleKeyDown} value={inputValue} onChange={handleChange} />;
};

export default Input;