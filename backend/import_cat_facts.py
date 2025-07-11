import sqlite3
from constants import catFactsUrl, catFactsDB
import random
import httpx
import asyncio

con = sqlite3.connect(catFactsDB)
cur = con.cursor()
#Both, id and date are autogenerated
cur.execute("CREATE TABLE IF NOT EXISTS cat_facts (id INTEGER PRIMARY KEY AUTOINCREMENT, fact TEXT UNIQUE, created_at DATE DEFAULT (DATE('now')))")
con.commit()

#I consider this approach would be better than make 5 different request to the /fact endpoint to get 5 random facts, 
# considering that this 5 randoms facts could be increased to a higher number, then high requests -> decreasing performance.
async def getFactsFromAPI():
    #Generate a random page between 1-34 without limit
    random_page = random.randint(1, 34)
    async with httpx.AsyncClient() as client:
        response = await client.get(catFactsUrl+"?page=%s"%(random_page))
        response.raise_for_status()
        facts = []
        for _ in range(5): #Add 5 random facts from the random page to the facts variable
            facts.append(random.choice(response.json()["data"]))
    return facts

async def insertFacts():
    facts = await getFactsFromAPI()
    for fact in facts:
        try:
            cur.execute("INSERT OR IGNORE INTO cat_facts (fact) VALUES (?)", (fact["fact"],)) 
            # If the row count is == 1 a fact is added
            if cur.rowcount == 1: 
                print("Fact added: ",fact["fact"])
            else:
                print("Fact skipped: ",fact["fact"])
        except sqlite3.Error as e:
            print(e)
    con.commit()

# Validating if the event loop is from fastapi (async) or no
if __name__ == "__main__":
    import asyncio
    asyncio.run(insertFacts())