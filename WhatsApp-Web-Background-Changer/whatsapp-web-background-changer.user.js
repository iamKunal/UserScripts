// ==UserScript==
// @id           WhatsApp Web Background Changer
// @name         WhatsApp Web Background Changer
// @namespace    https://www.github.com/iamKunal
// @version      3.2
// @description  Change WhatsApp Web Chat Background
// @author       Kunal Gupta < kunal.gupta@myself.com >
// @icon         https://github.com/iamKunal/UserScripts/raw/master/WhatsApp-Web-Background-Changer/assets/wa-bg.png
// @icon64       https://github.com/iamKunal/UserScripts/raw/master/WhatsApp-Web-Background-Changer/assets/wa-bg64.png
// @match        https://web.whatsapp.com/
// @grant        GM_setValue
// @grant        GM_getValue
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

//The default Wallpaper to Load
var bgURLold="https://github.com/iamKunal/UserScripts/raw/master/WhatsApp-Web-Background-Changer/assets/default_wallpaper.jpg";

//HTML for The Confirmation Dialog
var dialogHTML=`<div tabindex="-1" class="" style="opacity: 1;"><div tabindex="-1"><div class="backdrop"><div class="popup-container"><div class="popup" style="opacity: 1; transform: scaleX(1) scaleY(1);"><div class="popup-body">
<div class="popup-title">Change Chat Wallpaper</div>
<div class="popup-contents"><span class="emojitext" dir="auto">Which chat would you like to apply this wallpaper to?</span></div></div>
<div class="popup-controls">
<button class="btn-plain popup-controls-item">Cancel</button>
<button class="btn-plain btn-default popup-controls-item">All Chats</button>
<button class="btn-plain btn-default popup-controls-item">This Chat</button>
</div></div></div></div></div></div>`;


(function() {
    'use strict';
    var checkExist = setInterval(function() {
        if (!$('#startup').length) { //Check for Content to Load
            clearInterval(checkExist);
            getInputReady();
            document.onclick= function(event) {
                getMenuReady();
                updateWP();
            };
        }
    }, 100);


})();
function updateWP(){
    var chatName = document.querySelector('.active.chat .chat-body .chat-main .chat-title .emojitext.ellipsify').title;
    var bgImage = GM_getValue(chatName,GM_getValue("bgURL",bgURLold));
     document.getElementsByClassName("pane-chat-msgs pane-chat-body lastTabIndex")[0].setAttribute("style","background-position: center;background-image: url(" + bgImage+"); -webkit-transition: background-image 0.2s ease-in-out; transition: background-image 0.2s ease-in-out;");
}
function getInputReady(){
    var a=document.getElementsByTagName("body")[0];
    //node.addEventListener('click',askBG,false);
    var input = document.createElement("input");
    input.type="file";
    input.setAttribute("id","wa-bg-change-input");
    input.style.display="none";
    input.accept="image/*";
    input.onchange=function(){
        fr = new FileReader();
        fr.onload = function(){
            if(input.files!==null){
                getDialogInput(fr.result);
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
function getMenuReady(){
    var checkExist = setInterval(function() {
        if (document.querySelector("#main > header > div.pane-chat-controls > div > div:nth-child(3) > button")!==null) { //Check for Content to Load
            clearInterval(checkExist);
            if(document.querySelector("#main > header > div.pane-chat-controls > div > div.menu-item.active > span > div")!==null && document.querySelectorAll("#main > header > div.pane-chat-controls > div > div.menu-item.active > span > div > ul > li").length==5){
                lst=document.querySelector("#main > header > div.pane-chat-controls > div > div.menu-item.active > span > div > ul");
                ele=document.querySelector("#main > header > div.pane-chat-controls > div > div.menu-item.active > span > div > ul > li").cloneNode();
                ele_a=document.querySelector("#main > header > div.pane-chat-controls > div > div.menu-item.active > span > div > ul > li > a").cloneNode();
                var cb="Change Background";
                ele_a.title=cb;
                ele_a.textContent=cb;
                ele.addEventListener('click',askBG,false);
                ele.addEventListener('mouseover',(function(){ele.style.boxShadow="inset 20px 0px 20px 11px #f4f5f5";}));
                ele.addEventListener('mouseout',(function(){ele.style.boxShadow="";}));
                ele.appendChild(ele_a);
                ele.classList.add("wa-bg-change-button");
                ele.setAttribute("style",ele.getAttribute("style")+"background: url(https://github.com/iamKunal/UserScripts/raw/master/WhatsApp-Web-Background-Changer/assets/wa-bg.png); background-repeat: no-repeat; background-size: 25px; background-position-x: 90%; background-position-y: 5px;");
                lst.appendChild(ele);
            }
        }
    }, 100);
}
function getDialogInput(result){ // Uses the WhatsApp Web DialogUI
    var div = document.createElement("span");
    div.id="Custom-Alerter";
    div.innerHTML=dialogHTML;
    acd=document.querySelector("#app > div");
    acd.appendChild(div);
    var buttonsPath="#Custom-Alerter > div > div > div > div > div > div.popup-controls";

    var buttonsList=document.querySelector(buttonsPath).children;
    buttonsList[0].onclick=(function(){ //Cancel
        acd.lastChild.remove();
    });
    buttonsList[1].onclick=(function(){ //All Chats
        GM_setValue("bgURL",fr.result);
        document.body.click();
        acd.lastChild.remove();
    });
    buttonsList[2].onclick=(function(){ //This Chat
        var chatName = document.querySelector('.active.chat .chat-body .chat-main .chat-title .emojitext.ellipsify').title;
        GM_setValue(chatName,fr.result);
        document.body.click();
        acd.lastChild.remove();
    });
}
