document.addEventListener("DOMContentLoaded", function () {

  var data = [{
    x: ["0-5","5-10","10-15","15-20","20-25","25-30"],
    y: [6,110,45,6,7,1],

    type: "bar",
    marker: {
      color: "rgba(31, 133, 27, 0.8)"
    }
  }];

  var layout = {
    title: "จำนวนต้นไม้ตามช่วงความสูง (Height Class)",
    xaxis: {
      title: "ความสูง (เมตร)",
    },
    yaxis: {
      title: "จำนวนต้นไม้ (ต้น)"
    }
  };

  Plotly.newPlot("chart5", data, layout);

});