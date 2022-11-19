// ==UserScript==
// @name         BetterThemis
// @version      0.1
// @description  make themis prettier
// @author       GGORG
// @match        https://themis.ii.uni.wroc.pl/*
// @icon         https://themis.ii.uni.wroc.pl/gfx/logo.png
// @grant        GM_addStyle
// ==/UserScript==

function runIfSelectorParent(parent, selector, func){
  const res = parent.querySelector(selector);
  if(res){
    return func(res);
  }
  else{
    return false;
  }
}

function runIfSelector(selector, func){
  return runIfSelectorParent(document, selector, func);
}

if(typeof resultbox !== "undefined"){
  resultbox.show = new Proxy(resultbox.show, {
    apply(target, thisArg, argumentsList){
      const ret = Reflect.apply(target, thisArg, argumentsList);

      setTimeout(() => {
        for(const test of document.querySelectorAll("#resultbox > .resultbox-test-box > .resultbox-tests > tbody > tr")){
          runIfSelectorParent(test, "td:nth-child(2) > img", (el) => {
            let newSrc = el.src;
            const srcSplit = el.src.split("/");
            switch (srcSplit[srcSplit.length - 1]){
              case "testac.png":
                newSrc = "https://github.com/GGORG0/better-themis/blob/master/icons/problemAccepted.png?raw=true";
                break;
              case "testtle.png":
                newSrc = "https://github.com/GGORG0/better-themis/blob/master/icons/problemTimeLimit.png?raw=true";
                break;
              case "testwa.png":
                newSrc = "https://github.com/GGORG0/better-themis/blob/master/icons/problemWrongAnswer.png?raw=true";
                break;
              case "testsegv.png":
                newSrc = "https://github.com/GGORG0/better-themis/blob/master/icons/problemSegFault.png?raw=true";
                break;
              default:
                newSrc = el.src;
                break;
            }
            if(newSrc !== el.src){
              el.style.width = el.style.height = "2em";
            }
            el.src = newSrc;
          });
        }
      }, 1000);
      return ret;
    }
  });
}


if(typeof status_box !== "undefined"){
  status_box.pager.refresh = new Proxy(status_box.pager.refresh, {
    apply(target, thisArg, argumentsList){
      const ret = Reflect.apply(target, thisArg, argumentsList);

      setTimeout(() => {
        for(const submission of document.querySelectorAll("#content > #sidepanel > #problem-status-box > #problem-status-content > #problem-status-table > tbody > tr")){
          const statusBall = submission.querySelector(".problem-status-verdict > div");
          const statusIcon = document.createElement("img");
          statusIcon.style.width = statusIcon.style.height = "3em";
          switch (statusBall.className){
            case "status-ac": {
              statusIcon.src = "https://github.com/GGORG0/better-themis/blob/master/icons/problemAccepted.png?raw=true";
              break;
            }
            case "status-run": {
              statusIcon.src = "https://github.com/GGORG0/better-themis/blob/master/icons/problemRunning.png?raw=true";
              break;
            }
            case "status-wait": {
              statusIcon.src = "https://github.com/GGORG0/better-themis/blob/master/icons/problemWaiting.png?raw=true";
              break;
            }
            case "status-fail": {
              switch(submission.querySelector(".problem-status-res").textContent){
                case "compilation error": {
                  statusIcon.src = "https://github.com/GGORG0/better-themis/blob/master/icons/problemCompilationError.png?raw=true";
                  break;
                }
                case "misclick": {
                  statusIcon.src = "https://github.com/GGORG0/better-themis/blob/master/icons/problemMissclick.png?raw=true";
                  break;
                }
                case "seg. fault": {
                  statusIcon.src = "https://github.com/GGORG0/better-themis/blob/master/icons/problemSegFault.png?raw=true";
                  break;
                }
                case "time limit exceeded": {
                  statusIcon.src = "https://github.com/GGORG0/better-themis/blob/master/icons/problemTimeLimit.png?raw=true";
                  break;
                }
              }
              break;
            }
            case "status-unkn": {
              statusIcon.src = "https://github.com/GGORG0/better-themis/blob/master/icons/problemUnknown.png?raw=true";
              break;
            }
            default: {
              statusIcon.src = "https://github.com/GGORG0/better-themis/blob/master/icons/problemUnknown.png?raw=true";
              break;
            }
          }
          statusBall.appendChild(statusIcon);
        }
      }, 1000);
      return ret;
    }
  });
}

