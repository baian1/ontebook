# AudioContext

用来控制 audio 相关操作

一个简单而典型的 web audio 流程如下：

1. 创建音频上下文
2. 在音频上下文里创建源 — 例如 <audio>, 振荡器, 流
3. 创建效果节点，例如混响、双二阶滤波器、平移、压缩
4. 为音频选择一个目的地，例如你的系统扬声器
5. 连接源到效果器，对目的地进行效果输出

![整体结构](https://mdn.mozillademos.org/files/12241/webaudioAPI_en.svg)

## 音频源

1. OscillatorNode
2. AudioBuffer 内存中的一个音频数据
3. AudioBufferSourceNode 多个 AudioBuffer 组成的
4. MediaElementAudioSourceNode \<audio>或\<video>元素生成的音频源
5. MediaStreamAudioSourceNode WebRTC 生成的 MediaStream

## 音效

1. BiquadFilterNode  
   BiquadFilterNode 接口表示一个简单的低频滤波器。它是一个 AudioNode，可以表示不同种类的滤波器、调音器或图形均衡器。BiquadFilterNode 总是只有一个输入和一个输出。
2. ConvolverNode  
   ConvolverNode 接口是一个 AudioNode，对给定的 AudioBuffer 执行线性卷积，通常用于实现混响效果。
3. DelayNode  
   DelayNode 接口表示延迟线；是 AudioNode 类型的音频处理模块，使输入的数据延时输出。
4. DynamicsCompressorNode  
   DynamicsCompressorNode 提供了一个压缩效果，当多个音频在同时播放并且混合的时候，可以通过它降低音量最大的部分的音量来帮助避免发生削波和失真。
5. GainNode  
   GainNode 接口用于音量变化。它是一个 AudioNode 类型的音频处理模块，输入后应用增益 效果，然后输出。
6. StereoPannerNode  
   StereoPannerNode 接口表示一个简单立体声控制节点，用来左右移动音频流。
7. WaveShaperNode  
   WaveShaperNode 接口表示一个非线性的扭曲。它是 AudioNode 类型，可以利用曲线来对信号进行扭曲。除了一些效果明显的扭曲，还常被用来给声音添加温暖的感觉。
8. PeriodicWave  
   用来定义周期性的波形，可被用来重塑 OscillatorNode 的输出.

## 音频输出

默认情况下输出系统默认扬声器设备

1. AudioDestinationNode 输出到需要设备
2. MediaStreamAudioDestinationNode 将音频以数据的形式输出,比如可以输出到 MediaRecorder 记录数据

## 其他

- 数据分析和可视化  
  AnalyserNode 表示一个可以提供实时频率分析与时域分析的切点，这些分析数据可以用做数据分析和可视化。
- 分离、合并声道  
  ChannelSplitterNode 与 ChannelMergerNode
- 声音空间效果
  - AudioListener 代表场景中正在听声音的人的位置和朝向。
  - PannerNode PannerNode 用于表示场景是声音的空间行为
- 离线（后台）音频处理
  - OfflineAudioContext 离线音频上下文也是音频上下文 AudioContext，也表示把 AudioNode 连接到一起的一个音频处理图。但是，与一个标准的音频上下文相比，离线上下文不能把音频渲染到扬声器，仅仅是把音频渲染到一个缓冲区。
  - complete (event)事件，当离线音频上下文被终止时产生。
  - OfflineAudioCompletionEvent 表示上下文被终止时的事件。
- 音频后台线程
  - AudioWorkerNode 用于与工作者线程合作来直接完成音频的生成，处理或分析等操作。
  - AudioWorkerGlobalScope 继承于 DedicatedWorkerGlobalScope。代表一个工作者上下文。这个工作者上下文里运行着对音频进行处理的脚本。设计这个接口的目的，是为了直接通过编写 JavaScript 代码，来完成对音频数据的生成，处理，分析工作。
  - AudioProcessEvent 这是一个事件对象。这个对象会被分发给 AudioWorkerGlobalScope 对象来进行处理。
