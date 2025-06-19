// 创建地图对象
// 创建图层对象（用于加载国家 GeoJSON）
window.vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector()
  });
  
  // 创建地图对象（设置为 window.map 便于其他 JS 访问）
  window.map = new ol.Map({
    target: 'map', // 与 HTML 中的 div#map 对应
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM() // 使用 OpenStreetMap 底图
      }),
      window.vectorLayer // 添加你的边界图层
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([105.0, 35.0]), // 以中国为中心
      zoom: 4
    })
  });
  
// 创建新的 GeoJSON 图层
const Source1 = new ol.source.Vector({
  url: 'data/NEC1.geojson', // 路径
  format: new ol.format.GeoJSON({
    dataProjection: 'EPSG:4326',    // ← 你数据的坐标系
    featureProjection: 'EPSG:3857'  // ← 地图显示的投影
  })
});

const Layer1 = new ol.layer.Vector({
  source: Source1,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#3498db',  // 蓝色线条
      width: 2
    })
  })
});

// ✅ 加入地图
window.map.addLayer(Layer1);

const Source2 = new ol.source.Vector({
  url: 'data/CIPEC1.geojson', // 路径
  format: new ol.format.GeoJSON({
    dataProjection: 'EPSG:4326',    // ← 你数据的坐标系
    featureProjection: 'EPSG:3857'  // ← 地图显示的投影
  })
});

const Layer2 = new ol.layer.Vector({
  source: Source2,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#FFD700',  // 黄色线条
      width: 2
    })
  })
});

// ✅ 加入地图
window.map.addLayer(Layer2);

const Source3 = new ol.source.Vector({
  url: 'data/CPEC1.geojson', // 路径
  format: new ol.format.GeoJSON({
    dataProjection: 'EPSG:4326',    // ← 你数据的坐标系
    featureProjection: 'EPSG:3857'  // ← 地图显示的投影
  })
});

const Layer3 = new ol.layer.Vector({
  source: Source3,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#FFA500',  // 橙色线条
      width: 2
    })
  })
});

// ✅ 加入地图
window.map.addLayer(Layer3);

const Source4 = new ol.source.Vector({
  url: 'data/CMREC1.geojson', // 路径
  format: new ol.format.GeoJSON({
    dataProjection: 'EPSG:4326',    // ← 你数据的坐标系
    featureProjection: 'EPSG:3857'  // ← 地图显示的投影
  })
});

const Layer4 = new ol.layer.Vector({
  source: Source4,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#FFC0CB',  // 粉色线条
      width: 2
    })
  })
});

// ✅ 加入地图
window.map.addLayer(Layer4);

const Source5 = new ol.source.Vector({
  url: 'data/CCAWEC1.geojson', // 路径
  format: new ol.format.GeoJSON({
    dataProjection: 'EPSG:4326',    // ← 你数据的坐标系
    featureProjection: 'EPSG:3857'  // ← 地图显示的投影
  })
});

const Layer5 = new ol.layer.Vector({
  source: Source5,
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#7CFC00',  // 绿色线条
      width: 2
    })
  })
});

// ✅ 加入地图
window.map.addLayer(Layer5);

// 1. 创建 Overlay 弹窗
const popup = new ol.Overlay({
  element: document.getElementById('popup'),
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -10]
});
window.map.addOverlay(popup);

// 2. 地图点击事件监听
window.map.on('singleclick', function(evt) {
  let feature = window.map.forEachFeatureAtPixel(evt.pixel, function(feat) {
    return feat;
  });

  if (feature) {
    const name = feature.get('名称');
    const content = lineInfoMap[name] || "暂无介绍信息";

    // 显示在弹窗中
    const popupContent = document.getElementById('popup-content');
    popupContent.innerHTML = `<strong>${name}</strong><p>${content}</p>`;
    popup.setPosition(evt.coordinate);
  } else {
    popup.setPosition(undefined);
  }
});






