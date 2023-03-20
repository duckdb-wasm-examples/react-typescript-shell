import React from 'react';
import 'xterm/css/xterm.css';
import '../static/globals.css';
import arrow from "apache-arrow";

import * as duckdb from '@duckdb/duckdb-wasm';
import duckdb_wasm from '@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm';
import duckdb_wasm_eh from '@duckdb/duckdb-wasm/dist/duckdb-eh.wasm';
import * as shell from '@duckdb/duckdb-wasm-shell';
import shell_wasm from '@duckdb/duckdb-wasm-shell/dist/shell_bg.wasm';

// DuckDB shell from: https://github.com/duckdb-wasm-examples/react-typescript-shell/blob/master/src/app.tsx

const DUCKDB_BUNDLES: duckdb.DuckDBBundles = {
    // Select a bundle based on browser checks
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

const createDuckDB = async () => {

    console.log("createDuckDB")
    const bundle = await duckdb.selectBundle(DUCKDB_BUNDLES);
    // Instantiate the asynchronus version of DuckDB-wasm
    const worker = new Worker(bundle.mainWorker!);
    const logger = new duckdb.ConsoleLogger();
    const db = new duckdb.AsyncDuckDB(logger, worker);
    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    return db;
};

export const Shell: React.FC<SomeComponentProps> = (props: SomeComponentProps) => {
    const term = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => {
        shell.embed({
            shellModule: shell_wasm,
            container: term.current!,
            resolveDatabase: async props => {
                let db = await createDuckDB()

                // insert data
                const c = await db.connect();
                await c.query(`
                    CREATE TABLE direct_manual AS
                        SELECT * FROM 'https://shell.duckdb.org/data/tpch/0_01/parquet/orders.parquet' LIMIT 10;
                `);
                // close the connection
                await c.close();

                return db;
            },
        });
    }, []);

    React.useEffect(() => {
        console.log("2nd useEffect...")

        shell.embed({
            shellModule: shell_wasm,
            container: term.current!,
            resolveDatabase: async props => {
                let db = await createDuckDB()

                // insert data
                const c = await db.connect();
                await c.query(`
                    CREATE TABLE direct_manual_3 AS
                        SELECT * FROM 'https://shell.duckdb.org/data/tpch/0_01/parquet/orders.parquet' LIMIT 10;
                `);
                // close the connection
                await c.close();

                return db;
            },
        });


        createDuckDB().then(async (db) => {
            const c = await db.connect();
            await c.query(`
            CREATE TABLE direct_manual_2 AS
                SELECT * FROM 'https://shell.duckdb.org/data/tpch/0_01/parquet/orders.parquet' LIMIT 10;
            `);
            console.log("db: ");
            var output4 = await c.query<{ v: arrow.Int }>("SELECT * FROM direct_manual_2 LIMIT 4;");
            console.log("...output4: ");
            console.log(output4)
            console.log(output4.toString());

            await c.close();
        })
    }, [])

    return (
        <div className="container">
            <div ref={term} />
        </div>
    );
};

export default Shell;
