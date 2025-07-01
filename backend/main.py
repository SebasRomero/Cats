from fastapi import FastAPI
import httpx
from db import getFacts

app = FastAPI()

@app.get("/")
def hello():
    return {"status":"ok"}

@app.get("/catfacts")
async def getAllFacts():
    return getFacts()

@app.get("/fact")
async def getAFact():
    async with httpx.AsyncClient() as client:
        response = await client.get("https://catfact.ninja/fact")
        response.raise_for_status()
    return response.json()