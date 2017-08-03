const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app    = express();

const url = 'https://www.realestate.com.au/news/';



app.get('/',(req,res)=>{

    request(url,(err,response,html)=>{
        let allNewsData = [];

        if(!err){
            const $ = cheerio.load(html);
            //traverse DOM for main Body
            let main = $("#rui-main-content").html()
            let articles = $('article',main).nextAll()

            articles.map((item,index)=>{
                let data = {}
                let node = articles[item];
                if(node.name == 'article' && node.type == 'tag' && node.children.length > 0){
                    node.children.map((item)=>{
                        if(item.type == 'tag' && item.name == 'figure'){
                            item.children.map((element)=>{
                                if(element.type == 'tag' && element.name == 'a'){
                                    element.children.map((el)=>{
                                       if(el.name == 'img'){
                                           data = {
                                                img: el.attribs.src
                                           }
                                       }
                                    });
                                }
                            })
                        }

                        if(item.type == 'tag' && item.name == 'a' && item.attribs) {
                            if (item.attribs.class == 'article-summary-title-link'){
                                data['url'] = item.attribs.href;
                                data['title'] = item.attribs.title;
                                allNewsData.push(data);
                            }
                            // allNewsData.push(data);
                        }
                    });

                }
            });

            res.send({data: allNewsData})
        }
    });

});


app.listen('8081',(err)=>{
    if(!err){
        console.log('Server running on port 8081');
    }
});