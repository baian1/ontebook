# postgresql

## Identifiers and Key Words

1. 通常关键字用大写,标识符使用小写`UPDATE my_table SET a = 5;`
2. 使用双引号的为标识符`UPDATE "my_table" SET "a" = 5;`,内部可以使用 Unicode 字符``

## 基础类型

1. 类型声明

   ```sql
   type 'string'
   'string'::type
   CAST ( 'string' AS type )
   ```

### 字符串常量

1. 字符串通常使用``包裹
2. 要在字符串中使用转义,需要在以 E 开头`E'foo\n'`
3. Dollar-Quoted String Constants
   pg 中还提供了一种字符串`$tag$xxx$tag$`,用来避免多处转义

   ```sql
   $$Dianne's horse$$
   <!-- tag可以被省略 -->
   $SomeTag$Dianne's horse$SomeTag$
   ```

### 数字常量

```txt
digits
digits.[digits][e[+-]digits]
[digits].digits[e[+-]digits]
digitse[+-]digits
```

例子:

1. `42`
2. `3.5`
3. `4.`
4. `.001`
5. `5e2`
6. `1.925e-3`

## 操作符

| Operator/Element              | Associativity | Description                                        |
| ----------------------------- | ------------- | -------------------------------------------------- |
| .                             | left          | table/column name separator                        |
| ::                            | left          | PostgreSQL-style typecast                          |
| [ ]                           | left          | array element selection                            |
| + -                           | right         | unary plus, unary minus                            |
| ^                             | left          | exponentiation                                     |
| \* / %                        | left          | multiplication, division, modulo                   |
| + -                           | left          | addition, subtraction                              |
| (any other operator)          | left          | all other native and user-defined operators        |
| BETWEEN IN LIKE ILIKE SIMILAR |               | range containment, set membership, string matching |
| < > = <= >= <>                |               | comparison operators                               |
| IS ISNULL NOTNULL             |               | IS TRUE, IS FALSE, IS NULL, IS DISTINCT FROM, etc  |
| NOT                           | right         | logical negation                                   |
| AND                           | left          | logical conjunction                                |
| OR                            | left          | logical disjunction                                |

## 值表达式

- A constant or literal value
- A column reference
- A positional parameter reference, in the body of a function definition or prepared statement
- A subscripted expression
- A field selection expression
- An operator invocation
- A function call
- An aggregate expression
- A window function call
- A type cast
- A collation expression
  有一些排序比较规则,比如 sort 关键字,>操作符 都可以使用 collacte 选择规则
- A scalar subquery
- An- array constructor
- A row constructor
- Another value expression in parentheses (used to group subexpressions and override precedence)
