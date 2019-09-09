# Client/User Auth
用于客户端验证服务器

支持:
- SCRAM-SHA-1
- MONGDB-CR  
  Challenge/Response类型  
  使用Username/Password进行验证

  保护:
  - Eavesdropping
  - Replay
  - Datrabase Compromise
  - Malicious Server
- X.509  
  基于证书
- LDAP
- Kerberos


# Internal Auth
用于服务器间的验证,比如分片,集群等

支持:
- Keyfile(SCRAM-SHA-1)  
  基于共享密码
- X.509