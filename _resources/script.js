var covers=[];
function checkSwitch(el){
	return /on/.test(el.className)
}
function switchButton(el){
	if(checkSwitch(el))
		el.className='switch off';
	else
		el.className='switch on';

	var newClassName='';
	if(!checkSwitch(document.getElementById('switch-theme')))
		newClassName='light';
	if(!checkSwitch(document.getElementById('switch-grid')))
		newClassName+=' list';
	document.body.className=newClassName;
}

function showTooltip(){
	document.getElementById('tooltip').innerHTML=this.tooltipText;

	var rect=this.getBoundingClientRect();
	document.getElementById('tooltip').style.display='block';
	document.getElementById('tooltip').style.top=parseInt(rect.top+rect.height+window.scrollY+10)+'px';

	var leftPos=parseInt(rect.left);
	if(leftPos<0)
		leftPos=0;
	document.getElementById('tooltip').style.left=leftPos+'px';
	
	
}
function hideTooltip(){
	document.getElementById('tooltip').style.display='none';
}

var SYSTEMS=['Game Boy', 'Game Boy Color', 'Game Boy Advance','Neo Geo Pocket','Nintendo DS','Nintendo 3DS','NES','Super Nintendo','Nintendo 64','Nintendo Gamecube','Nintendo Wii','Nintendo Wii U','Sega Master System','Sega Megadrive','Sega Saturn','Sega Dreamcast','Sony PlayStation']
window.addEventListener('load', function(){
	var lis=document.querySelectorAll('ol.game-list li');
	for(var i=0; i<lis.length; i++){
		var divInfo=lis[i].querySelector('div.info');
		if(divInfo){
			lis[i].tooltipText=divInfo.innerHTML;
			lis[i].addEventListener('mouseover', showTooltip, false);
			lis[i].addEventListener('mouseout', hideTooltip, false);
		}

		var a=lis[i].children[0];
		var originalTitle=a.innerHTML;

		var matches=a.href.match(/(\w+\/\w+)\.\w+$/);
		var coverContainer=document.createElement('div');
		coverContainer.className='cover-container';
		var img=new Image();
		img.dataset.src='./_resources/'+matches[1]+'.jpg';
		img.src='./_resources/loading.gif';
		covers.push(img);
		coverContainer.appendChild(img);
		a.insertBefore(coverContainer, a.firstChild);

		var percent=lis[i].children[1].innerHTML.match(/^(\d+(\.\d+)?)%$/);
		if(percent){
			var	check=document.createElement('i');
			check.className='sprite check';
			check.title=percent[1]+'%';
			percent=parseInt(percent[1]);
			if(percent>=100)
				check.className+=' gold';
			a.appendChild(check);
		}

	}

	var systems=document.querySelectorAll('h3');
	for(var i=0;i<systems.length;i++){
		var system=systems[i];
		var index=SYSTEMS.indexOf(system.innerHTML);
		if(index>=0){
			system.title=system.innerHTML;
			system.innerHTML='<span class="system-logo" style="background-position:0px -'+(24*index)+'px"></span>';
		}
	}



	processScroll();
	window.addEventListener('scroll', processScroll, false);
}, false);



/* lazy loading */function elementInViewport(e){
	var r=e.getBoundingClientRect()
	return (r.top>=0 && r.left>=0 && r.top<=(window.innerHeight || document.documentElement.clientHeight))
}
function loadImage(e,fn){
	var img=new Image();
	var src=e.getAttribute('data-src');
	img.onload=function(){
		if(!!e.parent)
			e.parent.replaceChild(img, e)
		else
			e.src = src;

		fn? fn():null;
	}
	img.src=src;
}
function processScroll(){
	for(var i=0;i<covers.length;i++)
		if(elementInViewport(covers[i]))
			loadImage(covers[i], function(){covers.splice(i,i)});
}