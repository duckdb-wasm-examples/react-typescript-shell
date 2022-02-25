import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  target: "web",
  mode: "production",
  entry: {
    app: ["./src/app.tsx"],
  },
  output: {
    path: path.resolve(__dirname, "./build/"),
    filename: "static/js/[name].[contenthash].js",
    chunkFilename: "static/js/[name].[contenthash].js",
    assetModuleFilename: "static/assets/[name].[contenthash][ext]",
    webassemblyModuleFilename: "static/wasm/[hash].wasm",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".mjs", ".jsx", ".css", ".wasm"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /.*\.wasm$/,
        type: "asset/resource",
        generator: {
          filename: "static/wasm/[name].[contenthash][ext]",
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                auto: true,
                exportGlobals: true,
                localIdentContext: path.resolve(__dirname, "src"),
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./static/index.html",
      filename: "./index.html",
    }),
  ],
  experiments: {
    asyncWebAssembly: true,
  },
  devtool: false,
  performance: {
    hints: false,
  },
};
