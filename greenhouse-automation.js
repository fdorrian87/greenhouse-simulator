//initialise sensor variables

let plantGrowth = 0.00;
let temperature = 0.00;
let humidity = 0.00;
let soilMoisture = 0.00;
let lightLevel = 0.00;
let plantStress = 0;
let dayCount = 0;

let activeAlerts = new Set();

let hoursPassed = 0;

//initialise actuator variables
let growLights = true;
let windowState = false;
let fan = false;
let irrigation = false;
let heater = false;
let automationStatus = false;
let automationInterval;

function automationToggle() {
    automationStatus = !automationStatus;
    
    if (automationStatus) {
        if (automationInterval) clearInterval(automationInterval);
        automationInterval = setInterval(runAutomationCycle, 100);
    } else {
        clearInterval(automationInterval);
    }
    
    const button = document.getElementById('automation-toggle');
    button.textContent = automationStatus ? "Stop Automation" : "Start Automation";
    button.classList.toggle("on", automationStatus);
    button.classList.toggle("off", !automationStatus);
    
    displayAlert(`Automation: ${automationStatus ? "ON" : "OFF"}`);
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

function dayCountProgress() {
    hoursPassed++;
    
    if (hoursPassed % 24 === 0) {
        dayCount++;
    }
    
    updateDisplay();
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
    button.textContent = `Irrigation: ${irrigation ? "ON" : "OFF"}`;
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
    // Add small random changes to current values
    temperature += (Math.random() - 0.5) * 2;
    humidity += (Math.random() - 0.5) * 5;
    soilMoisture += (Math.random() - 0.5) * 3;
    lightLevel += (Math.random() - 0.5) * 500;

    // Ensure values stay within realistic ranges
    temperature = Math.max(15, Math.min(30, temperature));
    humidity = Math.max(40, Math.min(80, humidity));
    soilMoisture = Math.max(20, Math.min(100, soilMoisture));
    lightLevel = Math.max(0, Math.min(10000, lightLevel));

    // Apply effects of equipment
    if (heater) temperature = Math.min(temperature + 1, 35);
    if (fan) temperature = Math.max(temperature - 1, 15);
    if (windowState) {
        temperature = Math.max(temperature - 0.5, 15);
        humidity = Math.max(humidity - 2, 40);
    }
    if (irrigation) soilMoisture = Math.min(soilMoisture + 5, 100);
    if (growLights) lightLevel = Math.min(lightLevel + 1000, 10000);
}

function updateEquipmentUI(id, state) {
    const button = document.getElementById(id);
    button.classList.toggle("on", state);
    button.classList.toggle("off", !state);
    const label = button.textContent.split(':')[0];
    button.textContent = `${label}: ${state ? "ON" : "OFF"}`;
    
    // Special case for window
    if (id === 'window-toggle') {
        button.textContent = `${label}: ${state ? "OPEN" : "CLOSED"}`;
    }
}

function updatePlantGrowth() {
    let growthIncrement = 0;

    if (temperature >= 15.00 && temperature <= 35.00) growthIncrement += 0.01;
    if (humidity >= 40 && humidity <= 70) growthIncrement += 0.01;
    if (soilMoisture >= 20 && soilMoisture <= 80) growthIncrement += 0.01;
    if (lightLevel >= 1000 && lightLevel <= 6000) growthIncrement += 0.01;

    // Add a small random factor for more realistic growth
    growthIncrement += (Math.random() - 0.5) * 0.05;

    plantGrowth = Math.min(plantGrowth + growthIncrement, 100);

    if (plantGrowth >= 100) {
        plantGrowth = 100;
        automationToggle(); // This will stop the automation
        displayAlert("Crops ready for harvest!");
    }
}

function autoEnviroControl() {
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

    // Update UI for each piece of equipment
    updateEquipmentUI('grow-lights-toggle', growLights);
    updateEquipmentUI('window-toggle', windowState);
    updateEquipmentUI('fan-toggle', fan);
    updateEquipmentUI('irrigation-toggle', irrigation);
    updateEquipmentUI('heater-toggle', heater);
}

function runAutomationCycle() {
    console.log("Running automation cycle");
    dayCountProgress();
    updateSensors();
    autoEnviroControl();

    console.log("Updating equipment UI");
    updateEquipmentUI('grow-lights-toggle', growLights);
    updateEquipmentUI('window-toggle', windowState);
    updateEquipmentUI('fan-toggle', fan);
    updateEquipmentUI('irrigation-toggle', irrigation);
    updateEquipmentUI('heater-toggle', heater);

    updatePlantGrowth();
    updateDisplay();
    updateAlertDisplay();
}

function updateDisplay() {
    console.log("updating display")

    //these lines of code update the sensor values
    document.getElementById("temperature").textContent = `${temperature.toFixed(1)}°C`;
    document.getElementById("humidity").textContent = `${humidity.toFixed(1)}%`;
    document.getElementById("soil-moisture").textContent = `${soilMoisture.toFixed(1)}%`;
    document.getElementById("light-level").textContent = `${lightLevel.toFixed(1)} lux`;
    document.getElementById("plant-growth").textContent = `${plantGrowth.toFixed(1)}%`;
    document.getElementById("days").textContent = `${dayCount}`;
}

document.addEventListener("DOMContentLoaded", () => {
    //this is where we set the interval for the automation to run
    updateDisplay(); //this is where we first update the display
    setInterval(dayCountProgress, 3600 * 1000); // 3600 * 1000 milliseconds = 1 hour
    document.getElementById("automation-toggle").addEventListener("click", automationToggle);
    document.getElementById("grow-lights-toggle").addEventListener("click", growLightsToggle);
    document.getElementById("window-toggle").addEventListener("click", windowToggle);
    document.getElementById("fan-toggle").addEventListener("click", fanToggle);
    document.getElementById("irrigation-toggle").addEventListener("click", irrigationToggle);
    document.getElementById("heater-toggle").addEventListener("click", heaterToggle);
});

function displayAlert(message) {
    console.log(`Displaying alert: ${message}`);

    // Create an alert element
    const alert = document.createElement('div');
    alert.classList.add('alert');
    alert.textContent = message;

    // Add the alert element to the container
    const alertsContainer = document.getElementById('alerts-container');
    alertsContainer.appendChild(alert);

    // Store alert message to avoid duplicates
    activeAlerts.add(message);

    // Remove the alert after 5 seconds
    setTimeout(() => {
        alertsContainer.removeChild(alert);
        activeAlerts.delete(message);
    }, 5000);
}

function updateAlertDisplay() {
    console.log("Updating alert display");

    // Check for and remove duplicate alerts
    const alertsContainer = document.getElementById('alerts-container');
    const currentAlerts = alertsContainer.querySelectorAll('.alert');
    currentAlerts.forEach(alert => {
        if (!activeAlerts.has(alert.textContent)) {
            alertsContainer.removeChild(alert);
        }
    });
}

function stopAutomation() {
    clearInterval(automationInterval);
    automationStatus = false;
    window.alert("Automation stopped");
}