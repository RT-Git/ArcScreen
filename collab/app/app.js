(function () {
    "use strict";
    return {
        initialize: function () {
            console.log("Collaborate");
            if (page_type == "ticket") {
                var requesterName = domHelper.ticket.getTicketInfo().helpdesk_ticket.requester_name;
                jQuery(this.$container).find('#apptext').text("Share your screen with " + requesterName);
            }
            else if (page_type == "contact") {
                var agentName = domHelper.contact.getContactInfo().user.name;
                jQuery(this.$container).find('#apptext').text("Hello " + agentName);
            }
       
            document.getElementById("myBtn").addEventListener("click", function () {
                var http = new XMLHttpRequest();
                var url = "https://api.screenleap.com/v2/screen-shares?accountid=28041996";
                http.open("POST", url, true);
                //Send the proper header information along with the request
                http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                http.setRequestHeader("authtoken", "xZvrYNapgm");
                http.onreadystatechange = function () { //Call a function when the state changes.
                    if (http.readyState == 4 && http.status == 200) {
                        var t = JSON.parse(http.responseText);
                        document.getElementById('sharing-link').innerHTML = t['viewerUrl'];
                    }
                };
                http.send();
            });
           
            document.getElementById("start").addEventListener("click", function () {
                window.open("https://chrome.google.com/webstore/detail/screenleap/hpcipbhehomfgjbgnajdhiahhdeeffbg?utm_source=chrome-ntp-icon");
            });
        }
    };
})();
/*
{%comment%}

## Help: Using iparam (​installation parameters) in code

iparam: The ​settings that you want your users to configure when installing the
app.

iparam definition is made in config/iparam_en.yml file. To use the defined
iparam in code, use Liquid notation like:

- {{iparam.username}}
- {{iparam.country}}

{%endcomment%}
*/