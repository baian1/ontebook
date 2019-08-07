# 分类
- Writable- 可以写入数据的流（例如 fs.createWriteStream()）。
- Readable- 可以从中读取数据的流（例如 fs.createReadStream()）。
- Duplex- 两者都是Readable和Writable（例如 net.Socket）的流。
- Transform- Duplex可以在写入和读取数据时修改或转换数据的流（例如，zlib.createDeflate()）。

# 缓存
Writable和Readable流都将数据存储在内部缓冲区中，可以分别使用writable.writableBuffer或readable.readableBuffer 查看。