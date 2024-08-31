//initialise sensor variables

let plantGrowth = 0.00;
let temperature = 0.00;
let humidity = 0.00;
let soilMoisture = 0.00;
let lightLevel = 0.00;
let plantStress = 0;

let currentDate = new Date();
currentDate.setHours(0, 0, 0, 0); //sets time to midnight of current date

//let currentTime = ; not sure if needed yet 29/8/2024

//initialise actuator variables
let growLights = true;
let windowState = false;
let fan = false;
let irrigation = false;
let heater = false;
let automationStatus = false;
let automationInterval;

function automationToggle() {
    //logic to start the greenhouse automation, or turn it off
    automationStatus = !automationStatus; //flips the boolean status of the automation
    window.alert(`Automation: ${automationStatus ? "ON" : "OFF"}`);
}

function growLightsToggle() {
    //logic to toggle the growlights on/off
    growLights = !growLights; //flips the boolean state of grow lights
    window.alert(`Grow Lights: ${growLights ? "ON" : "OFF"}`);

    //button appearance change logic
    const button = document.getElementById("grow-lights-toggle");
    button.classList.toggle("on", growLights);
    button.classList.toggle("off", !growLights);
    button.textContent = `Grow Lights: ${growLights ? "ON" : "OFF"}`;
}

function windowToggle() {
    //logic to toggle the window open/closed - event listener to be included later
    windowState = !windowState; //flips the boolean state of the window
    window.alert(`Window: ${windowState ? "OPEN" : "CLOSED"}`);

    //button appearance change logic
    const button = document.getElementById("window-toggle");
    button.classList.toggle("on", windowState);
    button.classList.toggle("off", !windowState);
    button.textContent = `Window: ${windowState ? "OPEN" : "CLOSED"}`;
}

function fanToggle() {
    //logic to toggle the fan on/off - event listener to be included later
    fan = !fan; //flips the boolean state of the fan
    window.alert(`Fan: ${fan ? "ON" : "OFF"}`);

    //button appearance change logic
    const button = document.getElementById("fan-toggle");
    button.classList.toggle("on", fan);
    button.classList.toggle("off", !fan);
    button.textContent = `Fan: ${fan ? "ON" : "OFF"}`;
}

function irrigationToggle() {
    //logic to toggle the irrigation on/off - event listener to be included later
    irrigation = !irrigation; //flips the boolean state of the irrigation
    window.alert(`Irrigation: ${irrigation ? "ON" : "OFF"}`);

    //button appearance change logic
    const button = document.getElementById("irrigation-toggle");
    button.classList.toggle("on", irrigation);
    button.classList.toggle("off", !irrigation);
    button.textContent = `Fan: ${irrigation ? "ON" : "OFF"}`;
}

function heaterToggle() {
    //logic to toggle the heater on/off - event listener to be included later
    heater = !heater; //flips the boolean state of the heater
    window.alert(`Heater: ${heater ? "ON" : "OFF"}`);

    //button appearance change logic
    const button = document.getElementById("heater-toggle");
    button.classList.toggle("on", heater);
    button.classList.toggle("off", !heater);
    button.textContent = `Heater: ${heater ? "ON" : "OFF"}`;
}

function updateSensors() {
    //apply random value updates within specified ranges to the sensor variables
    temperature = Math.random() * (30 - 15) + 15;
    humidity = Math.random() * (80 - 40) + 40;
    soilMoisture = Math.random() * (100 - 20) + 20;
    lightLevel = Math.random() * 10000;

    if (heater === true) {
        temperature = temperature + 5;
    } else if (heater === false) {
        temperature = temperature - 5;
    }

    if (fan === true) {
        temperature = temperature - 3;
    } else if (fan === false) {
        temperature = temperature + 3;
    }
    
    if (windowState === true) {
        temperature = temperature - 2;
        humidity = humidity - 20;
    } else if (windowState === false) {
        temperature = temperature + 2;
        humidity = humidity + 20;
    }
}

function autoEnviroControl() {
    //logic for automatic environmental controls
    if (temperature > 25.00) {
        fan = true;
        windowState = true;
        heater = false;
    } else if (temperature < 18.00) {
        fan = false;
        windowState = false;
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
        windowState = true;
    } else {
        windowState = false;
    }
}

function runAutomationCycle() {
    updateSensors();
    autoEnviroControl();
    alertLogic();
    updateDisplay();
}

function updateDisplay() {
    const now = new Date() //these lines of code update the date and time
    document.getElementById("date").textContent = now.toLocaleDateString();
    document.getElementById("time").textContent = now.toLocaleTimeString();

    //these lines of code update the sensor values
    document.getElementById("temperature").textContent = `${temperature.toFixed(1)}°C`;
    document.getElementById("humidity").textContent = `${humidity.toFixed(1)}%`;
    document.getElementById("soil-moisture").textContent = `${soilMoisture.toFixed(1)}%`;
    document.getElementById("light-level").textContent = `${lightLevel.toFixed(1)} lux`;
    document.getElementById("plant-growth").textContent = `${plantGrowth.toFixed(1)}%`;
}

document.addEventListener("DOMContentLoaded", () => {
    //this is where we set the interval for the automation to run
    updateDisplay(); //this is where the code initialises the display and inludes the values
    automationInterval = setInterval(runAutomationCycle, 10000);
    
    //event listeners for buttons to trigger toggles
    document.getElementById("grow-lights-toggle").addEventListener("click", growLightsToggle);
    document.getElementById("heater-toggle").addEventListener("click", heaterToggle);
    document.getElementById("window-toggle").addEventListener("click", windowToggle);
    document.getElementById("fan-toggle").addEventListener("click", fanToggle);
    document.getElementById("irrigation-toggle").addEventListener("click", irrigationToggle);
    document.getElementById("automation-toggle").addEventListener("click", automationToggle);
});

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

function updatePlantGrowth() {
    let growthIncrement = 0;

    if (temperature >= 18.00 && temperature <= 30.00) growthIncrement += 0.1;
    if (humidity >= 50 && humidity <= 70) growthIncrement += 0.1;
    if (soilMoisture >= 40 && soilMoisture <= 80) growthIncrement +=0.1;
    if (lightLevel >= 2000 && lightLevel <= 6000) growthIncrement +=0.1;

    plantGrowth = Math.min(plantGrowth + growthIncrement, 100);

    if (plantGrowth === 100) {
        window.alert("Crops ready for harvest")
    }
}

function stopAutomation() {
    clearInterval(automationInterval);
}