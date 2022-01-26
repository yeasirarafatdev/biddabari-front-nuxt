import Vue from 'vue'

/*const moment = require('moment-timezone')
moment().tz('Asia/Dhaka').format()*/

Vue.filter('truncate', function(value, length) {
    if (!value) return ''
    value = value.toString()
    if (value.length > length) return value.substring(0, length) + '...'
    else return value
})

Vue.filter('capitalize', function(value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})
