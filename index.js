const redis = require("redis");
const redisClient = redis.createClient();


const insertWords = (words) => {
    words.forEach(word => {
        const prefixes = extractPrefixes(word);
        index(prefixes, word);
        console.log(prefixes);
    });
    return words.length;
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


const extractPrefixes = word => {
    const prefixes = [];
    for (let i = 1; i <= word.length; i++) {
      prefixes.push(word.slice(0, i));
    }
    return prefixes;
  };
  
const index = (prefixes, word) => {
    prefixes.forEach(prefix =>
      redisClient.zadd(prefix, 0, word)
    );
};


const search = prefixQuery => {
    client.zrange(prefixQuery, 0, -1, (err, reply) =>
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
    extractPrefixes,
    index,
    search,
    setScore,
    returnTopNSuggestions
}