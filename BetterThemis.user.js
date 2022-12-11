// ==UserScript==
// @name         BetterThemis
// @version      0.10
// @updateURL    https://github.com/GGORG0/better-themis/raw/master/BetterThemis.user.js
// @downloadURL  https://github.com/GGORG0/better-themis/raw/master/BetterThemis.user.js
// @homepage     https://github.com/GGORG0/better-themis
// @description  make themis prettier
// @author       GGORG
// @match        https://themis.ii.uni.wroc.pl/*
// @icon         https://github.com/GGORG0/better-themis/blob/master/icons/themisLogo.png?raw=true
// @grant        GM_addStyle
// ==/UserScript==
const version = "0.10";

// https://gist.github.com/GGORG0/985000398f08d50382366f91bf19d5b9#file-material-colors-categorized-json
const colorPalette = {red:{50:"#FFEBEE",100:"#FFCDD2",200:"#EF9A9A",300:"#E57373",400:"#EF5350",500:"#F44336",600:"#E53935",700:"#D32F2F",800:"#C62828",900:"#B71C1C",A100:"#FF8A80",A200:"#FF5252",A400:"#FF1744",A700:"#D50000"},pink:{50:"#FCE4EC",100:"#F8BBD0",200:"#F48FB1",300:"#F06292",400:"#EC407A",500:"#E91E63",600:"#D81B60",700:"#C2185B",800:"#AD1457",900:"#880E4F",A100:"#FF80AB",A200:"#FF4081",A400:"#F50057",A700:"#C51162"},purple:{50:"#F3E5F5",100:"#E1BEE7",200:"#CE93D8",300:"#BA68C8",400:"#AB47BC",500:"#9C27B0",600:"#8E24AA",700:"#7B1FA2",800:"#6A1B9A",900:"#4A148C",A100:"#EA80FC",A200:"#E040FB",A400:"#D500F9",A700:"#AA00FF"},deepPurple:{50:"#EDE7F6",100:"#D1C4E9",200:"#B39DDB",300:"#9575CD",400:"#7E57C2",500:"#673AB7",600:"#5E35B1",700:"#512DA8",800:"#4527A0",900:"#311B92",A100:"#B388FF",A200:"#7C4DFF",A400:"#651FFF",A700:"#6200EA"},indigo:{50:"#E8EAF6",100:"#C5CAE9",200:"#9FA8DA",300:"#7986CB",400:"#5C6BC0",500:"#3F51B5",600:"#3949AB",700:"#303F9F",800:"#283593",900:"#1A237E",A100:"#8C9EFF",A200:"#536DFE",A400:"#3D5AFE",A700:"#304FFE"},blue:{50:"#E3F2FD",100:"#BBDEFB",200:"#90CAF9",300:"#64B5F6",400:"#42A5F5",500:"#2196F3",600:"#1E88E5",700:"#1976D2",800:"#1565C0",900:"#0D47A1",A100:"#82B1FF",A200:"#448AFF",A400:"#2979FF",A700:"#2962FF"},lightBlue:{50:"#E1F5FE",100:"#B3E5FC",200:"#81D4FA",300:"#4FC3F7",400:"#29B6F6",500:"#03A9F4",600:"#039BE5",700:"#0288D1",800:"#0277BD",900:"#01579B",A100:"#80D8FF",A200:"#40C4FF",A400:"#00B0FF",A700:"#0091EA"},cyan:{50:"#E0F7FA",100:"#B2EBF2",200:"#80DEEA",300:"#4DD0E1",400:"#26C6DA",500:"#00BCD4",600:"#00ACC1",700:"#0097A7",800:"#00838F",900:"#006064",A100:"#84FFFF",A200:"#18FFFF",A400:"#00E5FF",A700:"#00B8D4"},teal:{50:"#E0F2F1",100:"#B2DFDB",200:"#80CBC4",300:"#4DB6AC",400:"#26A69A",500:"#009688",600:"#00897B",700:"#00796B",800:"#00695C",900:"#004D40",A100:"#A7FFEB",A200:"#64FFDA",A400:"#1DE9B6",A700:"#00BFA5"},green:{50:"#E8F5E9",100:"#C8E6C9",200:"#A5D6A7",300:"#81C784",400:"#66BB6A",500:"#4CAF50",600:"#43A047",700:"#388E3C",800:"#2E7D32",900:"#1B5E20",A100:"#B9F6CA",A200:"#69F0AE",A400:"#00E676",A700:"#00C853"},lightGreen:{50:"#F1F8E9",100:"#DCEDC8",200:"#C5E1A5",300:"#AED581",400:"#9CCC65",500:"#8BC34A",600:"#7CB342",700:"#689F38",800:"#558B2F",900:"#33691E",A100:"#CCFF90",A200:"#B2FF59",A400:"#76FF03",A700:"#64DD17"},lime:{50:"#F9FBE7",100:"#F0F4C3",200:"#E6EE9C",300:"#DCE775",400:"#D4E157",500:"#CDDC39",600:"#C0CA33",700:"#AFB42B",800:"#9E9D24",900:"#827717",A100:"#F4FF81",A200:"#EEFF41",A400:"#C6FF00",A700:"#AEEA00"},yellow:{50:"#FFFDE7",100:"#FFF9C4",200:"#FFF59D",300:"#FFF176",400:"#FFEE58",500:"#FFEB3B",600:"#FDD835",700:"#FBC02D",800:"#F9A825",900:"#F57F17",A100:"#FFFF8D",A200:"#FFFF00",A400:"#FFEA00",A700:"#FFD600"},amber:{50:"#FFF8E1",100:"#FFECB3",200:"#FFE082",300:"#FFD54F",400:"#FFCA28",500:"#FFC107",600:"#FFB300",700:"#FFA000",800:"#FF8F00",900:"#FF6F00",A100:"#FFE57F",A200:"#FFD740",A400:"#FFC400",A700:"#FFAB00"},orange:{50:"#FFF3E0",100:"#FFE0B2",200:"#FFCC80",300:"#FFB74D",400:"#FFA726",500:"#FF9800",600:"#FB8C00",700:"#F57C00",800:"#EF6C00",900:"#E65100",A100:"#FFD180",A200:"#FFAB40",A400:"#FF9100",A700:"#FF6D00"},deepOrange:{50:"#FBE9E7",100:"#FFCCBC",200:"#FFAB91",300:"#FF8A65",400:"#FF7043",500:"#FF5722",600:"#F4511E",700:"#E64A19",800:"#D84315",900:"#BF360C",A100:"#FF9E80",A200:"#FF6E40",A400:"#FF3D00",A700:"#DD2C00"},brown:{50:"#EFEBE9",100:"#D7CCC8",200:"#BCAAA4",300:"#A1887F",400:"#8D6E63",500:"#795548",600:"#6D4C41",700:"#5D4037",800:"#4E342E",900:"#3E2723"},grey:{50:"#FAFAFA",100:"#F5F5F5",200:"#EEEEEE",300:"#E0E0E0",400:"#BDBDBD",500:"#9E9E9E",600:"#757575",700:"#616161",800:"#424242",900:"#212121"},blueGrey:{50:"#ECEFF1",100:"#CFD8DC",200:"#B0BEC5",300:"#90A4AE",400:"#78909C",500:"#607D8B",600:"#546E7A",700:"#455A64",800:"#37474F",900:"#263238"}};
const palette = colorPalette.blueGrey; // background
const fgPalette = colorPalette.grey; // foreground (text)

