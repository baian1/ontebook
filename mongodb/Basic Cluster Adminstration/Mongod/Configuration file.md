# Configuration


[Command Line Option](https://docs.mongodb.com/manual/reference/program/mongod/)|[Configuration File Option](https://docs.mongodb.com/manual/reference/configuration-options/)
|---|---|
--dbpath|storage.dbPath
--logpath|systemLog.path
--bind_ip|net.bind_ip
--replSet|replication.replSetName
--keyFile|security.keyFile
--sslPEMKey|net.ssl.sslPEMKey
--sslCAKey|net.ssl.sslCAKey
--sslMode|net.sslMode
--fork|processManagement.fork

## Command:
mongod --dbpath /data/db --logpath /data/log/mongod.log --fork --replSet "M103" --keyFile /data/keyfile --bind_ip "127.0.0.1,192.168.0.100" --sslMode requireSSL --sslCAFile "/etc/ssl/SSLCA.pem" --sslPEMKeyFile "/etc/ssl/ssl.pem"
## Configuration
storage:
  dbPath: "/data/db"
systemLog:
  path: "/data/log.mongod.log"
  destination: "file"
replication:
  replSetName: M103
net:
  bindIp : "127.0.0.1,192.168.0.100"
ssl:
  mode: "requireSSL"
  PEMKeyFile: "/etc/ssl/ssl.pem"
  CAFile: "/etc/ssl/SSLCA.pem"
security:
  keyFile: "/data/keyfile"
processManagement:
  fork : true

momgod --config "/etc/mongod.conf"
mongod -f "/etc/mongod.conf"