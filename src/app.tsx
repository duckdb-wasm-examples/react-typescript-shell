import React from 'react';
import logo from './static/logo.svg';
import './static/App.css';
import 'xterm/css/xterm.css';
import styles from './static/app.module.css';

import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm';
import duckdb_wasm_eh from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm';
import * as shell from '@duckdb/duckdb-wasm-shell';
import shell_wasm from '@duckdb/duckdb-wasm-shell/dist/shell_bg.wasm';

import { Shell } from './components/Shell';

type SomeComponentProps = Record<string, string>;

const App: React.FC<SomeComponentProps> = (propr: SomeComponentProps) => {
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

export default App;
