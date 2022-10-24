import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './src/routes/AppRouter'
import { store } from './src/store/store'

const ConsejoApp = () => {
  return (
    <Provider store={store}>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </Provider>
  );
}

export default ConsejoApp
