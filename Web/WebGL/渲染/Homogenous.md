# Homogenous

变化可以由一个2x2举证表示,但是平移需要另外加x,y

由此引入齐次坐标

2D 点位:$(x,y,1)^T$ 当w不为0时,就表示一个点位
2D 向量:$(x,z,0)^T$ 向量具有平移不变性,所以最后一个维度为0

可以通过增加一个数,将平移变成矩阵形式

$$
 \begin{pmatrix}
   x^{'} \\
   y^{'} \\
   z^{'}
  \end{pmatrix} =
  \begin{pmatrix}
   1&0&t_{x} \\
   0&1&t_{y} \\
   0&0&1
  \end{pmatrix}\times\begin{pmatrix}
   x \\
   y \\
   1
  \end{pmatrix}=
  \begin{pmatrix}
   x+t_{x} \\
   y+t_{y} \\
   1
  \end{pmatrix}
$$

还可以保证:

- vectoy + vector = vector  
- point - point = vector  
- point + vector = point  
- point + point = point
