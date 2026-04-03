const path = require('path') //paht -> modulo interno de node para trabajar con rutas de archivos, require -> funcion para importar modulos, path -> modulo para trabajar con rutas de archivos
const HtmlWebpackPlugin = require('html-webpack-plugin') //plugin para generar un archivo html a partir de una plantilla, html-webpack-plugin -> plugin para generar un archivo html, require -> funcion para importar modulos
const MiniCssExtratPlugin = require('mini-css-extract-plugin') //plugin para extraer el css en un archivo separado, mini-css-extract-plugin -> plugin para extraer el css, require -> funcion para importar modulos
// const stylus = require('stylus') //loader para procesar el stylus, stylus -> loader para procesar el stylus, require -> funcion para importar modulos
const CopyPlugin = require('copy-webpack-plugin') //plugin para copiar archivos de una carpeta a otra
const Dotenv = require('dotenv-webpack') //plugin para cargar variables de entorno desde un archivo .env



module.exports = {
    entry: './src/index.js', //punto de entrada de la aplicacion, donde se encuentra el archivo principal de la aplicacion
    output: {
        path: path.resolve(__dirname, 'dist'), //ruta de salida del archivo generado por webpack, __dirname -> variable global que contiene la ruta del directorio actual, path.resolve -> metodo para resolver rutas de archivos, dist estandar para indicar que es la carpeta de distribucion de la aplicacion
        filename: '[name].[contenthash].js', //nombre del archivo generado por webpack, [name] -> nombre del punto de entrada, [contenthash] -> hash del contenido del archivo, para evitar problemas de cache
        assetModuleFilename: 'assets/images/[hash][ext][query]' //nombre del archivo generado por webpack para los archivos de imagen, [hash] -> hash del contenido del archivo, [ext] -> extension del archivo, [query] -> query string del archivo
    },
    mode: "development", //modo de desarrollo, development -> paa no minimizar el codigo y generar un source map
    
    resolve: {
        extensions: ['.js'], //extensiones de archivos que webpack va a resolver, en este caso solo .js
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'), //alias para la carpeta utils, @utils -> nombre del alias
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
         }
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
                test: /\.(css|styl)$/, //expresion regular para indicar que archivos se van a procesar, en este caso todos los archivos que terminen con .css o .styl
                use: [MiniCssExtratPlugin.loader, 'css-loader', 'stylus-loader'], //loader para procesar el css, mini-css-extract-plugin para extraer el css en un archivo separado, css-loader para procesar el css
            },
            {
                test: /\.png$/, //expresion regular para indicar que archivos se van a procesar, en este caso todos los archivos que terminen con .png
                type: 'asset/resource' //tipo de recurso, asset/resource -> para copiar el archivo a la carpeta de salida y generar una url para el archivo
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000, //limite de tamaño del archivo, si el archivo es menor a este limite se va a convertir en una url base64, si es mayor se va a copiar el archivo a la carpeta de salida y generar una url para el archivo
                        mimetype: 'application/font-woff', //tipo de archivo, en este caso es un archivo de fuente
                        name: '[name].[contenthash].[ext]', //nombre del archivo generado, [name] -> nombre original del archivo, [contenthash] -> hash del contenido del archivo, [ext] -> extension del archivo
                        outputPath: './assets/fonts/', //ruta de salida del archivo generado, en este caso se va a generar una carpeta assets/fonts en la carpeta dist
                        publicPath: '../assets/fonts/', //ruta publica del archivo generado, en este caso se va a generar una ruta ../assets/fonts/ para acceder al archivo desde el css
                        esModule: false //para evitar problemas con las rutas de las fuentes, esModule -> para indicar que el loader no va a exportar un modulo ES6, sino un modulo CommonJS
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true, //indica que se va a inyectar el archivo generado por webpack en el archivo html, true -> inyecta el archivo en el head del html
            template: './public/index.html', //ruta de la plantilla html, en este caso se encuentra en la carpeta public
            filename: './index.html' //nombre del archivo generado por webpack, en este caso se va a generar un archivo index.html en la carpeta dist
        }),
        new MiniCssExtratPlugin({
            filename: 'assets/[name].[contenthash].css' //nombre del archivo generado por webpack para el css, [name] -> nombre del punto de entrada, [contenthash] -> hash del contenido del archivo, assets/ -> para generar una carpeta assets en la carpeta dist
        }), //instancia del plugin para extraer el css en un archivo separado
        new CopyPlugin({
            patterns: [{
                // ORIGEN: "Desde mi ubicación actual (__dirname), entra a 'src' y luego a 'assets/images'"
                from: path.resolve(__dirname, 'src', 'assets/images'), //ruta de la carpeta de origen, en este caso se encuentra en la carpeta src/assets/images
                // DESTINO: "Ponlo dentro de 'assets/images' (Webpack ya sabe que es dentro de la carpeta /dist)"
                to: 'assets/images' //ruta de la carpeta de destino, en este caso se va a generar una carpeta assets/images en la carpeta dist
            }]
        }),
        new Dotenv() //instancia del plugin para cargar variables de entorno desde un archivo .env
    ],
}