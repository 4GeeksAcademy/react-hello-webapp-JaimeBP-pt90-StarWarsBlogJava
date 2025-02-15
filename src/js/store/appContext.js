import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// No cambiar, aquí inicializamos el contexto
export const Context = React.createContext(null);

// Esta función inyecta el store global a toda la aplicación
const injectContext = PassedComponent => {
    const StoreWrapper = props => {
        // Estado inicial del store
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: updatedStore =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: { ...state.actions }
                    })
            })
        );

        // Cargar los datos al iniciar la aplicación
        useEffect(() => {
            state.actions.loadData();
        }, []);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;
