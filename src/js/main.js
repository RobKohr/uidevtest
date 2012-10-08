

$(document).ready(function(){
    var templates = {};
    templates.list = new EJS({url: '/list.ejs'});
    templates.story = new EJS({url: '/story.ejs'});

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
