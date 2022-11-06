

let tab1 = createMap("Test", "tables");
let tab2 = createMap("EnenyMap", "tablesEnemy");

let mainContainers = [];
let discoveryTD = { };

setDiscoveryTD("Test");

document.oncontextmenu = function () {return false};


document.body.addEventListener("click", function(e) {
  console.log(e.pageX, e.pageY);
})


function createMap(name, divName) {

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  const div = document.getElementById(divName);

  table.id = name;
  
  for (let y = 0; y < 10; y++) {
                
    const tr = document.createElement("tr");

    for (let x = 0; x < 10; x++) {
      const td = document.createElement("td");
      td.id = y.toString() + x.toString();
                      
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  table.appendChild(tbody);  
  div.appendChild(table);
}

function setDiscoveryTD(TABLE) {
  const table = document.getElementById(TABLE);
  const listTD = table.querySelectorAll("tbody > tr > td ");

  for(let TD of listTD) {
    discoveryTD[TD.id] = 0;
  }
}

function DiscoveryFromSHIP(ship,num) {
  for(let TD of ship.allTD) {
    discoveryTD[TD] = num;
  }
}
function DiscoveryFromMasTD(ship,num) {
  for(let TD of ship.allTD) {
    console.log(TD.id, "  ", ship.masTd);
    console.log(discoveryTD[TD.id]);
    if(discoveryTD[TD.id] === num) {
      
      return false;
    }
  }
}
function ClearDiscovery(ship, num) {
  for(let TD of ship.allTD) {
    discoveryTD[TD] = num;
  }
}



function createShip(Name, Size, nTab, Color = "red") {
  return {
    ObjShip: document.createElement('div'), 
    nameShip: Name,
    size: [Size, 1], 
    NameT: document.getElementById(nTab),
    color: Color,
    masTd: [],
    allTD: [],
  };
}

// выделение объекта
function chooseShipOn(event) {
  event.target.draggable = true;
  event.target.style.background = "rgb(255, 72, 31)";
}
function chooseShipOff(event) {
  event.target.draggable = false;
  event.target.style.background = "red";
}
// выделение объекта

function setShipOnDiv(ship, nameDiv) {

  const marginDiv = document.createElement('div');
  const mainDiv = document.getElementById(nameDiv);

  let shDiv = ship.ObjShip;  
      shDiv.id = ship.nameShip;

  FormStyle(ship);  
  
  marginDiv.style.margin = 10 + "px";
  marginDiv.appendChild(shDiv);
  mainDiv.appendChild(marginDiv);

  shDiv.onmouseover = function(event) {
    chooseShipOn(event);
    DragAndDrop(ship);
    rotateShip(ship);
  };
  //либо тут, либо как внутренняя

  shDiv.onmouseout = function(event) {
    chooseShipOff(event);
  };

}

function FormStyle(ship) {
  ship.ObjShip.style.cssText = `width: ${ship.size[0]*41 + "px"}; 
                                height: ${ship.size[1]*40 + "px"}; 
                                background: ${ship.color};`;
}

function GetDataObj(obj, anyShip) {

  let boolPosition = true;
  let n = 0, k = 0;
  //DiscoveryFromSHIP(anyShip, 0);
  anyShip.allTD = [];

  let objX = parseInt(obj.id[1]),
      objY = parseInt(obj.id[0]);

  if( (10 - objX ) < anyShip.size[0]  || 
      (10 - objY ) < anyShip.size[1]) {
    return !boolPosition;
  }
  
  //console.log(6 - ( objX || objY ) < anyShip.size[0]);

  //const Table = document.getElementById(obj.parentNode.offsetParent.id);
  //const listTd = Table.querySelectorAll("tbody > tr > td ");
 
  for(let TR = 0; TR < anyShip.size[1]+2; TR++) {

    let Y = (objY - 1 + TR).toString(); 
  
    for(let TD = 0; TD < anyShip.size[0]+2; TD++) {
      
      let X = (objX - 1 + TD).toString();
            
      if(document.getElementById(Y+X) === null) {
        continue;
      }   
     
      if( 0 <  (TR && TD) && (TR <= (anyShip.size[1])) 
                          && (TD  <= (anyShip.size[0])) )
      {
      anyShip.masTd[n++] = document.getElementById(Y+X);
      }

      anyShip.allTD[k++] = Y+X;
      //discoveryTD[Y+X] = 1;
      //document.getElementById(Y+X).dataset.notAvaiable = isThere;
    }
  }
  console.log(anyShip.allTD);

  console.log(discoveryTD);
  if(DiscoveryFromMasTD(anyShip, 1) === false) {
    
    return !boolPosition;
  }
  
  DiscoveryFromSHIP(anyShip, 1);
  console.log(discoveryTD);  
  
  
  mainContainers[anyShip.nameShip] = anyShip.masTd;

  return boolPosition;
}

 // Поворот
function rotateShip(ship) {
  
  let Selector = ship.ObjShip.parentNode;
  
  ship.ObjShip.oncontextmenu = function() 
  {
    ship.size.reverse();
    ClearDiscovery(ship, 0);
    let BPos = GetDataObj(Selector, ship);

    if(BPos === false || Selector.tagName === "DIV") {
        ship.size.reverse();
        return;
    }
    FormStyle(ship);

  };
  //return event.target.dataset.vertical = 1 - event.target.dataset.vertical;
}

// Поворот 
function DragAndDrop(ship) {
  const table = ship.NameT;
  const objSHIP = ship.ObjShip;

  const listTD = table.querySelectorAll("tbody > tr > td ");

  for(let td of listTD) {
    td.ondragover = alowDrop;
    td.ondrop = drop;
  }

  function alowDrop(event) {
    event.preventDefault();
  }

  //либо тут, либо как внешняя
  // objSHIP.onmouseout = function(event) {
  //   chooseShipOff(event);
  //   rotateShip(ship);
  // };

  objSHIP.ondragstart = drag;
  objSHIP.ondragend = drEnd;

  // тяга..
  function drag(event) {
    setTimeout(() => {
      event.target.classList.add("hide");
    },0);
    ClearDiscovery(ship, 0);
    event.dataTransfer.setData('id', objSHIP.id);
    console.log(event);    
  }

  function drEnd(e) {
    e.target.classList.remove("hide");
  }
  // тяга..

  // дропалка //


  function drop(event) {

    
    let itemId = event.dataTransfer.getData("id");
    let boatDIV = document.getElementById(itemId);
    
    let bPos = GetDataObj(event.target, ship);
    
    if(itemId == "" || !bPos)
      return;

    event.target.append(boatDIV);
    boatDIV.classList.add("SetD");
    //MainObj.getDataObj(event.target);

  }
  //rotateShip(ship);
}



let ship_1 = createShip("boat_1", 3, "Test");
let ship_2 = createShip("boat_2", 2, "Test");
let ship_3 = createShip("boat_3", 2,"Test");
let ship_4 = createShip("boat_4", 2, "Test");
let ship_5 = createShip("boat_5", 1, "Test");
let ship_6 = createShip("boat_6", 1, "Test");
let ship_7 = createShip("boat_7", 1, "Test");
let ship_8 = createShip("boat_8", 3, "Test");

let ship_10 = createShip("boat_10", 4, "Test");
let ship_11 = createShip("boat_11", 1, "Test");

setShipOnDiv(ship_2, "genDiv");
setShipOnDiv(ship_3, "genDiv");
setShipOnDiv(ship_4, "genDiv");
setShipOnDiv(ship_5, "genDiv");
setShipOnDiv(ship_6, "genDiv");
setShipOnDiv(ship_11, "genDiv");
setShipOnDiv(ship_1, "genDiv");
setShipOnDiv(ship_8, "genDiv");
setShipOnDiv(ship_10, "genDiv");
setShipOnDiv(ship_7, "genDiv");

//console.log(discoveryTD);