module.exports = {
 proxy: {
    '/+(api|user|team|week|common)/**': { 
		target: 'http://localhost:8081/',
		changeOrigin: true, //是否跨域
		pathRewrite: {} //需要rewrite的  
    	}
 	}
}