using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestWebapi.Models
{
    public interface ITodoRepository
    {
        IEnumerable<Todo> GetAllTodos();
        Todo GetTodo(string id);
        Todo AddTodo(Todo item);
        bool RemoveTodo(string id);
        bool UpdateTodo(string id, Todo item);
    }
}
