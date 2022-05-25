const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const { pipeline } = require('stream');

let input;
let output;

let bundleFileName = "project-dist/bundle.css";
/*let bundleFileName = "test-files/bundle.css";*/
let cssPathName = "styles";
/*let cssPathName = "test-files/styles";*/
let bundleFileNameFull = path.join(__dirname, bundleFileName);
let cssPathNameFull = path.join(__dirname, cssPathName);
let cssFileExt = "css";
let dataArray = new Map();
let i=0;
let data;

addN = (chunk) => chunk.toString()+"\n";



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
/*Функция проверки расширения файла (только имя файла без папки) */
function checkFileExt(fileName, ext){
            /*console.log("function checkFileExt ");*/
            let ext1=path.extname(fileName).replace('\.','');
            /*console.log("fileName="+fileName+" ext="+ext+" path.ext="+ext1);*/
            
          if (ext1=== ext) {
            /*console.log ("File ext is css"); */
            return true;
          }
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
data='';
if (checkFileExist(bundleFileNameFull)) {deleteFile(bundleFileNameFull)};
if (fileHandler(bundleFileNameFull)===true){
  /* console.log("Читаем директорию "+bundleFileNameFull);*/
   /*Читаем директорию стилей, проверяем расширение файла и если оно css  то записываем в конец файла bundle данные файла*/

   fs.readdir(cssPathNameFull, { withFileTypes: true }, (err,files)=> {
      files.forEach(file => {  
         if(file.isFile()){  
            if (checkFileExt(file.name, cssFileExt)){
               
               fromCssFile = path.join(cssPathNameFull, file.name);
               let promise = new Promise ((resolve, reject)=>{
                  input = fs.createReadStream(fromCssFile, 'utf-8');

               
                  output = fs.createWriteStream(bundleFileNameFull, {start: 0}); 
                  /*pipeline(
                     input,
                     addN,
                     output,
                     err => {
                         if (err) {
                             throw err;
                         }
                     }
                  );*/
                  
                  input.on('data', chunk => data+=chunk);
                  input.on('error', error => console.log('Error', error.message));        
                  input.on('end', () => {
                                       /*console.log ("Добавляем содержимое файла ОПЯТЬ\n");*/
                                    
                                          if (!(resolve(data))) reject(data) ;
                                          data = '';
                                          
                                      
                                    }); });
                  promise
                     .then(
                           result => {
                                        // первая функция-обработчик - запустится при вызове resolve
                                        output.write(result);// result - аргумент resolve
                                        output.write("\n");
                                        /*console.log ("Добавляем содержимое файла "+file.name); */
                                      },
                           error => {
                                        // вторая функция - запустится при вызове reject
                                        console.log("Rejected: " + error); // error - аргумент reject
                                      }
                           );                
                                
                  
            
            };
         }
      });
   });
  
   
}

