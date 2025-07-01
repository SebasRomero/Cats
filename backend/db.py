import httpx
import sqlite3
import random
from sqlite3 import Cursor, Connection

async def getFactsFromAPI():
    #Generate a random page between 1-34 without limit
    random_page = random.randint(1, 34)
    async with httpx.AsyncClient() as client:
        response = await client.get("https://catfact.ninja/facts?page=%s"%(random_page))
        response.raise_for_status()
        facts = []
        for _ in range(5): #Add 5 random facts from the random page to the facts variable
            facts.append(random.choice(response.json()["data"]))
    return facts

async def insertFacts(cur: Cursor, con: Connection):
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

def getFacts(cur: Cursor):
    try:
        res = cur.execute("SELECT * FROM cat_facts")
        return res.fetchall()
    except sqlite3.Error as e:
        print(e)