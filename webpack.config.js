//webpack入口配置文件
const Target = process.env.NODE_ENV;  //用来判断是生产还是测试
/*
   如果执行 npm run dev  那么Target的值就是"dev"
   如果执行npm run build  那么Target的值就是"build"
*/
if(Target === "dev"){
    module.exports=require("./webpack.config.dev");   //加载开发配置文件
}else if(Target === "build"){
    module.exports=require("./webpack.config.prod");  //加载生产配置文件
}