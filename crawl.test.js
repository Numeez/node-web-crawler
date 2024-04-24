const {normalizeUrl,getUrlFromHTML} = require('./crawl')
const {test,expect} = require('@jest/globals')

test("normalize strip protocol",()=>{
    const input = "https://blog.boot.dev/path"
    const actual = normalizeUrl(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test("normalize strip trailing /",()=>{
    const input = "https://blog.boot.dev/path/"
    const actual = normalizeUrl(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test("normalize url capitals",()=>{
    const input = "https://BLOG.boot.dev/path/"
    const actual = normalizeUrl(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})
test("normalize url strip http",()=>{
    const input = "http://blog.boot.dev/path/"
    const actual = normalizeUrl(input)
    const expected = "blog.boot.dev/path"
    expect(actual).toEqual(expected)
})

test("getURLFormHTML absolute",()=>{
    const input = `
    <html>
    <title>This is a test site</title>
    <body>
    <a href = "https://blog.boot.dev/path">Boot.dev.Blog</a>
    </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getUrlFromHTML(input,inputBaseUrl)
    const expected = ["https://blog.boot.dev/path"]
    expect(actual).toEqual(expected)
})

test("getURLFormHTML relative",()=>{
    const input = `
    <html>
    <title>This is a test site</title>
    <body>
    <a href = "/path/">Boot.dev.Blog</a>
    </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getUrlFromHTML(input,inputBaseUrl)
    const expected = ["https://blog.boot.dev/path/"]
    expect(actual).toEqual(expected)
})

test("getURLFormHTML get multiple urls absoulte and relative",()=>{
    const input = `
    <html>
    <title>This is a test site</title>
    <body>
    <a href = "/path1/">Boot.dev.Blog</a>
    <a href = "https://blog.boot.dev/path2/">Boot.dev.Blog path2</a>
    </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getUrlFromHTML(input,inputBaseUrl)
    console.log(actual)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
    expect(actual).toEqual(expected)
})

test("getURLFormHTML checking a bad URL",()=>{
    const input = `
    <html>
    <title>This is a test site</title>
    <body>
    <a href = "invalid">Boot.dev.Blog</a>
    </body>
    </html>
    `
    const inputBaseUrl = "https://blog.boot.dev"
    const actual = getUrlFromHTML(input,inputBaseUrl)
    const expected = []
    expect(actual).toEqual(expected)
})


