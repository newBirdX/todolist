//开发配置文件
const path = require('path');  //加载path模块--一会要用到
const base = require("./webpack.config.base");
const merge = require("webpack-merge");  

module.exports = merge(base,{
    module: { //用来配置loader
        rules: [
        {
            test: /\.css$/,   //监控.css文件
            use: ["style-loader", 
            {
                loader:"css-loader",
                options:{
                    modules: false  //开启模块化
                }
            }
        ]
        },
        {
            test: /\.less$/,
            use: ["style-loader", 
            {
                loader:"css-loader",
                options: {
                    modules: true   //开启模块化
                    },
                }, "less-loader"]
        },
        {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        },
        ]
    },
    //模式
    mode: 'development',
    devtool:"source-map", //打包以后会生成.map映射文件
    devServer: {  //配置webpack-dev-server
        contentBase: path.join(__dirname, 'dist'), //网站根目录
        compress: true,//会 gzip(压缩) 和 serve(服务) 所有来自项目根路径下 dist/ 目录的文件
        port: 9000, //配置端口号
        proxy: { //配置代理
            "/data": { //最后项目上线的真实接口地址
                "target": "http://www.bjlink32.com/data.php", //公司的开发测试服务器地址--跨域访问
                // secure: false,// 如果是https接口，需要配置这个参数  显示的是一个json
                "changeOrigin": true,//开启跨域
                "pathRewrite": { "^/data": "" }//如果接口本身没有/data需要通过pathRewrite来重写了地址
            }
        },
        overlay:{
            warning:true,
            errors:true
        }
    }, 
});