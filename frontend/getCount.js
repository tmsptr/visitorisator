document.addEventListener("DOMContentLoaded", () => {
  const getVisitorCountButton = document.getElementById("getVisitorCount");
  const visitorCountElement = document.getElementById("visitorCount");

  if (sessionStorage.getItem("visit") === null) {
    updateCounter();
  }

  function updateCounter() {
    fetch("http://localhost:3000/");
  }

  sessionStorage.setItem("visit", "x");

  getVisitorCountButton.addEventListener("click", async () => {
    try {
      const response = await fetch("http://localhost:3000/api/visitorCount");
      const data = await response.json();
      visitorCountElement.textContent = `Visitor count: ${data.count}`;
    } catch (error) {
      console.log("Error getting count:", error);
    }
  });
});
