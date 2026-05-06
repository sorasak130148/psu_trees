// 01 - First, we add an 'image_urls' property to each tree object in the treesData array.
treesData.forEach(function(tree) {
  var images = [
  {imageUrl: "images/trees/" + tree.tree_id + "/" + tree.tree_id + "_0_overall.jpeg", title: "ภาพรวม"},
  {imageUrl: "images/trees/" + tree.tree_id + "/" + tree.tree_id + "_1_leaves.jpeg", title: "ใบ"},
  {imageUrl: "images/trees/" + tree.tree_id + "/" + tree.tree_id + "_2_flowers.jpeg", title: "ดอก"},
  {imageUrl: "images/trees/" + tree.tree_id + "/" + tree.tree_id + "_3_fruits.jpeg", title: "ผล"}
];
  tree.image_urls = images;
});

// Now we can initialize the DataTable with the treesData array as the data source.
$(document).ready(function() {
    var table = $('#trees-table').DataTable({ // Initialize DataTable on the #trees-table element
        pageLength: 10, // Set default page length to 10 rows
        lengthMenu: [5, 10, 20, 25, 50], // Define page length options for the user
        language: { // Thai language settings for DataTables
            sProcessing:   "กำลังดำเนินการ...",
            sLengthMenu:   "แสดง _MENU_ แถว",
            sZeroRecords:  "<span style='color: red;margin: 30px;display: block;'>ไม่พบข้อมูล - ตรวจสอบเงื่อนไขการค้นหา</span>",
            sInfo:         "แสดง <strong>_START_</strong> ถึง <strong>_END_</strong> จากทั้งหมด <strong>_TOTAL_</strong> แถว",
            sInfoEmpty:    "ไม่พบข้อมูล",
            sInfoFiltered: "(กรองข้อมูลทั้งหมด _MAX_ แถว)",
            sSearch:       "ค้นหา:",
            oPaginate: { // Pagination controls
                sFirst:    "หน้าแรก",
                sPrevious: "ก่อนหน้า",
                sNext:     "ถัดไป",
                sLast:     "หน้าสุดท้าย"
            }
        },
        responsive: true, // Enable responsive design for better display on different screen sizes
        columnDefs: [
            {
                searchable: false, // Disable searching
                orderable: false, // Disable ordering
                targets: -1 // Disable search and ordering on the image thumbnail column (last column: index -1)
            },
            {
                searchable: false, orderable: false, target: -2
            }
        ],
        data: treesData, // Use the treesData array as the data source for the table
        columns: [
            { data: 'fid', title: 'FID', titleAttr: 'FID', className: 'dt-center'  }, // same as row number, so hide this column
            { data: 'tree_id', title: 'รหัสต้นไม้', titleAttr: 'Tree Code' , className: 'dt-center' },
            { data: 'name_th', title: 'ชื่อต้นไม้ (TH)', titleAttr: 'Tree Name (TH)' },
            { data: 'name_en', title: 'ชื่อต้นไม้ (EN)', titleAttr: 'Tree Name (EN)' },
            { data: 'type', title: 'ประเภทต้นไม้', titleAttr: 'Tree Type' },
            { data: 'height', title: 'ความสูง (m)', titleAttr: 'Height (m)', className: 'dt-center' },
            { data: 'DBH_cm', title: 'เส้นผ่านศูนย์กลาง (cm)', titleAttr: 'DBH (cm)', className: 'dt-center' },
            
        ]
    });
});

