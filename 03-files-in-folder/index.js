
const fs = require('fs');
const path = require('path');

const secretFolder = path.join(__dirname, 'secret-folder');
let size1;
let path1;
let output='';
let name='';
var name1='';
var i=0;
fs.readdir(secretFolder, { withFileTypes: true }, (err, files) => {
  files.forEach(file => {
   if(file.isFile()){ 
      /*console.log("Filename"+file.name);*/
      /*console.log("Fileext"+path.extname(file.name));*/
      
    
      path1 = secretFolder+'/'+file.name;
      /*console.log("Path1"+path1);*/
    
      fs.stat(path1, function(err, stats) {
         if (err) {
            console.error(err);
            return;
          }
         size1=stats.size;
         ext=path.extname(file.name).replace('\.','');
         name1=file.name;
          /*console.log("Name1=", name1);*/
         name1 = name1.replace( /\.[\S]+$/g,'');
        /* console.log("Name1=", name1);*/
         output = name1+'-'+ext+'-'+size1;
         console.log(output);
      });
      i++;
      
   }
  });
})