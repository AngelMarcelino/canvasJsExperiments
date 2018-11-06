

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: __dirname + '/src/index.ts',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'main.js',
        path: __dirname + '/dist'
    },
    devServer: {
        contentBase: __dirname + '/dist',
        port: 3000,
        watchContentBase: true
    }
}