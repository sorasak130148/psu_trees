document.addEventListener("DOMContentLoaded", function () {

  var data = [{
    type: "pie",
    labels: [
      "ศรีตรัง",
      "ยางนา",
      "ปาล์มหางหมาจิ้งจอก",
      "ตีนเป็ด",
      "จามจุรี",
      "สนประดิพัทธ์",
      "ตะเคียน",
      "อินทนิล",
      "ปีบ",
      "มะม่วง"
    ],
    values: [
      35,
      14,
      13,
      11,
      8,
      8,
      7,
      7,
      6,
      6
    ],

    hole: 0.4,

    texttemplate: "%{label}<br>%{value} ต้น<br>%{percent}",
    textinfo: "text",
    textposition: "outside",
    automargin: true,

    hovertemplate:
      "%{label}<br>" +
      "จำนวน: %{value} ต้น<br>" +
      "สัดส่วน: %{percent}<extra></extra>"
  }];

  var layout = {
    title: "10 อันดับชนิดต้นไม้ที่พบมากที่สุด (Top 10 Most Common Tree Species)",
    height: 500,
    showlegend: false
  };

  Plotly.newPlot("chart2", data, layout);

});