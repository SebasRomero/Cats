import sqlite3
from import_cat_facts import cur, con
from fastapi import HTTPException, status

getFactsQuery = "SELECT * FROM cat_facts"
getRandomFactQuery = "SELECT * FROM cat_facts ORDER BY RANDOM() LIMIT 1"
insertFactQuery = "INSERT OR IGNORE INTO cat_facts (fact) VALUES (?)"
getFactByNameQuery = "SELECT * FROM cat_facts WHERE fact=(?)"

def getFacts():
    cur = con.cursor()
    try:
        res = cur.execute(getFactsQuery)
        return [dict(row) for row in res.fetchall()]
    except sqlite3.Error as e:
        print(e)

def getRandomFact():
    cur = con.cursor()
    try:
        res = cur.execute(getRandomFactQuery)
        return res.fetchone()
    except sqlite3.Error as e:
        print(e)

def getFactByName(fact: str):
    cur = con.cursor()
    try:
        res = cur.execute(getFactByNameQuery, (fact,))
        return res.fetchone()
    except sqlite3.Error as e:
        print(e)

def insertFact(fact: str):
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