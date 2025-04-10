using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class WateringBenchmark
{
   [BsonElement("value")]
   public string? Value { get; set; }

   [BsonElement("unit")]
   public string? Unit { get; set; }
}


public class Plant
{
   [BsonId]
   [BsonRepresentation(BsonType.ObjectId)]
   public string? Id { get; set; }

   [BsonElement("external_id")]
   public string ExternalId { get; set; }

   [BsonElement("common_name")]
   public string? CommonName { get; set; }

   [BsonElement("scientific_name")]
   public string? ScientificName { get; set; }

   [BsonElement("watering")]
   [BsonIgnoreIfNull]
   public string? Watering { get; set; }

   [BsonElement("watering_general_benchmark")]
   [BsonIgnoreIfNull]
   public WateringBenchmark? WateringBenchmark { get; set; }

   [BsonElement("sunlight")]
   [BsonIgnoreIfNull]
   public List<string>? Sunlight { get; set; }

   [BsonElement("pruning_month")]
   [BsonIgnoreIfNull]
   public List<string>? PruningMonth { get; set; }

   [BsonElement("flowers")]
   [BsonIgnoreIfNull]
   public bool Flowers { get; set; }

   [BsonElement("flowering_season")]
   [BsonIgnoreIfNull]
   public string? FloweringSeason { get; set; }

   [BsonElement("care_level")]
   [BsonIgnoreIfNull]
   public string? CareLevel { get; set; }

   [BsonElement("description")]
   [BsonIgnoreIfNull]
   public string? Description { get; set; }

   [BsonElement("poisonous_to_humans")]
   [BsonIgnoreIfNull]
   public bool PoisonousToHumans { get; set; }

   [BsonElement("poisonous_to_pets")]
   [BsonIgnoreIfNull]
   public bool PoisonousToPets { get; set; }

   [BsonElement("thumbnail_url")]
   public string? ThumbmailUrl { get; set; }

   [BsonElement("medium_url")]
   public string? MediumUrl { get; set; }

   [BsonElement("detailed")]
   public bool Detailed { get; set; }
   

}
