document.getElementById('saveButton').addEventListener('click', function() {
    var svgElement = document.getElementById('001');
    var serializer = new XMLSerializer();
    var svgString = serializer.serializeToString(svgElement);
    
    var blob = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
    var url = URL.createObjectURL(blob);
    
    var link = document.createElement('a');
    link.href = url;
    link.download = '001.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
});
;



