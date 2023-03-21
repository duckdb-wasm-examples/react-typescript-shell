import React from 'react';
import './static/App.css';
import 'xterm/css/xterm.css';
import './static/globals.css';

import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm';
import duckdb_wasm_eh from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm';
import duckdb_wasm_coi from '@duckdb/duckdb-wasm/dist/duckdb-coi.wasm';

import { DuckDBConnectionProvider, DuckDBPlatform, DuckDBProvider } from '@duckdb/react-duckdb';

import logo from './static/logo.svg';
import { Map } from './components/Map';
import { Shell } from './components/Shell';

const DUCKDB_BUNDLES: duckdb.DuckDBBundles = {
    mvp: {
        mainModule: duckdb_wasm,
        mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js', import.meta.url).toString(),
    },
    eh: {
        mainModule: duckdb_wasm_eh,
        mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js', import.meta.url).toString(),
    },
    coi: {
        mainModule: duckdb_wasm_coi,
        mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-coi.worker.js', import.meta.url).toString(),
        pthreadWorker: new URL(
            '@duckdb/duckdb-wasm/dist/duckdb-browser-coi.pthread.worker.js',
            import.meta.url,
        ).toString(),
    },
};
const logger = new duckdb.ConsoleLogger(duckdb.LogLevel.WARNING);

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

            {/* Components within these nodes can share WASM DuckDB instance */}
            <DuckDBPlatform logger={logger} bundles={DUCKDB_BUNDLES}>
                <DuckDBProvider>
                    <DuckDBConnectionProvider>
                        <Shell padding={[16, 0, 0, 20]} backgroundColor="#333" />
                        <Map />
                    </DuckDBConnectionProvider>
                </DuckDBProvider>
            </DuckDBPlatform>
        </div>
    );
};
