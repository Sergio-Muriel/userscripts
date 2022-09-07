// ==UserScript==
// @name         JIRA lib
// @namespace    napali.boardriders
// @version      22.5.3.0
// @description  let's ticket better
// @author       Benjamin Delichere
// @match        https://jira.boardriders.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=boardriders.com
// @grant        none
// @copyright    Benjamin Delichere
// @license      X11 (MIT)
// ==/UserScript==

(function(){

    /**
    This function adds buttons that will appear on the "Create Issue" modal window that
    can be used to insert a "feature" or "bug" template into the description field.
    */
    function setupDescriptionTemplateButtons() {
        var createIssuePageOpen = $("H2").text() == 'Create Issue' || $('#jira-dialog2__heading').text() == 'Create Issue';
        var ticketDescription = $('#description-wiki-edit');
        var btnFeatureExists = $('#btnFeature').length > 0;

        if (createIssuePageOpen && !btnFeatureExists) {
            ticketDescription.find('.aui-navgroup .aui-nav')
                .append("<li style='margin-left: .3rem;border-left: 1px solid #dfe1e5;'></li>")
                .append("<li><button id='btnFeature' class='aui-button aui-button-link' style='margin-left:.3rem;'>add feature template</button></li>")
                .append("<li><button id='btnBug' class='aui-button aui-button-link' style='margin-left:.6rem;'>add bug template</button></li>");

            $('#btnFeature').on('click', function (e) {
                e.preventDefault();
                ticketDescription.find('textarea').val(`{panel:title=GENERAL REQUIREMENTS}
TBD
{panel}
{panel:title=TECHNICAL DESIGN}
The design that the developer is going to implement should be here.
DEV to fill in.
{panel}
{panel:title=METADATA / CONTENT / DEPLOYMENT}
Any metadata needed for this ticket should be defined here.
Deployment instructions should be here too.
DEV to fill in.
{panel}
`);
                return false;
            });

            $('#btnBug').on('click', function (e) {
                 e.preventDefault();
                 ticketDescription.find('textarea').val(`{panel:title=ISSUE}
TBD
{panel}
{panel:title=ANALYSIS}
TBD
{panel}
{panel:title=RESOLUTION}
TBD
{panel}`);
                 return false;
             });
         }
    }

    var realST = window.setTimeout
    window.setTimeout = function(fn,delay) {
        setupDescriptionTemplateButtons();
        $('time.livestamp').each(function(){$(this).text($(this).parent()[0].title);});
        return realST(fn,delay);
    };
})();
