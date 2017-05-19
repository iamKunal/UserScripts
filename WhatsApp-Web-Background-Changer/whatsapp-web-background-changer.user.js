// ==UserScript==
// @id           WhatsApp Web Background Changer
// @name         WhatsApp Web Background Changer
// @namespace    https://www.github.com/iamKunal
// @version      2.0
// @description  Change WhatsApp Web Chat Background
// @author       Kunal Gupta < kunal.gupta@myself.com >
// @icon         hhttps://github.com/iamKunal/UserScripts/raw/master/WhatsApp-Web-Background-Changer/assets/wa-bg.png
// @icon64       https://github.com/iamKunal/UserScripts/raw/master/WhatsApp-Web-Background-Changer/assets/wa-bg64.png
// @match        https://web.whatsapp.com/
// @grant        GM_setValue
// @grant        GM_getValue
// @updateURL
// ==/UserScript==

//The default Wallpaper to Load
var bgURLold="https://images2.alphacoders.com/577/thumb-1920-577906.jpg";


(function() {
    'use strict';
	getReady();
    document.onclick= function(event) {
    	updateWP();
    };
})();
function updateWP(){
    var chatName = document.querySelector('.active.chat .chat-body .chat-main .chat-title .emojitext.ellipsify').title;
	var bgImage = GM_getValue(chatName,bgURLold);
    document.getElementsByClassName("pane-chat-msgs pane-chat-body lastTabIndex")[0].setAttribute("style","background-position: center;background-image: url(" + bgImage+");");
}
function getReady(){
    var a=document.getElementsByTagName("body")[0];
    var node = document.createElement("button");
    node.setAttribute("id","wa-bg-change-button");
    node.style.display="block";
    node.style.padding="10px 10px 10px 10px";
    node.style.height="30px";
    node.style.background="#009688";
    node.style.position="absolute";
    node.style.right="100px";
    node.textContent="?";
    node.style.color="white";
    node.style.borderRadius = "40px";
    node.style.margin="18px";
    node.style.boxShadow="black 2px 2px 6px 0px";
    node.addEventListener('click',askBG,false);
    a.appendChild(node);
    var input = document.createElement("input");
    input.type="file";
    input.setAttribute("id","wa-bg-change-input");
    input.style.display="none";
    input.accept="image/*";
    input.onchange=function(){
	fr = new FileReader();
	fr.onload = function(){
		if(input.files!==null){
            var chatName = document.querySelector('.active.chat .chat-body .chat-main .chat-title .emojitext.ellipsify').title;
			GM_setValue(chatName,fr.result);
			document.body.click();
		}
	};
	if(input.files!==null){
	fr.readAsDataURL(input.files[0]);
	}
	};
    a.appendChild(input);
}
function askBG(){
	document.getElementById("wa-bg-change-input").click();
}
