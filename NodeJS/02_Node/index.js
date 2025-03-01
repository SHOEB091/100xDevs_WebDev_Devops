const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
  .name('counter')
  .description('CLI to do file based tasks')
  .version('0.8.0');

program.command('count')
  .description('Count the number of words in a file')
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const wordCount = countWords(data);
        console.log(`There are ${wordCount} words in ${file}`);
      }
    });
  });

function countWords(text) {
  const words = text.split(/\s+/);
  return words.filter(word => word.length > 0).length;
}

program.parse(process.argv);





