from flask import Flask, render_template, url_for
import sqlite3
from collections import defaultdict

app = Flask(__name__)
DB_PATH = 'products.db'

@app.route('/')
def index():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    rows = cur.execute('SELECT id, category, name, price, image FROM products ORDER BY category, id').fetchall()
    conn.close()
    products_by_cat = defaultdict(list)
    for row in rows:
        cat = row['category'] or ''
        products_by_cat[cat].append({
            'id': row['id'],
            'name': row['name'],
            'price': row['price'] or 999,
            'image': row['image'],
        })
    return render_template('index.html', products_by_cat=products_by_cat)

if __name__ == '__main__':
    app.run(debug=True)
