const App = require("./index");

const funNames = ['shajal', 'jayed', 'zerin', 'sazid', 'mahadi', 'faruk', 'chotha', 'sajib', 'pantho'];

App.insertWords(funNames);

//App.bumpScore("walid");
//App.bumpScore("waldo");
//App.bumpScore("waldo");

App.setScore("zerin", -500);
q = App.returnTopNSuggestions(6);
q('z');

App.redisClient.quit();