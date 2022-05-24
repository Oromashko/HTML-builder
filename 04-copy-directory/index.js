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
   console.log("function pathHandler");
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
       console.log(`Директория ${copyPath} существует.`);
       /*fs.readdir(copyPath, { withFileTypes: true }, (err, files) => {
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
         });*/
      
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
        
            
            fs.stat(path.join(copyPath, file.name), function(err, stats2) {
               
               if (err==null) {
                  console.log("Файл существует"+path.join(copyPath, file.name));
                 /* timeToFile=stats2.mtime.valueOf();*/
                  fs.stat(path.join(origPath, file.name), function(err, stats1) {
                  if (err){ throw err;}
                     /*timeFromFile = stats1.mtime.valueOf();*/
                   /*  console.log(`File1 date ${timeFromFile}`);
                     console.log(`File2 date ${timeToFile}`);*/
                     if (stats1.mtime.valueOf()>stats2.mtime.valueOf()) {
                        console.log("Файл изменился");
                        fs.copyFile(path.join(origPath, file.name), path.join(copyPath, file.name), err => {
                           if(err) throw err; // не удалось скопировать файл
                              console.log('Файл успешно скопирован');
                           });
                        };
                     });
                  }else if((err.code == 'ENOENT')){
                           console.log("Файла не существует. Создаем файл"+path.join(copyPath, file.name));
                           fileHandler(path.join(copyPath, file.name));
                           fs.copyFile(path.join(origPath, file.name), path.join(copyPath, file.name), err => {
                                 if(err) throw err; // не удалось скопировать файл
                                 console.log('Файл успешно скопирован');
                           });
                        }else {
                           console.error(err);
                           return;
                        };

               });
            };
         })
      })
         
   

   
 

