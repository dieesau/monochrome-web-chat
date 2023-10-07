const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');

const baseConfig = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/index.ts'),
    },
    resolve: {
        extensions: ['.ts', '.js', '.pcss'],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /.ts$/i,
                exclude: /node_modules/,
                use: [
                  {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        configFile: path.resolve(__dirname, 'tsconfig.json'),
                    }
                    },
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.hbs$/i,
                loader: 'handlebars-loader',
            },
            {
                test: /\.((c|pc)ss)$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader'],
              }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css',
        }),
        new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ],
}

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config.cjs') : require('./webpack.dev.config.cjs');
    return merge(baseConfig, envConfig);
};
