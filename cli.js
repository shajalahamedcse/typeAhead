const App = require("./index");
const program = require("commander");

program
  .version('0.0.1')
  .description(`typeAhead: .....`);

program
  .command('ping')
  .action(() => console.log('PONG'));

program
  .command('search <prefixQuery>')
  .action((prefixQuery) => (
    App.search(prefixQuery)
  ));


program
  .command('import <path>')
  .action(path =>
    App.importFile(path)
  );

program.parse(process.argv);

App.redisClient.quit();