(function() {
  'use strict';

  console.log("BetterThemis v0.1");
  const initBox = document.createElement("div");
  initBox.textContent = "BetterThemis injecting...";
  document.querySelector("#top").appendChild(initBox);

  document.querySelector("#bottom > em:nth-child(3)").textContent += " + BetterThemis";

  GM_addStyle(`
  body {
    background-color: #5D4037;
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
    color: #BDBDBD;
  }

  #top {
    background-image: none;
    background-position-x: 0px;
    background-color: #3E2723;
    width: 100%;
    margin: 0;
    padding: 1.5em;
    position: sticky;
    top: 0;
    box-sizing: border-box;
    min-height: revert;
    display: flex;
    flex-direction: row;
    justify-content: center;
    box-shadow: 0px 0px 10px 10px #3E2723;
    z-index: 100;
  }
  #top > #title {
    background-image: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2em;
    width: revert;
    height: revert;
    margin-right: auto;
  }
  #top > #title > #title-icon {
    display: inline-block;
    width: 3rem;
    height: 3rem;
  }
  #top > #title > #title-text {
    font-size: 1.5rem;
  }
  #top > div.section-info {
    background: none;
    font-size: 1rem;
    width: auto;
    height: auto;
    padding: 1em;
  }
  #top > div.section-info > a.section-info {
    font-size: 1.3rem;
  }
  #top > #user-controls {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    gap: .1em;
  }
  .vertical-separator {
    width: .1em;
    height: 70%;
    background: #000;
    border-radius: 1em;
  }
  #top > #user-controls > form > input.submit {
    font-size: 1rem;
    margin: 0;
  }
  #top > #user-controls > form > input.submit:hover {
    text-decoration: underline;
  }

  #content {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: ${document.querySelector("#content > h2#problem") || document.querySelector("#content > #ranks-container") || document.querySelector("#content > #status-table") ? "column" : "row"};
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    padding: 1em;;
  }
  #content > #index {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2em;
    width: 100%;
    margin: 0;
    padding: 2em;
    position: relative;
    box-sizing: border-box;
  }
  #content > #index > #site-news {
    background: #4E342E;
    box-shadow: 0px 0px 10px 10px #4E342E;
    border: none;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    padding: 2em;
    transition: opacity .5s, translate .5s;
    width: 90%;
    box-sizing: border-box;
  }
  #content > #index > #sections > #section-arch-toggle {
    font-size: 1rem;
  }
  .better-button {
    background: #4E342E;
    box-sizing: border-box;
    border: #424242 2px solid;
    border-radius: 1em;
    padding: .7em;
    color: white;
    cursor: pointer;
  }

  #content > #index > #sections .section {
    background-color: #4E342E;
    border-radius: 2em;
    box-sizing: border-box;
    padding: 1em;
    margin-top: 2em;
    margin-bottom: 2em;
    min-height: 5em;
    cursor: pointer;
  }
  #content > #index > #sections .section > .section-type > img {
    width: 3em;
    height: 3em;
  }

  #content > #secind-left > #problems > tbody > .problems-sort > td {
    color: #78909C;
  }
  #content > #secind-left > #problems > tbody > .problems-sort > td > span {
    color: #90A4AE;
  }

  #content > #secind-left > #problems > tbody > tr > .problem-icon > .problem-done {
    background: none;
    width: 3em;
    height: 3em;
    padding: 0.3em;
  }
  #content > #secind-left > #problems > tbody > tr > .problem-icon > .problem-done > img {
    width: 3em;
    height: 3em;
  }
  #content > #secind-left > #problems > tbody > tr.problem-past > td {
    color: #78909C;
  }

  #content > #secind-right {
    margin-bottom: auto;
    margin-top: 4em;
    min-width: 10em;
  }

  #content > #secind-right > .secind-tab {
    margin: 0;
    padding: 0.5em;
    border: none;
  }
  #content > #secind-right > .secind-tab.secind-tab-red {
    background: linear-gradient(to right, #E65100, #BF360C);
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
  }
  #content > #secind-right > .secind-tab.secind-tab-red > .secind-news {
    color: white;
    text-align: center;
  }
  #content > #secind-right > .secind-tab.secind-tab-blue {
    background: linear-gradient(to right, #283593, #1A237E);
    border: none;
  }

  #content {
    font-size: 1rem;
    position: relative;
  }
  #content > h2#problem {
    background: none;
    font-size: 2rem;
    margin: .5em;
  }
  #content > h2#problem > #problem-nav {
    margin-left: 1em;
  }
  #content > h2#problem > #problem-nav > div {
    background: none;
    width: 1em;
    height: 1em;
    margin: .1em;
    display: inline-block;
  }
  #content > h2#problem > #problem-nav > div > img {
    width: 1em;
    height: 1em;
  }
  #content > pre {
    background-color: #263238;
    padding: 1em;
    border: 2px solid black;
    border-radius: 1em;
    cursor: pointer;
  }

  #content > #sidepanel {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    margin: 3em;
  }
  #content > #sidepanel > * {
    background: #3E2723;
    border-radius: 2em;
    border: none;
    padding: 2em;
  }
  #content > #sidepanel > div > .boxhdr {
    background: none;
  }
  #content > #sidepanel > div > .boxhdr > .boxscroll {
    background: #BF360C;
    border-radius: .5em;
  }
  #content > #sidepanel > #problem-status-box > #problem-status-content > #problem-status-table > tbody > tr > .problem-status-verdict > div {
    background: none;
    width: 3em;
    height: 3em;
  }

  #resultbox {
    background: #3E2723;
    border-radius: 2em;
  }
  #resultbox > .resultbox-progress > * {
    border-radius: 1em;
  }
  #resultbox > .resultbox-progress > .resultbox-progac {
    background: #43A047;
  }
  #resultbox > .resultbox-progress > .resultbox-progfail {
    background: #E53935;
  }
  `);

  {
    const barTitle = document.querySelector("#top > #title");

    {
      const barIcon = document.createElement("img");
      barIcon.id = "title-icon";
      barIcon.src = "https://github.com/GGORG0/better-themis/blob/master/icons/themisLogo.png?raw=true";
      barTitle.appendChild(barIcon);
    }

    {
      const barTitleText = document.createElement("span");
      barTitleText.id = "title-text";
      barTitleText.textContent = "themis";
      barTitle.appendChild(barTitleText);
    }

    runIfSelector("#top > #login-ok", () => {
      const username = document.querySelector("#top > #login-ok > #userid").textContent;
      document.querySelector("#top > #login-ok").remove();
      const userControls = document.createElement("div");
      userControls.id = "user-controls";

      {
        const usernameBox = document.createElement("a");
        usernameBox.href = "account";
        usernameBox.textContent = username;
        userControls.appendChild(usernameBox);
      }

      {
        const userLogoutForm = document.createElement("form");
        userLogoutForm.style.display = "inline";
        userLogoutForm.action = "logout";
        userLogoutForm.method = "post";

        {
          const userLogoutSubmit = document.createElement("input");
          userLogoutSubmit.className = "submit";
          userLogoutSubmit.type = "submit";
          userLogoutSubmit.value = "Logout";
          userLogoutForm.appendChild(userLogoutSubmit);
        }

        userControls.appendChild(userLogoutForm);
      }

      document.querySelector("#top").appendChild(userControls);
    });
    runIfSelector("#top > #login-no", (el) => {
      el.remove();
    });
  }

  runIfSelector("#content > #index > #site-news", (newsPanel) => {
    newsPanel.style.translate = "0 -100%";
    newsPanel.style.opacity = 0;

    {
      const openNewsButton = document.createElement("button");
      openNewsButton.textContent = "Open site news";
      openNewsButton.className = "better-button";
      openNewsButton.style.marginRight = "auto";
      openNewsButton.addEventListener("click", () => {
        newsPanel.style.translate = "0 0%";
        newsPanel.style.opacity = 1;
      });
      document.querySelector("#content > #index").insertBefore(openNewsButton, newsPanel);
    }
    {
      const closeNewsButton = document.createElement("button");
      closeNewsButton.textContent = "↑";
      closeNewsButton.className = "better-button";
      closeNewsButton.style.display = "inline-block";
      closeNewsButton.style.fontSize = "1rem";
      closeNewsButton.style.margin = "1em";
      const newsTitle = document.querySelector("#content > #index > #site-news > h1");
      newsTitle.style.display = "inline";
      closeNewsButton.addEventListener("click", () => {
        newsPanel.style.translate = "0 -100%";
        newsPanel.style.opacity = 0;
      });
      newsPanel.insertBefore(closeNewsButton, newsTitle);
      newsPanel.insertBefore(document.createElement("div"), document.querySelector("#content > #index > #site-news > div.site-news-date"));
    }
  });

  for(const section of document.querySelectorAll("#content > #index > #sections .section")){
    const sectionStatus = section.querySelector("div.section-type");
    sectionStatus.textContent = "";
    const statusIcon = document.createElement("img");
    statusIcon.src = sectionStatus.classList.contains("section-signup")
      ? "https://github.com/GGORG0/better-themis/blob/master/icons/groupPasswordRequired.png?raw=true"
      : "https://github.com/GGORG0/better-themis/blob/master/icons/groupRegistered.png?raw=true";
    sectionStatus.appendChild(statusIcon);

    section.addEventListener("click", () => {
      window.location = section.querySelector("a.section-enter").href;
    });
  }

  runIfSelector("#content > h2#generic", (s) => {
    s.remove();
  });

  for(const checkmark of document.querySelectorAll("#content > #secind-left > #problems > tbody > tr > .problem-icon > .problem-done")){
    const checkmarkImage = document.createElement("img");
    checkmarkImage.src = "https://github.com/GGORG0/better-themis/blob/master/icons/problemDone.png?raw=true";
    checkmark.appendChild(checkmarkImage);
  }

  runIfSelector("#content > #secind-left > #problems > tbody > .problems-sort > td > #sort-by-problemtime", (s) => {
    s.click();
  });

  for(const problemControl of document.querySelectorAll("#content > h2#problem > #problem-nav > div")){
    const buttonImage = document.createElement("img");
    switch (problemControl.id){
      case "problem-status": {
        buttonImage.src = "https://github.com/GGORG0/better-themis/blob/master/icons/submissions.png?raw=true";
        break;
      }
      case "problem-best": {
        buttonImage.src = "https://github.com/GGORG0/better-themis/blob/master/icons/ranks.png?raw=true";
        break;
      }
      case "problem-submit": {
        buttonImage.src = "https://github.com/GGORG0/better-themis/blob/master/icons/submit.png?raw=true";
        break;
      }
    }
    problemControl.appendChild(buttonImage);
  }

  for(const codeblock of document.querySelectorAll("#content > pre")){
    codeblock.title = "Click to copy";
    codeblock.addEventListener("click", () => {
      navigator.clipboard.writeText(codeblock.textContent);
    });
  }

  runIfSelector("#content > #sidepanel > #problem-submit-box > #submitform > #problem-submitsrc", (el) => {
    if(!navigator.clipboard.readText) return;
    const pasteButton = document.createElement("button");
    pasteButton.textContent = "Paste from clipboard";
    pasteButton.addEventListener("click", async (ev) => {
      ev.preventDefault();
      el.value = navigator.clipboard.readText();
    });
    el.parentElement.insertBefore(pasteButton, el);
  });

  initBox.remove();
  console.log("√ BetterThemis injected without errors!");
})();