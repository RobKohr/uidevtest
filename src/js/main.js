
$(document).ready(function(){
    var templates = {};
    templates.list = new EJS({url: 'templates/list.ejs'});
    templates.story = new EJS({url: 'templates/story.ejs'});
    var stories = [];
    function processData(data){
	stories = data.objects;
	console.log(stories);
	for(var i = 0; i<stories.length; i++){
	    var object = stories[i];
	}
	var storyKey = getStoryKey();
	console.log(storyKey);
	if(storyKey){
	    showStory(storyKey);
	}else{
	    showList();
	}
    }
    
    function showStory(storyKey){
	var index = storyKeyToIndex(storyKey);
	var story = stories[index];
	console.log(story);
    }

    function storyKeyToIndex(storyKey){
	return Number(strReplace('sto', '', storyKey))-1;
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
