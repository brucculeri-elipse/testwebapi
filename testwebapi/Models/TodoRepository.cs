using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace TestWebapi.Models
{
    public class TodoRepository : ITodoRepository
    {
        private MongoServer _server;
        private MongoDatabase _database;
        private MongoCollection<Todo> _todos;
        
        public TodoRepository() : this("")
        {
            
        }

        public TodoRepository(string connection)
        {
            if (string.IsNullOrWhiteSpace(connection))
            {
                connection = ConfigurationManager.AppSettings["TodoConnectionString"];
            }

            _server = MongoServer.Create(connection);
            _database = _server.GetDatabase(ConfigurationManager.AppSettings["TodoDatabaseName"], SafeMode.True);
            _todos = _database.GetCollection<Todo>(ConfigurationManager.AppSettings["TodoTableName"]);


            bool resetData = true;
            bool.TryParse(ConfigurationManager.AppSettings["ResetData"], out resetData);

            if (resetData)
            {
                _todos.RemoveAll();
                for (int i = 0; i < 5; i++)
                {
                    Todo todo = new Todo
                    {
                        Description = string.Format("Todo {0}", i + 1),
                        Done = (i % 3 == 0 ? true : false),
                        CreationDatetime = DateTime.Now,
                        DoneDatetime = null
                    };

                    if (todo.Done)
                        todo.DoneDatetime = DateTime.Now;

                    AddTodo(todo);
                }
            }
        }

        public IEnumerable<Todo> GetAllTodos()
        {
            return _todos.FindAll().OrderByDescending(t => t.CreationDatetime);
        }

        public Todo GetTodo(string id)
        {
            IMongoQuery query = Query.EQ("_id", id);
            return _todos.Find(query).FirstOrDefault();
        }

        public Todo AddTodo(Todo item)
        {
            if (item != null)
            {
                item.Id = ObjectId.GenerateNewId().ToString();
                item.CreationDatetime = DateTime.UtcNow;
                _todos.Insert(item);
            }
            return item;
        }

        public bool RemoveTodo(string id)
        {
            IMongoQuery query = Query.EQ("_id", id);
            SafeModeResult result = _todos.Remove(query);
            return result.DocumentsAffected == 1;
        }

        public bool UpdateTodo(string id, Todo item)
        {
            IMongoQuery query = Query.EQ("_id", id);
            IMongoUpdate update = Update
                .Set("Description", item.Description)
                .Set("CreationDatetime", item.CreationDatetime)
                .Set("Done", item.Done)
                .Set("DoneDatetime", item.DoneDatetime);
            SafeModeResult result = _todos.Update(query, update);
            return result.UpdatedExisting;
        }
    }
}