import { Provider } from 'react-redux';
import store from './store';
import Login from './Login';
import AddArea from './AddArea';

export default function App() {
  return (
    <Provider store={store}>
      <AddArea />
    </Provider>
  );
}