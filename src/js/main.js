
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

    function formatDate(dateString){
	var d = new Date(dateString);
	return dateString;//needs to be modified
    }
    function showList(){
	var content = templates.list.render({stories:stories, formatDate:formatDate});
	$('#content').html(content);
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
