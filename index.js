// Initialize an empty array to store drone data
var drones = [];
var droneBody = document.getElementById("drone-body");

// Function to toggle the visibility of the password field
function onEyeClick() {
  // Get the password field and its current type
  let passwordField = document.querySelector("#inputPassword");
  let passwordFieldType = passwordField.getAttribute("type");
  
  // Get the icons for showing and hiding the password
  let passwordVisibleIcon = document.querySelector("#passwordVisible");
  let passwordNotVisibleIcon = document.querySelector("#passwordNotVisible");

  // Toggle password visibility based on current type
  if (passwordFieldType === "password") {
    // Show the password by setting type to 'text'
    passwordField.setAttribute("type", "text");
    // Update the icon display
    passwordVisibleIcon.classList.remove("d-block");
    passwordVisibleIcon.classList.add("d-none");
    passwordNotVisibleIcon.classList.remove("d-none");
    passwordNotVisibleIcon.classList.add("d-block");
  } else {
    // Hide the password by setting type back to 'password'
    passwordField.setAttribute("type", "password");
    // Update the icon display
    passwordVisibleIcon.classList.remove("d-none");
    passwordVisibleIcon.classList.add("d-block");
    passwordNotVisibleIcon.classList.remove("d-block");
    passwordNotVisibleIcon.classList.add("d-none");
  }
}

// Fetch configuration data from the specified URL
fetch("/config.json")
  .then((response) => {
    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json(); // Parse JSON data from the response
  })
  .then((data) => {
    // If data is available, process it
    if (data) {
      const users = data.users;
      if (users) {
        // Populate username and password fields with data from the first user
        var username = document.getElementById("inputUsername");
        var password = document.getElementById("inputPassword");
        if (username || password) {
          username.value = users[0].username;
          password.value = users[0].password;
        }
      }

      // Store drone data in the global variable
      this.drones = data.drones;

      // If drone data is available, render drone cards

      if (this.drones && droneBody) {
        renderDroneCards(this.drones);
      }
    }
  })
  .catch((error) => console.error("Error fetching data:", error));

// Function to render drone cards
function renderDroneCards(drones) {
  const droneBody = document.getElementById("drone-body");
  droneBody.innerHTML = ''; // Clear the current content in the drone body
  
  drones.forEach((drone) => {
    // Create elements for each drone card
    const card = document.createElement("div");
    card.className = "card col-x-12 col-md-5 col-xxl-3 p-0 ";

    const cardImage = document.createElement("img");
    cardImage.src = "/assets/images/drone.jpg";
    cardImage.className = "img-fluid drone-image";
    cardImage.alt = "drone";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = `Drone ID: ${drone.id}`;

    const cardText = document.createElement("p");
    cardText.className = "card-text fw-semibold fs-5";
    cardText.innerHTML = `
      Current Mission: <span>${drone.current_mission}</span><br>
      Status: <span>${drone.status}</span><br>
    `;
    
    // Create a button to view drone details
    const cardButton = document.createElement("button");
    cardButton.href = "#";
    cardButton.className = "btn btn-success bt-lg px-4 py-2 fw-semibold";
    cardButton.textContent = "Drone Details";
    cardButton.id = drone.id;
    cardButton.onclick = () => handleButton(drone); // Set button click handler

    // Append elements to the card
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardButton);
    card.appendChild(cardImage);
    card.appendChild(cardBody);

    // Add the card to the drone body
    droneBody.appendChild(card);
  });
}

// Function to handle displaying drone details
function handleButton(drone) {
  const droneBody = document.getElementById("drone-body");
  droneBody.innerHTML = ''; // Clear the drone body

  // Create HTML structure for drone details and maintenance logs
  const droneDetails = `
    <div class="p-4 mx-4 mx-lg-0 rounded-3 shadow-lg drone-info">
      <h3>Drone ID: <span>${drone.id}</span></h3>
      <h5><strong class='me-2'>Status :</strong> <span>${drone.status}</span></h5>
      <h5><strong class='me-2'>Flight Hours :</strong> <span>${drone.flight_hours}</span></h5>
      <h5><strong class='me-2'>Battery Status :</strong> <span>${drone.battery_status}</span></h5>
      <h5><strong class='me-2'>Last Known Location :</strong> <span>${drone.last_known_location.join(", ")}</span></h5>
      <h5><strong class='me-2'>Current Mission :</strong> <span>${drone.current_mission}</span></h5>
    </div>
    <div class="p-4 mx-4 mx-lg-0 rounded-3 shadow-lg drone-info">
      <h3>Maintenance Logs :</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class='text-success'>Date</th>
            <th scope="col" class='text-success'>Description</th>
            <th scope="col" class='text-success'>Technician</th>
          </tr>
        </thead>
        <tbody>
          ${drone.maintenance_logs.map((log, index) => `
            <tr>
              <td>${log.date}</td>
              <td>${log.description}</td>
              <td>${log.technician}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
    <button class="btn btn-success bt-lg px-4 py-2 fw-semibold col-10 col-md-6 col-xxl-2 mt-4" onclick="backToDroneCards()">Back to Drones</button>
  `;

  // Insert the drone details into the drone body
  droneBody.innerHTML = droneDetails;
}

// Function to go back to the drone cards view
function backToDroneCards() {
  renderDroneCards(drones); // Re-render drone cards with the stored drone data
}

