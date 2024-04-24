const {JSDOM} = require('jsdom')

function getUrlFromHTML(htmlBody,baseURL){
    urls=[]
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const link of linkElements){
        

        if(link.href.slice(0,1)==="/"){
            // relative
            try{
                const urlObject =  new URL(`${baseURL}${link.href}`)
                urls.push(urlObject.href)
            }catch(err){
                console.log(`error with relative url : `,err)
            }
        }else{
            //absolute
            try{
                const urlObject =  new URL(link.href)
                urls.push(urlObject.href)
            }catch(err){
                console.log(`error with relative url : `,err)
            }
        }
       
    }
    return urls
}

function normalizeUrl(urlString){
    const urlObject = new URL(urlString)
   const hostPath = `${urlObject.hostname}${urlObject.pathname}`
   if(hostPath.length>0 && hostPath.slice(-1)==="/"){
       return hostPath.slice(0,-1)
   }
   return hostPath
}






module.exports={
    normalizeUrl,
    getUrlFromHTML
}