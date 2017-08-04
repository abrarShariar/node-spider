const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app    = express();

//the url to scrape
const url = 'https://www.realestate.com.au/news/';

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/',(req,res)=>{

    request(url,(err,response,html)=>{
        let allNewsData = [];

        if(!err){
            const $ = cheerio.load(html);
            let main = $("#rui-main-content").html()

            let articles = $('article',main)

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
                                data['link_title'] = item.attribs.title;

                                item.children.map((el)=>{
                                    if(el.type == 'text'){
                                        data["title_text"] = el.data
                                    }
                                })
                                allNewsData.push(data);
                            }
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