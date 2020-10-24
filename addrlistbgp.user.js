// ==UserScript==
// @name         Address List BGP
// @namespace    https://laksa19.github.io/addrlistbgp
// @updateURL    https://raw.githubusercontent.com/laksa19/addrlistbgp/main/addrlistbgp.user.js
// @downloadURL  https://raw.githubusercontent.com/laksa19/addrlistbgp/main/addrlistbgp.user.js
// @version      0.7
// @description  Get Adress List from BGP
// @author       Laksamadi Guko
// @match        https://bgp.he.net/search*
// @match        https://bgp.he.net/dns/*
// @match        https://bgp.he.net/AS*
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    $("#content").prepend(`
<style>
.btnx{border: 1px solid #000066;height: 22px;margin-right: 8px;margin-bottom:8px;padding-left: 3px;padding-right: 3px;cursor: pointer;}

.tabresult {
    border: 1px solid #000066;
    padding: 15px;
    min-width: 742px;
    width: 742px;
margin-bottom:8px;
}
#tblresult{border: none; width:100%}
</style>

<div id='result' style='display:none' class='tabresult'>
<button class='btnx' id='cpscript'>Copy Script</button>
<button class='btnx' id='close'>Close</button>
<table id='tblresult'></table>
</div>`
);
    $(".search").append("<a href='#' id='getscript' style='color:#000066;'>Get Address List Script</a>");
    $("#getscript").click(function(){
        if(location.href.split("/")[3] == "dns"){
            getIPDNS();
        }else{
            getIP();
        }
    })


    $("#cpscript").click(function(){
        copyTable(document.getElementById("tblresult"));
    })
    $("#close").click(function(){;
        $("#result").hide()
        $("#tblresult").html("");
    })

    function getIPDNS(){
        $("#tblresult").html("");
        $("#tblresult").append("<tr><td>/ip firewall address-list</td></tr>")
        var gdns = $('#header').find('a')[2].innerHTML;
        var a =  $('#ipinfo').find("a");
        a.each(function() {
            var ip = ($(this).html());
            if(ip && ip.split(".").length == 4){
                $("#tblresult").append(`<tr><td>add list="`+gdns+`" address=`+ip+`</td></tr>`);
            }

        });
         $("#tblresult").append("<tr><td></td></tr>");
        $("#result").show();
    }


    function getIP(){
        $("#tblresult").html("");
        $("#tblresult").append("<tr><td>/ip firewall address-list</td></tr>")
        var tr = $('table tr').filter(function() {
            return  $(this).find("td");
        });

        tr.each(function() {
            var list ="";
            var ip = ($(this).find('a').html());
            if(location.href.split("/")[3].substr(0,2) == "AS"){
                list = $('#header').find('a')[2].innerHTML;
            }else{
                list = $('#search_search').val();
            }
            if(ip && ip.split(".").length == 4){
                $("#tblresult").append(`<tr><td>add list="`+list+`" address=`+ip+`</td></tr>`);
            }

        });
         $("#tblresult").append("<tr><td></td></tr>");
        $("#result").show();
    }

    function copyTable(el) {
        var body = document.body, range, sel;
        if (document.createRange && window.getSelection) {
            range = document.createRange();
            sel = window.getSelection();
            sel.removeAllRanges();
            try {
                range.selectNodeContents(el);
                sel.addRange(range);
            } catch (e) {
                range.selectNode(el);
                sel.addRange(range);
            }
        } else if (body.createTextRange) {
            range = body.createTextRange();
            range.moveToElementText(el);
            range.select();
        }
        document.execCommand("copy");
    }
    // Your code here...
})();

