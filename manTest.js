const App = require("./index");

const funNames = ['shajal', 'jayed', 'zerin', 'sazid', 'mahadi', 'faruk', 'chotha', 'sajib', 'pantho'];

App.insertWords(funNames);

//App.bumpScore("walid");
//App.bumpScore("waldo");
//App.bumpScore("waldo");

App.setScore("zerin", -500);
q = App.returnTopNSuggestions(6);
q('z');




const sample = [
    { word: "mary", score: -20 },
    { word: "poppins", score: -5 },
    { word: "walmart", score: -10 },
    { word: "wario", score: 0 },
    { word: "waluigi", score: -1 },
    { word: "javascript", score: -99 },
    { word: "reddit", score: -44 },
    { word: "hackernews", score: -2 },
    { word: "chris lee", score: -20 },
    { word: "nascar", score: -20 },
    { word: "walid", score: -1000 },
  ]
  
App.insertWordsWithScores(sample);
  
  


App.redisClient.quit();