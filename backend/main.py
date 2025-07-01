from fastapi import FastAPI
import httpx
from db import getFacts, getRandomFact

app = FastAPI()

@app.get("/")
def hello():
    return {"status":"ok"}

@app.get("/catfacts")
async def getAllFacts():
    return getFacts()

@app.get("/catfacts/random")
async def getAFact():
    return getRandomFact()