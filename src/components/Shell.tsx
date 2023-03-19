import React from 'react';
import 'xterm/css/xterm.css';
import '../static/globals.css';

import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm';
import duckdb_wasm_eh from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm';
import * as shell from '@duckdb/duckdb-wasm-shell';
import shell_wasm from '@duckdb/duckdb-wasm-shell/dist/shell_bg.wasm';

// DuckDB shell from: https://github.com/duckdb-wasm-examples/react-typescript-shell/blob/master/src/app.tsx

const DUCKDB_BUNDLES: duckdb.DuckDBBundles = {
    mvp: {
        mainModule: duckdb_wasm,
        mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js', import.meta.url).toString(),
    },
    eh: {
        mainModule: duckdb_wasm_eh,
        mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js', import.meta.url).toString(),
    },
};

type SomeComponentProps = Record<string, string>;

export const Shell: React.FC<SomeComponentProps> = (props: SomeComponentProps) => {
    const term = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => {
        shell.embed({
            shellModule: shell_wasm,
            container: term.current!,
            resolveDatabase: async props => {
                const bundle = await duckdb.selectBundle(DUCKDB_BUNDLES);
                const logger = new duckdb.ConsoleLogger();
                const worker = new Worker(bundle.mainWorker!);
                const db = new duckdb.AsyncDuckDB(logger, worker);
                await db.instantiate(bundle.mainModule);
                return db;
            },
        });
    }, []);
    return (
        <div className="container">
            <div ref={term} />;
        </div>
    );
};

export default Shell;
