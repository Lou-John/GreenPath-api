using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class WateringBenchmark
{
    [BsonElement("value")]
    public string Value { get; set; }

    [BsonElement("unit")]
    public string Unit { get; set; }
}


public class Plant
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    [BsonElement("common_name")]
    public string CommonName { get; set; }

    [BsonElement("scientific_name")]
    public string ScientificName { get; set; }

    [BsonElement("quantity")]
    public int Quantity { get; set; }

    [BsonElement("watering")]
    public string Watering { get; set; }

    [BsonElement("watering_period")]
    public string WateringPeriod { get; set; }
    
    [BsonElement("watering_general_benchmark")]
    public WateringBenchmark WateringGeneralBenchmark { get; set; }

    [BsonElement("sunlight")]
    public List<string> Sunlight { get; set; }

    [BsonElement("house_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string HouseId { get; set; }

    [BsonElement("pruning_month")]
    public List<string> PruningMonth { get; set; }

    [BsonElement("last_watered")]
    [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
    public DateTime LastWatered { get; set; }

    [BsonElement("flowers")]
    public bool Flowers{ get; set; }

    [BsonElement("flowering_season")]
    public string FloweringSeason { get; set; }

    [BsonElement("care_level")]
    public string CareLevel { get; set; }

    [BsonElement("description")]
    public string Description { get; set; }

    [BsonElement("poisonous_to_humans")]
    public bool PoisonousToHumans { get; set; }
    
    [BsonElement("poisonous_to_pets")]
    public bool PoisonousToPets { get; set; }

}
