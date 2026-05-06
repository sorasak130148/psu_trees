document.addEventListener("DOMContentLoaded", function () {

  const species = [
    'จามจุรี','ตีนเป็ด','ยางนา','สนประดิพัทธ์','ศรีตรัง',
    'บัวสวรรค์','มะม่วง','ตะเคียน','หว้า','แซะ'
  ];

  const carbon = ['9,381.33', '6,170.51', '5,623.64', '4,261.46', '2,565.36', '1,406.06', '1,400.26', '1,173.42', '984.29', '830.99'];

  const sequestration = ['34,398.22', '22,625.24', '20,620.02', '15,625.38', '9,406.37', '5,155.54', '5,134.26', '4,302.56', '3,609.09', '3,046.96'];

  const data = [
    {
      x: species,
      y: carbon,
      type: "bar",
      name: "ปริมาณคาร์บอน (Carbon Stock)"
    },
    {
      x: species,
      y: sequestration,
      type: "bar",
      name: "ปริมาณก๊าซเรือนกระจกที่กักเก็บได้ (Sequestration)"
    }
  ];

  const layout = {
    title: "10 อันดับชนิดต้นไม้ที่มีปริมาณคาร์บอนและปริมาณก๊าซเรือนกระจกที่กักเก็บได้ มากที่สุด (Top 10 Tree Species by Carbon Stock & Sequestration)",
    barmode: "group",
    xaxis: { tickangle: -45, title: "ชนิดต้นไม้" ,font: { size: 12 }},
    yaxis: { title: "ปริมาณ (กิโลกรัม)", font: { size: 12 }},
  };

  Plotly.newPlot("chart1", data, layout);

});