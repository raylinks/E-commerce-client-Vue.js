'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_URL: '"http://127.0.0.1:8000"',
    // complaints: [{
    //         name: "Card Not Found"
    //     },
    //     {
    //         name: "Change Bank"
    //     },
    //     {
    //         name: "Invalid Actual Price (I.e. Card Confirmed For Less)"
    //     },
    //     {
    //         name: "Delayed payment"
    //     },
    //     {
    //         name: "Withdrawal"
    //     },
    //     {
    //         name: "Transfer"
    //     },
    //     {
    //         name: "Others"
    //     }
    // ]
})