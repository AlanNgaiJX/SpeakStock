module.exports = {
    devServer: {
        port: 8081,
        proxy: {
            '/sinajs': {
                target: "http://hq.sinajs.cn",
                ws: true,
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/sinajs': '/'
                }
            }
        },
        overlay: {
            warnings: false,
            errors: false
        }
    },
}