const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

let bundleFileName = "bundle.css";
let cssPathName = "styles";
let bundleFileNameFull = path.join(__dirname, bundleFileName);
let cssPathNameFull = path.join(__dirname, cssPathName);
let cssFileExt = "css";

/*Функция создания файла*/
function fileHandler(fileName){
   if (typeof fileName === 'string'){
      fs.open(fileName, 'w', (err) => {
          if(err) throw err;        
         console.log(`Файл ${fileName} создан`);
         
      });
   }
   return true;   
}
/*Функция проверки расширения файла (только имя файла без папки) */
function checkFileExt(fileName, ext){
            console.log("function checkFileExt");
            console.log("fileName="+fileName+"ext="+ext+"path.ext"+path.extname(fileName));
            let ext1=path.extname(fileName).replace('\.','');
          if (ext1=== ext) {
             return true;
             
            console.log ("File ext is css");
            }
          return false;  
}
      

/*функция добавления содержимого файла в конец другого файла */
function appendFileToFile (fromFileName, toFileName){
   let str ="";
   fs.appendFile(toFileName,str,
               (err) => {
               if (err) throw err;
                  console.log("Данные добавлены в файл"+toFileName);
               });
   
   return false;

}
/*Функция удаления файла*/
function deleteFile(fileName){
   
   return false;

}
/*Функция проверки существования файла*/
function checkFileExist(fileName){
 
   fs.stat(fileName, function(err, stats) {
      if (err) {
          return false
      } else {
          return true;
      }
  });
 
}

/*Создаем файл bundle если его нет или удаляем предварительно если он есть*/

if (checkFileExist(bundleFileNameFull)) {deleteFile(bundleFileNameFull)};
if (fileHandler(bundleFileNameFull)===true){
   console.log("Читаем директорию"+bundleFileNameFull);
   /*Читаем директорию стилей, проверяем расширение файла и если оно css  то записываем в конец файла bundle данные файла*/

   fs.readdir(cssPathNameFull, { withFileTypes: true }, (err, files) => {
      files.forEach(file => {
         console.log("Filename=", file.name);
      if(file.isFile()){  
         if (checkFileExt(file.name, cssFileExt)){
               console.log ("Добавляем содержимое файла"+file.name);
               fromCssFile = path.join(cssPathNameFull, file.name);
               appendFileToFile(fromCssFile, bundleFileNameFull);

         }


      }
      });
   });

}