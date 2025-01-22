using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

public class House
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("user_ids")]
    [BsonRepresentation(BsonType.ObjectId)]
    public List<string> UserIds { get; set; }

    [BsonElement("plants")]
    [BsonRepresentation(BsonType.ObjectId)]
    public List<string> Plants { get; set; }

    [BsonElement("created_at")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
