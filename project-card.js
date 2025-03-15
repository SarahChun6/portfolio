class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
        // Get attributes
        const name = this.getAttribute("name") || "Untitled Project";
        const imageSrc = this.getAttribute("image") || "placeholder.jpg";
        const description = this.getAttribute("description") || "No description provided.";
        const link = this.getAttribute("link") || "#";
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    border: 1px solid #ddd;
                    padding: 16px;
                    border-radius: 8px;
                    background: #fff;
                    width: 300px;
                    box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
                }
                h2 { font-size: 1.2em; }
                img {
                    width: 100%;
                    max-height: 150px;
                    object-fit: cover;
                    border-radius: 4px;
                }
                a {
                    color: blue;
                    text-decoration: none;
                    font-weight: bold;
                }
            </style>
            <h2>${name}</h2>
            <img src="${imageSrc}" alt="Screenshot of ${name}">
            <p>${description}</p>
            <a href="${link}" target="_blank">Learn more</a>
        `;

    }
}

// Define the custom element
customElements.define("project-card", ProjectCard);

fetch("projects.json")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("projects-container");

        data.forEach(project => {
            const card = document.createElement("project-card");
            card.setAttribute("name", project.name);
            card.setAttribute("image", project.image);
            card.setAttribute("description", project.description);
            card.setAttribute("link", project.link);
            container.appendChild(card);
        });
    })
    .catch(error => console.error("Error loading JSON:", error));
