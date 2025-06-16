import express from 'express';
const app = express ()

let port; 
if (process.env.port){
port = process.env.port
}else{
    port = 5000;
}
app.listen(5000,()=>{
    console.log(`App running on port 5000`);
}) 