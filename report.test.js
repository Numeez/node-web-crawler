const {test,expect} = require('@jest/globals')
const {sortPages} = require('./report')


test("sortPages 2 pages",()=>{
const input = {
    "https://wagslane.dev/path":3,
    "https://wagslane.dev":1,
}
const actual = sortPages(input)
const expected = [
    ["https://wagslane.dev/path",3],
    ["https://wagslane.dev",1]
]
expect(actual).toEqual(expected)    
})


test("sortPages 5 pages",()=>{
    const input = {
        "https://wagslane.dev/path":3,
        "https://wagslane.dev":1,
        "https://wagslane.dev/path1":7,
        "https://wagslane.dev/path2":22,
        "https://wagslane.dev/path3":15,

    }
    const actual = sortPages(input)
    const expected = [
        ["https://wagslane.dev/path2",22],
        ["https://wagslane.dev/path3",15],
        ["https://wagslane.dev/path1",7],
        ["https://wagslane.dev/path",3],
        ["https://wagslane.dev",1],
       
    ]
    expect(actual).toEqual(expected)    
    })