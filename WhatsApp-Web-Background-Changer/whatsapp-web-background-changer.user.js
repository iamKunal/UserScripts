// ==UserScript==
// @id           WhatsApp Web Background Changer
// @name         WhatsApp Web Background Changer
// @namespace    https://www.github.com/iamKunal
// @version      3.1.0
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
var bgURLold="https://images2.alphacoders.com/577/thumb-1920-577906.jpg";

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
    document.getElementsByClassName("pane-chat-msgs pane-chat-body lastTabIndex")[0].setAttribute("style","background-position: center;background-image: url(" + bgImage+");");
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
                var thisChat = null;
                thisChat = confirm("Press OK for only this Chat and Cancel for All Chats");
                if(thisChat){
                    var chatName = document.querySelector('.active.chat .chat-body .chat-main .chat-title .emojitext.ellipsify').title;
                    GM_setValue(chatName,fr.result);
                }
                else{
                    GM_setValue("bgURL",fr.result);
                }
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
function getMenuReady(){
    var checkExist = setInterval(function() {
        if (document.querySelector("#main > header > div.pane-chat-controls > div > div:nth-child(3) > button")!==null) { //Check for Content to Load
            clearInterval(checkExist);
            console.log("Menu Present");
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


