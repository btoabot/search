// Core
import { memo } from "react";

// Components
import Item from "./Item";

const NoData = memo(() => {
    return <Item option={{ id: "no-data", name: "No Data" }} />;
});

export default NoData;