Here are the `curl` commands to test your **NestJS CRUD API** for `items`:

---

### ✅ 1. Create an item

```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Item"}'
```

---

### ✅ 2. Get all items

```bash
curl http://localhost:3000/items
```

---

### ✅ 3. Get a specific item by ID

```bash
curl http://localhost:3000/items/1
```

> Replace `1` with any valid item ID.

---

### ✅ 4. Update an item by ID

```bash
curl -X PUT http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Item Name"}'
```

---

### ✅ 5. Delete an item by ID

```bash
curl -X DELETE http://localhost:3000/items/1
```

---
