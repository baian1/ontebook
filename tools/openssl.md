# openssl

## 生产私钥

```sh
sudo openssl genrsa -aes256 -out server.pem 2048
```

## CRS

```sh
openssl req -new -key serverkey.pem -out serverkey_out.csr
```

## 用根证书给 crs 添加签名

```sh
openssl ca -in server.csr -out server.pem
```

## 使用私钥生产 CA 根证书

```sh
openssl req -new -x509 -key /root/ca/private/cakey.pem -out cacert.pem -days 3650 -set_serial 0
```
