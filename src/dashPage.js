var pageCarouselRunning = true;
var pageEnabledCache = [];

//Enabled Enum
//0 Hidden
//1 Show but not Enabled
//2 Fully Enabled 


//View Setup



function display (options) {
	
	dashDisplayOptions = options;


	window.hasRefreshed = {};

	$(".webIcons").html("");

	for (var i = 0; i < dashDisplayOptions.action.length; i++) {
		$(".webIcons").append(createActionIconDiv(dashDisplayOptions.action[i],i));
	};

	$("ul.nav.navbar-nav.side-nav").html("<li class=\"homeImage\"><img src=\""+dashDisplayOptions.coverImage+"\"></li>");

	for (var i = 0; i < dashDisplayOptions.pages.length; i++) {
		$("ul.nav.navbar-nav.side-nav").append(createPageIcons(dashDisplayOptions.pages[i],i));
		buildAndAddPageFrames(dashDisplayOptions.pages[i]);
	};


	reloadEnabledCache();
	refreshPageFrames();
	window.setInterval(function () {
		reloadEnabledCache();
		refreshPageFrames();
	},dashDisplayOptions.statusRefreshRate);

	switchByIndex (0);
}


function setSiteIframeURL (url) {
	$("iframe.siteFrame").removeClass("hidden");
	$("iframe.pageFrame").addClass("hidden");

	$("iframe.siteFrame").attr("src",url);

}

function createActionIconDiv (action,i) {
	var actionDiv = $("<div class=\"actionIcon col-md-4\"><img ></div>");

	$(actionDiv.find("img")).attr("src",action.icon);
	actionDiv.click(function (ev) {
		if(action.type == "page"){
			setSiteIframeURL(action.url);
			pageCarouselRunning = false;
			$(".pageTab .tabColor").stop();
			$(".pageTab .tabColor").css("width","0%");
		}
		if(action.type == "runFunction"){
			try {
			   action.func();
			}
			catch (e) {
				console.error(e);
			}
			
		}


	})
	return actionDiv;

}


function createPageIcons (site,i) {
	var siteDiv = $("<li class=\"screen pageTab\"><div class=\"tabColor\"></div><a><img /></i> <span>  </span></a></li>");

	$(siteDiv.find("img")).attr("src",site.icon);
	$(siteDiv.find("span")).html(site.text);
	siteDiv.click(function (ev) {
		switchToPage(site,i);
	})
	return siteDiv;

}

function setPageToActive(index,percent){

	allItems = $("li.screen");
	allItems.removeClass("active");
	if(index >= 0){
		var curr = $(allItems[index]);
		curr.addClass("active");
		curr.find("a").css("background", "linear-gradient(90deg, #080808 "+percent+"%, rgba(0, 0, 0, 0) "+percent+"%)");
	}
}


function buildAndAddPageFrames (site) {
	var newFrame = $("<iframe class=\"pageFrame\" src=\"" + site.url + "\" allowfullscreen=\"true\"></iframe>");

	if(site.refreshRate){
		window.setInterval(function () {
			
			newFrame.attr("src",newFrame.attr("src"));

		},site.refreshRate);
	}
	$("#main-content-home").append(newFrame);

}


//Setup Enabled states

function getEnabledValueFromCache (i) {
	
	var curr = pageEnabledCache[i]

	if(typeof curr == 'undefined'){
		curr = 2;
	}

	return curr;

}

function updatePageTabUI () {
	

	var tabs = $(".pageTab");
	for (var i = 0; i < pageEnabledCache.length; i++) {
		var currTab = $(tabs[i]);
		var tabState = getEnabledValueFromCache(i);

		currTab.removeClass('hidden');
		currTab.removeClass('disabled');
		currTab.removeClass('enabled');
		
		if(tabState == 0){
			currTab.addClass('hidden');
		}else if(tabState == 1){
			currTab.addClass('disabled');
		}else if(tabState == 2){
			currTab.addClass('enabled');
		}
	};
}


function reloadEnabledCache() {
	
	for (var i = 0; i < dashDisplayOptions.pages.length; i++) {
		var newVal = 2;
		if(dashDisplayOptions.pages[i].enabled){
			newVal = dashDisplayOptions.pages[i].enabled();
		}
		pageEnabledCache[i] = newVal;
	};

	updatePageTabUI();

}



//Control switching
function switchToPage (site,i) {
	pageCarouselRunning = true;
	$("iframe.siteFrame").addClass("hidden");
	$("iframe.siteFrame").attr("src","");
	$("iframe.pageFrame").addClass("hidden");
	$($("iframe.pageFrame")[i]).removeClass("hidden");

	if(site.onload){
		site.onload($($("iframe.pageFrame")[i]));
	}

	$(".pageTab .tabColor").stop();
	$(".pageTab .tabColor").css("width","0%");
	$($(".pageTab")[i]).find(".tabColor").css("width","100%");
	$($(".pageTab")[i]).find(".tabColor").animate({
	    width: 0,
	  }, site.duration, function() {

	  	var foundNextPage = false;
	  	var next = i;
	  	while(!foundNextPage){
	  		next = ( next + 1 ) % dashDisplayOptions.pages.length;
	  		foundNextPage = getEnabledValueFromCache(next) == 2;
	  	}
	  	
	  	if(pageCarouselRunning){
		    switchByIndex(next);
		}
	  });

}

function switchByIndex (i) {
	switchToPage(dashDisplayOptions.pages[i],i)
}

function refreshPageFrames () {

	var frames = $("iframe.pageFrame")

	for (var i = 0; i < dashDisplayOptions.pages.length; i++) {
		$(frames[i]).attr("src",dashDisplayOptions.pages[i].url);
	};
	window.hasRefreshed = {};

}



