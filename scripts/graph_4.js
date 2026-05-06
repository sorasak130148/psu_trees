document.addEventListener("DOMContentLoaded", function () {

  var data = [{
    x: [
      "5-15","15-25","25-35","35-45","45-55",
      "55-65","65-75","75-85","85-95","105-115","135-145"
    ],

    y: [9,65,51,21,18,5,2,1,1,1,1],

    type: "bar",
    marker: {
      color: "rgba(46, 125, 50, 0.8)"
    }
  }];

  var layout = {
    title: "จำนวนต้นไม้ตามช่วงเส้นผ่านศูนย์กลาง (DBH Class)",
    xaxis: {
      title: "เส้นผ่านศูนย์กลาง (ซม.)",
    },
    yaxis: {
      title: "จำนวนต้นไม้ (ต้น)",
    }
  };

  Plotly.newPlot("chart4", data, layout);

});