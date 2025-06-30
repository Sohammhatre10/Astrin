from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
from typing import List
import os
from dotenv import load_dotenv
import uvicorn
from pymongo import MongoClient
from datetime import datetime

load_dotenv()

app = FastAPI(title="Astrin Cosmic API", version="1.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
NASA_API_KEY = os.getenv("NASA_API_KEY")
MONGODB_URI = os.getenv("MONGODB_URI")
MONGODB_DATABASE_NAME = os.getenv("MONGODB_DATABASE_NAME")
MONGODB_COLLECTION_NAME = os.getenv("MONGODB_COLLECTION_NAME")
TOGETHER_BASE_URL = "https://api.together.ai/v1/chat/completions"

# MongoDB client initialization
client = MongoClient(MONGODB_URI)
db = client[MONGODB_DATABASE_NAME]
chat_history_collection = db[MONGODB_COLLECTION_NAME]

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

class CosmicEvent(BaseModel):
    id: str
    title: str
    description: str
    type: str
    timestamp: str
    severity: str
    icon: str

class ChatMessage(BaseModel):
    text: str
    sender: str
    timestamp: datetime

async def call_llama_model(prompt: str) -> str:
    system_prompt = """You are Astrin, a cosmic AI companion with deep knowledge of space, astronomy, astrophysics, and space exploration. 
You're capable of retrieving live cosmic data via external tools. Respond with concise, inspiring cosmic metaphors."""

    payload = {
        "model": "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7,
        "max_tokens": 300,
        "top_p": 0.9
    }

    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(TOGETHER_BASE_URL, json=payload, headers=headers)
            if response.status_code == 200:
                data = response.json()
                return data["choices"][0]["message"]["content"]
            else:
                return "⚠️ Cosmic interference! Unable to reach Astrin's thought stream."
    except Exception:
        return "🌌 Astrin lost signal in deep space. Please try again shortly."

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    try:
        response = await call_llama_model(request.message)
        return ChatResponse(response=response)
    except Exception:
        raise HTTPException(status_code=500, detail="Astrin failed to respond.")

@app.post("/api/chat/history")
async def save_chat_history(messages: List[ChatMessage]):
    try:
        # Convert Pydantic models to dictionaries for MongoDB insertion
        messages_dict = [msg.model_dump() for msg in messages]
        chat_history_collection.insert_many(messages_dict)
        return {"message": "Chat history saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save chat history: {e}")

@app.get("/api/neo", response_model=List[CosmicEvent])
async def get_near_earth_objects():
    url = f"https://api.nasa.gov/neo/rest/v1/feed?api_key={NASA_API_KEY}"
    try:
        async with httpx.AsyncClient() as client:
            res = await client.get(url)
            data = res.json()
            events = []
            for date, objects in data["near_earth_objects"].items():
                for obj in objects:
                    events.append(CosmicEvent(
                        id=obj["id"],
                        title=f"NEO: {obj['name']}",
                        description=f"{obj['name']} is approaching Earth at {obj['close_approach_data'][0]['relative_velocity']['kilometers_per_hour']} km/h.",
                        type="asteroid",
                        timestamp=obj["close_approach_data"][0]["close_approach_date"],
                        severity="info",
                        icon="circle"
                    ))
            return events
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to fetch NEO data.")

@app.get("/api/apod")
async def get_apod():
    url = f"https://api.nasa.gov/planetary/apod?api_key={NASA_API_KEY}"
    try:
        async with httpx.AsyncClient() as client:
            res = await client.get(url)
            return res.json()
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to fetch APOD.")

@app.get("/api/mars-weather")
async def get_mars_weather():
    url = f"https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json"
    try:
        async with httpx.AsyncClient() as client:
            res = await client.get(url)
            return res.json()
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to fetch Mars weather.")

@app.get("/api/iss")
async def get_iss_position():
    try:
        async with httpx.AsyncClient() as client:
            res = await client.get("http://api.open-notify.org/iss-now.json")
            return res.json()
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to fetch ISS data.")

@app.get("/api/spacex-launches")
async def get_spacex_launches():
    url = "https://api.spacexdata.com/v5/launches/upcoming"
    try:
        async with httpx.AsyncClient() as client:
            res = await client.get(url)
            return res.json()
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to fetch SpaceX launches.")

@app.get("/")
async def root():
    return {"message": "Astrin Cosmic API with Together AI + NASA is live! 🚀🌌"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
