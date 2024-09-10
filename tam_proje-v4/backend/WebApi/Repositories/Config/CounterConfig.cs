using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApi.Models;

namespace WebApi.Repositories.Config
{
    public class CounterConfig : IEntityTypeConfiguration<Counter>
    {
        public void Configure(EntityTypeBuilder<Counter> builder)
        {
            // Burada Counter modelinizin konfigürasyonlarını yapabilirsiniz.
            // Örneğin, başlangıç verilerini (seeding data) eklemek isterseniz:

            builder.HasData(
                new Counter { Id = 1, Value = 0, IsRunning = false, LastUpdated = null },
                new Counter { Id = 2, Value = 0, IsRunning = false, LastUpdated = null },
                new Counter { Id = 3, Value = 0, IsRunning = false, LastUpdated = null },
                new Counter { Id = 4, Value = 0, IsRunning = false, LastUpdated = null },
                new Counter { Id = 5, Value = 0, IsRunning = false, LastUpdated = null },
                new Counter { Id = 6, Value = 0, IsRunning = false, LastUpdated = null },
                new Counter { Id = 7, Value = 0, IsRunning = false, LastUpdated = null },
                new Counter { Id = 8, Value = 0, IsRunning = false, LastUpdated = null }
            );
        }
    }
}
