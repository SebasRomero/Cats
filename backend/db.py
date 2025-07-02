import sqlite3
from fastapi import HTTPException, status
from constants import catFactsName, catFactsDB

getFactsQuery = f"SELECT * FROM {catFactsName} LIMIT ? OFFSET ?"
getRandomFactQuery = f"SELECT * FROM {catFactsName} ORDER BY RANDOM() LIMIT 1"
insertFactQuery = f"INSERT OR IGNORE INTO {catFactsName} (fact) VALUES (?)"
getFactByNameQuery = f"SELECT * FROM {catFactsName} WHERE fact = ?"

def getFactsPaginated(page: int = 1, size: int = 10):
    offset = (page - 1) * size
    con = sqlite3.connect(catFactsDB)
    con.row_factory = sqlite3.Row 
    cur = con.cursor()
    try:
        count_res = cur.execute(f"SELECT COUNT(*) FROM {catFactsName}") #Total of facts
        total = count_res.fetchone()[0]

        res = cur.execute(getFactsQuery, (size, offset))
        items = [dict(row) for row in res.fetchall()]

        return {
            "page": page,
            "size": size,
            "total": total,
            "pages": (total + size - 1) // size, #Total pages
            "results": items
        }
    except sqlite3.Error as e:
        print(e)

def getRandomFact():
    con = sqlite3.connect(catFactsDB)
    con.row_factory = sqlite3.Row #To work as a key pair value with the rows
    cur = con.cursor()

    try:
        res = cur.execute(getRandomFactQuery)
        return res.fetchone()
    except sqlite3.Error as e:
        print(e)

def getFactByName(fact: str):
    con = sqlite3.connect(catFactsDB)
    cur = con.cursor()
    try:
        res = cur.execute(getFactByNameQuery, (fact,))
        return res.fetchone()
    except sqlite3.Error as e:
        print(e)

def insertFact(fact: str):
    con = sqlite3.connect(catFactsDB)
    cur = con.cursor()
    try:
        cur.execute(insertFactQuery, (fact,))
        con.commit()
        if (cur.rowcount == 1):
            return {
                "Fact": getFactByName(fact)
            }
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail={"message": "Fact already exist", "statusCode": status.HTTP_400_BAD_REQUEST})
    except sqlite3.Error as e:
        print(e)