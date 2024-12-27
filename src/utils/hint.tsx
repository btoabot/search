// Types
import { Option } from "../components/List";

const hintPrediction = (
    value: string,
    list: Option[],
    selectedIndex: number
): string => {
    const lowerCaseValue = value.toLowerCase();
    const index = selectedIndex !== -1 ? selectedIndex : 0;
    const selectedOption = list[index];
    if (value && selectedOption && selectedOption.name.toLowerCase().startsWith(lowerCaseValue)) {
        return selectedOption.name.toLowerCase();
    }
    return "";
};

export default hintPrediction