import React, { useEffect, useState } from "react";

const STORAGE_KEY = "todos";
//testing
function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    const title = text.trim();
    if (!title) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), title, completed: false },
    ]);
    setText("");
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  const visibleTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Todo Application</h1>

        <form onSubmit={addTodo} style={styles.form}>
          <input
            style={styles.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            aria-label="New todo"
          />
          <button type="submit" style={styles.addBtn}>
            Add
          </button>
        </form>

        <div style={styles.filters}>
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                ...(filter === f ? styles.filterBtnActive : {}),
              }}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <ul style={styles.list}>
          {visibleTodos.length === 0 && (
            <li style={styles.empty}>No todos here yet.</li>
          )}
          {visibleTodos.map((todo) => (
            <li key={todo.id} style={styles.item}>
              <label style={styles.itemLabel}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span
                  style={{
                    ...styles.itemText,
                    ...(todo.completed ? styles.itemTextDone : {}),
                  }}
                >
                  {todo.title}
                </span>
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={styles.deleteBtn}
                aria-label={`Delete ${todo.title}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <div style={styles.footer}>
          <span>{remaining} item{remaining !== 1 ? "s" : ""} left</span>
          <button onClick={clearCompleted} style={styles.clearBtn}>
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "48px 16px",
    fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 480,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    padding: 24,
  },
  title: { margin: "0 0 16px", fontSize: 24, color: "#111827" },
  form: { display: "flex", gap: 8, marginBottom: 16 },
  input: {
    flex: 1,
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 15,
    outline: "none",
  },
  addBtn: {
    padding: "10px 16px",
    border: "none",
    borderRadius: 8,
    background: "#2563eb",
    color: "#fff",
    fontSize: 15,
    cursor: "pointer",
  },
  filters: { display: "flex", gap: 8, marginBottom: 16 },
  filterBtn: {
    padding: "6px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    background: "#fff",
    color: "#374151",
    fontSize: 14,
    cursor: "pointer",
  },
  filterBtnActive: {
    background: "#2563eb",
    color: "#fff",
    borderColor: "#2563eb",
  },
  list: { listStyle: "none", margin: 0, padding: 0 },
  empty: { color: "#9ca3af", textAlign: "center", padding: "16px 0" },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 4px",
    borderBottom: "1px solid #f3f4f6",
  },
  itemLabel: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    flex: 1,
  },
  itemText: { fontSize: 15, color: "#111827" },
  itemTextDone: { textDecoration: "line-through", color: "#9ca3af" },
  deleteBtn: {
    border: "none",
    background: "transparent",
    color: "#ef4444",
    fontSize: 16,
    cursor: "pointer",
    padding: 4,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    fontSize: 14,
    color: "#6b7280",
  },
  clearBtn: {
    border: "none",
    background: "transparent",
    color: "#2563eb",
    fontSize: 14,
    cursor: "pointer",
  },
};

export default App;
