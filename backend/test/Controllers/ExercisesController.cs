using Microsoft.AspNetCore.Mvc;

namespace test.Controllers
{
    [ApiController]
    [Route("api/exercises")]
    public class ExercisesController : ControllerBase
    {
        private static List<string> _names = new List<string> { "ana", "vasile", "gheorghe", "maria", "ion" };
        [HttpGet("sum")]
        public IActionResult GetSum(double param1, double param2)
        {
            return Ok($"{param1 + param2}");
        }

        [HttpPost("sumlist")]
        public IActionResult SumList([FromBody] List<double> numbers)
        {
            if (numbers == null || numbers.Count == 0)
            {
                return BadRequest("The list of numbers cannot be null or empty.");
            }
            double sum = 0;
            foreach (var number in numbers)
            {
                sum += number;
            }
            return Ok(sum);
        }

        [HttpGet("names")]
        public IActionResult GetNames()
        {
            return Ok(_names);
        }

        [HttpPut("{index}")]
        public IActionResult UpdateName(int index, [FromBody] string newName)
        {
            if (index < 0 || index >= _names.Count)
            {
                return BadRequest("Index out of range.");
            }
            if (newName == null)
            {
                return BadRequest("New name cannot be null.");
            }
            _names[index] = newName;
            return Ok(_names);
        }

        [HttpDelete("{index}")]
        public IActionResult DeleteName(int index)
        {
            if (index < 0 || index >= _names.Count)
            {
                return BadRequest("Index out of range.");
            }
            _names.RemoveAt(index);
            return Ok(_names);
        }
    }
}
