# redact
适用于有嵌套文档存在的地方，可以对嵌套文档做出操作
- $$DESCEND  
  用来判断是否保存文档，从最外面document开始，遇到是的保留其他字段并继续查询子文档
- $$PRUNE
- $$KEEP  
  删除文档和保留该文档，这两个操作不会递归，操作就结束了
# out
将结果文档，在数据库中创建collection

- 会重建原来的index
- 有同名会覆盖原有的collection
- 必须有unique _id字段