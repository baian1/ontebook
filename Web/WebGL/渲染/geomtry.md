# geomtry

1. implicit surface
   表达方式:
   - 用数学公式表达,满足一定条件 比如$f(x,y,z)=(2-\sqrt{x^2+y^2})^2+z^2-1=0$
   - Constructive Solid Geometry
   - Distance Function 一个点在物体外为+,内为-,0形成表面
   - Level Set Methods 距离函数的另一种表达方式
   - Fractals
   优点:
   - 容易判断点是否在面上或在内在外
2. explicit surface
   - All points are given directly
   - via parameter mapping
   - 容易构造形状,不容易判断点在表面内或外
   表达方式:
   - Point Cloud
   - Polygon Mesh
   - Curves
      - quadratic Bezier(二阶贝塞尔曲线)
      - Bernstein Polynomials 代数公式
      - Piecewise Bezier Curves 每4个控制点定义一段曲线
      - B-Spline
      性质:
      - 仿射变换后,控制点生成的曲线相同
      - 曲线在控制点形成的凸包(Convex Hull)内
   - Surfaces
      - Bezier Sufaces
      - Subdivision sufaces (triangles & quads) 网格
      网格操作:
         - Mesh subdivision
         - Mesh simplification
         - Mesh regularization

## Mesh

1. Mesh Subdivision 网格细分
2. Mesh Simplification 网格简化
3. Mesh Regularization 三角形调整,把一些长三角形拆分为正三角形,提高效果

----------------

Subdivision算法:

1. Loop Subdivision
2. Catmull-Clark Subdivision

----------------

Simplification算法:

1. Quadric Error Mesh Simplification
