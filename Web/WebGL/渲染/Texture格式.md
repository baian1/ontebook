# Texture 格式

## 色彩

### 色彩空间(Color space)

1. 原色相混的比例表示
   - RGB 加法混色法
   - CMYK 减色混色法
2. 不同概念表示的色彩空间 一种纯色的明度等于白色的明度，而纯色的亮度等于中度灰的亮度。
   - HSV (色相：Hue;饱和度：Saturation;明度:Value)
   - HSL (色相：Hue;饱和度：Saturation;亮度:Light)
3. 电视常用色彩空间
   - xvYCC
4. 商用色彩空间
   - 孟塞尔颜色系统(Munsell Color System)  
   - 色票
5. 特殊用途的色彩空间
   - RG Chromaticity

### 色彩模型(Color model)

- 三元组
  1. rgb
  2. rgbs
  3. hsv
- 四元组
  1. CMYK

在色彩模型和一个特定的参照色彩空间之间创建特定的映射函数，那么就会在这个参照色彩空间中出现有限的“覆盖区”（英语：footprint），称作色域。色彩空间由色彩模型和色域共同定义。例如Adobe RGB和sRGB都基于RGB颜色模型，但它们是两个不同绝对色彩空间。

## Raster formats

dot matrix data structure

传统的图像格式将像素数据存储再RGB空间中,一个像素24位,每个颜色分量8位.  

1. HDR raster formats
   [High-dynamic-range imaging (HDRI)](https://en.wikipedia.org/wiki/High-dynamic-range_imaging),通常使用RGBE或JPEG-HDR存储
2. RGBE (Logluv TIFF) Radiance HDR
   RGB各一个字节,exponent一个字节

## texture encode

同一份数据,由不同的解码方式进行解码,会以不同的颜色呈现到平面

- THREE.LinearEncoding 线性
- THREE.sRGBEncoding [gamma编码](https://www.puredevsoftware.com/blog/2019/01/21/gamma-encoding/),[Gamma Correction](https://learnopengl.com/Advanced-Lighting/Gamma-Correction)
- THREE.GammaEncoding gamma编码
- THREE.RGBEEncoding HDR
- THREE.LogLuvEncoding HDR
- THREE.RGBM7Encoding
- THREE.RGBM16Encoding
- THREE.RGBDEncoding
- THREE.BasicDepthPacking
- THREE.RGBADepthPacking
