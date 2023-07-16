let os = require('os');
console.log(os.platform())
console.log(os.cpus().length+' core')
console.log(os.arch())
console.log(os.freemem())
console.log(os.uptime())
console.log(os.hostname())


/*
darwin
8 core
arm64
344653824
2254889
Bhumikas-MacBook-Air.local
*/