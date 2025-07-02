from fastapi import FastAPI, APIRouter, status, Query
from dto import fact_dto
import uvicorn
from db import getRandomFact, insertFact, getFactsPaginated
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
router = APIRouter()

@router.get("/", status_code=status.HTTP_200_OK, response_description="Server ok!")
def hello():
    return {"status":"ok"}

@router.get("/catfacts/")
def list_facts(page: int = Query(1, ge=1), size: int = Query(10, ge=1, le=100)):
    return getFactsPaginated(page, size)

@router.get("/catfacts/random/", status_code=status.HTTP_200_OK, response_description="A random fact!")
async def getAFact():
    return getRandomFact()

@router.post("/catfacts/", status_code=status.HTTP_201_CREATED, response_description="Fact created!")
async def createFact(fact: fact_dto.FactDTO):
    return insertFact(fact=fact.fact)

app.include_router(router)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)