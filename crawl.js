const {JSDOM} = require('jsdom')

async function crawlPage(currentURL){
    console.log(`Actively crawling ${currentURL}`)
    try{
        const resp = await fetch(currentURL)
        if(resp.status>399){
            console.log(`Error in fetch with status code : ${resp.status} on page : ${currentURL}`)
            return
        }
        const contentType = resp.headers.get("content-type")
        if(contentType!="text/html"){
            console.log(`Non html response : ${contentType} on page ${currentURL} `)
            return
        }

        
        console.log(await resp.text())

    }catch(err){
        console.log(`Error in fetch : ${err} while fetching ${currentURL}`)
    }
    
   
}


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
    getUrlFromHTML,
    crawlPage,
}