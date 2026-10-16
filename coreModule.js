// watch run in development و node --watch index.js
// nodemon is library npm i nodemon

// path --> core module


// const path= require('node:path')

// basename return pathname
//  console.log(path.basename('home/test/file.txt'));
//  console.log(path.basename('home/test/file.txt','.txt'));

//  dirname return folder
// console.log(path.dirname('home/assets/file.txt'))

// extname return extention
// console.log(path.extname('home/users/file.txt'));

// console.log(path.join('/home','/about','/file.text'));

/*
  relative path - ./ , ../
  absolute path -  from c  join() 
*/

// resolve()  return absolute

// console.log(path.parse('/home/users/file.txt'));

// events
// const eventModule=require('node:events')
// const emiter=new eventModule.EventEmitter()


// emiter.once('eventOne',()=>{
//   console.log('trigger event Once');
  
// })

// emiter.on('event2',()=>{
//   console.log('trigger event on');
// })

// console.log(emiter.eventNames());
// emiter.emit('eventOne')
// emiter.emit('event2')
// console.log();
// console.log(emiter.eventNames());
// 

// ////////////////////// file system /////////////////////
 

//  readFile -- readFileSync
// readFile --> asynchronus function()
// readFileSync --> synchronus function()


// const { error } = require('node:console')
// const fs=require('node:fs')
//   const data= fs.readFileSync('content.txt','utf-8')
//  console.log(data);
 
// fs.readFile('content.txt',{encoding:'utf-8'},(error,data)=>{
//     if(error){
//       console.log(error); 
//       return
//     }
//     console.log(data); 
// })

// ////////////////////////////////////////////////////////

// write
// writeFile
// writeFileSync

// const content='I am mohamed Ali I am softWare engineering'

// fs.writeFile('content.txt',content,(error)=>{
//   if(error)
//   {
//     console.log(error);
//     return
    
//   }
//   console.log('done');
  
// })

// fs.appendFile('content.txt',content,(error)=>{
//  if(error){
//   console.log(error);
//  }
//  console.log('ok add data successfully');
 
// })

// delete
// unLink
// unLinkSync

// copy
// copyFile()


// const { error } = require('node:console');
// const { error } = require('node:console')
// const fs=require('node:fs')
// const { pipeline ,Transform} = require('node:stream')

// fs.mkdir('upload/profiles',{recursive:true},(error)=>{
//  if(error){
//    console.log(error);
//  }
//  console.log('done');
 
// })

// fs.rmdirSync('upload/profiles',{force:true,recursive:true})

// if (fs.existsSync("./upload/profiles")) {
//   fs.rmdirSync("./upload/profiles", { recursive: true, force: true });
// }

// read

// const readableStream =fs.createReadStream('content.txt',{
//   encoding:'utf-8',
//   highWaterMark:10,
//   start:4,
//   end:80
// })

// readableStream
// .on('data',(shunk)=>{
//   console.log('chunk is ...',shunk);
// }).on('error',(error)=>{
//   console.log('Error is ...',error);
// }).on('end',()=>{
//   console.log('End of stream');
  
// }).on('close',()=>{
//   console.log('stream closed');
// })

// write
// const writeAbleStream=fs.createWriteStream('output.txt',{encoding:'utf-8'})

// writeAbleStream.write('writing to outPut file 1')
// writeAbleStream.write('writing to outPut file 2')
// writeAbleStream.write('writing to outPut file 3')
// writeAbleStream.write('writing to outPut file 4')
// writeAbleStream.write('writing to outPut file 5')
// writeAbleStream.write('writing to outPut file 6')
// writeAbleStream.write('writing to outPut file 7')
// writeAbleStream.write('writing to outPut file 8')
// writeAbleStream.write('writing to outPut file 9')
// writeAbleStream.write('writing to outPut file 10')
// writeAbleStream.end('this is end of the writable stream')


// writeAbleStream.on('finish',()=>{
//   console.log('All data has benn write the out file');
// }).on('error',(error)=>{
//   console.log(error);
// }).on('close',()=>{
//   console.log('writeable stream closed');
// })

// Duplex stream
// const readableStream=fs.createReadStream('content.txt',{encoding:'utf-8',highWaterMark:7,start:2,end:100})

// const writeAbleStream=fs.createWriteStream('output.txt',{encoding:'utf-8'})

// pipeline(readableStream,writeAbleStream,(error)=>{
//   if(error)
//   {console.log(error,'Pipline failed'); 
//   }else{
//     console.log('Pipline succeeded');
    
//   }
// })


// Transform stream
// const readableStream=fs.createReadStream('content.txt',{encoding:'utf-8',highWaterMark:7,start:2,end:100})

// const writeAbleStream=fs.createWriteStream('output.txt',{encoding:'utf-8'})

//   const upperCaseTransform = new Transform({
//      transform(chunk,encoding,callback){
//        const upperCaseChunk=chunk.toString().toUpperCase()
//        callback(null,upperCaseChunk)
//      }
//   })
// pipeline(readableStream,upperCaseTransform,writeAbleStream,(error)=>{
//   if(error)
//   {console.log(error,'Pipline failed'); 
//   }else{
//     console.log('Pipline succeeded');
    
//   }
// })



const http=require('node:http')
const fs=require('node:fs');

http.createServer((req,res)=>{
  const {url , method}=req

 if(url == '/' && method == 'GET'){
  console.log('GET API HOME'); 
  res.write('hello from home')
  res.end()
 }else if (url =='/users/add' && method=='GET'){
  let body;
  req.on('data',(shunk)=>{
  
    body =JSON.parse(shunk.toString()) 
    console.log('body',body);
     
  })
  req.on('end',()=>{
    const {name,email,id} =body;
   const users=JSON.parse(fs.readFileSync('json.js',{encoding:'utf8'}))
   const userExist=users.find((user)=> user.email === email)
   if(userExist){
    res.writeHead(409,{'Content-Type': 'application/json'})
   return res.end( JSON.stringify({message:'Email already exist'})) 
   }
  
   users.push({name,id,email})
  //  res.writeHead(201,{'Content-Type': 'application/json'})
  //  fs.writeFileSync('json.js',JSON.stringify(users,null,2))
  //  console.log('users',users);
  //  res.end(JSON.stringify({message:'user Add Successfully'}))
    res.writeHead(201,{'content-type':'application/json'})
    fs.writeFileSync('json.js',JSON.stringify(users))
    res.end(JSON.stringify(users))
  })
 }
 else{
  console.log('Not found api requrst');
 }
}).listen(5000,()=>{
  console.log('server is runing on port 5000');
})
