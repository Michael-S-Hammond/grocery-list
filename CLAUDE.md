### 🔄 Project Awareness & Context
- **Always read `PLANNING.md`** at the start of a new conversation to understand the project's architecture, goals, style, and constraints.
- **Check `TASK.md`** before starting a new task. If the task isn’t listed, add it with a brief description and today's date.
- **Use consistent naming conventions, file structure, and architecture patterns** as described in `PLANNING.md`.

### 🧱 Code Structure & Modularity
- **Source code for the web app should be placed in the `frontend/src` directory**
- **Source code for the backend should be placed in the `backend/src` directory**
- **Never create a file longer than 500 lines of code.** If a file approaches this limit, refactor by splitting it into other files.
- **Organize code into clearly separated structures**, grouped by feature or responsibility.

### 🧪 Testing & Reliability
- **Always create unit tests for new features**
  - Include at least:
    - 1 test for expected use
    - 1 edge case
    - 1 failure case
- **After updating any logic**, check whether existing unit tests need to be updated. If so, do it.
- **Add tests to existing locations**
  - **Backend:** /backend/src/tests
  - **Frontend:** Appropriate subdirectories under /frontend/src. Follow naming conventions and placement of existing tests.

### ✅ Task Completion
- **Mark completed tasks in `TASK.md`** immediately after finishing them.
- Add new sub-tasks or TODOs discovered during development to `TASK.md` under a “Discovered During Work” section.

### 📎 Style & Conventions
- **Use TypeScript** as the primary language for business logic.
- Write **documentation for every function**

### 📚 Documentation & Explainability
- **Update `README.md`** when new features are added, dependencies change, or setup steps are modified.
- **Comment non-obvious code** and ensure everything is understandable to a mid-level developer.
- When writing complex logic, **add an inline `// Reason:` comment** explaining the why, not just the what.

### 🧠 AI Behavior Rules
- **Never assume missing context. Ask questions if uncertain.**
- **Never hallucinate libraries or functions** – only use known, verified APIs.
  - Prefer local files for API information
  - If not found, use the Context7 MCP to get API information
  - If not found, use WebSearch to locate API information
- **Never delete or overwrite existing code** unless explicitly instructed to or if part of a task from `TASK.md`.
- **Do not add new libraries without asking or being explicitly prompted to do so.**
- **Ignore npm packages** Do not read files in either backend/node_modules or frontend/node_modules. These should not be added to the session context.
