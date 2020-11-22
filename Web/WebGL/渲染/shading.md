# shading

## 定义

Merriam-Webster Dictionary: The darkening or coloring of an illustration or diagram with parallel lines or a block of color

计算学: 对不同的物体应用不同材质

## 颜色

### inputs

一次渲染,计算颜色需要的参数

- Viewer direction,v(视角方向)
- Surface normal,n (平面法线方向)
- Light direction,l (光线方向)
- 光的强度 I
- Surface parameters (颜色,材质等)

### 光线

1. Specular highlights
   - $p$ 高光大小控制项
   - $k^{s}$ specular coefficient
   - $h$ 半程向量,两个单位向量的中间方向,根据平行四边形法则 两单位向量相加/长度
   $$h=bisector(v,l)=\frac{v+l}{||v+l||}$$
   $$L_{s} = k^{s}(I/r^{2})max(0,cos \alpha)^{p} = k^{s}(I/r^{2})max(0,n \cdot h)^{p} $$
   blinn-phong模型忽视$n \cdot l$(对光线的吸收)
2. Diffuse reflection
   - $n\cdot l$ 由n与l的夹角,表示对能量的吸收(例子:以单位面积为基础,冬天,太阳光的夹角比夏天大,吸收的能量就少)
   - $(I/r^{2})$ light falloff(光线的衰减)
   - $k_{d}$ 漫反射,光被物体吸收部分,比如0表示吸收所有颜色,为黑色,1表示反射虽有颜色,白色, rgb三个通道设吸收率置后,就可以表现颜色了
    $$L_{d}=k_{d}(I/r^{2})max(0,n\cdot l)$$
3. Ambient lighting(环境光),简化:
    $$L_{a}=k_{a}I_{a}$$

## shading Frequencies

1. Flat shading 一个三角面一个法线
2. Gouraud shading 获取三角面每个顶点法线,对顶点进行着色,三角面像素颜色内做插值
3. Phong shading 对三角形内的每个像素插值出法线,进行着色

顶点法线获取:由周围面的法线求平均,复杂的由周围平面法线 求加权平均

### 三角形内插值过程

重心坐标$(\alpha,\beta,\gamma)$
三角形内任意一点,都可以通过$(x,y)=\alpha A+\beta B+\gamma C$ 表示
   $$\alpha+\beta+\gamma=1$$
当$\alpha,\beta,\gamma$都大于0,表示点在三角形内

三角形内的任意一点的重心坐标,可以通过与三个点连线后产生的三角形体积比来计算
$A_{A},A_{B},A_{C}$分别时点对面的三角形的面积

$$\alpha=\frac{A_{A}}{A_{A}+A_{B}+A_{C}}$$
$$\beta=\frac{A_{B}}{A_{A}+A_{B}+A_{C}}$$
$$\gamma=\frac{A_{C}}{A_{A}+A_{B}+A_{C}}$$

----------

规定其中一点坐标为$(x,y)$,重心坐标表示为
>[Barycentric coordinate:Formulas](https://en.wikipedia.org/wiki/Barycentric_coordinate_system#Conversion_between_barycentric_and_Cartesian_coordinates)

----------

用法:

三角形的三个顶点上都有属性值,使用重心乘属性值的到点的属性  

注意:

1. 重心坐标在投影变化下,会发生变化,所以需要在三维空间中进行计算,算插值

## Graphics Pipeline

1. Vertex Processing 屏幕中,点投影后的位置变化
2. Triangle Process 屏幕中,哪几个点连接形成三角形(无填充)
3. Rasterization 屏幕中,三角形光栅化,屏幕中的每个点,是不是在某个三角形内
4. Fragment Processing 深度测试,颜色等
5. Framebuffer Operations
