$(document).ready(function(){
    function processData(data){
	var objects = data.objects;
	for(var i = 0; i<objects.length; i++){
	    var object = objects[i];
	    console.log(object);
	}
    }
    $.ajax({
	url: './data/uidevtest-data.js',
	success: processData,
	dataType: 'json'
    });
});
