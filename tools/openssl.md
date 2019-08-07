# 生产私钥
```
sudo openssl genrsa -aes256 -out server.pem 2048
```

# CRS
```
openssl req -new -key serverkey.pem -out serverkey_out.csr
```

# 用根证书给crs添加签名
```
openssl ca -in server.csr -out server.pem 
```

# 使用私钥生产CA根证书
```
openssl req -new -x509 -key /root/ca/private/cakey.pem -out cacert.pem -days 3650 -set_serial 0
```