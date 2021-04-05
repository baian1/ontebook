# Materials and Appearance

各种不同的brdf

1. Diffuse/Lambertian Material 任何光线会被均匀反射到四周,由于能量守恒,出射irradiance=入射irradiance
   $$f_r=\frac{\rho}{\pi}$$
   $\rho$反射率,有些能量会被吸收
2. Glossy Material 有漫反射和镜面反射

3. Ideal reflective/refractive material(BSDF*) 有反射与折射

4. [Microfacet Material](http://www.pbr-book.org/3ed-2018/Reflection_Models/Microfacet_Models.html)

5. Isotropic/Anisotropic Materials
   - Isotropic 微表面法线分布均匀
   - Anisotropic 微表面法线分布有朝向

## 折射

Snell's Law

$$\eta_i sin\theta_i = \eta_t sin\theta_t$$

$$cos\theta_t = \sqrt{1-\left(\frac{\eta_i}{\eta_t}\right)(1-cos^2\theta_i)}$$

当$\frac{\eta_i}{\eta_t}>1$,入射的折射率大于出去的折射率,$\theta_t$可能会是虚数,就不存在折射的现象.

Snell's Window/Circle,人在水里看太阳,周围会是黑的,看不见

## Fresnel Reflection/Term

解释了有多少能量反射,有多少能量折射

## 测量BRDF

存储

1. Compact representation
2. Accurate representation of measure data
3. Efficient evalution for arbitrary pairs of directions
4. Good distributions available for importance sampling

## Advanced Appearance Modeling

- Non-surface models(非表面模型)
  - Participating Media 雾,云等
