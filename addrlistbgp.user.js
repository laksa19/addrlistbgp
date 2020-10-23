// ==UserScript==
// @name         Address List BGP
// @namespace    https://laksa19.github.io/addrlistbgp
// @version      0.1
// @description  Get Adress List from BGP
// @author       Laksamadi Guko
// @match        https://bgp.he.net/search?*
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
        getIP();
    })

    $("#cpscript").click(function(){
        copyTable(document.getElementById("tblresult"));
    })
    $("#close").click(function(){;
        $("#result").hide()
        $("#tblresult").html("");
    })


    function getIP(){
        $("#tblresult").html("");
        $("#tblresult").append("<tr><td>/ip firewall address-list</td></tr>")
        var tr = $('table tr').filter(function() {
            return  $(this).find("td");
        });

        tr.each(function() {
            var ip = ($(this).find('a').html());
            if(ip && ip.split(".").length == 4){
                $("#tblresult").append(`<tr><td>add list="`+$('#search_search').val()+`" address=`+ip+`</td></tr>`);
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


