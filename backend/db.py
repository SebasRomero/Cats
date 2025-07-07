import sqlite3
from fastapi import HTTPException, status
from constants import catFactsName, catFactsDB

getFactsQuery = f"SELECT * FROM {catFactsName} LIMIT ? OFFSET ?"
getRandomFactQuery = f"SELECT * FROM {catFactsName} ORDER BY RANDOM() LIMIT 1"
insertFactQuery = f"INSERT OR IGNORE INTO {catFactsName} (fact) VALUES (?)"
getFactByNameQuery = f"SELECT * FROM {catFactsName} WHERE fact = ?"
deleteFactByIdQuery =f"DELETE FROM {catFactsName} WHERE id = ?"
updateFactByIdQuery = f"UPDATE {catFactsName} SET fact = ? WHERE id = ?"

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
    if not (fact.strip()):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail={"message": "Fact can not be empty", "statusCode": status.HTTP_400_BAD_REQUEST})
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

def deleteFact(id: str):
    con = sqlite3.connect(catFactsDB)
    cur = con.cursor()
    try:
        cur.execute(deleteFactByIdQuery, (id,))
        con.commit()
        if (cur.rowcount == 1):
            return True
    except sqlite3.Error as e:
        print(e)

def updateFact(id: str, name: str):
    con = sqlite3.connect(catFactsDB)
    cur = con.cursor()
    try:
        a = getFactByName(name)
        if(a): raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail={"message": "Fact already exist", "statusCode": status.HTTP_400_BAD_REQUEST})
        cur.execute(updateFactByIdQuery, (name, id,))
        con.commit()
        if (cur.rowcount == 1):
            return True
    except sqlite3.Error as e:
        print(e)