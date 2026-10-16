const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path')

const fullpath=path.resolve('json.js')

  


async function getUsers(){
    try{
    const users = await fs.readFile(fullpath);
    return JSON.parse(users);
    }
    catch (err){
        return [];
    }
   
}
async function saveUsers(users){
    return await fs.writeFile(fullpath, JSON.stringify(users));
}

const server=http.createServer(async(req,res)=>{
    const {method , url} =req
    if(url === '/adduser' && method === 'POST'){
        let body = '';
        req.on('data',(shunk)=>{
            body += shunk.toString()
        })

        req.on('end', async ()=>{
            // console.log(body);
          const  {name , email}= JSON.parse(body)
          const users = await getUsers();
        const isEmilExist =users.find((user)=> user.email === email)

        if(isEmilExist){
            res.writeHead(400,{"content-type":'application/json'})
           return  res.end(JSON.stringify({error:"Email already exists"}))
        }
      
      const newUsers= {id: Date.now(), name,email}
       users.push(newUsers)
       await saveUsers(users)
       res.writeHead(201,{"content-type":'application/json'})
       res.end(JSON.stringify({message:'user added successfully',user:newUsers}))     
        })

    }
    else if(url.startsWith("/updateUser") && method === "PATCH"){
      const id = Number(req.url.split("/")[2]);
        let body ="";
        req.on('data',(shunk)=>{
            body += shunk.toString()
        })

        req.on('end', async ()=>{
            const { name , email}= JSON.parse(body)
            const users = await getUsers();
            const user=users.find((user)=> user.id === id)
            if(!user){
                res.writeHead(404,{"content-type":'application/json'})
                return res.end(JSON.stringify({error:"User is not found"}))
            }
            if(email && users.some((u)=> u.email === email && u.id !== id)){
                res.writeHead(400,{"content-type":'application/json'})
                return res.end(JSON.stringify({error:"Email already exists for another user"}))
            }

            if(email) user.email=email;
            if(name) user.name=name;
        
            await saveUsers(users)
            res.writeHead(200,{"content-type":'application/json'})
            res.end(JSON.stringify({message:'user updated successfully',user:user}))
          

        })
    }
    else if(url.startsWith('/deleteUser') && method==="DELETE"){
        const id=Number(req.url.split("/")[2])
        const users= await getUsers();
        const userIndex=users.findIndex((user)=> user.id === id)
        if(userIndex === -1){
            res.writeHead(404,{"content-type":'application/json'})
            return res.end(JSON.stringify({error:"User is not found"}))
        }
        users.splice(userIndex, 1)
        await saveUsers(users)
        res.writeHead(200,{"content-type":'application/json'})
        res.end(JSON.stringify({message:'user deleted successfully'}))
    }
    else if(url == '/getUsers' && method === "GET"){
        const users = await getUsers();
        res.writeHead(200,{"content-type":'application/json'})
        res.end(JSON.stringify({users}))
    }else if(url.startsWith('/getUser') && method === "GET"){
        const id=Number(req.url.split("/")[2])
        const users = await getUsers();
        const user=users.find((user)=> user.id === id)
        if(!user){
            res.writeHead(404,{"content-type":'application/json'})
            return res.end(JSON.stringify({error:"User is not found"}))
        }
        res.writeHead(200,{"content-type":'application/json'})
        res.end(JSON.stringify({user}))
    }
})
const port=3000;
server.listen(port,()=>{
console.log('server runing in 3000');

})

