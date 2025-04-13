let myMap = new SeatMap({
    rowCount : 20,
    colCount : 30,
    labelTemplate: '{col}{row}',
    middleBlock:'middle-block', 
    colLabelWrapperTop:'colLabelWrapperTop', 
    colLabelWrapperBottom:'colLabelWrapperBottom', 
    rowLabelWrapperLeft:'rowLabelWrapperLeft', 
    rowLabelWrapperRight:'rowLabelWrapperRight'
})

let myMapConfig = new MyMapConfig({myMap: myMap})