document.addEventListener("DOMContentLoaded", function () {

  var data = [{
    type: "pie",
    labels: ["กลุ่มปาล์ม","ป่าดิบชื้น","ป่าดิบแล้ง","ป่าเบญจพรรณ"],
    values: [22,103,2,48],

    // ✅ แสดงบนกราฟ: ชื่อ + จำนวน + %
    texttemplate: "%{label}<br>%{value} ต้น<br>%{percent}",
    textinfo: "text",

    // ✅ tooltip (ตอน hover)
    hovertemplate: 
      "%{label}<br>" +
      "จำนวน: %{value} ต้น<br>" +
      "สัดส่วน: %{percent}<extra></extra>",

    hole: 0.4
  }];

  var layout = {
    title: "สัดส่วนประเภทป่า (Forest Type Distribution)",
    showlegend: false
  };

  Plotly.newPlot("chart3", data, layout);

});