# fnm

## win

由于fnm env不能识别powershell

`code $PROFILE`
写入
`fnm env --shell=powershell | Out-String | Invoke-Expression`
强制使用powershell配置环境变量
