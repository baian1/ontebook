# File And Directory

## 两种方式使用
drop事件中的data中的DataTransferItem.webkitGetAsEntry()，返回FileEntry或者DirectoryEntry  
input元素的webkitEntries，需要webkitdirectory为true


## FileEntry
File文件可以使用file返回File类型

## DirectoryEntry
目录的读取先用createReader()返回一个DirectoryReader对象，
调用DirectoryReader对象的readEntries方法，输入回调函数(entries)=>void
在回调函数内处理文件:  
entries是一个数组，每个元素FileEntry或DirectoryEntry

## Filereader
- 构造函数  
  FileReader()返回一个新构造的FileReader。
- 属性  
  - FileReader.error  **只读**
  一个DOMException，表示在读取文件时发生的错误 。  
  - FileReader.readyState  **只读**
  表示FileReader状态的数字。  
  - FileReader.result  **只读**  
  文件的内容。该属性仅在读取操作完成后才有效。
- 事件处理
  - FileReader.onabort
  - FileReader.onerror
  - FileReader.onload
  - FileReader.onloadstart
  - FileReader.onloadend
  - FileReader.onprogress
progress表示读取文件到内存的进展


文件切片上传
```
设置两个变量
用来存储切片的范围
let start
let end
```
```
触发切片的读取
function getshard(){
  if (start > file.size) {
    start = 0;
    end = 1000;
    return;
  }
  reader.readAsArrayBuffer(file.slice(start, end));
}

```
```
切片读取完后的动作
reader.addEventListener("loadend", loadend);

async function loadend() {
  if (await upload(reader.result) === true) {//对数据进行操作，上传数据

    console.log(start, end);
    jindu.style.width = `${(end / (file.size + 1)) * 100}%`
    start = end;
    end = start + onelength;
    if (end > file.size + 1) {
      end = file.size + 1;
    }
    if (start === end) {
      start = 0;
      end = 1000;
      return;
    }//下一次切片前准备
    getshard();//开始下一次切片
  } else {
    console.log('upload error')
  }
}
```
```
数据上传
note：跨域,需要后台设置响应头,不然浏览器会对fetch返回信息拦截,读取不到

async function upload(data) {
  let success = false;
  try {
    let res = await fetch(`http://127.0.0.1:8888?filename=${file.name}`, {
      method: "POST",
      headers: {
        'Content-Type': "application/octet-stream",
        'Content-Range': `bytes ${start}-${end - 1 > file.size ? file.size : end - 1}/${file.size}`,//声明数据范围
      },
      body: data
    });

    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}
```

```
后台处理
接收数据，创建文件夹存储碎片，接收数据，合并数据并导出，清除文件
function onRequest(request: IncomingMessage, response: ServerResponse) {
  let url = parse(<string>request.url, true);

  //确定范围
  let reg = /([\d]*)-([\d]*)/g;
  const contentRange = request.headers["content-range"];
  if (contentRange === undefined) {
    console.log('不是范围请求');
    response.end();
    return;
  }
  let res = reg.exec(contentRange);
  let start: number = 0;
  let end: number = 0;
  let size: number = Number(contentRange.slice(contentRange.lastIndexOf('/') + 1));
  if (res === null) {
    response.end('false');
    return;
  } else {
    start = Number(res[1]);
    end = Number(res[2]);
  }

  //文件夹创建
  let filename = <string>url.query.filename;
  let dir = path.resolve(`./${filename.slice(0, filename.lastIndexOf('.'))}`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  
  //碎片接收
  let out = createWriteStream(`${dir}/${filename}\{${start}-${end}\}`);
  out.on('close', () => {
    if (end >= size) {
      mergefile(dir, filename);
    }//碎片接收完毕创建合并碎片

    console.log(`${dir}/${filename}\{${start}-${end}\}`);
  })

  function getdata(data: Buffer) {
    out.write(data);
  }
  request.on("data", getdata);

  request.on('end', () => {
    // console.log(data);
    out.end();
    response.write("OK");
    response.end();
  })
}
```
```
合并碎片
export function mergefile(jindir: string, filename: string) {
  let dir = path.resolve(jindir);
  fs.readdir(dir, (err, files) => {
    let filearr = files.filter((value) => {
      if (value.indexOf(filename) !== -1) {
        return true;
      } else {
        return false;
      }
    });//读取碎片文件列表

    let filearr2 = filearr.sort((a, b) => {
      let reg = /{([\d]*)-([\d]*)}/g;
      let astart = <RegExpExecArray>reg.exec(a);
      let reg2 = /{([\d]*)-([\d]*)}/g;
      let bstart = <RegExpExecArray>reg2.exec(b);
      return Number(astart[1]) - Number(bstart[1]);
    });
    filearr = filearr2;
    //对文件进行排序,按顺序合并

    let i = 0;
    let out = createWriteStream(`./${filename}`);//创建一个写入流
    merge(`${jindir}/${filearr[i]}`);

    //按顺序合并数据
    function merge(path: string) {
      let read = createReadStream(path);
      read.addListener("data", (buff: Buffer) => {
        out.write(buff);
      })//数据写入输出流

      //读取完一个文件接着读取
      read.addListener("close", () => {
        i++;
        if (i < filearr.length) {
          merge(`${jindir}/${filearr[i]}`);
        }

        //删除读取完成文件
        fs.unlink(`${jindir}/${filearr[i - 1]}`, (err) => {
          if (!err) {
            console.log(`delete ${jindir}/${filearr[i - 1]}`)
          }

          //读取完成删除文件目录
          if (i === filearr.length) {
            fs.rmdir(jindir, (e) => {
              if (!e) {
                console.log("合并结束");
              } else {
                console.log(e);
              }
            })
          }
        });

        //输出完成结束输出流
        if (i === filearr.length) {
          out.end();
        }
      })
    }
  })
}
```