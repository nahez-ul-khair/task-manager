const app = document.querySelector("#app");

app.innerHTML = `
  <div style="font-family: sans-serif; padding: 2rem;">
    <h1>Task Manager</h1>
    <div style="margin-bottom: 1rem;">
      <input id="taskInput" placeholder="New task . . ." style="padding: 0.5rem;" />
      <button id="addBtn" style="padding: 0.5rem 1rem;">Add Task</button>
    </div>
    <ul id="taskList"></ul>
  </div>
`;

const list = document.querySelector("#taskList");
const input = document.querySelector("#taskInput");
const btn = document.querySelector("#addBtn");

// Notice: localhost:3000 because this executes in the host browser!
const API_URL = "http://localhost:3000/tasks";

async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    const json = await res.json();
    list.innerHTML = (json.data || [])
      .map((t) => `<li><strong>${t.title}</strong> - ${t.status}</li>`)
      .join("");
  } catch (err) {
    list.innerHTML = `<li style="color: red;">Error fetching tasks</li>`;
  }
}

btn.addEventListener("click", async () => {
  if (!input.value.trim()) return;
  await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: input.value.trim() }),
  });
  input.value = "";
  fetchTasks();
});

fetchTasks();
