<<<<<<< HEAD
import sqlite3
import os
import re

DB_NAME = 'products.db'
TARGETS_DIR = 'targets'

# Создать подключение к базе данных
conn = sqlite3.connect(DB_NAME)
cursor = conn.cursor()

# Создать таблицу продуктов
cursor.execute('''
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT,
    name TEXT NOT NULL,
    source_file TEXT
)
''')
conn.commit()

def parse_targets_files():
    files = [f for f in os.listdir(TARGETS_DIR) if f.endswith('.txt')]
    for file in files:
        current_category = None
        with open(os.path.join(TARGETS_DIR, file), encoding='utf-8') as f:
            for line in f:
                striped = line.strip()
                # Категория
                m = re.match(r'^[-+](.+)', striped)
                if m:
                    current_category = m.group(1).strip()
                # Товар
                elif striped.startswith('#'):
                    name = striped.lstrip('#').strip()
                    cursor.execute('INSERT INTO products (category, name, source_file) VALUES (?, ?, ?)',
                                   (current_category, name, file))
    conn.commit()

if __name__ == '__main__':
    parse_targets_files()
    print('Товары успешно добавлены в базу данных.')
=======
import sqlite3
import os
import re

DB_NAME = 'products.db'
TARGETS_DIR = 'targets'

# Создать подключение к базе данных
conn = sqlite3.connect(DB_NAME)
cursor = conn.cursor()

# Создать таблицу продуктов
cursor.execute('''
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT,
    name TEXT NOT NULL,
    source_file TEXT
)
''')
conn.commit()

def parse_targets_files():
    files = [f for f in os.listdir(TARGETS_DIR) if f.endswith('.txt')]
    for file in files:
        current_category = None
        with open(os.path.join(TARGETS_DIR, file), encoding='utf-8') as f:
            for line in f:
                striped = line.strip()
                # Категория
                m = re.match(r'^[-+](.+)', striped)
                if m:
                    current_category = m.group(1).strip()
                # Товар
                elif striped.startswith('#'):
                    name = striped.lstrip('#').strip()
                    cursor.execute('INSERT INTO products (category, name, source_file) VALUES (?, ?, ?)',
                                   (current_category, name, file))
    conn.commit()

if __name__ == '__main__':
    parse_targets_files()
    print('Товары успешно добавлены в базу данных.')
>>>>>>> 63f4646d109376eec9376909fe0d82dddb2648f3
