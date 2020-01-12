# error

```go
type error Interface {
  Error() string
}
```

## errorString

内置的 errorString 实现

```go
func New(text string) error {
  return &errorString{text}
}

type errorString struct {
  s string
}
func (e *errorString) Error() string {
  return e.s
}
```

## github.com/pkg/errors
