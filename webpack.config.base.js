//webpack公共配置文件
const path = require('path');  //加载path模块--一会要用到
const HtmlWebpackPlugin = require("html-webpack-plugin");  //引入html-webpack-plugin插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');  //打包进度条


module.exports = {
    //入口文件
    entry: {
        index: "./src/index.js",
        // one: './src/one.js',
    },
    //打包出口
    output: {
        //打包出口目录
        path: path.resolve(__dirname, "dist"),
        //打包出口文件名
        filename: 'js/[name]_[contenthash].main.js'
        /*
            最后导出两个文件
            index.main.js
            one.main.js
        */
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "index",  //<title></title>中的内容
            filename: "index.html",   //拷贝到dist目录之后模板页的名字
            template: "./public/index.html",  //源文件--拷贝的模板页来自于哪
            chunks: ["index"]  //拷贝模板页的键名
        }),
        // new HtmlWebpackPlugin({
        //     title: "one",
        //     filename: "one.html",
        //     template: "./public/one.html",
        //     chunks: ["one"]
        // }),
        new CleanWebpackPlugin(),
        new WebpackBar()
    ],
    module: { //用来配置loader
        rules: [{
            test: /\.jsx?$/,  //监控.js或.jsx文件
            exclude: /(node_modules|bower_components)/, //不需要监控的文件
            use: {
                loader: 'babel-loader',  //loader的名字
                // options:{ //语法库
                //     presets:['@babel/preset-env','@babel/preset-react']  //分别是ES语法 和 react语法
                // }
            }
        },
        {
            test: /\.(png|jpe?g|gif)$/,  //监控图片
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,  //用来设置多少大小以下的图片会被转成base64,然后插入到js或css中
                        publicPath: './../img',//引用目录
                        outputPath: 'img/'//输出目录
                    },
                },
                //先压缩完
                {   //压缩图片
                    loader: 'image-webpack-loader',
                },
            ],
        },
        {
            test: /\.(ttf|eot|woff|woff2)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                publicPath: './../fonts',
                outputPath: 'fonts/'
            },
        },
        ]
    },
    resolve:{  //可以省略哪些拓展名
        extensions:['.jsx','.less','.js','.css']  //搜索顺序从左到右
      },  
}