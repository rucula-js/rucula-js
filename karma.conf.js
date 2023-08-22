// karma.conf.js
module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-typescript-preprocessor'),
        ],
        files: [
            './test/**/*.ts'
        ],
        client: {
            jasmine: {
            },
            clearContext: false
        },
        preprocessors: {
            // Configure o preprocessamento para os arquivos TypeScript de teste
            './test/**/*.ts': ['typescript']
        },
        jasmineHtmlReporter: {
            suppressAll: true, 
            suppressFailed: true 
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        // autoWatch: true,
         browsers: ['Chrome'],
        // singleRun: false,
        // restartOnFileChange: true
    })
}