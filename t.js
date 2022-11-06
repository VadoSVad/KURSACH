const Tab = document.getElementById("Test");
const DivTest = document.getElementById('ex');
const DIV = document.getElementById("genDiv");
const tabTd = document.querySelectorAll('td');



Tab.oncontextmenu = function () {return false};

function setDiv(nameDiv, nameTd) {

  const div = document.getElementById(nameDiv);
  const td = document.getElementById(nameTd);
  div.classList.add("SetD");
  
  td.appendChild(div);

}

function DragInDrop(nameTd, nameDiv) {

    const tD = document.getElementById(nameTd);
    const ship = document.getElementById(nameDiv);
    console.log(ship);

    tD.ondragover = alowDrop;
  
    function alowDrop(event) {
      event.preventDefault();
    }

    ship.ondragstart = drag;

    function drag(event) {
      //ship.style.zIndex = 0;

      setTimeout(() => {
        event.target.classList.add("hide");
      },0);
      event.dataTransfer.setData('id', event.target.id);
    }

    ship.ondragend = drEnd;

    function drEnd(e) {
        //e.target.classList.remove("hide");
    }  

    tD.ondrop = drop;
    
    function drop(event) {

      event.target.classList.remove("hide");
      let itemId = event.dataTransfer.getData("id");
      event.target.append(document.getElementById(itemId));
    }
}

document.body.addEventListener("click", function(e) {
  console.log(e.pageX, e.pageY);
})


class SHIP extends Object
{
  div = document.createElement("div");
  TDofBoat = document.createElement('td');
  posTDofShip = [];
  size = [];
  state = true;

  nameTable = null;
  id = null;
  color = null;
  

  constructor(Name, Size, nTab, Color = "red") {
    super();
    this.id = this.div.id = Name;
    this.size = [Size, 1];
    this.color = this.div.style.background = Color;
    this.nameTable = nTab;
  }

  createShip() {
    
    let dIv = this.div;
    
    if(this.state) {
      dIv.style.width = 101 * this.size[0] + "px";
      dIv.style.height = 100 * this.size[1] + "px";
    }
    else {
      dIv.style.height = 101 * this.size[0] + "px";
      dIv.style.width = 100 * this.size[1] + "px";
    }
  }

  setShip(objTab) {

    this.createShip();

    const marginShip = document.createElement('div');
    marginShip.style.margin = 10 + "px";
    marginShip.appendChild(this.div);
    objTab.appendChild(marginShip);

  }

  getDataObj(obj) {

    this.posTDofShip.length = 0;
   
    //const Table = document.getElementById(obj.parentNode.offsetParent.id);
    //const listTd = Table.querySelectorAll("tbody > tr > td ");
    //console.log(listTd);

    let objX = parseInt(obj.id[1]),
        objY = parseInt(obj.id[0]);

    console.log(objX, objY);

    if(9 - ( objX || objY ) < this.size[0]-1)
      return;
      
    for(let TR = 0; TR < this.size[1]; TR++) {

      let Y = ( objY + TR ).toString(); 
  
      for(let TD = 0; TD < this.size[0]; TD++) {
        let X = ( objX + TD ).toString();
        this.posTDofShip[TD] = document.getElementById(Y+X);  
      }
    }
  }

 
//   DragAndDrop() {
    
//     // let ObjClassFfSHIP = this;
    
//     const table = document.getElementById(this.nameTable);
//     const listTD = table.querySelectorAll("tbody > tr > td ");



//     for(let td of listTD) {
//       td.ondragover = alowDrop;
      
//       td.ondrop = drop;

//       while(drop == true)
//         if(td.childNode !== null)
//           this.posTDofShip = td;

//       // td.addEventListener("mouseup", drop(this));


//     }

//     function alowDrop(event) {
//       event.preventDefault();
//     }

//     // выделение объекта ////
//     this.div.onmouseover = chooseShipOn;
    
//     function chooseShipOn(event) {
//       event.target.draggable = true;
//       event.target.style.background = "rgb(255, 72, 31)";
//     }

//     this.div.onmouseout = chooseShipOff;
//     function chooseShipOff(event) {
//       event.target.style.background = "red";
//     }
//     // выделение объекта ////

//     this.div.ondragstart = drag;
//     this.div.ondragend = drEnd;

//     // тяга..

//     function drag(event) {
//       setTimeout(() => {
//         event.target.classList.add("hide");
//       },0);
//       event.dataTransfer.setData('id', this.id);
      
//     }

//     function drEnd(e) {
//       e.target.classList.remove("hide");

//     }
//     // тяга..

//     // дропалка //

//     function drop(event) {

//       let itemId = event.dataTransfer.getData("id");
      
//       let boatDIV = document.getElementById(itemId);

//       event.target.append(boatDIV);

//       boatDIV.classList.add("SetD");
//       //MainObj.getDataObj(event.target);
      
      
//     }
//   }
}

// let sh1 = new SHIP("boat _1", 2, "Test");
// let sh2 = new SHIP("boat _2", 2, "Test");
// let sh3 = new SHIP("boat _3", 3, "Test");
// let sh4 = new SHIP("boat _4", 4, "Test");

// sh1.setShip(DIV);
// sh2.setShip(DIV);

//console.log(Object(sh1));

// sh1.div.addEventListener("mouseover", function() {
//   console.log(Object(this));
//   sh1.DragAndDrop(this.parentNode.id);
// });

//DragInDrop(tabTd[1].id, sh1.name);


let mainContainers = [];
let discoveryTD = { };

function setDiscoveryTD(TABLE) {
  const table = document.getElementById(TABLE);
  const listTD = table.querySelectorAll("tbody > tr > td ");

  for(let TD of listTD) {
    discoveryTD[TD.id] = 0;
  }
}

function clearDiscoveryFromSHIP(ship) {
  for(let TD of ship.allTD) {
    console.log(TD);
    discoveryTD[TD] = 0;
  }
}
function clearDiscoveryFromMASTD(ship) {
  for(let TD of ship.masTd) {
    console.log(TD);
    discoveryTD[TD] = 0;
  }
}

setDiscoveryTD("Test");

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
      else { anyShip.allTD[k++] = Y+X;}
      
      console.log(discoveryTD);
      
      //discoveryTD[Y+X] = 1;
      //document.getElementById(Y+X).dataset.notAvaiable = isThere;
      
    }
  }
  console.log(anyShip.masTd);
  mainContainers[anyShip.nameShip] = anyShip.masTd;
  //console.log(mainContainers);

  return boolPosition;
}

 // Поворот
function rotateShip(ship) {
  
  let Selector = ship.ObjShip.parentNode;
  
  ship.ObjShip.oncontextmenu = function() 
  {
    ship.size.reverse();
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
    //clearDiscoveryFromMASTD(ship);
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
let ship_3 = createShip("boat_3", 2, "Test");
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