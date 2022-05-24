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
   
}
/*Функция проверки расширения файла (только имя файла без папки) */
function checkFileExt(fileName, ext){
   
          if (path.extname(fileName)=== ext) return true;
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

if (checkFileExist(bundleFileName)) {deleteFile(bundleFileName)};
if (fileHandler(bundleFileName){
   
   /*Читаем директорию стилей, проверяем расширение файла и если оно css  то записываем в конец файла bundle данные файла*/

   fs.readdir(cssPathName, { withFileTypes: true }, (err, files) => {
      files.forEach(file => {
      if(file.isFile()){  
         if (checkFileExt(file.name, cssFileExt)){


         }


      }
      });
   });

}