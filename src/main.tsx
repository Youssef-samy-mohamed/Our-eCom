import AppRouter from './routes/AppRouter';
import { createRoot } from 'react-dom/client';



//styles
import "bootstrap/dist/css/bootstrap.min.css";
import '../src/styles/global.css'

// redux
import { Provider } from 'react-redux';
import { store, persistor } from "../src/store/index";
import { PersistGate } from 'redux-persist/integration/react';
import './services/axios-global';

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
