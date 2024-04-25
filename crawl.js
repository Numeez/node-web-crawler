const {JSDOM} = require('jsdom')

async function crawlPage(baseURL,currentURL,pages){
    const baseURLObject = new URL(baseURL)
    const currentURLObject = new URL(currentURL)

    if(baseURLObject.hostname!==currentURLObject.hostname){
        return pages
    }
    const normalizedCurentURL = normalizeUrl(currentURL)
    if(pages[normalizedCurentURL]>0){
        pages[normalizedCurentURL]++
        return pages
    }
    pages[normalizedCurentURL] = 1
    
    console.log(`Actively crawling ${currentURL}`)

    try{
        const resp = await fetch(currentURL)
        if(resp.status>399){
            console.log(`Error in fetch with status code : ${resp.status} on page : ${currentURL}`)
            return pages
        }
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log(`Non html response : ${contentType} on page ${currentURL} `)
            return pages
        }

        
        const htmlBody = await resp.text()

        const nextURLs = getUrlFromHTML(htmlBody,baseURL)

        for (const url of nextURLs){
            pages  = await crawlPage(baseURL,url,pages)
        }
       
    }catch(err){
        console.log(`Error in fetch : ${err} while fetching ${currentURL}`)
    }
    return pages
   
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