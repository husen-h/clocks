import { useCallback, useState } from "react";
import useDebouncedValue from "./useDebouncedValue";

export const useDebouncedSearch = () => {
    const [searchValue, setSearchValue] = useState("");
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const debouncedSearchValue = useDebouncedValue(searchValue);

    return {
        searchValue,
        onChange,
        debouncedSearchValue,
    };
};
