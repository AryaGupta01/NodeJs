const fs = require('fs')

fs.appendFileSync('./01_Basic/log.txt',`${Date.now().toLocaleString()} hello From Log\n`)

console.log(fs.statSync('./01_Basic/log.txt'))






