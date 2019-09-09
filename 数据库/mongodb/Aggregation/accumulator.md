# 数组计算操作
project中可用
- $sum
- $avg
- $max
- $min
- $stdDevPop
- $stdDevSam

也可以在group中使用,文档聚合后的一个字段就会像数组一样子

# 更复杂的情况
- $reduce  遍历数组合并所有元素返回一个新的数组
- $map  遍历数组对每个元素进行操作