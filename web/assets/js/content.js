//---------------------------------------------->
//SECTION const
const host = location.host;
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
const increment = (x) => (x !== undefined ? x + 1 : 1);
const select = (query) => document.querySelector(query);
//---------------------------------------------->

//---------------------------------------------->
//SECTION chrome storage functions
const read = (key, process) =>
  chrome.storage.local.get(host, (value) => process(value[key]));
const write = (key, value, callback = () => {}) =>
  chrome.storage.local.set({ [key]: value }, callback);
//---------------------------------------------->

//---------------------------------------------->
//SECTION message
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getDomain")
    sendResponse({ domain: window.location.host });
});
//---------------------------------------------->

//---------------------------------------------->
//SECTION: animation
let lastTimeMainRun = 0;

const main = (ctime) => {
  if (ctime - lastTimeMainRun >= 1000) {
    read(host, (data) => {
      const { day, month } = getDate();
      if (data.limit.type === "Ignore") return;
      if (data.limit.type === "Time-limit") {
        if (increment(data.perDay[day]) - 1 >= data.limit.score * 60) {
          select("html").style.display = "none";
          return 0;
        }
      }
      if (data.limit.type === "block") {
        select("html").style.display = "none";
        return 0;
      }
      select("html").style.display = "";
      data.perDay[day] = increment(data.perDay[day]);
      data.perMonth[month] = increment(data.perMonth[month]);
      data.all++;
      write(host, data);
    });
    lastTimeMainRun = ctime;
  }
  window.requestAnimationFrame(main);
};
//---------------------------------------------->

//---------------------------------------------->
//SECTION init
read(host, (data) => {
  if (data === undefined)
    write(
      host,
      {
        perDay: {},
        perMonth: {},
        all: 0,
        limit: {
          type: "None",
          score: "",
        },
      },
      () => window.requestAnimationFrame(main)
    );
  else window.requestAnimationFrame(main);
});
//---------------------------------------------->
