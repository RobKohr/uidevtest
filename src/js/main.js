
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
    
    function columnSplit(html){
	first = '';
	second = '';
	wc = wordCount(html);
	half_count = wc/2;
	paragraphs = html.split('</p>');
	first = paragraphs[0];
	for(var i = 0; i<paragraphs.length; i++){
	    first+='</p>';
	    if(wordCount(first) > half_count)
		break;
	    first += paragraphs[i];
	}
	for(var i = i; i<paragraphs.length; i++){
	    second+=paragraphs[i];
	}
	second+='</p>';
	return [first, second];
    }

    function wordCount(s){
	s = s.replace(/(^\s*)|(\s*$)/gi,"");
	s = s.replace(/[ ]{2,}/gi," ");
	s = s.replace(/\n /,"\n");
	return s.split(' ').length;
    }

    function showStory(storyKey){
	var index = storyKeyToIndex(storyKey);
	var story = stories[index];
	var content = templates.story.render({story:story, formatDate:formatDate, columnSplit:columnSplit});
	$('#content').html(content);	
	hideShowByViewSize();
	reapplyDropShadows();
	$('img').load(reapplyDropShadows); 
    }

    function hideShowByViewSize(){
	$('.dynamic-table').removeClass('.dynamic-table');
	$('.dynamic-row').removeClass('.dynamic-row');
	$('.dynamic-cell').removeClass('.dynamic-cell');
	var width = $(window).width();
	console.log(width);
	if(width>480){
	    $('.wide-view').show();
	    $('.thin-view').hide();
	    $('.wide-view-is-table').addClass('dynamic-table');
	    $('.wide-view-is-row').addClass('dynamic-row');
	    $('.wide-view-is-cell').addClass('dynamic-cell');
	}else{

	    $('.wide-view').hide();
	    $('.thin-view').show();
	}

	
    }
    $(window).resize(hideShowByViewSize);

    function reapplyDropShadows(){
	$('.drop_shadow_layer').remove();
	$('.shadow').dropshadow({
	    shadowColor: '#cccccc',
	    shadowLayer: -100,
	    distance:'6px',
	    blur:'3px'
	});
    }
    $(window).resize(reapplyDropShadows);

    function storyKeyToIndex(storyKey){
	return Number(strReplace('sto', '', storyKey))-1;
    }

    function formatDate(dateString){
	var d = new Date(dateString);
	var out=
	    moment(d).format(
		"h:mm a dddd, MMM, D, YYYY");
	out = strReplace('am', 'a.m.', out);
	out = strReplace('pm', 'p.m.', out);
	return out;
    }
    function showList(){
	var content = templates.list.render({stories:stories, formatDate:formatDate});
	$('#content').html(content);
	$('.list .story').each(function(){
	    var s = $(this);
	    $(this).find('a').each(function(){
		var link = $(this).attr('href');
		s.click(function(){
		    window.location = link;
		});
	    })
	    $(this).click(function(){

	    });
	});
	reapplyDropShadows();
	$('img').load(reapplyDropShadows); 
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
