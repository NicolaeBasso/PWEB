const readline = require('readline');
const https = require('https');
const { exit } = require('process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const searchInWeb = (url, query) => {  
  try {
    console.log(`https://${url}/${query === '--none' ? '' : query}`);
    https.get(`https://${url}/${query === '--none' ? '' : query}`, res => {
      let data = [];
      const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
      console.log('Status Code:', res.statusCode);

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        const users = JSON.parse(Buffer.concat(data).toString());

        for(user of users) {
          console.log(user);
        }
      });
    })
  } catch (error) {
    console.error(error);
  }
  
}

const recursiveAsyncReadLine = () => {
    rl.question("Please Choose an option:\n"
      + "1) -h => help\n"
      + "2) search -u <url> -s <search-terms> => search in web\n"
      + "3) q => Exit\n"
      , (line) => {
          if(line === '-h') {
            console.log('1. Always provide with -u some_url_here\n2. -s search_terms_here or -s --none if no more terms');
          } else if(line.substring(0, 'search'.length) === 'search') {
            console.log("==========================");
            searchInWeb(
              line.substring(line.indexOf('-u ') + 3, line.indexOf('-s ') - 1),
              line.substring(line.indexOf('-s ') + 3, line.length));
          } else if(line === 'q') {
            exit(0);
          } else {
            console.log("No such option. Please enter another: ");
          }

          recursiveAsyncReadLine();
    });
};
recursiveAsyncReadLine();