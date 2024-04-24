const {normalizeUrl} = require('./crawl')
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
