//生产配置文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");  //引入mini-css-extract-plugin插件
const base = require("./webpack.config.base");
const merge = require("webpack-merge");
const TerserPlugin = require('terser-webpack-plugin'); //对JS进行压缩，webpack的内置插件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //对CSS进行压缩，第三方包

module.exports =merge(base,{
    plugins: [
        new MiniCssExtractPlugin({
            filename:'css/[name].[hash].css',
            chunkFilename:"[id].[hash].css"
        }),
    ],
    module: { //用来配置loader
        rules: [
        {
            test: /\.css$/,   //监控.css文件
            use: [MiniCssExtractPlugin.loader, 
            {
                loader:"css-loader",
                options:{
                    modules: true  //开启模块化
                }
            }
        ]
        },
        {
            test: /\.less$/,
            use: [MiniCssExtractPlugin.loader, 
            {
                loader:"css-loader",
                options: {
                    modules: true   //开启模块化
                    },
                }, "less-loader"]
        },
        {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        },
        ]
    },
    //模式
    mode: 'production',
    // devtool:"source-map" //打包以后会生成.map映射文件
    optimization: {
        minimize: true, //使用 TerserPlugin 压缩js,默认true
        minimizer: [   //自定义 TerserPlugin压缩
            new TerserPlugin({
                cache: true, //缓存 优化速度
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({})  //css压缩
        ]
    }
});