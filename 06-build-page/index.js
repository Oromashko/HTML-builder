const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

let projectPath = "project-dist";
let cssFile="style.css";
let cssBundlePath = "styles";
let cssExt='css';
let assetsPath="assets";
let indexFile="index.html";
let indexTemplateFile = "template.html";
let componentsPath = "components";
let projectPathFull = path.join(__dirname, projectPath); 
let assetsPathOrig= path.join(__dirname, assetsPath); 
let assetsPathTo = path.join(__dirname, projectPath, assetsPath); 
let indexFileFrom = path.join(__dirname, indexTemplateFile);
let indexFileTo = path.join(projectPathFull, indexFile);
let cssBundlePathFull = path.join(__dirname, cssBundlePath);
let cssFileTo = path.join(projectPathFull, cssFile);

/*Функция создания файла*/
function fileHandler(fileName){
   if (typeof fileName === 'string'){
      fs.open(fileName, 'w', (err) => {
          if(err) throw err;        
         /*console.log(`Файл ${fileName} создан`);*/
         
      });
   }
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

/*Функция копирования файла*/

function copyFile (fromFile, toFile) {
  
   
      input = fs.createReadStream(fromFile);
      output = fs.createWriteStream(toFile, {start: 0}); 
      console.log("fromFile=", fromFile, "toFile", toFile);
      input.on('data', chunk => {output.write(chunk); console.log(" Записываю... ")});
      input.on('error', error => {console.log('Error', error.message); return false});        
      input.on('end', () => {return true; console.log(" Записал")});
}

/*Функция создания папки*/

function createPath(pathName){

   fs.stat(pathName, function(err) {
      
      fs.stat(pathName, function(err) {
            if (!err) {
               console.log(`Директория ${pathName} существует.`);
               return true;
            }
            else if (err.code === 'ENOENT') {
                  
                     console.log(`Создание директории ${pathName}`);
                     fsPromises.mkdir(pathName, { recursive: true }).then(function() {
                                    console.log(`Создание директории ${pathName}`);
                     }).catch(function() {
                        console.log(`Не могу создать директорию ${pathName}`);
                        return false;
                      });
         
                
                  };  
      })
})
};


   

/*Функция рекурсивно копирует содержимое папки pathName  в директорию assetsPathTo*/
function copyPath(pathName){
   
   fs.readdir(pathName, (err, files) => {
      let fileFull = "";
      let pathCut='';
      let pathNew = '';
      if(err) throw err;

      for (let file of files){
         fs.stat(path.join(pathName,file), (errStat, status) => {
            if(errStat) throw errStat;
            
            pathFull=path.join(pathName,file);
            pathCut = pathFull.replace(assetsPathOrig, '');
            pathNew = assetsPathTo+pathCut;
            if(status.isDirectory()){
              
               console.log('Папка: ' + pathNew);
               createPath(pathNew);
               copyPath(pathFull); // продолжаем рекурсию
            }else{
               console.log('Файл: ' + pathNew);
               let promise = new Promise ((resolve, reject)=>{
                  const input = fs.createReadStream(pathFull);
                  const output = fs.createWriteStream(pathNew, {flag: 'w', start: 0}); 
                  console.log("fromFile=", pathFull, "toFile", pathNew);
                  input.on('data', chunk => {output.write(chunk); console.log(" Записываю... ")});
                  input.on('error', error => {console.log('Error', error.message); return false});        
                  input.on('end', () => {resolve("Записала файл");  console.log(" Записал")});
               });
               promise.then(
                  result =>  {console.log(result); return true},
                  error => {
                                                 
                                                 console.log("Rejected: " + error); // error - аргумент reject
                                               }
                                    );   
            }
         });
      }
   });
}
/*Функция заменяет {{section}} на содержимое файла section.html, расположенного в папке FileFrom и возвращает true  
 в случае успеха*/
function bundleIndexFile(fileFrom, fileTo){

   return true;
}
/*Функция собирает файлы css с расширением  ext в файл fileTo*/
function bundleCSSFile (pathFrom, fileTo, ext){

   return true;
}

createPath (projectPathFull);
console.log(assetsPathOrig);
copyPath(assetsPathOrig);
bundleIndexFile(indexFileFrom, indexFileTo);
bundleCSSFile(cssBundlePathFull, cssFileTo, cssExt);
