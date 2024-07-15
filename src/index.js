
document.addEventListener("DOMContentLoaded", function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";

    // Fetch and display images
    fetchImages(imgUrl);

    // Fetch and display breeds
    fetchBreeds(breedUrl);

    // Add change event listener to dropdown
    const dropdown = document.getElementById("breed-dropdown");
    dropdown.addEventListener("change", function() {
      const selectedLetter = dropdown.value;
      filterBreeds(selectedLetter);
    });
  });

  function fetchImages(imgUrl) {
    fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
        const images = data.message; // Assuming the response structure is { message: ["url1", "url2", ...], status: "success" }
        const imageContainer = document.getElementById("dog-image-container");

        images.forEach(url => {
          const imgElement = document.createElement("img");
          imgElement.src = url;
          imgElement.alt = "Random Dog Image";
          imageContainer.appendChild(imgElement);
        });
      })
      .catch(error => console.error("Error fetching images:", error));
  }

  function fetchBreeds(breedUrl) {
    fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
        const breedsObject = data.message; // Assuming the response structure is { message: { breed1: [], breed2: [], ... }, status: "success" }
        const breedsList = Object.keys(breedsObject);
        const breedsContainer = document.getElementById("dog-breeds");

        breedsList.forEach(breed => {
          const breedItem = document.createElement("li");
          breedItem.textContent = breed;
          breedsContainer.appendChild(breedItem);
        });
      })
      .catch(error => console.error("Error fetching breeds:", error));
  }

  function filterBreeds(selectedLetter) {
    const breedsListItems = document.querySelectorAll("#dog-breeds li");

    breedsListItems.forEach(item => {
      const breedName = item.textContent.toLowerCase();
      if (breedName.startsWith(selectedLetter)) {
        item.style.display = "block"; // Show the breed if it starts with the selected letter
      } else {
        item.style.display = "none"; // Hide the breed if it doesn't start with the selected letter
      }
    });
  }
