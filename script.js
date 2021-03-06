var results = [
  ["tory", 9.1],
  ["labour", 14.1],
  ["libdem", 20.3],
  ["green", 12.1],
  ["brexit", 31.6],
  ["ukip", 3.3],
  ["change", 3.4],
  ["other", 6.1]
];

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  calculate();
}

function get_ids(divname) {
  var children = [].slice.call(document.getElementById(divname).getElementsByTagName('*'), 0);
  var elements = new Array(children.length);
  for (var i = 0; i < children.length; i++) {
    var name = children[i].getAttribute("id");    
    elements[i]=name;
  }
  return elements;
}

function calculate() {
  var remain_vote = 0;
  var leave_vote = 0;
  var uncat_ids = get_ids('uncat');
  var remain_ids = get_ids('remain');
  var leave_ids = get_ids('leave');
  for(i = 0; i < results.length; i++) {
    for(j = 0; j < remain_ids.length; j++) {
      if(results[i][0] == remain_ids[j]) {
        remain_vote += results[i][1];
      }
    }
    for(j = 0; j < leave_ids.length; j++) {
      if(results[i][0] == leave_ids[j]) {
        leave_vote += results[i][1];
      }
    }
  }
  var total = leave_vote + remain_vote;
  var remain_perc = remain_vote / total * 100;
  var leave_perc = leave_vote / total * 100;
  remain_perc = Math.round((remain_perc - 0.005) * 100) / 100;
  leave_perc = Math.round((leave_perc - 0.005) * 100) / 100;
  document.getElementById("remain_perc").innerHTML = remain_perc;
  document.getElementById("leave_perc").innerHTML = leave_perc;
  if(total > 0) {
    document.getElementById("remain_bar").style.width =  remain_perc + "%";
    document.getElementById("leave_bar").style.width = leave_perc + "%";
    document.getElementById("remain_perc").innerHTML = remain_perc;
    document.getElementById("leave_perc").innerHTML = leave_perc;
  } else {
    document.getElementById("remain_bar").style.width =  "0%";
    document.getElementById("leave_bar").style.width = "0%";
    document.getElementById("remain_perc").innerHTML = "0";
    document.getElementById("leave_perc").innerHTML = "0";
  }
}

window.onload = function() {
  calculate()
};