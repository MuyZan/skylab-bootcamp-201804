const http = require('http')

const url = process.argv[2]

http.get(url, res => {
    res.on('error', console.error)

    res.setEncoding('utf8')

    const chunks = []

    res.on('data', chunk => chunks.push(chunk))

    res.on('end', () => {
        const text = chunks.join('')

        console.log(text.length)
        console.log(text)

        // how many chunks of data have i received?
        //console.log(chunks.length)
    })
})