import sqlite3
from import_cat_facts import cur, con
def getFacts():
    cur = con.cursor()
    try:
        res = cur.execute("SELECT * FROM cat_facts")
        return res.fetchall()
    except sqlite3.Error as e:
        print(e)