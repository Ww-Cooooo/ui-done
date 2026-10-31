import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../../showcase/motion-atlas');
const port=Number(process.env.MOTION_PORT||5198);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.md':'text/plain; charset=utf-8'};
http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');let file=resolve(root,'.'+decodeURIComponent(url.pathname));if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end();return;}if((await stat(file)).isDirectory())file=resolve(file,'index.html');const body=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:body);}catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('没有找到这个文件');}}).listen(port,'127.0.0.1',()=>console.log('Motion Atlas: http://127.0.0.1:'+port));
