import React from 'react';
import {AppWrapperContainer} from "./components/AppWrapperContainer";
import {AppContextProvider} from "./context/AppContext";
import {UserContextProvider} from "./context/userContext";
import {AuthenticationComponent} from "./components/AuthenticationComponent";

function App() {
    return (
        <AppContextProvider>
            <UserContextProvider>
                <AuthenticationComponent>
                    <AppWrapperContainer/>
                </AuthenticationComponent>
            </UserContextProvider>
        </AppContextProvider>
    )
}

export default App;
