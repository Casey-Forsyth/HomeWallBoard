
var options = {
	coverImage:"./images/home.jpg",
	statusRefreshRate: 10*60*1000,

	pages:[
		
		
		{
			"icon":"./icons/map.png",
			"text":"Family Map",
			"url":"https://www.google.com/maps",
			"duration":0.5 * 60 * 1000,
			"onload":function (iframe) {
				if(!window.hasRefreshed['map']){
					window.hasRefreshed['map'] = true;
					iframe.attr("src",iframe.attr("src"));
				}
			}
		},
		{
			"icon":"./icons/weather.png",
			"text":"Weather",
			"url":"http://www.meteoblue.com/en/weather/widget/three/toronto_canada_6167865?geoloc=fixed&nocurrent=0&noforecast=0&days=7&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&layout=image",
			"duration":0.5 * 60 * 1000,
		},
		{
			"icon":"./icons/trello.png",
			"text":"Trello",
			"url":"https://trello.com/b/g9mdhdzg/trello-test-board",
			"duration":0.5 * 60 * 1000
		},
		{
			"icon":"./icons/iss.png",
			"text":"Earth",
			"url":"https://www.youtube.com/embed/ddFvjfvPnqk?autoplay=true",
			"duration":0.5 * 60 * 1000,
			"enabled":function () {
				return 2; //return Math.floor(Math.random()*3);
			},
			"onload":function (iframe) {
				if(!window.hasRefreshed['iss']){
					window.hasRefreshed['iss'] = true;
					iframe.attr("src",iframe.attr("src"));
				}
			}		
		},
		
		
	],

	action:[
		{
			"type":"runFunction",
			"func":function () {
				alert("Turn On Lights");
			},
			"icon":"http://m.blog.hu/ko/kozgazdasagivizualizacio/image/innovacio-icon.png",
		},
		{
			"type":"runFunction",
			"func":function () {
				alert("Turn Off Lights");
			},
			"icon":"https://cdn4.iconfinder.com/data/icons/ui-controls-miscellaneous/32/interface-controls-light-bulb-off-128.png",
		},
		{
			"type":"runFunction",
			"func":function () {
				alert("Test1");
			},
			"icon":"https://lh3.googleusercontent.com/gguhHHtgGQrpdd0eaSD6K9rmutp-_kJMwECgRc_jzoHtGNwotRve0F_rQoYkO4yuxQ=w300",
		},
		{
			"type":"page",
			"icon":"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Food_Network.svg/135px-Food_Network.svg.png",
			"url":"http://www.foodnetwork.ca/recipes/"
		},
		{
			"type":"page",
			"icon":"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTI0B46dN1_8EYxoW2YxPIy143xHKCameIEW05lMWhEJirIEgQDgIabeJs",
			"url":"https://youtube.com/"
		},
		{
			"type":"page",
			"icon":"https://lh3.googleusercontent.com/gdBHEk-u3YRDtuCU3iDTQ52nZd1t4GPmldYaT26Jh6EhXgp1mlhQiuLFl4eXDAXzDig5=w300",
			"url":"https://play.google.com/music/listen#/home"
		}

	]
}



$(function () {

	display(options);

})