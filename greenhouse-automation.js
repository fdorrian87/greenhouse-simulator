//initialise sensor variables

let plantGrowth = 0.00;
let temperature = 0.00;
let humidity = 0.00;
let soilMoisture = 0.00;
let lightLevel = 0.00;

let currentDate = new Date();
currentDate.setHours(0, 0, 0, 0); //sets time to midnight of current date

let currentTime = ;

//initialise actuator variables
let growLights = true;
let window = false;
let fan = false;
let irrigation = false;
let heater = false;

function growLightsToggle() {
    //logic to toggle the growlights on/off - event listener to be included later
    if (growLights === false) {
        growLights = true;
    } else if (growLights === true) {
        growLights = false;
    } else {
        growLights = false;        
    }
}

function windowToggle() {
    //logic to toggle the window open/closed - event listener to be included later
    if (window === false) {
        window = true;
    } else if (window === true) {
        window = false;
    } else {
        window = false;        
    }
}

function fanToggle() {
    //logic to toggle the fan on/off - event listener to be included later
    if (fan === false) {
        fan = true;
    } else if (fan === true) {
        fan = false;
    } else {
        fan = false;        
    }
}

function irrigationToggle() {
    //logic to toggle the irrigation on/off - event listener to be included later
    if (irrigation === false) {
        irrigation = true;
    } else if (irrigation === true) {
        irrigation = false;
    } else {
        irrigation = false;        
    }
}

function heaterToggle() {
    //logic to toggle the heater on/off - event listener to be included later
    if (heater === false) {
        heater = true;
    } else if (heater === true) {
        heater = false;
    } else {
        heater = false;        
    }
}

function updateSensors() {
    //apply random value updates within specified ranges to the sensor variables
    temperature = Math.random() * (30 - 15) + 15;
    humidity = Math.random() * (80 - 40) + 40;
    soilMoisture = Math.random() * (100 - 20) + 20;
    lightLevel = Math.random() * 10000;
}

function autoEnviroControl() {
    //logic for automatic environmental controls
    if (temperature > 25.00) {
        fan = true;
        window = true;
        heater = false;
    } else if (temperature < 18.00) {
        fan = false;
        window = false;
        heater = true;
    }

    if (soilMoisture < 40.00) {
        irrigation = true;
    } else {
        irrigation = false;
    }

    if (lightLevel < 200.00) {
        growLights = true;
    } else {
        growLights = false;
    }

    if (humidity > 60.00) {
        window = true;
    } else {
        window = false;
    }
}

function alertLogic() {
    if (temperature > 25.00) {
        window.alert("WARNING: Heat Levels Excessive!")
    } else if (temperature < 18.00) {
        window.alert("WARNING: Heat Levels Dangerously Low!")
    }

    if (soilMoisture < 40.00) window.alert("WARNING: Soil Moisture Critically Low!")
    if (lightLevel < 2000.00) window.alert("WARNING: Light Levels Dangerously Low!")
    if (humidity > 60.00) window.alert("WARNING: Humidity Levels Excessive!")
}

function gupdatePlantGrowth() {
    let growthIncrement = 0;

    if (temperature >= 18.00 && temperature <= 30.00) growthIncrement += 0.1;
    if (humidity >= 50 && humidity <= 70) growthIncrement += 0.1;
    if (soilMoisture >= 40 && soilMoisture <= 80) growthIncrement +=0.1;
    if (lightLevel >= 2000 && lightLevel <= 6000) growthIncrement +=0.1;

    plantGrowth = Math.min(plantGrowth + growthIncrement, 100);
}