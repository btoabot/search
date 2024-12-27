// Core
import { memo } from "react";

// Components
import Item from "./Item";

const Loading = memo(() => {
    return <Item option={{ id: "loading", name: "Loading..." }} />;
});

export default Loading;