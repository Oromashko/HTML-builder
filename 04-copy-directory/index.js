const fs = require('fs')
const path = require('path');
const fsPromises = fs.promises;

let origPath =__dirname+'/files';
let copyPath=__dirname+'/'+'files-copy';
console.log("copyPath=",copyPath);
console.log("origPath=",origPath);

function pathHandler(pathName){
   console.log("funstion pathHandler");
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
/*fs.stat(copyPath, function(err) {
   if (!err) {
       console.log(`Директория ${copyPath} существует`);
   }
   else if (err.code === 'ENOENT') {
      if (pathHandler(copyPath)){
       console.log(`Создание директории ${copyPath}`);
      
      }
   };  
});*/
fsPromises.mkdir(copyPath, { recursive: true }).then(function() {
   console.log(`Создание директории ${copyPath}`);
}).catch(function() {
   console.log(`Не могу создать директорию ${copyPath}`);
});
let i = 0;
let fileMap = new Map();
let pathCreated=false;
/*while (!pathCreated) {
fs.stat(copyPath, function(err) {
   if (!err) {
       pathCreated=true;
       console.log("pathCreated true");
   }
     
});
};*/
fs.readdir(copyPath, { withFileTypes: true }, (err, files) => {
   if (err){console.log("Директория не существует",err);}
   else{
         files.forEach(file => {
            if(file.isFile()){ 
               fileMap.set(file.name, '1');
               console.log("Filename "+file.name);
               i++;
            };     
         });
      }
      });

 fs.readdir(origPath, { withFileTypes: true }, (err, files) => {
   files.forEach(file => {
      if(file.isFile()){ 
         fileName=copyPath+'/'+file.name;
         if (!fileMap.has(file.name)){
            console.log("Create file"+fileName);
            fileHandler(fileName);
         };
      }
   })
   });
 

