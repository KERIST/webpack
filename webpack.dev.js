const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
		modules: ['node_modules', path.resolve(__dirname, './src')],
		extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
		descriptionFiles: ['package.json'],
    },
    devtool: 'source-map',
    target: 'web',
    cache: false,
    module: {
        rules: [
            {
              test: /\.(js|jsx|ts)?$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', "@babel/preset-react"]
                }
              }
            },
            {
                test: /\.(css|scss)?$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
}