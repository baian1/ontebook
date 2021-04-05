# Color

## Physical Basis of Color

光是由多个不同波长的单色光组合成的.

Spectral Power Distribution(谱功率密度),可以描述光在光谱上的各个波长的分布.

## Biological Basis of Color

通过视网膜上的细胞接收颜色

- Rod cells 感知光线强度,获得灰度图
- Cone cells 感知颜色
  - S-Cone 小波长敏感
  - M-Cone 中波长
  - L-Cone

光谱与强度积分,得到的三个数值相和,成为我们眼中的世界:
$$S=\int r_S(\lambda)s(\lambda)d\lambda\\
M=\int r_M(\lambda)s(\lambda)d\lambda\\
L=\int r_L(\lambda)s(\lambda)d\lambda$$

由此可知,不同的波长的光+强度 可以获得相同的颜色,称为同色异谱.

## Gamut

CIE XYZ的色域
![CIE XYZ](./Cameras/CIE%20XYZ.png)
某个颜色就由三种基础颜色合成

将XYZ系统转换到二维下
通过$x+y+z=1$归一化

$$x=\frac{X}{X+Y+Z}\\
y=\frac{Y}{X+Y+Z}\\
z=\frac{Z}{X+Y+Z}$$
![cie xy](./Cameras/CIE%20xy.png)

其余系统:

- CMYK
- HSV
- sRGB
- CIELAB 利用人眼的互补色原理(Opponent Color Theory)建立
