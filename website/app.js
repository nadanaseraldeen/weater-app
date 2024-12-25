const apiKey = "d9586d0cbd6252eab2d5d10ae7fe12ff&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Function to GET weather data from OpenWeatherMap API
const getWeather = async (zip) => {
  const response = await fetch(`${baseURL}${zip}&appid=${apiKey}`);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Function to POST data to the server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
  }
};

// Function to update the UI dynamically
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    document.getElementById(
      "temp"
    ).innerHTML = `Temperature: ${allData.temp}°F`;
    document.getElementById("content").innerHTML = `Feeling: ${allData.feel}`;
  } catch (error) {
    console.error("Error updating UI:", error);
  }
};

// Event listener for the generate button
document.getElementById("generate").addEventListener("click", async () => {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  // Get current date
  const date = new Date().toLocaleDateString();

  // Fetch weather data, post to server, and update UI
  try {
    const weatherData = await getWeather(zip);
    if (weatherData.cod === 200) {
      await postData("/add", {
        date,
        temp: weatherData.main.temp,
        feel: feelings,
      });
      updateUI();
    } else {
      console.error("Error: Invalid ZIP Code");
      alert("Please enter a valid ZIP code.");
    }
  } catch (error) {
    console.error("Error handling event:", error);
  }
});
