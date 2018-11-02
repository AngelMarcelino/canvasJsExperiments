

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: __dirname + '/index.js',
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