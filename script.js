const bikes = [
    {
        id: 1,
        name: "Yamaha MT-07",
        category: "sport",
        engine: "689cc",
        type: "Naked",
        image: "images/Yamaha MT-07 2026.jfif",
        description: "A lightweight naked bike known for agility, torque, and everyday fun."
    },
    {
        id: 2,
        name: "Honda Africa Twin",
        category: "adventure",
        engine: "1084cc",
        type: "Adventure",
        image: "images/Honda Africa Twin 2026.jpg",
        description: "A capable adventure bike designed for long-distance comfort and mixed terrain."
    },
    {
        id: 3,
        name: "Royal Enfield Classic 350",
        category: "classic",
        engine: "349cc",
        type: "Classic",
        image: "images/Royal Enfield Classic 350.jpeg",
        description: "A retro-styled motorcycle with timeless design and relaxed riding character."
    },
    {
        id: 4,
        name: "Harley-Davidson Iron 883",
        category: "cruiser",
        engine: "883cc",
        type: "Cruiser",
        image: "images/Harley-Davidson Iron 883.jfif",
        description: "A bold cruiser with minimalist styling and strong road presence."
    },
    {
        id: 5,
        name: "Kawasaki Ninja ZX-6R",
        category: "sport",
        engine: "636cc",
        type: "Supersport",
        image: "images/Kawasaki Ninja ZX-6R.jpg",
        description: "A sharp supersport machine for riders who enjoy speed and precision."
    },
    {
        id: 6,
        name: "BMW R 1250 GS",
        category: "adventure",
        engine: "1254cc",
        type: "Touring Adventure",
        image: "images/BMW R 1250 GS.jpg",
        description: "A premium adventure motorcycle built for versatility and touring."
    }
];

const stories = [
    {
        title: "The Rise of Cafe Racers",
        text: "Cafe racers became symbols of speed, self-expression, and youth culture, especially in Britain during the 1960s."
    },
    {
        title: "How Scooters Changed Urban Mobility",
        text: "Compact two-wheelers made commuting more practical and accessible in many cities around the world."
    },
    {
        title: "The Legacy of the Honda CB Series",
        text: "The CB line helped redefine reliability and practicality for everyday riders globally."
    }
];

const defaultEvents = [
    {
        title: "Spring City Ride",
        date: "2026-04-12",
        location: "Stockholm",
        type: "Ride",
        description: "An evening ride for bikers to connect and explore the city together."
    },
    {
        title: "Custom Bike Expo",
        date: "2026-05-02",
        location: "Gothenburg",
        type: "Exhibition",
        description: "A community event featuring custom builds, gear, and biker networking."
    }
];

const bikeList = document.getElementById("bikeList");
const storyList = document.getElementById("storyList");
const eventList = document.getElementById("eventList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const eventForm = document.getElementById("eventForm");
const formMessage = document.getElementById("formMessage");

function getSavedBikes() {
    return JSON.parse(localStorage.getItem("savedBikes")) || [];
}

function saveBike(id) {
    const savedBikes = getSavedBikes();

    if (!savedBikes.includes(id)) {
        savedBikes.push(id);
        localStorage.setItem("savedBikes", JSON.stringify(savedBikes));
        renderBikes();
    }
}

function renderBikes() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const savedBikes = getSavedBikes();

    const filteredBikes = bikes.filter((bike) => {
        const matchesName = bike.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === "all" || bike.category === selectedCategory;
        return matchesName && matchesCategory;
    });

    if (filteredBikes.length === 0) {
        bikeList.innerHTML = `<p>No bikes found for this search.</p>`;
        return;
    }

    bikeList.innerHTML = filteredBikes.map((bike) => {
        const isSaved = savedBikes.includes(bike.id);

        return `
    <article class="bike-card-visual">

      <div class="bike-image-wrap">
        <img src="${bike.image}" alt="${bike.name}" class="bike-image">
      </div>

      <div class="bike-content">

        <span class="bike-badge">${bike.category}</span>

        <h3>${bike.name}</h3>

        <p class="meta">${bike.engine} • ${bike.type}</p>

        <p>${bike.description}</p>

        <div class="actions">
          <button class="small-btn">Explore Details</button>

          <button class="small-btn" onclick="saveBike(${bike.id})">
            ${isSaved ? "Saved" : "Save Bike"}
          </button>
        </div>

      </div>

    </article>
  `;
    }).join("");
}

function renderStories() {
    storyList.innerHTML = stories.map((story) => {
        return `
      <article class="card">
        <span class="tag">History</span>
        <h3>${story.title}</h3>
        <p>${story.text}</p>
      </article>
    `;
    }).join("");
}

function getEvents() {
    return JSON.parse(localStorage.getItem("communityEvents")) || defaultEvents;
}

function renderEvents() {
    const events = getEvents();

    eventList.innerHTML = events.map((event) => {
        return `
      <article class="list-card">
        <span class="tag">${event.type}</span>
        <h3>${event.title}</h3>
        <p class="meta">${event.date} • ${event.location}</p>
        <p>${event.description}</p>
      </article>
    `;
    }).join("");
}

eventForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const newEvent = {
        title: document.getElementById("eventTitle").value,
        date: document.getElementById("eventDate").value,
        location: document.getElementById("eventLocation").value,
        type: document.getElementById("eventType").value,
        description: document.getElementById("eventDesc").value
    };

    const currentEvents = getEvents();
    currentEvents.unshift(newEvent);

    localStorage.setItem("communityEvents", JSON.stringify(currentEvents));

    eventForm.reset();
    formMessage.textContent = "Your event has been added successfully.";
    renderEvents();

    setTimeout(() => {
        formMessage.textContent = "";
    }, 2500);
});

searchInput.addEventListener("input", renderBikes);
categoryFilter.addEventListener("change", renderBikes);

renderBikes();
renderStories();
renderEvents();