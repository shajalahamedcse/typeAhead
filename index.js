const redis = require("redis");
const fs = require("fs");
const redisClient = redis.createClient();


const importFile = (path) => {
    let data;
    try{
        data = fs.readFileSync(path, "utf-8");
    }catch(e){
        console.log(`ERROR: ${e.path} is not a valid file path`);
        return;
    }
    const dataJson = JSON.parse(data);
    insertWords(dataJson);
}
const insertWords = (words) => {
    words.forEach(word => {
        const prefixes = extractPrefixes(word);
        index(prefixes, word);
        console.log(prefixes);
    });
    return words.length;
};


// takes an array of words with scores 
//  [{ word: "string", score: val }]
const insertWordsWithScores = wordsWithScores => {
    wordsWithScores.forEach(item => {
       
      const prefixes = extractPrefixes(item.word);
      index(prefixes, item.word, item.score);
    });
  };

const  insertWord = (word) => {
    insertWords([word]);
    return 1;
}

const remove = (prefixes, word) => {
    prefixes.forEach(prefix => {
        redisClient.zrem(prefix, word);
    })
}

const deleteWords = (words) => {
    words.forEach(word => {
        const prefixes = extractPrefixes(words);
        remove(prefixes, word);
    })
    return words.length;
}
const deleteWord = (word) =>{
    deleteWords([word]);
    return  1;
}


const extractPrefixes = (word )=> {
    const prefixes = [];
    for (let index = 1; index <= word.length; index++) {
      prefixes.push(word.slice(0, index));
    }
    return prefixes;
  };
  
const index = (prefixes, word, score=0) => {
    prefixes.forEach(prefix =>
      redisClient.zadd(prefix, score, word)
    );
};


const search = prefixQuery => {
    redisClient.zrange(prefixQuery, 0, -1, (err, reply) =>
      console.log(reply)
    );
  };
  
const returnTopNSuggestions = (suggestionCount) => {
    return (prefixQuery) => {
        redisClient.zrange(prefixQuery, 0, suggestionCount - 1, (err, reply)=>{
            console.log(reply);
        });
    };
};


const setScore = (word, score) => {
    const prefixes = extractPrefixes(word);
    prefixes.forEach(prefix =>{
      redisClient.zadd(prefix, score, word)
      console.log(prefix+" "+score+" "+word);
    }
    );
  };

module.exports = {
    redisClient,
    insertWords,
    insertWordsWithScores,
    extractPrefixes,
    index,
    search,
    setScore,
    returnTopNSuggestions,
    importFile
}