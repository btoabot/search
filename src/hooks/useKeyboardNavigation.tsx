import { useStore } from "../store/createFContext";

//  hook provide keyboard navigation for dropdown and input
const useKeyboardNavigation = (): { handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void } => {
    const [optionsFiltered, setStore] = useStore((store) => store.optionsFiltered);
    const [selectedIndex] = useStore((store) => store.selectedIndex);
    const [isShowButton] = useStore((store) => store.isShowButton);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {

        if (isShowButton && event.key === 'ArrowDown') {
            setStore({
                selectedIndex: selectedIndex < optionsFiltered.length - 1 ? selectedIndex + 1 : selectedIndex
            });
        } else if (isShowButton && event.key === 'ArrowUp') {
            setStore({
                selectedIndex: selectedIndex > 0 ? selectedIndex - 1 : selectedIndex
            });
        } else if (isShowButton && event.key === 'Enter' && selectedIndex !== -1) {
            setStore({
                isShowButton: false,
                inputValue: optionsFiltered[selectedIndex].name.toLowerCase(),
            });
        } else if (isShowButton && event.key === 'Tab') {
            event.preventDefault();
            setStore({
                isShowButton: false,
                inputValue: optionsFiltered[selectedIndex !== -1 ? selectedIndex : 0]?.name?.toLowerCase()
            });
        }
    };

    return { handleKeyDown };
};

export default useKeyboardNavigation;
