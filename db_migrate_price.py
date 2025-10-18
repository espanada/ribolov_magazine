import sqlite3
import random

conn = sqlite3.connect('products.db')
cursor = conn.cursor()

# Добавить price и image, если их ещё нет
try:
    cursor.execute('ALTER TABLE products ADD COLUMN price INTEGER')
except sqlite3.OperationalError:
    pass
try:
    cursor.execute('ALTER TABLE products ADD COLUMN image TEXT')
except sqlite3.OperationalError:
    pass

# Поставить тестовые цены и изображения
test_images = [
    '',  # Для начала без картинок
]
cursor.execute('SELECT id FROM products')
product_ids = [row[0] for row in cursor.fetchall()]
for pid in product_ids:
    price = random.randint(999, 14999)
    image = ''
    cursor.execute('UPDATE products SET price=?, image=? WHERE id=?', (price, image, pid))
conn.commit()
conn.close()
print('Готово: цены и изображения добавлены.')
