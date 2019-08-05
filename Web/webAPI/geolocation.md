# 坐标系
- WGS－84原始坐标系，一般用国际GPS纪录仪记录下来的经纬度，通过GPS定位拿到的原始经纬度，Google和高德地图定位的的经纬度（国外）都是基于WGS－84坐标系的；但是在国内是不允许直接用WGS84坐标系标注的，必须经过加密后才能使用；
- GCJ－02坐标系，又名“火星坐标系”，是我国国测局独创的坐标体系，由WGS－84加密而成，在国内，必须至少使用GCJ－02坐标系，或者使用在GCJ－02加密后再进行加密的坐标系，如百度坐标系。高德和Google在国内都是使用GCJ－02坐标系，可以说，GCJ－02是国内最广泛使用的坐标系；
- 百度坐标系:bd-09，百度坐标系是在GCJ－02坐标系的基础上再次加密偏移后形成的坐标系，只适用于百度地图。(目前百度API提供了从其它坐标系转换为百度坐标系的API，但却没有从百度坐标系转为其他坐标系的API)

# geolocation
地理位置API通过 navigator.geolocation 提供,获取的坐标是GPS坐标

# 获取当前定位
navigator.geolocation.getCurrentPosition(success, error, options)  
- success 成功得到位置信息时的回调函数，使用Position 对象作为唯一的参数。 
- error 可选 获取位置信息失败时的回调函数，使用 PositionError 对象作为唯一的参数，这是一个可选项。 
- options 可选 一个可选的PositionOptions 对象。
  - PositionOptions.enableHighAccuracy
  - PositionOptions.timeout
  - PositionOptions.maximumAge

# 监视定位
navigator.geolocation.watchPosition(success[, error[, options]])  
其参数与getCurrentPosition一致