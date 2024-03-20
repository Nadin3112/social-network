import React from 'react';
import ReactDOM from 'react-dom';
import SocialNetworkApp from './App';

test('renders App component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SocialNetworkApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
