import React, {
    useRef,
    createContext,
    useContext,
    useCallback,
    useSyncExternalStore,
} from "react";


type StoreType<Store> = {
    get: () => Store;
    set: (value: Partial<Store>) => void;
    subscribe: (callback: () => void) => () => void;
    initialState: Store;
};


function useStoreData<Store>(initialState: Store): StoreType<Store> {
    const store = useRef(initialState);

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: Partial<Store>) => {
        store.current = { ...store.current, ...value };
        subscribers.current.forEach((callback) => callback());
    }, []);

    const subscribe = useCallback((callback: () => void) => {
        subscribers.current.add(callback);
        return () => subscribers.current.delete(callback);
    }, []);

    return {
        get,
        set,
        subscribe,
        initialState
    };
}

type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

const StoreContext = createContext<UseStoreDataReturnType | null>(null);

function Provider<Store>({ children, value }: { children: React.ReactNode, value: Store }) {
    return (
        <StoreContext.Provider value={useStoreData(value)}>
            {children}
        </StoreContext.Provider>
    );
}

function useStore<SelectorOutput, Store>(
    selector: (store: any) => SelectorOutput
): [SelectorOutput, (value: Partial<Store>) => void] {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error("Store not found");
    }

    const state = useSyncExternalStore(
        store.subscribe,
        () => selector(store.get()),
        () => selector(store.initialState),
    );

    return [state, store.set];
}

export { useStore, Provider }
