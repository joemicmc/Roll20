on("chat:message", function(msg) {
  if(msg.type == "api" && msg.content.indexOf("!r ") !== -1) {
    var args = msg.content.replace("!r ", "").split(' ');
    var range = parseFloat(args[0]);
    var height = parseFloat(args[1]);
    var floor = 0;
    
    if (height > range){
        floor = "Out of Range"
    } else{
        floor = (((range*range)-(height*height))**0.5).toFixed(1);
    }
    
    sendChat(msg.who, floor + " (Range = " + range + ", Height = " + height + ")");
  }
});
