# ApenAPI Object

| Field Name   |              Type               | Description                        |
| ------------ | :-----------------------------: | ---------------------------------- |
| openapi      |            `string`             | **REQUIRED** 使用的 OpenApi 的版本 |
| info         |          [Info Object]          | **REQUIRED** 工具需要的信息头      |
| servers      |         [Server Object]         | API 的基础路径                     |
| paths        |         [Paths Object]          | **REQUIRED** API 的请求地址        |
| components   |       [Components Object]       | 用于 OAS 不同方面的可重用对象      |
| security     |  [Security Requirement Object]  | API 的权限认证                     |
| tags         |          [Tag Object]           | 给 API 进行分类                    |
| externalDocs | [External Documentation Object] | 外部 API 文档的位置                |

## openapi

OpenAPI version

## info

| Field Name     |      Type      | Description                                                                |
| -------------- | :------------: | -------------------------------------------------------------------------- |
| title          |     string     | **REQUIRED** 这一组 api 的名字                                             |
| description    |     string     | 对 API 的简要描述                                                          |
| termsOfService |     string     | A URL to the Terms of Service for the API. MUST be in the format of a URL. |
| contact        | Contact Object | The contact information for the exposed API.                               |
| license        | License Object | The license information for the exposed API.                               |
| version        |     string     | REQUIRED. The version of the OpenAPI document.                             |

## Server Object

url 与 description
表示基础 url,可以在 path 里面用 server 字段进行覆盖

## tags

给 api 进行分类

```
tags:
  - name: Current Weather Data
    description: "Get current weather details"
```

## externalDocs

```
externalDocs:
  description: API Documentation
  url: https://openweathermap.org/api
```

## path Object

```
/pets: #对象名就是路径,格式/pets/{petId}
  get:
    description: Returns all pets from the system that the user has access to
    responses:
      '200':
        description: A list of pets.
        content:
          application/json:
            schema:
              type: array
              items:
                $ref: '#/components/schemas/pet'
```

### Operation Object

- get
- put
- post
- delete
- options
- head
- patch
- trace

属性：

1. tags 这个 API 的分类
2. summary API 的简短概述
3. description API 干了什么
4. operationId 唯一标识
5. parameters 该 api 需要的参数
6. requestBody 请求的 body
7. responses 请求响应

### Parameter Object

属性：

1. in 表示参数位置,"query", "header", "path" or "cookie"
2. name 表示参数名字
3. description
4. required
5. deprecated 将要被废弃
6. allowEmptyValue 只有在 query 里才可以

```
parameters:
  - name: q
    in: query
    description: "**City name**. *Example: London*. You can call by city name, or by city name and country code. The API responds with a list of results that match a searching word. For the query value, type the city name and optionally the country code divided by a comma; use ISO 3166 country codes."
    schema:
      type: string
  - name: mode
    in: query
    description: "**Mode**. *Example: html*. Determines the format of the response. Possible values are `xml` and `html`. If the mode parameter is empty, the format is `json` by default."
    schema:
      type: string
      enum: [json, xml, html]
      default: "json"
```

### requestBody

属性：

1. description
2. required
3. content
   - schema
   - example
   - examples
   - encoding

```
description: user to add to the system
content:
  'application/json':
    schema:
      $ref: '#/components/schemas/User'
    examples:
      user:
        summary: User Example
        externalValue: 'http://foo.bar/examples/user-example.json'
  'application/xml':
    schema:
      $ref: '#/components/schemas/User'
    examples:
      user:
        summary: User Example in XML
        externalValue: 'http://foo.bar/examples/user-example.xml'
  'text/plain':
    examples:
      user:
        summary: User example in text plain format
        externalValue: 'http://foo.bar/examples/user-example.txt'
  '*/*':
    examples:
      user:
        summary: User example in other format
        externalValue: 'http://foo.bar/examples/user-example.whatever'
```

## components

存储可复用的对象,方便引用

- schemas
- responses
- parameters
- examples
- requestBody
- headers
- securitySchemes
- links
- callbacks

使用：  
\$ref: '#/components/schemas/Pet'

## security

### scheme

在 components 中定义

- type：授权协议- ，apiKey，http，oauth2 或 openIdConnect。
  description：有关您的安全方法的说明。在 Swagger UI 中，此描述显示在“授权”模式中（请参见下面的屏幕截图）。允许使用 CommonMark Markdown。
- name：请求中提交的标头值的名称。仅用于 apiKey 类型安全性。
- in：指定安全密钥的应用位置。选项 query，header 或 cookie。仅用于 apiKey 类型安全性。
- scheme。与 http 类型授权一起使用。
- bearerFormat。与 http 类型授权一起使用。
- flows（对象）：与 oauth2 类型授权一起使用。
- openIdConnectUrl：与 openIdConnect 类型授权一起使用。

```
securitySchemes:
    app_id:
      type: apiKey
      description: API key to authorize requests. If you don't have an OpenWeatherMap API key, use `fd4698c940c6d1da602a70ac34f0b147`.
      name: appid
      in: query
```

例子：

```
type: http
scheme: basic

type: http
scheme: bearer
bearerFormat: JWT

type: apiKey
name: api_key
in: header

type: oauth2
flows:
  implicit:
    authorizationUrl: https://example.com/api/oauth/dialog
    scopes:
      write:pets: modify pets in your account
      read:pets: read your pets
```

### 表示 API 需要权限

1. on-OAuth2 Security Requirement

```
api_key: []
```

2. OAuth2 Security Requirement

```
petstore_auth:
- write:pets
- read:pets
```

如果是在根声明,对所有 api 有效,可以在 path 中复写

```
/current:
  get:
    ...
    security:
    - some_other_key: []
```
