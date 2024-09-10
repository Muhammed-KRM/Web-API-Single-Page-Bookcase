using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.Repositories;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {

        private readonly RepositoryContext _context;
        private static readonly object _lock = new object();
        public BooksController(RepositoryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllBooks() 
        {
            try
            {
                var books = _context.Books.ToList();
                return Ok(books);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }     
        }


        [HttpGet("{id:int}")]
        public IActionResult GetOneBooks([FromRoute(Name = "id")] int id)
        {
            try
            {
                var books = _context
                    .Books
                    .Where(b => b.Id.Equals(id))
                    .SingleOrDefault();

                if (books is null)
                    return NotFound();

                return Ok(books);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }

        }

        [HttpPost]
        public async Task<IActionResult> CreateOneBook([FromBody] Book book)
        {
            try
            {
                if (book is null)
                    return BadRequest("Book object is null.");
                await Task.Run(() => {

                    lock (_lock)
                    {
                        _context.Books.Add(book);
                        _context.SaveChanges();
                    }
                });


                return StatusCode(201, book);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateOneBook([FromRoute(Name = "id")] int id, [FromBody] Book book)
        {

            try
            {
                if (id != book.Id)
                    return BadRequest();

                bool updateSuccess = false;

                await Task.Run(() => 
                
                { 
                 lock (_lock) { 
                 
                        var entity = _context.Books.SingleOrDefault(b => b.Id == id);

                        if (entity != null)
                        {
                        entity.Title = book.Title;
                        entity.Price = book.Price;
                        _context.SaveChanges();
                        updateSuccess = true;
                         }
                    }
                });

                if (!updateSuccess)
                    return NotFound();

                return Ok(book);
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }

        }


        // DELETE: api/books/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteOneBook([FromRoute(Name = "id")] int id)
        {
            try
            {
                bool deleteSuccess = false;

                await Task.Run(() =>
                {
                    lock (_lock)
                    {
                        var entity = _context.Books.SingleOrDefault(b => b.Id == id);

                        if (entity != null)
                        {
                            _context.Books.Remove(entity);
                            _context.SaveChanges();
                            deleteSuccess = true;
                        }
                    }
                });

                if (!deleteSuccess)
                    return NotFound(new
                    {
                        statusCode = 404,
                        message = $"Book with id:{id} could not be found."
                    });

                return NoContent();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


    }
}
