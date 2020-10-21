# shading

## 定义

Merriam-Webster Dictionary: The darkening or coloring of an illustration or diagram with parallel lines or a block of color

计算学: 对不同的物体应用不同材质

## 颜色

### inputs

- Viewer direction
- Surface normal (n)
- Light direction (I)
- Surface parameters

### 光线

1. Specular highlights
   - $p$ 高光大小控制项
   - $k^{s}$ specular coefficient
   $$h=bisector(v,I)=\frac{v+1}{||v+1||}$$
   $$L_{s} = k^{s}(I/r^{2})max(0,cos \alpha)^{p} = k^{s}(I/r^{2})max(0,n \cdot h)^{p} $$
2. Diffuse reflection
   - $n\cdot I$ 由n与i的夹角(例子:冬天,太阳光的夹角比夏天大,吸收的能量就少)
   - $(I/r^{2})$ light falloff(光线的衰减)
   - $k_{d}$ 漫反射,光被物体吸收部分
    $$L_{d}=k_{d}(I/r^{2})max(0,n\cdot I)$$
3. Ambient lighting
    $$L_{a}=k_{a}I_{a}$$

## shading Frequencies

1. Flat shading 一个三角面一个法线
2. Gouraud shading 获取三角面每个顶点法线,对顶点进行着色,三角面像素颜色内做插值
3. Phong shading 对三角形内的每个像素插值出法线,进行着色

顶点法线获取:由周围面的法线求平均,复杂的由周围平面法线 求加权平均

## 三角形内插值过程

1. 计算重心坐标
   $$(x,y)=\alpha A+\beta B+\gamma C$$
   $$\alpha+\beta+\gamma=1$$
   当$\alpha,\beta,\gamma$都大于0,表示点在三角形内
