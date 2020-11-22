# Texture Mapping

定义一个点的不同属性(颜色,漫反射系数等),将其映射到 Texture 上

## Texture Applied to Surface

将物体表面的纹理展开为图

1. 艺术家手动操作
2. 自动化流程

保证展开后的三角形少扭曲,交界处颜色合理

## Texture Magnification

1. Point Query
2. (Avg)Range Query

---

纹理太小:

1. Nearest
2. Bilinear 双线性插值,找到临近四个点颜色,更具点位位置,进行竖直方向和水平方向的插值
3. Bicubic

---

纹理太大:

近处一个像素覆盖一个区域,远处一个像素覆盖多个区域,采用中心点颜色导致采样频率过低,失真

1. Mipmap
   fasr,approx,square  
   将一个像素点与周围点映射到纹理上,通过在纹理上的距离,判断是哪一层,  
   如果是非整数层,先在上下层采用双线性插值,再进行上下层插值

2. Anisotropic Filtering
3. EWA filtering

## Environment Map

从一个点向四周望,会有环境光进入眼睛

所以可以把环境光变为纹理,贴在物体上,就是环境反射了

### 环境光存储

1. 球体
2. 立方体

## 高度贴图

1. 凹凸贴图
2. 位移贴图

## Provide Precomputed Shading

纹理配合环境光,计算出阴影等信息,重新生成贴图,就可以减少运行中的计算
