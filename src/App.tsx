import React from 'react';
import logo from './static/logo.svg';
import './static/App.css';
import './static/globals.css';
import 'xterm/css/xterm.css';
import { Shell } from './components/Shell';

type SomeComponentProps = Record<string, string>;

export const App: React.FC<SomeComponentProps> = (propr: SomeComponentProps) => {
    const [count, setCount] = React.useState<number>(0);

    React.useEffect(() => {
        document.title = `You clicked ${count} times`;
    });

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Click count: {count}</p>
                <button onClick={() => setCount(count + 1)}>Click me</button>
            </header>
            <Shell />
        </div>
    );
};
