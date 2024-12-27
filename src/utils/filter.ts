// Types
import { Option } from "../components/List";

const filter = (options: Option[], value: string): Option[] => {
    // here "for" works faster then Array.prototype.filter 
    const lowerCaseValue = value.toLowerCase();
    const filteredOptions = [];
    for (let i = 0; i < options.length; i++) {
        const optionName = options[i].name.toLowerCase();
        if (optionName.includes(lowerCaseValue)) {
            filteredOptions.push(options[i]);
        }
    }
    return filteredOptions;
};

export default filter