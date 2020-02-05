import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './store/ConfigureStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App/>, document.getElementById('root'))

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div className="darkBackground">
                <App />
            </div>
            <footer className="footer text-muted darkBackground">
                <br></br>
                <div className="container">
                    &copy; 2020 - Book Store React Client
                </div>
            </footer>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();