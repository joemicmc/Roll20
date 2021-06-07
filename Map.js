on("chat:message", function(msg) {
    if(msg.type == "api" && msg.content.indexOf("!resetBoard") !== -1) {
        resetBoard();
    }
  
    if(msg.type == "api" && msg.content.indexOf("!resetFighters") !== -1) {
        resetFighters();
    }
    
    if(msg.type == "api" && msg.content.indexOf("!randomMap") !== -1) {
        var mapNumber = Math.floor(Math.random() * 5);
        setMap(msg.who, mapNumber);
    }
    
    if(msg.type == "api" && msg.content.indexOf("!setMap ") !== -1) {
        var mapNumber = msg.content.replace("!setMap ", "")
        setMap(msg.who, mapNumber);
    }
    
    if(msg.type == "api" && msg.content.indexOf("!lock") !== -1) {
        lockTerrain();
    }
  
    if(msg.type == "api" && msg.content.indexOf("!unlock") !== -1) {
        unlockTerrain();
    }
});

resetBoard = function(){
    var objects = findObjs({ 
        _type: "graphic",
        layer: "objects"
    });
    
    objects.forEach(object => {
        object.remove();
    });
}

resetFighters = function(){
    var fighters = findObjs({ 
        _type: "graphic",
        layer: "objects"
    });
    
    fighters.forEach(fighter => {
        var name = fighter.get("name");
        if (!name.includes("Ruined City ") &&
            !name.includes("Defiled Ruins ") &&
            !name.includes("Catacombs ") &&
            !name.includes("Token ")){
                fighter.set("status_dead", false);
                fighter.set("status_stopwatch", false);
        }
    });
}

setMap = function(player, mapNumber){
    var maps = findObjs({ 
        _type: "graphic",
        layer: "map"
    });
    
    maps.forEach(map => {
        switch(mapNumber){
            case 0:
            case "0":
                map.set("imgsrc", "https://s3.amazonaws.com/files.d20.io/images/209576962/gE3udJWTrYQCcIioBmXygA/thumb.jpg?1616239457");
                sendMapNotification(player, "Cinder Warrens");
                break;
            case 1:
            case "1":
                map.set("imgsrc", "https://s3.amazonaws.com/files.d20.io/images/209576961/dUrqdcklZOvjvU2qtpiRXg/thumb.jpg?1616239457");
                sendMapNotification(player, "Halls of Velorum");
                break;
            case 2:
            case "2":
                map.set("imgsrc", "https://s3.amazonaws.com/files.d20.io/images/209576963/FqZQ9zuH6jkJQOcnlmpGeQ/thumb.jpg?1616239457");
                sendMapNotification(player, "Infernal Forgefloor");
                break;
            case 3:
            case "3":
                map.set("imgsrc", "https://s3.amazonaws.com/files.d20.io/images/209576966/wdpzl2gnADrYDsR34zH48Q/thumb.jpg?1616239458");
                sendMapNotification(player, "Lair of the Sphiranx");
                break;
            case 4:
            case "4":
                map.set("imgsrc", "https://s3.amazonaws.com/files.d20.io/images/209576959/INbC43YGbr9lknv_0nVoqA/thumb.jpg?1616239457");
                sendMapNotification(player, "Temple of Nagendra");
                break;
            case 5:
            case "5":
                map.set("imgsrc", "https://s3.amazonaws.com/files.d20.io/images/209576958/cwCbcnOt0Bh-cptjZ6EEXw/thumb.jpg?1616239457");
                sendMapNotification(player, "Defiled Ruins")
                break;
        }
    });
}

sendMapNotification = function(player, mapName){
    sendChat(player, "Set " + mapName + " Map");
}

lockTerrain = function(){
    updateTerrain(function(terrain) {
        terrain.set("represents", "");
        terrain.set("controlledby", "");
        toBack(terrain);
    });
}

unlockTerrain = function(){
    updateTerrain(function(terrain) {
        terrain.set("represents", "");
        terrain.set("controlledby", "all");
    });
}

updateTerrain = function(func){
    var terrains = findObjs({ 
        _type: "graphic",
        layer: "objects"
    });
    
    terrains.forEach(terrain => {
        var name = terrain.get("name");
        if (name.includes("Ruined City ") ||
            name.includes("Defiled Ruins ") ||
            name.includes("Catacombs ")){
                func(terrain);
        }
    });
};