function col(num){ return palette[num]; }
function fgCol(num){ return fgPalette[num]; }

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
  if(resultbox.box === null){
    // https://themis.ii.uni.wroc.pl/resultbox.js : 108
    resultbox.box = $("<div>", {id: "resultbox"}).appendTo(document.body)
  }
  resultbox.box.html = new Proxy(resultbox.box.html, {
    apply(target, thisArg, argumentsList){
      const ret = Reflect.apply(target, thisArg, argumentsList);

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
            el.style.width = "2em";
          }
          el.src = newSrc;
        });
      }
      return ret;
    }
  });
}


if(typeof status_box !== "undefined"){
  status_box.pager._refresh = new Proxy(status_box.pager._refresh, {
    apply(target, thisArg, argumentsList){
      const ret = Reflect.apply(target, thisArg, argumentsList);

      for(const submission of document.querySelectorAll("#content > #sidepanel > #problem-status-box > #problem-status-content > #problem-status-table > tbody > tr")){
        const statusBall = submission.querySelector(".problem-status-verdict > div");
        const statusIcon = document.createElement("img");
        statusIcon.style.width = "3em";
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
              case "wrong answer": {
                statusIcon.src = "https://github.com/GGORG0/better-themis/blob/master/icons/problemWrongAnswer.png?raw=true";
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
      return ret;
    }
  });
}

(function() {
  'use strict';

  console.log("BetterThemis v" + version);
  const initBox = document.createElement("div");
  initBox.textContent = "BetterThemis injecting...";
  document.querySelector("#top").appendChild(initBox);

  document.querySelector("#bottom > em:nth-child(3)").textContent += " + BetterThemis";

  GM_addStyle(`
  body {
    background-color: ${col(700)};
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
    color: ${fgCol(400)};
  }

  #top {
    background-image: none;
    background-position-x: 0px;
    background-color: ${col(900)};
    width: 100%;
    margin: 0;
    margin-bottom: 1em;
    padding: 1.5em;
    position: sticky;
    top: 0;
    box-sizing: border-box;
    min-height: revert;
    display: flex;
    flex-direction: row;
    justify-content: center;
    box-shadow: 0px 0px 10px 10px ${col(900)};
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
    ${ document.querySelector("#content > h2#problem") ? "width: auto; max-width: 70em;" : "width: 100%;" }
    box-sizing: border-box;
    ${ document.querySelector("#content > h2#problem") ? "display: block;" : `
    display: flex;
    flex-direction: ${document.querySelector("#content > h2#problem") || document.querySelector("#content > #ranks-container") || document.querySelector("#content > #status-table") ? "column" : "row"};
    justify-content: center;
    align-items: center;
    `}
    background: none;
    border: none;
    padding: 1em;
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
    background: ${col(800)};
    box-shadow: 0px 0px 10px 10px ${col(800)};
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
    background: ${col(800)};
    box-sizing: border-box;
    border: ${fgCol(800)} 2px solid;
    border-radius: 1em;
    padding: .7em;
    color: white;
    cursor: pointer;
  }

  #content > #index > #sections .section {
    background-color: ${col(800)};
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
  }

  body > div.signup,
  body > div.lock {
    background: none;
    padding: 0;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2em;
    gap: 1em;
  }
  body > div.signup > form {
    display: inline-block;
  }

  #content > #secind-left > #problems > tbody > .problems-sort > td {
    color: ${fgCol(400)};
  }
  #content > #secind-left > #problems > tbody > .problems-sort > td > span {
    color: ${fgCol(300)};
  }

  #content > #secind-left > #problems > tbody > tr > .problem-icon > .problem-done {
    background: none;
    width: 3em;
    height: 3em;
    padding-right: 0.3em;
  }
  #content > #secind-left > #problems > tbody > tr > .problem-icon > .problem-done > img {
    width: 3em;
  }
  #content > #secind-left > #problems > tbody > tr.problem-past > td {
    color: ${fgCol(500)};
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
    background: linear-gradient(to right, ${colorPalette.orange[900]}, ${colorPalette.deepOrange[900]});
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
  }
  #content > #secind-right > .secind-tab.secind-tab-red > .secind-news {
    color: white;
    text-align: center;
  }
  #content > #secind-right > .secind-tab.secind-tab-blue {
    background: linear-gradient(to right, ${colorPalette.indigo[800]}, ${colorPalette.indigo[900]});
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
    padding: 0;
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
  }
  #content > pre {
    background-color: ${fgCol(900)};
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
    margin-top: 5em;
    margin-right: 1em;
  }
  #content > #sidepanel > div {
    background: ${col(900)};
    border-radius: 2em;
    border: none;
    padding: 2em;
  }
  #content > #sidepanel > div > .boxhdr {
    background: none;
  }
  #content > #sidepanel > div > .boxhdr > .boxscroll {
    background: ${colorPalette.deepOrange[900]};
    border-radius: .5em;
  }
  #content > #sidepanel > #problem-status-box > #problem-status-content > #problem-status-table > tbody > tr > .problem-status-verdict > div {
    background: none;
    width: 3em;
  }

  #resultbox {
    background: ${col(900)};
    border-radius: 2em;
  }
  #resultbox > .resultbox-progress > * {
    border-radius: 1em;
  }
  #resultbox > .resultbox-progress > .resultbox-progac {
    background: ${colorPalette.green[600]};
  }
  #resultbox > .resultbox-progress > .resultbox-progfail {
    background: ${colorPalette.red[600]};
  }
  #resultbox > .resultbox-progress > .resultbox-progrun {
    background: ${colorPalette.yellow[600]};
  }
  #resultbox > .resultbox-progress > .resultbox-progwait {
    background: ${colorPalette.blue[600]};
  }
  #resultbox > .resultbox-progress > .resultbox-progunkn {
    background: ${colorPalette.purple[600]};
  }

  #ranks-anchor {
    font-size: .8rem;
  }
  #ranks-anchor > #ranks-corner > .ranks-subtable > tbody > tr > .ranks-corner > #ranks-fullscreen {
    background: url(https://github.com/GGORG0/better-themis/blob/master/icons/maximize.png?raw=true);
    background-size: 3em;
    width: 3em;
    height: 3em;
  }

  #content > div.status-pager,
  #content > div.status-pager > a.status-pager-prev,
  #content > div.status-pager > div.status-pager-prev2,
  #content > div.status-pager > a.status-pager-next,
  #content > div.status-pager > div.status-pager-next2,
  #content > div.status-pager > span.status-pager-current {
    background: none;
    border: none;
  }

  #content > #status-table > tbody > tr > td:nth-child(1),
  #content > #status-table > tbody > tr > td:nth-child(1) > div {
    background: none;
    width: 3em;
    height: 3em;
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

  for(const s of [document.querySelector("body > div.signup"), document.querySelector("body > div.lock")]) {
    if(!s) continue;
    const keyIcon = document.createElement("img");
    keyIcon.src = "https://github.com/GGORG0/better-themis/blob/master/icons/groupPasswordRequired.png?raw=true";
    keyIcon.style.width = "5em";
    s.appendChild(keyIcon);
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

  for(const problemList of document.querySelectorAll("#content > #secind-right > a.secind-tab-blue")){
    const listStats = problemList.querySelector(".list-stats");
    const listSolved = listStats.querySelector(".list-solved");
    const listTotal = listStats.querySelector(".list-total");
    if(listSolved.textContent === listTotal.textContent){
      problemList.style.color = colorPalette.green[500];
    }
  }

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

  runIfSelector("#content > h2#stats", (s) => {
    s.remove();
  });

  {
    const backHandler = (el) => { el.textContent = "<"; };
    runIfSelector("#content > div.status-pager > div.status-pager-prev2", backHandler);
    runIfSelector("#content > div.status-pager > a.status-pager-prev", backHandler);
    const forwardHandler = (el) => { el.textContent = ">"; };
    runIfSelector("#content > div.status-pager > div.status-pager-next2", forwardHandler);
    runIfSelector("#content > div.status-pager > a.status-pager-next", forwardHandler);
  }

  for(const submission of document.querySelectorAll("#content > #status-table > tbody > tr")){
    if(submission.querySelector("td") === null) continue;
    const statusBall = submission.querySelector("td:nth-child(1) > div");
    const statusIcon = document.createElement("img");
    statusIcon.style.width = "3em";
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
        switch(submission.querySelector("td:nth-child(6)").textContent){
          case "compilation error": {
            statusIcon.src = "https://github.com/GGORG0/better-themis/blob/master/icons/problemCompilationError.png?raw=true";
            break;
          }
          case "wrong answer": {
            statusIcon.src = "https://github.com/GGORG0/better-themis/blob/master/icons/problemWrongAnswer.png?raw=true";
            break;
          }
          case "example test failed": {
            statusIcon.src = "https://github.com/GGORG0/better-themis/blob/master/icons/problemMissclick.png?raw=true";
            break;
          }
          case "segmentation fault": {
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

  initBox.remove();
  console.log("√ BetterThemis injected without errors!");
})();