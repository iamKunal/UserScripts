// ==UserScript==
// @id           WhatsApp Web Background Changer
// @name         WhatsApp Web Background Changer
// @namespace    https://www.github.com/iamKunal
// @version      1.0
// @description  Change WhatsApp Web Chat Background
// @author       Kunal Gupta < kunal.gupta@myself.com >
// @icon         https://avatars2.githubusercontent.com/u/12411673?v=1&s=32
// @icon64       https://avatars2.githubusercontent.com/u/12411673?v=1&s=64
// @match        https://web.whatsapp.com/
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

//Change the Background URL Here to change the Background Image
var bgURLold="https://images2.alphacoders.com/577/thumb-1920-577906.jpg";


(function() {
    'use strict';
	createButton();
    document.onclick= function(event) {
    	var bgImage = GM_getValue("bgURL",bgURLold);
        document.getElementsByClassName("pane-chat-msgs pane-chat-body lastTabIndex")[0].setAttribute("style","background-position: center;background-image: url(" + bgImage+");");
    };
})();

function createButton(){
    var a=document.getElementsByTagName("body")[0];
    var node = document.createElement("button");
    node.setAttribute("id","wa-bg-change-button");
    node.style.display="block";
    node.style.padding="10px 10px 10px 10px";
    node.style.height="35px";
    node.style.background="#009688";
    node.style.position="absolute";
    node.style.right="0px";
    node.textContent="Change Chat Background";
    node.style.color="white";
    node.addEventListener('click',askBG,false);
    a.appendChild(node);
}
function askBG(){
	var getBG = prompt("Enter Image URL : ",GM_getValue("bgURL",bgURLold));
	if(getBG!==null){
		GM_setValue("bgURL",getBG);
	}	
}
