import sqlite3
from import_cat_facts import cur, con

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
        return {
            "Fact": getFactByName(fact)
        }
    except sqlite3.Error as e:
        print(e)