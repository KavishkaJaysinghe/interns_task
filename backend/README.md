# Todo List MERN App Backend

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create a `.env` file with:
   ```env
   MONGODB_URI=mongodb://localhost:27017/todo_app
   PORT=5000
   ```
3. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints
- `GET /api/todos` – fetch all todos
- `POST /api/todos` – create new todo
- `PUT /api/todos/:id` – update todo
- `DELETE /api/todos/:id` – delete todo
