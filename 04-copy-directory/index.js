const fs = require('fs')
const path = require('path');
const fsPromises = fs.promises;

let origPath =__dirname+'/files';
let copyPath=__dirname+'/'+'files-copy';
let i = 0;
let fileMap = new Map();
let pathCreated=false;
let toFileName;
let fromFileName;
let timeFromFile;
let timeToFile;

/*Проще всего сделать просто проверку существования файлов в директории copyPath чем связываться с ассоциативными массивами. Скорее всего ошибка изза точек в названиях файлов, которые нужно лиюо экранировать либо вообще нельзя использовать. Надо переделать.*/


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

/*Проверяем существует  ли директория в которую должны скопироват. Создаем индекс (хеш) файлов из нее. 
Если она не существует, создаём её.*/
fs.stat(copyPath, function(err) {
   if (!err) {
       console.log(`Директория ${copyPath} существует. Создаем хеш существующих файлов`);
       fs.readdir(copyPath, { withFileTypes: true }, (err, files) => {
            if (err){console.log("Директория не существует",err);}
            else{
                console.log("Директория существует");
               files.forEach(file => {
                     if(file.isFile()){ 
                           fileMap.set(file.name, file.mtime);
                           console.log("Filename "+file.name);
                           i++;
                     };     
               });
            }
         });
      
   }
   else if (err.code === 'ENOENT') {
      if (pathHandler(copyPath)){
       console.log(`Создание директории ${copyPath}`);
       fsPromises.mkdir(copyPath, { recursive: true }).then(function() {
         console.log(`Создание директории ${copyPath}`);
      }).catch(function() {
         console.log(`Не могу создать директорию ${copyPath}`);
      });
      
      }
   };  
});


/*while (!pathCreated) {
fs.stat(copyPath, function(err) {
   if (!err) {
       pathCreated=true;
       console.log("pathCreated true");
   }
     
});
};*/
/*fs.readdir(copyPath, { withFileTypes: true }, (err, files) => {
   if (err){console.log("Директория не существует",err);}
   else{
      console.log("Директория существует");
         files.forEach(file => {
            if(file.isFile()){ 
               fileMap.set(file.name, '1');
               console.log("Filename "+file.name);
               i++;
            };     
         });
      }
   });*/

 fs.readdir(origPath, { withFileTypes: true }, (err, files) => {
   files.forEach(file => {
      if(file.isFile()){ 
         toFileName=path.join(copyPath, file.name);
         fromFileName=path.join(origPath, file.name);
         console.log("toFileName="+toFileName);
         console.log("fromFileName"+fromFileName);
         if (!fileMap.has(file.name)){
            /*Такого файла не существует*/
            console.log("Файла не существует. Создаем файл"+toFileName);
            fileHandler(toFileName);
            
            fs.copyFile(fromFileName, toFileName, err => {
            if(err) throw err; // не удалось скопировать файл
               console.log('Файл успешно скопирован');
            });
         };
         
         } else{
            /* Файл существует. Проверяем дату изменения файла и обновляем файл, если он менялся*/
                  console.log("Файл существует"+toFileName);
                  
                  timeFromFile=fileMap.get(file.name);
                  fs.stat(toFileName, function(err, stats2) {
                     if (err) {
                        console.error(err);
                        return;
                     }
                     timeToFile=stats2.mtime;
                     console.log(`File1 date ${timeFromFile}`);
                     console.log(`File2 date ${timeToFile}`);
                  
                  });
               
            }
                        })
                           });
   

   
 

