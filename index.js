"use strict";

const redis = require('redis');
const redisClient = redis.createClient();

/*
redisClient.zadd('animal', 1 , 'cat');
redisClient.zadd('animal', 2, 'cow');
redisClient.zadd('animal', 3, 'catfish');
redisClient.zadd('animal', 4, 'croccodile');
redisClient.zincrby('animal', 5, 'cat');

redisClient.zscore('animal', 'catfish', (err, score) =>{
    if(!err){
        console.log(score);
    }else{
        console.log(err);
    }
});

redisClient.quit();
*/

/*
class TypeAhead{
    constructor(){
        this.words = []
    }

    batchImport(words){

    }
}
*/

const batchImport = (words) => {
    words.forEach(word => {
        const prefixes = extractPrefixes(word);
        index(prefixes, word);
    });
};
const  extractPrefixes = (word) => {
    const prefixes = [];
    for(let index = 1; index <= word.length; index++){
        prefixes.push(word.slice(0,index));
    }
    //console.log(prefixes);
    return prefixes;
}

const index = (prefixes, word)=>{
    prefixes.forEach(prefix => {
        redisClient.zadd(prefix, 0, word);
        //console.log(prefix + " 0 "+word);
    });
}

const names = ['shajal','jayed', 'sajib', 'sazid', 'sourov'];

batchImport(names);

const search = (prefix) =>{
    redisClient.zrange(prefix, 0, -1, (err, data)=>{
        console.log(data);
    });
}
search('sa')
redisClient.quit();