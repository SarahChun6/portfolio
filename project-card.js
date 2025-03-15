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

        // Load external CSS
        const style = document.createElement("link");
        style.setAttribute("rel", "stylesheet");
        style.setAttribute("href", "project-card.css");

        // Create HTML structure
        const template = document.createElement("section");
        template.innerHTML = `
            <h2>${name}</h2>
            <picture>
                <img src="${imageSrc}" alt="Screenshot of ${name}">
            </picture>
            <p>${description}</p>
            <a href="${link}" target="_blank">Learn more</a>
        `;

        // Append styles and content to Shadow DOM
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(template);
    }
}

// Define the custom element
customElements.define("project-card", ProjectCard);
