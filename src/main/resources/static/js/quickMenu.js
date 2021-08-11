const Grid = tui.Grid;
let gridData;

$(document).ready(function() {
    initGrid();
    getAllMajors();
    callGetAllMajors();
})


function initGrid() {
    const data = [];
    gridData = new Grid({
        el: document.getElementById('grid'),
        data: data,
        // rowHeaders: ['checkbox'],
        treeColumnOptions: {
            name: 'code',
            useIcon: false,
            useCascadingCheckbox : true
        },
        scrollY: false,
        columns: [
            {
                header: '과목번호',
                width: 'auto',
                minWidth: '90',
                align: 'center',
                name: 'code',
            },
            {
                header: '학과',
                width: 'auto',
                minWidth: '230',
                name: 'major',
            },
            {
                header: '과목',
                width: 'auto',
                minWidth: '250',
                name: 'subjectNO'
            }
        ]
    });

    gridData.on('click', (ev) => {
        if(ev.columnName === "subjectNO") {
            if(gridData.getRow(ev.rowKey).professor != null)
                goSelected(gridData.getRow(ev.rowKey));
        }
    })

    gridData.resetData(data);
}

function getAllMajors() {
    callPostService('getAllMajors', null, 'callGetAllMajors')
}

function callGetAllMajors(data) {
    // 전공에 데이터 추가
    $("#selectMajor").append("<option>전공</option>")
    $.each(data, function(index, item) {
        var option = "<option value='" + item.major + "'>"+ item.major + "</option>";
        $("#selectMajor").append(option);
    });
}