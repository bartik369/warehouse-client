import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({ name: '', email: '' });

  return (
    <form>
      <input
        value={form.name || ""}
        type="text"
        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
      />
      <input
        value={form.email || ""}
        type="email"
        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
      />
    </form>
  );
}
