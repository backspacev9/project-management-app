import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import './utils/i18n';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Suspense fallback={<div>...Loading</div>}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>
);
