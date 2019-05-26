# Roles

Create new user with the root role
```
use admin
db.createUser({
  user: "root",
  pwd: "root123",
  roles : [ "root" ]
})
```

## Role Structure

- Role is composed of
  - Set of privileges
    - Actions->Resources
  - Network Authentication Restrictions
    - clientSource
    - serverAddress

### Resources
- Database
- Collection
- Set of Collections
- Cluster
  - Repolica Set
  - Shard Cluster
用于限定数据库和集合

### Privilege 
- Resouorce
- Actions allowed over a resource
限制操作

## Built-In Roles
- Database User  
  - read 
  - readWrite
- Database Administration  
  - dbAdmin  与用户角色相关操作
  - userAdmin  DDL相关操作
  - dbOwner  dbAdmin,userAdmin,readWrite
- CLuster Administration
  - clustrer Admin
  - clusterManager
  - clusterMonitor
  - hostManager
- Backup/Restore
  - backup
  - restore
- Super User
  - root
数据库级别内置定义角色
- Database User  
  - readAnyDatabase
  - readWriteAnyDatabase
- Database Administration  
  - dbAdminAnyDatabase 
  - userAdminAnyDatabase
- Super User
  - root

### API
Create security officer:
```
db.createUser(
  { user: "security_officer",
    pwd: "h3ll0th3r3",
    roles: [ { db: "admin", role: "userAdmin" } ]
  }
)
```

Grant role to user:
```
db.grantRolesToUser( "dba",  [ { db: "playground", role: "dbOwner"  } ] )
```

Show role privileges:
```
db.runCommand( { rolesInfo: { role: "dbOwner", db: "playground" }, showPrivileges: true} )
```