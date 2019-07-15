# MediaDevices

事件：
- devicechange 当媒体设备（例如相机，麦克风或扬声器）连接到系统或从系统中移除时触发

方法：
- MediaDevices.enumerateDevices()
获取有关系统中可用的媒体输入和输出设备的一系列信息。
- MediaDevices.getUserMedia()
在用户通过提示允许的情况下，打开系统上的相机或屏幕共享和/或麦克风，并提供 MediaStream 包含视频轨道和/或音频轨道的输入。


# MediaStream
MediaStream 接口是一个媒体内容的流。一个流包含几个轨道，比如视频和音频轨道。

属性：
- MediaStream.ended 只读  
布尔型。如果 ended 事件在这个对象上触发了，也就是说这个流已经被完全读取，值为true。 如果还没有到达这个流的尾部，值为false。
- MediaStream.id 只读  
这是一个包含36个字符的 DOMString ，用来作为这个对象的唯一标识符 (GUID) 。

事件：
- MediaStream.onaddtrack  
这是addtrack事件在这个对象上触发时调用的事件处理器[EventHandler]，这时一个MediaStreamTrack对象被添加到这个流。
- MediaStream.onended  
这是当流终止[ended]时触发的事件。
- MediaStream.onremovetrack  
这是removetrack事件在这个对象上触发事调用的事件处理器[EventHandler]，这时一个对象从流上移除。

## MediaStreamTrack
表示一段媒体资源

方法：
1. MediaStreamTrack.getConstraints()与MediaStreamTrack.applyConstraints()轨道的约束
2. MediaStreamTrack.getSettings()轨道现在的属性
3. MediaStreamTrack.getCapabilities()轨道适用的约束范围
共有属性:
- deviceId
- groupId
### 音轨
- autoGainControl
- channelCount
- echoCancellation
- latency
- noiseSuppression
- sampleRate
- sampleSize
- volume
### 图像轨道
- whiteBalanceMode
- exposureMode
- focusMode
- pointsOfInterest
- exposureCompensation
- colorTemperature
- iso
- brightness
- contrast
- saturation
- sharpness
- focusDistance
- zoom
- torch

### 视频轨道
- aspectRatio
- facingMode
- frameRate
- height
- width

# MediaRecorder 录制视频转文件
这个接口可以对Mediastream进行录制  
方法：  
1. start  开始录制
2. stop 停止录制，引发dataavailable包含Blob数据，并不再记录
3. requesrtData 触发dataavailable事件，并创建一个新的Blob对象进行录制
录制过程:
1. 获取mediastream  
- 调用video,canvas的captureStream方法，返回一个对MediaStream对象的引用，其中包含单个对象anvasCaptureMediaStreamTrack。
- 使用mediaDevices.getUserMedia() API 在回调里的参数就是MediaStream对象
2. 绑定一个mediastream 
```
let mediaRecorder = new Mediastream(mediastream)
```
3. 添加dataavailable事件,用来接收blob，并设置一个chunks数组用来保存片段
4. mediaRecorder.start()开始创建blob，数据存进去
5. 中间一些pause，resume等操作,最后调用stop
6. 使用new Blob(chunks,{type:''})合并blob,并描述其类型