# Astrin: Your Cosmic Companion

## Elevator Pitch

Astrin: Your AI cosmic companion. Explore real-time NEOs, APODs, Mars weather, ISS, and chat with AI for instant space insights. Dive into the universe!

## Tagline

Astrin: Your Universe, Unlocked by AI.

## Inspiration

Our inspiration for Astrin stemmed from a deep fascination with space exploration and the vastness of the cosmos. We recognized a growing public interest in real-time astronomical data and the potential of artificial intelligence to make complex information accessible and engaging. The goal was to create a comprehensive platform that not only delivers up-to-date cosmic phenomena but also fosters a deeper understanding through interactive AI-powered conversations.

## What it does

Astrin is an AI-powered web application designed to be a comprehensive guide through the cosmos. It provides real-time cosmic data, including tracking Near-Earth Objects, showcasing the Astronomy Picture of the Day, delivering Mars weather updates from the Curiosity Rover, displaying the live location of the International Space Station, and offering insights into upcoming SpaceX launches. A core feature is the interactive AI Chat Agent, which provides knowledgeable and contextually relevant responses to user queries about space, astronomy, astrophysics, and space exploration.

## How we built it

Astrin was developed using a modern technology stack to ensure scalability, responsiveness, and a rich user experience. The backend is built with Python using the FastAPI framework, providing robust API endpoints for data retrieval and AI integration. The frontend is a responsive web application developed with React and TypeScript, leveraging Vite for a fast development experience. Tailwind CSS was utilized for efficient and customizable styling. Data is fetched from various external APIs, including NASA's NeoWs, APOD, and Mars Weather APIs, the Open Notify API for ISS data, and the SpaceX API. The AI chat functionality is powered by a large language model accessed via Together AI.

## Challenges we ran into

During development, we encountered several challenges. Integrating diverse external APIs, each with its unique data structure and rate limits, required careful handling and data normalization on the backend. On the frontend, ensuring seamless data flow and consistent UI updates, particularly for real-time data like the ISS tracker, presented complexities in state management. Debugging type mismatches between API responses and frontend components, especially with TypeScript, required meticulous attention. Resolving environment configuration issues, such as correctly managing virtual environments and sensitive API keys, was also a key challenge.

## Accomplishments that we're proud of

We are particularly proud of successfully integrating multiple complex external APIs into a unified and intuitive user interface. The real-time data display for the ISS and Mars weather, coupled with the responsive design, provides a compelling user experience. The AI Chat Agent, which seamlessly interacts with a large language model, represents a significant achievement in making complex astronomical knowledge accessible and engaging through natural language. Ensuring the backend APIs consistently deliver data and the frontend renders it accurately, despite initial challenges, is also a notable accomplishment.

## What we learned

Throughout this project, we gained valuable insights into full-stack application development, API integration best practices, and frontend performance optimization. We learned the importance of robust error handling and fallback mechanisms when dealing with external data sources. Understanding and implementing proper environment variable management for sensitive information was also a crucial learning. Furthermore, working with asynchronous data flows and optimizing component rendering in React provided valuable lessons in building dynamic web applications.

## What's next for Astrin

For the future of Astrin, we envision several exciting enhancements. We plan to integrate more astronomical data sources and APIs to broaden the scope of information available to users. Enhancing the AI Chat Agent with more advanced conversational capabilities and personalized learning paths is also a priority. We aim to implement user accounts and personalization features, allowing users to save their favorite astronomical observations or customize their feed. Further UI/UX refinements, performance optimizations, and the potential development of a mobile application are also on our roadmap to make Astrin an even more immersive and indispensable cosmic companion.
