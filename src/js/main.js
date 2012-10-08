function getParameterByName(name)
{
    //sourced from stack overflow
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if(results == null)
	return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
}


$(document).ready(function(){
    var templates = {};
    templates.list = new EJS({url: 'templates/list.ejs'});
    templates.story = new EJS({url: 'templates/story.ejs'});

    function processData(data){
	var objects = data.objects;
	for(var i = 0; i<objects.length; i++){
	    var object = objects[i];
	    console.log(object);
	}
	var storyKey = getStoryKey();
	console.log(storyKey);
	if(storyKey){
	    showStory(storyKey);
	}else{
	    showList();
	}
    }
    
    function showStory(){

    }

    function showList(){

    }

    function getStoryKey(){
	return getParameterByName('story');
    }

    $.ajax({
	url: './data/uidevtest-data.js',
	success: processData,
	dataType: 'json'
    });
});
