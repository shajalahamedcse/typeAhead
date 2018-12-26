const redis = require('redis');
const redisClient = redis.createClient();

redisClient.zadd('animal', 1 , 'cat');
redisClient.zadd('animal', 2, 'cow');
redisClient.zadd('animal', 3, 'catfish');
redisClient.zadd('animal', 4, 'croccdile');
redisClient.zincrby('animal', 5, 'cat');

redisClient.zscore('animal', 'catfish', (err, score) =>{
    if(!err){
        console.log(score);
    }else{
        console.log(err);
    }
});

redisClient.quit();