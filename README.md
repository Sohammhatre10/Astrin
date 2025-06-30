# Astrin: Your Cosmic Companion

Astrin is an AI-powered web application designed to be your guide through the cosmos. It provides real-time cosmic data, astronomy pictures, Mars weather updates, ISS location, and upcoming SpaceX launches, all while offering an interactive chat experience powered by a large language model.

## Features

- **AI Chat Agent**: Engage with Astrin, an AI companion with deep knowledge of space, astronomy, astrophysics, and space exploration. Get concise, inspiring cosmic metaphors in response to your queries.
- **Near-Earth Objects (NEO) Feed**: Track asteroids and comets approaching Earth with real-time data.
- **Astronomy Picture of the Day (APOD)**: Discover stunning images or videos of the universe daily, provided by NASA.
- **Mars Weather Updates**: Stay informed about the daily weather conditions on Mars, courtesy of NASA's Curiosity Rover.
- **International Space Station (ISS) Tracker**: View the real-time location of the ISS on a global map.
- **SpaceX Upcoming Launches**: Get updates on future SpaceX missions, including launch details and links to webcasts, articles, and Wikipedia.
- **Responsive and Thematic UI**: A visually engaging interface with cosmic animations and a consistent theme.

## API Endpoints

Astrin's backend, built with FastAPI, serves the following API endpoints:

- **`/api/chat` (POST)**: Interacts with the LLaMA-3.3-70B-Instruct-Turbo AI model via Together AI to generate cosmic-themed responses.
- **`/api/neo` (GET)**: Fetches Near-Earth Object data from the NASA NeoWs (Near-Earth Object Web Service) API. See API documentation: [NASA JPL SSD/CNEOS API](https://ssd-api.jpl.nasa.gov/doc/cad.html)
- **`/api/apod` (GET)**: Retrieves the Astronomy Picture of the Day from the NASA APOD API. See API documentation: [NASA APOD API](https://api.nasa.gov/planetary/apod), main portal: [NASA Open APIs](https://api.nasa.gov/)
- **`/api/mars-weather` (GET)**: Obtains Mars weather data from the NASA Mars Weather API (Curiosity Rover). See API documentation: [Mars Atmospheric Aggregation System (MAAS) API](https://ingenology.github.io/mars_weather_api/)
- **`/api/iss` (GET)**: Gets the real-time position of the International Space Station from the Open Notify API. See API documentation: [Open Notify ISS Current Location](http://open-notify.org/Open-Notify-API/ISS-Location-Now/)
- **`/api/spacex-launches` (GET)**: Fetches upcoming SpaceX launch data from the SpaceX API. See API documentation: [SpaceX API GitHub](https://github.com/r-spacex/SpaceX-API), example endpoint: `https://api.spacexdata.com/v5/launches/latest`

## Setup and Run

### Prerequisites

- Python 3.9+
- Node.js (LTS recommended)
- npm (Node Package Manager)

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd project/backend
    ```
2.  Create a virtual environment (recommended):
    ```bash
    python -m venv .venv
    ```
3.  Activate the virtual environment:
    - **Windows (Command Prompt):** `.\.venv\Scripts\activate.bat`
    - **Windows (PowerShell):** `.\.venv\Scripts\Activate.ps1`
    - **Linux/macOS:** `source ./.venv/bin/activate`
4.  Install the Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```
5.  Create a `.env` file in the `backend` directory and add your API keys and MongoDB connection details:
    ```
    TOGETHER_API_KEY="your_together_ai_api_key"
    NASA_API_KEY="your_nasa_api_key"
    MONGODB_URI="your_mongodb_connection_string"
    MONGODB_DATABASE_NAME="your_database_name"
    MONGODB_COLLECTION_NAME="your_collection_name"
    ```
    (You can obtain Together AI and NASA API keys from [Together AI](https://www.together.ai/) and [NASA Open APIs](https://api.nasa.gov/). For MongoDB, create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to get your connection string.)
6.  Run the FastAPI backend:
    ```bash
    uvicorn main:app --reload --port 8000
    ```

### Frontend Setup

1.  Navigate to the `project` directory (where `package.json` is located):
    ```bash
    cd project
    ```
2.  Install the Node.js dependencies:
    ```bash
    npm install
    ```
3.  Run the React frontend:
    ```bash
    npm run dev
    ```

### Accessing the Application

Once both the backend and frontend are running, open your web browser and go to `http://localhost:5173`.

## Project Structure

```
astrin/
  - project/
    - backend/
      - main.py (FastAPI application)
      - requirements.txt (Python dependencies)
    - src/
      - App.tsx (Main React component, handles routing)
      - main.tsx (React entry point, sets up BrowserRouter)
      - components/ (Shared UI components like Hero, Footer, ChatAgent, Starfield)
        - CosmicFeed.tsx (Navigation links to API pages)
      - pages/ (Dedicated pages for each API route)
        - NeoPage.tsx
        - ApodPage.tsx
        - MarsWeatherPage.tsx
        - IssPage.tsx
        - SpaceXLaunchesPage.tsx
    - package.json (Frontend dependencies and scripts)
    - vite.config.ts (Vite configuration)
    - tailwind.config.js (Tailwind CSS configuration)
    - postcss.config.js (PostCSS configuration)
    - eslint.config.js (ESLint configuration)
    - tsconfig.json (TypeScript configuration)
```

## Contributing

Feel free to fork this repository, open issues, or submit pull requests. Contributions are welcome!
