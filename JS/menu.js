// menu.js：树形菜单展开/收起控制逻辑
document.addEventListener("DOMContentLoaded", function () {
    const folders = document.querySelectorAll(".tree-menu .folder");
  
    folders.forEach(folder => {
      folder.addEventListener("click", () => {
        const nextUL = folder.nextElementSibling;
        if (nextUL && nextUL.tagName === "UL") {
          nextUL.style.display = (nextUL.style.display === "none") ? "block" : "none";
        }
      });
    });


// ✅ 国家点击事件（加载 GeoJSON + 显示介绍）
const files = document.querySelectorAll(".tree-menu .file");
files.forEach(file => {
  file.addEventListener("click", () => {
    const countryName = file.textContent.trim();

    // ✅ 获取 infoBox 元素
    const infoBox = document.getElementById("infoBox");

    // ✅ 显示介绍信息（替代 alert）
    if (countryInfo[countryName]) {
      const { text, flag } = countryInfo[countryName];
    
      infoBox.innerHTML = `
        <div style="padding: 10px; border-radius: 8px;">
          <h3 style="margin-top: 0;">${countryName}</h3>
          <img src="./images/flags/${flag}" alt="国旗" style="width: 120px; height: auto; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 10px;">
          <p style="line-height: 1.6;">${text}</p>
          <span id="closeInfoBox" style="
          position: absolute;
          top: 8px;
          right: 12px;
          cursor: pointer;
          font-weight: bold;
          color: #999;
        ">✖</span>
        </div>
      `;
      infoBox.style.display = "block";

      // ✅ 绑定关闭按钮事件
      document.getElementById("closeInfoBox").onclick = () => {
        infoBox.style.display = "none";
      };
    } else {
      infoBox.innerHTML = `<p>暂无 ${countryName} 的介绍信息。</p>`;
      infoBox.style.display = "block";
    }

    // ✅ 加载 GeoJSON 数据并设置样式
    const geojsonMap = {
"哈萨克斯坦":"kazakhstan.geojson",
"格鲁吉亚":"georgia.geojson",
"阿塞拜疆":"azerbaijan.geojson",
"亚美尼亚":"armenia.geojson",
"乌兹别克斯坦":"uzbekistan.geojson",
"土库曼斯坦":"turkmenistan.geojson",
"吉尔吉斯斯坦":"kyrgyzstan.geojson",
"伊朗":"iran.geojson",
"伊拉克":"iraq.geojson",
"土耳其":"turkey.geojson",
"叙利亚":"syria.geojson",
"约旦":"jordan.geojson",
"黎巴嫩":"lebanon.geojson",
"以色列":"israel.geojson",
"沙特阿拉伯":"saudiarabia.geojson",
"也门":"yemen.geojson",
"阿曼":"oman.geojson",
"阿联酋":"uae.geojson",
"卡塔尔":"qatar.geojson",
"科威特":"kuwait.geojson",
"巴林":"bahrain.geojson",
"塞浦路斯":"cypruss.geojson",
"巴基斯坦":"pakistan.geojson",
"蒙古":"mongolia.geojson",
"印度":"india.geojson",
"孟加拉":"bangladesh.geojson",
"缅甸":"myanmar.geojson",
"越南":"vietnam.geojson",
"老挝":"laos.geojson",
"柬埔寨":"cambodia.geojson",
"泰国":"thailand.geojson",
"新加坡":"singapore.geojson",
"马来西亚":"malaysia.geojson",
"俄罗斯":"russia.geojson",
"乌克兰":"ukraine.geojson",
"白俄罗斯":"belarus.geojson",
"摩尔多瓦":"moldova.geojson",
"波兰":"poland.geojson",
"立陶宛":"lithuania.geojson",
"爱沙尼亚":"estonia.geojson",
"拉脱维亚":"latvia.geojson",
"捷克":"czechia.geojson",
"斯洛伐克":"slovakia.geojson",
"匈牙利":"hungary.geojson",
"斯洛文尼亚":"slovenia.geojson",
"克罗地亚":"croatia.geojson",
"波黑":"bosnia.geojson",
"塞尔维亚":"serbia.geojson",
"阿尔巴尼亚":"albania.geojson",
"罗马尼亚":"romania.geojson",
"保加利亚":"bulgaria.geojson",
"北马其顿":"northmecedonia.geojson",
"希腊":"greece.geojson",
"埃及":"egypt.geojson",
};
    
    const geojsonFile = geojsonMap[countryName];
    const geojsonUrl = `./data/${geojsonFile}`;

    fetch(geojsonUrl)
      .then(res => res.json())
      .then(data => {
        const format = new ol.format.GeoJSON();
        const features = format.readFeatures(data, {
          featureProjection: "EPSG:3857"
        });

        // 清空图层并添加新要素
        window.vectorLayer.getSource().clear();
        window.vectorLayer.getSource().addFeatures(features);

    // ✅ 设置样式（根据国家名称定色，或默认样式）
    const colorMap = {
"哈萨克斯坦":'rgba(255,165,0,0.4)',
"格鲁吉亚":'rgba(255,165,0,0.4)',
"阿塞拜疆":'rgba(255,165,0,0.4)',
"亚美尼亚":'rgba(255,165,0,0.4)',
"乌兹别克斯坦":'rgba(255,165,0,0.4)',
"土库曼斯坦":'rgba(255,165,0,0.4)',
"吉尔吉斯斯坦":'rgba(255,165,0,0.4)',
"伊朗":'rgba(255,165,0,0.4)',
"伊拉克":'rgba(255,165,0,0.4)',
"土耳其":'rgba(255,165,0,0.4)',
"叙利亚":'rgba(255,165,0,0.4)',
"约旦":'rgba(255,165,0,0.4)',
"黎巴嫩":'rgba(255,165,0,0.4)',
"以色列":'rgba(255,165,0,0.4)',
"沙特阿拉伯":'rgba(255,165,0,0.4)',
"也门":'rgba(255,165,0,0.4)',
"阿曼":'rgba(255,165,0,0.4)',
"阿联酋":'rgba(255,165,0,0.4)',
"卡塔尔":'rgba(255,165,0,0.4)',
"科威特":'rgba(255,165,0,0.4)',
"巴林":'rgba(255,165,0,0.4)',
"塞浦路斯":'rgba(255,165,0,0.4)',
"巴基斯坦":'rgba(255,165,0,0.4)',
"蒙古":'rgba(255,165,0,0.4)',
"印度":'rgba(255,165,0,0.4)',
"孟加拉":'rgba(255,165,0,0.4)',
"缅甸":'rgba(255,165,0,0.4)',
"越南":'rgba(255,165,0,0.4)',
"老挝":'rgba(255,165,0,0.4)',
"柬埔寨":'rgba(255,165,0,0.4)',
"泰国":'rgba(255,165,0,0.4)',
"新加坡":'rgba(255,165,0,0.4)',
"马来西亚":'rgba(255,165,0,0.4)',
"俄罗斯":'rgba(255,165,0,0.4)',
"乌克兰":'rgba(255,165,0,0.4)',
"白俄罗斯":'rgba(255,165,0,0.4)',
"摩尔多瓦":'rgba(255,165,0,0.4)',
"波兰":'rgba(255,165,0,0.4)',
"立陶宛":'rgba(255,165,0,0.4)',
"爱沙尼亚":'rgba(255,165,0,0.4)',
"拉脱维亚":'rgba(255,165,0,0.4)',
"捷克":'rgba(255,165,0,0.4)',
"斯洛伐克":'rgba(255,165,0,0.4)',
"匈牙利":'rgba(255,165,0,0.4)',
"斯洛文尼亚":'rgba(255,165,0,0.4)',
"克罗地亚":'rgba(255,165,0,0.4)',
"波黑":'rgba(255,165,0,0.4)',
"塞尔维亚":'rgba(255,165,0,0.4)',
"阿尔巴尼亚":'rgba(255,165,0,0.4)',
"罗马尼亚":'rgba(255,165,0,0.4)',
"保加利亚":'rgba(255,165,0,0.4)',
"北马其顿":'rgba(255,165,0,0.4)',
"希腊":'rgba(255,165,0,0.4)',
"埃及":'rgba(255,165,0,0.4)',
};

        const fillColor = colorMap[countryName] || 'rgba(255, 0, 0, 0.3)'; // 默认红色半透明

        window.vectorLayer.setStyle(new ol.style.Style({
          fill: new ol.style.Fill({
            color: fillColor
          }),
          stroke: new ol.style.Stroke({
            color: '#444',
            width: 2
          })
        }));

        // ✅ 缩放视图到国家范围
        const extent = window.vectorLayer.getSource().getExtent();
        window.map.getView().fit(extent, { padding: [20, 20, 20, 20] });
      })
      .catch(err => {
        console.warn(`❌ 未找到 ${countryName} 的 GeoJSON 文件。`, err);
      });

  });
});
});

