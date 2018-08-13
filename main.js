var stundenPlan = {
  days:[{},{
    name: "Montag",
    subjects: [{
      teacher: "D. Stücklin",
      room: "WST1-1-114",
      from: "08:35",
      to: "10:05",
      theme: "Geschichte"
    },
    {
      teacher: "Ch. Müller",
      room: "WST1-1-114",
      from: "10:25",
      to: "11:55",
      theme: "Marketing"
    },
    {
      teacher: "B. Hofer",
      room: "WST1-1-114",
      from: "12:45",
      to: "14:15",
      theme: "Informatik"
    },
    {
      teacher: "R. Siedler",
      room: "WST1-1-114",
      from: "14:40",
      to: "16:10",
      theme: "Wirtschaft"
    }]
  },{
  name: "Dienstag",
  subjects: [{
    teacher: "S. Dunkel",
    room: "WST1-1-401",
    from: "08:35",
    to: "10:05",
    theme: "Multimedia Konzept"
  },
  {
    teacher: "R. Siedler",
    room: "WST1-1-401",
    from: "10:25",
    to: "12:50",
    theme: "Rechnungswesen"
  },
  {
    teacher: "T. Vulpi",
    room: "WST1-1-114",
    from: "13:40",
    to: "14:25",
    theme: "Deutsch"
  },
  {
    teacher: "R. Schamberger",
    room: "WST1-1-114",
    from: "14:30",
    to: "15:15",
    theme: "Englisch"
  },
  {
    teacher: "O. Genzoni",
    room: "WST11 H3",
    from: "15:30",
    to: "17:00",
    theme: "Sport"
  },
  {
    teacher: "R. Siedler & R. Schamberger",
    room: "WST1-1-114",
    from: "17:05",
    to: "17:50",
    theme: "IdPA"
  }]
  }
  ]
}

var $from = document.querySelector("header.from");
var $theme = document.querySelector("h2.theme");
var $room = document.querySelector("span.room");
var $teacher = document.querySelector("span.teacher");
var $to = document.querySelector("footer.to");
var $to = document.querySelector("footer.to");
var $next = document.querySelector(".next");
var $before = document.querySelector(".before");
var $btn = document.querySelector(".btn.show-before");
var beforeSubs = Array();

function nextSubject(nsd,nsh,nsmin) {
  var time = Array(Number(nsd),Number(nsh),Number(nsmin));
  var rVal = Array();
  if (time[0] < 1 || time[0] > 2) {
    return false;
  } else {
    var sTime = Array();
    for (var i = 0; i < stundenPlan.days[time[0]].subjects.length; i++) {
      sTime = stundenPlan.days[time[0]].subjects[i].from.split(":");
      if (Number(sTime[0]) > time[1] ) {
        rVal.push(stundenPlan.days[time[0]].subjects[i]);
      }else if (Number(sTime[0]) == time[1] && Number(sTime[1]) >= time[2]) {
        rVal.push(stundenPlan.days[time[0]].subjects[i]);
      }else {
        beforeSubs.push(stundenPlan.days[time[0]].subjects[i])
      }
    }
    return rVal;
  }
  return false;
}

var d = new Date();
var nSub = nextSubject(d.getDay(),d.getHours(),d.getMinutes());
// var nSub = nextSubject(1,13,55);

fillBox(nSub[0]);

function fillBox(pSub) {
  if (pSub) {
     $from.innerHTML = pSub.from;
     $to.innerHTML = pSub.to;
     $theme.innerHTML = pSub.theme;
     $room.innerHTML = pSub.room;
     $teacher.innerHTML = pSub.teacher;
  }else {
    alert("du hast keine Schule (mehr)");
  }
}
console.log(beforeSubs);
$btn.addEventListener("click", function(){
  console.log(beforeSubs);
  generateList(beforeSubs, $before);
});

generateList(nSub, $next, 1);
function generateList(pSubs,elm,sPoint = 0) {
  var dump = "";
  for (var i = sPoint; i < pSubs.length; i++) {
    dump += '<section class="card">      <header class="from">' + pSubs[i].from + '</header>      <main class="card-content">        <h2 class="theme">' + pSubs[i].theme + '</h2>        <p>          <span class="room">' + pSubs[i].room + '</span>          <span class="teacher">' + pSubs[i].teacher + '</span>        </p>      </main>      <footer class="to">' + pSubs[i].to + '</footer>    </section>';
    // dump += nSub[i].from+" - "+nSub[i].to+" "+nSub[i].theme+"<br>";
  }
  elm.innerHTML = dump;
}
