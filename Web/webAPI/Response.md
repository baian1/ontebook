# Response

可以来创建自己的 Response

```
var myResponse = new Response(body, init);
```

- body Optional
  - Blob
  - BufferSource
  - FormData
  - ReadableStream
  - URLSearchParams
  - USVString
- init Optional
  - status: The status code for the reponse, e.g., 200.
  - statusText: The status message associated with the status code, e.g., OK.
  - headers: Any headers you want to add to your response, contained within a Headers object or object literal of ByteString key/value pairs (see HTTP headers for a reference).

# 方法

- Response.clone()  
  Creates a clone of a Response object.
- Response.error()  
  Returns a new Response object associated with a network error.
- Response.redirect()  
  Creates a new response with a different URL.

接收 Body 类型:

- Body.arrayBuffer()  
  Takes a Response stream and reads it to completion. It returns a promise that resolves with an ArrayBuffer.
- Body.blob()  
  Takes a Response stream and reads it to completion. It returns a promise that resolves with a Blob.
- Body.formData()  
  Takes a Response stream and reads it to completion. It returns a promise that resolves with a FormData object.
- Body.json()  
  Takes a Response stream and reads it to completion. It returns a promise that resolves with the result of parsing the body text as JSON.
- Body.text()  
  Takes a Response stream and reads it to completion. It returns a promise that resolves with a USVString (text).
