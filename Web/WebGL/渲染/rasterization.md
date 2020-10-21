# rasterization(光栅化过程)

屏幕坐标:$[0,width]\times[0,height]$
视口坐标:$[-1,1]\times[-1,1]$

视口坐标到屏幕坐标变化矩阵
$$
M_{viewport}=
\begin{pmatrix}
   \frac{width}{2}&0&0&\frac{width}{2} \\
   0& \frac{height}{2}&0&\frac{height}{2} \\
   0&0&1&0 \\
   0&0&0&1
  \end{pmatrix}
$$

## 反走样

走样可以认为,是采样频率不够,导致图像的高频信号产生了混叠

可以通过低通滤波(模糊化)再进行光栅化解决

近似方法

1. MASS 对于任意像素,采用更多采样点进行采样,通过每个采样点是否在三角形内,将结果平均,算出像素最终结果  
2. FXAA(Fast Approximate) 后期处理,找到图像边界,换成没有锯齿的边界
3. TAA(Temporal AA) 对于静态物体,采用上一次的采样结果,加上这一帧的随机采样结果混合,相当于把MASS的采样分布在不同时间上
4. DLSS 超分辨率 适用于图片拉大后,猜测对应位置像素颜色
