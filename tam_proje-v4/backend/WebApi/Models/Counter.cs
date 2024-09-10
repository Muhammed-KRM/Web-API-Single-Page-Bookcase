namespace WebApi.Models
{
    public class Counter
    {
        public int Id { get; set; }
        public int Value { get; set; }
        public bool IsRunning { get; set; }
        public DateTime? LastUpdated { get; set; }
    }
}
