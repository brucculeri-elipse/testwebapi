using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TestWebapi.Models;

namespace TestWebapi.Controllers
{
    public class TodoController : ApiController
    {
        static readonly ITodoRepository _todos = new TodoRepository();

        public IEnumerable<Todo> GetAll()
        {
            return _todos.GetAllTodos();
        }

        public Todo Get(string id)
        {
            Todo todo = _todos.GetTodo(id);
            if (todo == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return todo;
        }

        public IEnumerable<Todo> GetDoneTodos()
        {
            return GetAll().Where(p => p.Done == true);
        }

        public IEnumerable<Todo> GetTodosByStatus(bool status)
        {
            return GetAll().Where(p => p.Done == status);
        }
        
        public Todo Post(Todo value)
        {
            Todo todo = _todos.AddTodo(value);
            return todo;
        }

        public void Put(string id, Todo value)
        {
            if (!_todos.UpdateTodo(id, value))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }

        public void Delete(string id)
        {
            if (!_todos.RemoveTodo(id))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }

        public void PutClose(string id)
        {
            Todo todo = _todos.GetTodo(id);
            if (todo == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            else
            {
                todo.Done = true;
                todo.DoneDatetime = DateTime.Now;

                if (!_todos.UpdateTodo(id, todo))
                {
                    throw new HttpResponseException(HttpStatusCode.NotFound);
                }
            }
        }
    }
}
