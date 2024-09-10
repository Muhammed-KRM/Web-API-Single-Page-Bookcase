using Microsoft.AspNetCore.Mvc;
using WebApi.Repositories;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CounterController : ControllerBase
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private static readonly ConcurrentDictionary<int, Task> _counterTasks = new ConcurrentDictionary<int, Task>();
        private static readonly ConcurrentDictionary<int, bool> _counterStates = new ConcurrentDictionary<int, bool>();

        public CounterController(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        [HttpPost("start/{id}")]
        public async Task<IActionResult> StartCounter(int id)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<RepositoryContext>();
                var counter = await context.Counters.FindAsync(id);
                if (counter == null)
                    return NotFound("Counter not found");

                if (_counterStates.TryGetValue(id, out var isRunning) && isRunning)
                {
                    return BadRequest("Counter is already running.");
                }

                _counterStates[id] = true;

                var task = Task.Run(async () =>
                {
                    using (var innerScope = _scopeFactory.CreateScope())
                    {
                        var innerContext = innerScope.ServiceProvider.GetRequiredService<RepositoryContext>();
                        while (_counterStates[id])
                        {                            
                            var innerCounter = await innerContext.Counters.FindAsync(id);
                            if (innerCounter != null)
                            {
                                innerCounter.Value += 1;
                                innerCounter.LastUpdated = DateTime.UtcNow;
                                await innerContext.SaveChangesAsync();
                            }
                            await Task.Delay(1000); // 1 saniye bekle
                        }
                    }
                });

                _counterTasks[id] = task;

                counter.IsRunning = true;
                await context.SaveChangesAsync();
            }

            return Ok("Counter started.");
        }

        [HttpPost("stop/{id}")]
        public async Task<IActionResult> StopCounter(int id)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<RepositoryContext>();
                var counter = await context.Counters.FindAsync(id);
                if (counter == null)
                    return NotFound("Counter not found");

                if (_counterStates.TryGetValue(id, out var isRunning) && isRunning)
                {
                    _counterStates[id] = false;
                    await _counterTasks[id]; // Döngünün tamamlanmasını bekleyin

                    counter.IsRunning = false;
                    counter.LastUpdated = DateTime.UtcNow;
                    await context.SaveChangesAsync();
                }
                else
                {
                    return BadRequest("Counter is not running.");
                }
            }

            return Ok("Counter stopped.");
        }

        [HttpGet("value/{id}")]
        public async Task<IActionResult> GetCounterValue(int id)
        {
            using (var scope = _scopeFactory.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<RepositoryContext>();
                var counter = await context.Counters.FindAsync(id);
                if (counter == null)
                    return NotFound("Counter not found");
           

                return Ok(counter.Value);
            }
        }
    }
}
