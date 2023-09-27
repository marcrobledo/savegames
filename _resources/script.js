var balloon=document.createElement('div');
balloon.id='balloon';

function itemShow(evt){
	var liDim=this.getBoundingClientRect();
	var x=parseInt(liDim.x+window.scrollX);
	var y=parseInt(liDim.y+window.scrollY);

	balloon.innerHTML=this.itemInfo.status;
	if(this.itemInfo.more)
		balloon.innerHTML+='<hr/>'+this.itemInfo.more;
	balloon.style.display='block';
	
	var offsetX=parseInt((liDim.width-balloon.getBoundingClientRect().width)/2);


	balloon.style.top=parseInt(y+liDim.height-4)+'px';
	balloon.style.left=(x+offsetX)+'px';
	
}
function itemHide(evt){
	balloon.style.display='none';
}
function _clickCell(evt){
	if(/\.png/.test(this.children[1].href)){
		overlay.firstChild.src=this.children[1].href;
		overlay.style.display='flex';
	}else{
		this.children[1].click();
	}
}
function parseList(id){
	var items=document.getElementById(id).children;
	for(var i=0; i<items.length; i++){
		var li=items[i];

		li.itemInfo={
			status:null,
			more:false
		};


		if(li.children[0].tagName==='A' && /Download savegame for .*? \(.*?\)/.test(li.children[0].innerHTML)){			
			var matches=li.children[0].innerHTML.match(/^Download savegame for (.*?) \((.*?)\)$/);
			var title=matches[1];
			li.itemInfo.status=matches[2];
			
			
			if(li.children[1] && li.children[1].tagName==='DIV' && /more/.test(li.children[1].className))
				li.itemInfo.more=li.children[1].innerHTML;




			var a=li.children[0];
			a.innerHTML=title;
			if(/verified/.test(a.className)){
				var	check=document.createElement('i');
				check.className='check';
				a.appendChild(check);
			}





			var coverContainer=document.createElement('div');
			coverContainer.className='cover-container';
			var cover=new Image();
			cover.loading='lazy';
			coverContainer.appendChild(cover);
			li.insertBefore(coverContainer, a);
			cover.src=li.children[0].href.replace(/\.\w+$/,'.jpg');










			li.addEventListener('click', _clickCell, false);

			li.addEventListener('mouseenter', itemShow, false);
			li.addEventListener('mouseleave', itemHide, false);
			

			
		}else{
			console.error('invalid item: '+li.children[0].innerText);
		}
	}
}





var overlay=document.createElement('div');
overlay.id='overlay';
overlay.appendChild(document.createElement('img'));
overlay.addEventListener('click', function(evt){
	this.style.display='none';
}, false);

window.addEventListener('load', function(){
	document.body.appendChild(balloon);
	document.body.appendChild(overlay);
}, false);