import { createContext, useState } from 'react';

const SearchContext = createContext([{}, () => { }]);

const SearchContextProvider = (props) => {
    const [state, setState] = useState({
        searchQuery: '',
        selectedProductId: ''
    });
    return (
        <SearchContext.Provider value={[state, setState]}>
            {props.children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchContextProvider };