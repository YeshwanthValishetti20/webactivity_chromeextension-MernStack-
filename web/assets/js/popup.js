//---------------------------------------------->
//SECTION constants
let host;
//---------------------------------------------->

//---------------------------------------------->
//SECTION basic function
const getDate = () => {
  let d = new Date();
  let day = d.getDate();
  let month = d.getMonth();
  let year = d.getFullYear();
  return {
    day: `${day}-${month}-${year}`,
    month: `${month}-${year}`,
  };
};
const secondsToSSMMHHArray = (seconds) => [
  String(seconds % 60).padStart(2, "0"),
  String(Math.floor((seconds % 3600) / 60)).padStart(2, "0"),
  String(Math.floor(seconds / 3600)).padStart(2, "0"),
];
const display = (time) => {
  const [sSS, sMM, sHH] = secondsToSSMMHHArray(time);
  select(".second").innerHTML = sSS;
  select(".minute").innerHTML = sMM;
  select(".hour").innerHTML = sHH;
};
const select = (query) => document.querySelector(query);
//---------------------------------------------->

//---------------------------------------------->
//SECTION chrome storage functions
const read = (key, process) =>
  chrome.storage.local.get(host, (value) => process(value[key]));
//---------------------------------------------->

//---------------------------------------------->
//SECTION: animation
let lastTimeMainRun = -1000;
const main = (ctime) => {
  if (ctime - lastTimeMainRun >= 1000) {
    read(host, (data) => {
      const day = getDate().day;
      if (data.limit.type === "Ignore") return;
      display(data.perDay[day]);
      if (data.limit.type === "Time-limit") {
        if (data.perDay[day] >= data.limit.score * 60)
          return select(".time-used").setAttribute("limit", "true");
      }
      if (data.limit.type === "block")
        return select(".time-used").setAttribute("limit", "true");
      select(".time-used").setAttribute("limit", "false");
    });
    lastTimeMainRun = ctime;
  }
  window.requestAnimationFrame(main);
};
//---------------------------------------------->

//---------------------------------------------->
//SECTION message
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(
    tabs[0].id,
    { action: "getDomain" },
    function (response) {
      if (response != undefined) {
        host = response.domain;
        window.requestAnimationFrame(main);
      } else select(".time-used").innerHTML = "";
    }
  );
});
//---------------------------------------------->

//---------------------------------------------->
//SECTION event listener
select("#statisticsButton").onclick = () =>
  chrome.tabs.create({ url: chrome.runtime.getURL("statistics.html") });
//---------------------------------------------->
