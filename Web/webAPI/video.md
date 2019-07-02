# video
继承自[HTMLMedia​Element](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement)
## 属性
- src表示视频地址
- controls : 为网页中的音频显示标准的HTML5控制器。
- autoplay : 使音频自动播放。
- loop : 使音频自动重复播放。
- preload 表示加载视频,视频开始下载后需要删除src才会停止

## 控制
- seekable
- played
- currentTime

# [MSE](https://w3c.github.io/media-source/)

## 接口
### Media​Source
将sourcebuffer中的数据绑定到video上展示
```
interface MediaSource : EventTarget {
  readonly attribute SourceBufferList    sourceBuffers;
  readonly attribute SourceBufferList    activeSourceBuffers;
  readonly attribute ReadyState          readyState;
           attribute unrestricted double duration;
           attribute EventHandler        onsourceopen;
           attribute EventHandler        onsourceended;
           attribute EventHandler        onsourceclose;
  SourceBuffer addSourceBuffer(DOMString type);
  void removeSourceBuffer(SourceBuffer sourceBuffer);
  void endOfStream(optional EndOfStreamError error);
  void setLiveSeekableRange(double start, double end); 
  void clearLiveSeekableRange();
  static boolean isTypeSupported(DOMString type);
};
```
isTypeSupported监测是否支持特定编码和容器盒子

addSourceBuffer返回一个sourceBuffer存储数据

removeSourceBuffer移除不需要的流

endOfStream接收完一段流后可以进行播放,会将状态变为ended

### SourceBuffer
视频的数据  
```
interface SourceBuffer : EventTarget {
           attribute AppendMode          mode;
  readonly attribute boolean             updating;
  readonly attribute TimeRanges          buffered;
           attribute double              timestampOffset;
  readonly attribute AudioTrackList      audioTracks;
  readonly attribute VideoTrackList      videoTracks;
  readonly attribute TextTrackList       textTracks;
           attribute double              appendWindowStart;
           attribute unrestricted double appendWindowEnd;
           attribute EventHandler        onupdatestart;
           attribute EventHandler        onupdate;
           attribute EventHandler        onupdateend;
           attribute EventHandler        onerror;
           attribute EventHandler        onabort;
  void appendBuffer(BufferSource data);
  void abort();
  void remove(double start, unrestricted double end);
};
```
mode保存视频的排序方式: 
按序和乱序
默认按序,因为数据中保存有这个片段位置信息

appendWindowStart 和 appendWindowEnd管理视频的长度，开始时间，结束时间  
在这个范围外的buffer不会被添加

remove移除某个片段:
1. 找到segment
2. 获取start和end
3. 移除

abort直接清空

appendBuffer添加片段
### SourceBufferList
保存SourceBuffer数据的容器  
可以通过数组形式访问数据  

事件:
addsourcebuffer
removesourcebuffer

# 视频类型
fragmented Mp4相较于regular mp4将数据分段信息存储在sidx box中，通过加载这个box可以找到数据相关信息加载数据