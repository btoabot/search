// Types
import { Option } from "../components/List";

const highlightMatch = (option: Option, value: string) => {
    const name = option.name;
    const index = name.toLowerCase().indexOf(value.toLowerCase());
    if (index === -1) return name;
    return (
        <>
            {name.substring(0, index)}
            <span style={{ fontWeight: 'bold' }}>
                {name.substring(index, index + value.length)}
            </span>
            {name.substring(index + value.length)}
        </>
    );
};

export default highlightMatch;