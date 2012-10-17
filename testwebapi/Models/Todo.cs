using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson.Serialization.Attributes;

namespace TestWebapi.Models
{
    public class Todo
    {
        [BsonId]
        public string Id { get; set; }
        public string Description { get; set; }
        public bool Done { get; set; }
        public DateTime CreationDatetime { get; set; }
        public DateTime? DoneDatetime { get; set; }
    }
}