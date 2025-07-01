import sqlite3
from import_cat_facts import cur, con

getFactsQuery = "SELECT * FROM cat_facts"
getRandomFactQuery = "SELECT * FROM cat_facts ORDER BY RANDOM() LIMIT 1"

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