const fs = require('fs')
const path = require('path');
let origPath = __dirname;
let copyPath=__dirname+'/'+'files-copy';
console.log("copyPath=",copyPath);
function pathHandler(pathName){
   if (typeof pathName === 'string'){
      fs.mkdir(pathName, function(){
      console.log(`Директория ${pathName} создана`);   
      });
   } else return null;
   
}
function fileHandler(fileName){
   if (typeof fileName === 'string'){
      fs.open(fileName, 'w', (err) => {
          if(err) throw err;
         console.log(`Файл ${fileName} создан`);
      });
   }
   
}
fs.stat(copyPath, function(err) {
   if (!err) {
       console.log(`Директория ${copyPath} существует`);
   }
   else if (err.code === 'ENOENT') {
      pathHandler(copyPath);
       console.log(`Создание директории ${copyPath}`);
   }
});
let i = 0;
let fileMap = new Map();
fs.readdir(copyPath, { withFileTypes: true }, (err, files) => {
   files.forEach(file => {
    if(file.isFile()){ 
       fileMap.set(file.name, '1');
       console.log("Filename"+file.name);
      i++;
       }
   });
 });

 fs.readdir(origPath, { withFileTypes: true }, (err, files) => {
   files.forEach(file => {
      if(file.isFile()){ 
         fileName=copyPath+'/'+file.name;
         if (!fileMap.has(file.name)){
            console.log("Create file"+file.name);
            fileHandler(file.name);
         };
      }
   })
   });
 

