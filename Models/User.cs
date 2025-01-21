using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("nickname")]
    public string Nickname { get; set; }

    [BsonElement("email")]
    public string Email { get; set; }

    [BsonElement("password_hash")]
    public string PasswordHash { get; set; }

    [BsonElement("icon_uri")]
    public string IconUri { get; set; }
}