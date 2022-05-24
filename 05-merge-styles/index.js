const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

let bundleFileName = "project-dist/bundle.css";
let cssPathName = "styles";
let bundleFileNameFull = path.join(__dirname, bundleFileName);
let cssPathNameFull = path.join(__dirname, cssPathName);
let cssFileExt = "css";
let dataArray = new Array();
let i=0;

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
            console.log("function checkFileExt ");
            let ext1=path.extname(fileName).replace('\.','');
            console.log("fileName="+fileName+" ext="+ext+" path.ext="+ext1);
            
          if (ext1=== ext) {
            console.log ("File ext is css"); 
            return true;
          }
          return false;  
}
      

/*функция добавления содержимого файла в конец другого файла */
function appendDataToFile(dataArr, toFileName){
   dataArr.forEach(element => {
      /*console.log("Element="+element);*/
   
   fs.appendFileSync(toFileName,element)
   })

   return true;

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
   console.log("Читаем директорию "+bundleFileNameFull);
   /*Читаем директорию стилей, проверяем расширение файла и если оно css  то записываем в конец файла bundle данные файла*/

   files = fs.readdirSync(cssPathNameFull, { withFileTypes: true });
      files.forEach(file => {  
         if(file.isFile()){  
            if (checkFileExt(file.name, cssFileExt)){
               console.log ("Добавляем содержимое файла "+file.name);
               fromCssFile = path.join(cssPathNameFull, file.name);
               data = fs.readFileSync(fromCssFile, {encoding: 'utf8', flag:'r'});                   
               dataArray.push(data);   
            }
         }
      });
   

   if (appendDataToFile(dataArray, bundleFileNameFull)){
      console.log("Bundle is ready!");
   };

};