const { stdin, stdout, stderr } = process;
const fs = require('fs');
const path = require('path');

process.on('SIGINT', function() {
   process.exit();});

process.on('exit', code => {
   if (code === 0) {
       stdout.write('Удачи\n');
   } else {
       stderr.write(`Что-то пошло не так. Программа завершилась с кодом ${code}`);
   }
});
function fileHandler(){

   fs.open('input.txt', 'w', (err) => {
       if(err) throw err;
       console.log('Файл был создан');
   });
   
}
fileHandler();
stdout.write('Как тебя зовут?\n');
stdin.on('data', data => {
               if (data.toString().trim() === 'exit') {
                     process.exit();
               }
               let str = data.toString();
               str = str.replace('\n', '');
               fs.appendFile(path.join(__dirname, 'input.txt'),str,
               (err) => {
               if (err) throw err;
                  console.log('Файл был изменен');
               });
             /*  process.on('exit', () => stdout.write('Удачи!'));*/
              

});

