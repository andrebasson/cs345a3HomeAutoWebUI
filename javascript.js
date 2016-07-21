/* 
 * AUTHOR: 		Andre Basson	
 * COURSE: 		Compsci 345
 * ASSIGNMENT:	3, Task 2 (Design Prototype Implementation)
 * YEAR: 		2016 s1
 */

/* 
 * populateHomeScreen() populates the home screen content (4 buttons) and header
 */ 
function populateHomeScreen() {
	var outputContent = "<input class='homeScreenButtons' type='button' name='rsc'"
					+ "value='Room Specific Controls' onclick='populateRoomSpecificControls()'></input>"
					+ "<input class='homeScreenButtons' type='button' name='hwc'"
					+ "value='Housewide Controls'></input><br>"
					+ "<input class='homeScreenButtons' type='button' name='cctv'"
					+ "value='CCTV'></input>"
					+ "<input class='homeScreenButtons' type='button' name='settings'"
					+ "value='Settings'></input>";					
	document.getElementById("output").innerHTML = outputContent;
	document.getElementById("heading").innerHTML = "Liz's House";
}

/* 
 * populateRoomSpecificControlsScreen() populates the 'rooms' screen content (4 buttons) and header
 */ 
function populateRoomSpecificControls(){
	var outputContent = "<input class='roomsScreenButtons' type='button' name='lng'"
					+ "value='Lounge'></input>"
					+ "<input class='roomsScreenButtons' type='button' name='ktn'"
					+ "value='Kitchen'></input>"
					+ "<input class='roomsScreenButtons' type='button' name='bthrm1'"
					+ "value='Bathroom 1'></input><br>"
					+ "<input class='roomsScreenButtons' type='button' name='bthrm2'"
					+ "value='Bathroom 2'></input>"					
					+ "<input class='roomsScreenButtons' type='button' name='bdrm1'"
					+ "value='Bedroom 1'></input>"
					+ "<input class='roomsScreenButtons' type='button' name='bdrm2'"
					+ "value='Bedroom 2'></input>";					
	document.getElementById("output").innerHTML = outputContent;
	document.getElementById("heading").innerHTML = "Rooms";
}


/*
 * updateSideBar() populates or updates the Current Status / Active Rooms sidebar content
 */
function updateSideBar(){	
	var currentStatus = getCurrentStatus();
	var currentStatusDiv = document.getElementById("currentStatusContent");	
	currentStatusDiv.innerHTML = "<strong>Alarms</strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+currentStatus[0]+"<br>"
								+"<strong>Doors</strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+currentStatus[1]+"<br>"
								+"<strong>Energy</strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+currentStatus[2]+"<br>"
								+"<strong>Temp</strong>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+currentStatus[3];
	
	var activeRoomsByIndexArray = getActiveRooms(rooms);
	var activeRoomsOutput = "";
	for (var i=0; i<activeRoomsByIndexArray.length; i++){		
		//console.log("Active Room: "+rooms[activeRoomsByIndexArray[i]].getName());
		var activeRoom = rooms[activeRoomsByIndexArray[i]];
		activeRoomsOutput += "<strong>"+activeRoom.getName()+"</strong>"+getActivities(activeRoom)+"<br>";
	}
	document.getElementById("activeRoomContent").innerHTML=activeRoomsOutput;
}

/*
 * getCurrentStatus() returns the current status (stored) for [Alarms, Doors, Energy, Temp]
 */
function getCurrentStatus(){
	var statusArray = JSON.parse(sessionStorage.getItem("currentStatusStore"));
	//console.log("statusArray is "+statusArray);
	return statusArray;
}

function appliance(name){
	// properties
	this.name = setName(name);
	this.stateOn = setState(false);	// boolean, default

	// methods
	this.getName = function(){return this.name};	
	this.setName = function(name){this.name = name};
	this.getState = function(){return this.stateOn};
	this.setState = function(state){this.StateOn = state};
}

function createRoom(roomName){
	return new Room(roomName);
}

function Room(roomName){
	// properties
	this.name = roomName; //setName(roomName);
	this.lightOn = false; //setLightState(false);				// boolean, false = off
	this.appliances = new Array();
	this.heatingOn = false; //setHeatingState(false);			// boolean, false = off
	this.doorUnLocked = false; //setDoorLockState(false);		// boolean, false = locked
	this.windowBlindDrawn = false; //setWindowBlindState(false);	// boolean, false = open
/*
	this.lightOn = false;			// boolean
	this.appliances = new Array[];
	this.heatingOn = false;			// boolean
	this.doorUnLocked = false;		// boolean
	this.windowBlindOpen = false;	// boolean
*/	
	
	// methods
	this.getName = function(){return this.name;}	
	this.setName = function(name){this.name = roomName;}
	this.getLightState = function(){return this.lightOn;}
	this.setLightState = function(bLightOn){this.lightOn = bLightOn;}
	this.getHeatingState = function(){return this.heatingOn;}
	this.setHeatingState = function(bHeatingOn){this.heatingOn = bHeatingOn;}
	this.getDoorLockState = function(){return this.doorUnLocked;}
	this.setDoorLockState = function(bDoorUnlocked){this.doorUnLocked = bDoorUnlocked;}
	this.getWindowBlindState = function(){return this.windowBlindDrawn;}
	this.setWindowBlindState = function(bWindowBlindDrawn){this.windowBlindDrawn = bWindowBlindDrawn;}

	this.addAppliance = function(applianceName){
		this.appliances = appliances.push(applianceName);
	}
	this.removeAppliance = function(applianceName){
		var index = this.appliances[applianceName]
		this.appliance.splice(index,1);	// deletes only the element at that index
	}	
	this.getApplianceState = function(applianceName){this.appliances[applianceName].getState();}
	this.setApplianceState = function(applianceName, applianceStateOn){this.appliances[applianceName].setState(applianceStateOn);}
}

function getActiveRooms(rooms){
	var activeRoomsByIndexArray = new Array();	// create an empty array to store room index numbers
	for (var i=0; i<rooms.length; i++){
		if ( (rooms[i].getLightState()) || (rooms[i].getHeatingState()) 
				|| (rooms[i].getDoorLockState()) || (rooms[i].getWindowBlindState()) ){			
			activeRoomsByIndexArray.push(i);
			//debug
//			console.log("index: "+i);
//			console.log("Active Room: "+rooms[i].getName());
//			console.log(rooms[i].getName()+": "+rooms[i].getLightState());
//			console.log(rooms[i].getName()+": "+rooms[i].getHeatingState());
//			console.log(rooms[i].getName()+": "+rooms[i].getDoorLockState());
//			console.log(rooms[i].getName()+": "+rooms[i].getWindowBlindState());
		}
	}
	return activeRoomsByIndexArray;
}

/*
 *  returns the activities currently active (in 'on' state) in a room, as HTML
 */
function getActivities(room){
	var outputStringHTML = "";
	if (room.getLightState() == true){
		outputStringHTML += "<img class='imgLight' src='images/light-on2.png' alt='light img'>&nbsp"
	} else if (room.getHeatingState()){
		outputStringHTML += "<img class='imgThermometre' src='images/thermometre-up.png' alt='light img'>&nbsp"
	} else if (room.getDoorLockState()){
		outputStringHTML += "<img class='imgLock' src='images/lock-open.png' alt='light img'>&nbsp"
	} else if (getWindowBlindState()){
		outputStringHTML += "<img class='imgBlinds' src='images/blinds-closed.png' alt='light img'>&nbsp"
	} 
	return outputStringHTML;
}




 
