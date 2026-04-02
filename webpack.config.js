const path = require('path') //paht -> modulo interno de node para trabajar con rutas de archivos, require -> funcion para importar modulos, path -> modulo para trabajar con rutas de archivos
const HtmlWebpackPlugin = require('html-webpack-plugin') //plugin para generar un archivo html a partir de una plantilla, html-webpack-plugin -> plugin para generar un archivo html, require -> funcion para importar modulos
const MiniCssExtratPlugin = require('mini-css-extract-plugin') //plugin para extraer el css en un archivo separado, mini-css-extract-plugin -> plugin para extraer el css, require -> funcion para importar modulos


module.exports = {
    entry: './src/index.js', //punto de entrada de la aplicacion, donde se encuentra el archivo principal de la aplicacion
    output: {
        path: path.resolve(__dirname, 'dist'), //ruta de salida del archivo generado por webpack, __dirname -> variable global que contiene la ruta del directorio actual, path.resolve -> metodo para resolver rutas de archivos, dist estandar para indicar que es la carpeta de distribucion de la aplicacion
        filename: 'main.js' //nombre del archivo generado por webpack
    },
    resolve: {
        extensions: ['.js'] //extensiones de archivos que webpack va a resolver, en este caso solo .js
    },
    module: {
        rules: [
            {
            test: /\.m?js$/, //expresion regular para indicar que archivos se van a procesar, en este caso todos los archivos que terminen con .js
            exclude: /node_modules/, //excluir la carpeta node_modules, ya que no queremos procesar los archivos de las dependencias
            use: {
                loader: 'babel-loader' //loader para traducir el codigo, babel-loader es un loader para babel, que es un transpiler de javascript
                }
            },
            {
                test: /\.css$/, //expresion regular para indicar que archivos se van a procesar, en este caso todos los archivos que terminen con .css
                use: [MiniCssExtratPlugin.loader, 'css-loader'], //loader para procesar el css, mini-css-extract-plugin para extraer el css en un archivo separado, css-loader para procesar el css

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true, //indica que se va a inyectar el archivo generado por webpack en el archivo html, true -> inyecta el archivo en el head del html
            template: './public/index.html', //ruta de la plantilla html, en este caso se encuentra en la carpeta public
            filename: './index.html' //nombre del archivo generado por webpack, en este caso se va a generar un archivo index.html en la carpeta dist
        }),
        new MiniCssExtratPlugin(), //instancia del plugin para extraer el css en un archivo separado
        
    ]
}