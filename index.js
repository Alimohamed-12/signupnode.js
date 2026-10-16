
const path=require('node:path')

// • Output Example: {File: “/home/user/project/index.js”, Dir: “/home/user/project”}
// 1-dir 
// console.log(path.dirname('/home/user/project/index.js'));

// 2- return fileName
//  const filename=path.basename('/user/files/report.pdf')
//  console.log(filename);
 
// 3-format
// const object={ dir:"/folder", name:"app", ext:".js"}
// console.log(path.format(object));


// 4-return extention 
 
// console.log(path.extname('/docs/readme.md"'));

//-->5 parse() 

// const objectex={
//     Name:path.parse('/home/app/main.js').name,
//     Ext:path.parse('/home/app/main.js').ext
// }

// console.log(objectex);

// 6 --> isabsolute()

// console.log(path.isAbsolute('/home/user/file.txt'));

// 7-join()
//  console.log(path.join('src','components','App.js'));

// 8- resolve()
// console.log(path.resolve('index.js'));

// // 9- join()
// console.log(path.join('/folder1, folder2/file.txt'));

// 10 -- delete file unlink synchronus()

// const fs=require('node:fs');
//  function deleteFile(pathFile){
//      fs.unlink(pathFile,(error)=>{
//     if(error){
//         console.log('in error in unlink asynchronus');      
//     }    
//      })
//     console.log('The file.txt is deleted.');
// }
// deleteFile('file.txt')


// 11 work function crate folder synchronus
// const fs=require('node:fs')
// function createFolder(){
//  if(!fs.existsSync('createfolder')){
//    fs.mkdirSync('createfolder')
//    console.log('successfully');
   
//  }
// }
// createFolder()

// 12 create event
// const eventModule=require('node:events')
// const emiter= new eventModule.EventEmitter()

// emiter.once('printMessage',()=>{
//     console.log('Welcome event triggered!');
    
// })
// emiter.emit('printMessage')


// 13 create custom event name login and recieve name 'Ahmed'

// const eventModule=require('node:events')
// const emiter= new eventModule.EventEmitter()
// emiter.once('login',(username)=>{
//     console.log(`User logged in:${username}`);  
// })
// emiter.emit('login','Ahmed')

// 14 read file synchronus and print this content
// function readFile(){
//  const fs=require('node:fs')
//  const data= fs.readFileSync('content.txt',{encoding:'utf8'})
//  console.log(data);

// }
// readFile()

// 15 write File Asyncronus "./async.txt", content: "Async save",
// const fs=require("node:fs")
// const  content= "Async save"
// function writeFile(){
//     fs.writeFile('async.txt',content,(error)=>{
//         if(error){
//            console.log('file not found');  
//         }
//     })
//     console.log('done successfully ');
    
// }
// // writeFile()

// // 16 chech dirExeist if found return true

// const fs=require('node:fs')
// function isDirExist(){
//     if(fs.existsSync('notes.txt')){
//         console.log(true);    
//     }
//     else{
//          console.log('not found directory');
    
//     }
// }
//  isDirExist()

// 17


// asimant 2 streams

// 18 readableStream 

// const fs=require('node:fs')

// const createReadStream =fs.createReadStream('big.txt',
//     {encoding:'utf8',highWaterMark:10,start:5,end:60})

// createReadStream.on('data',(shunk)=>{
//     console.log(`shunk ${shunk}`);
// }).on('end',()=>{
//     console.log('end of stream');
    
// }).on('close',()=>{
//     console.log('close of stream');
    
// })


// 19 read and write content
// const fs=require('node:fs');

// const readableStream =fs.createReadStream('source.txt',{encoding:'utf8'})
// const writeAbleStream=fs.createWriteStream('dest.txt')

// readableStream.pipe(writeAbleStream)

// readableStream.on('error',(error)=>{
//     console.log(error);   
// })
// writeAbleStream.on('error',(error)=>{
//     console.log(error);  
// })
// writeAbleStream.on('finish',()=>{
//     console.log('finished completly');
// })


// 20  pipline decode file

// const fs = require('fs');
// const zlib = require('zlib');
// const { pipeline } = require('stream');

// function compressFile(source, destination) {
//   const readStream = fs.createReadStream(source);
//   const gzip = zlib.createGzip();
//   const writeStream = fs.createWriteStream(destination);

//   pipeline(
//     readStream,
//     gzip,
//     writeStream,
//     (err) => {
//       if (err) {
//         console.error('Error:', err.message);
//       } else {
//         console.log('File compressed successfully');
//       }
//     }
//   );
// }

// compressFile('data.txt', './data.txt.gz');

// 
