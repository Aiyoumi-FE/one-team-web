module.exports = {
    proxy: {
        '/+(api|user|team|week|common)/**': {
            // target: 'http://172.16.19.191:8081/',
            target: 'http://localhost:8082/',
            changeOrigin: true, //是否跨域
            pathRewrite: {} //需要rewrite的  
        }
    }
}
