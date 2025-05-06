using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;
using test.Models;
using test.Services;

namespace test.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        ITaskCollectionService _tasksCollectionService;
        public TaskController(ITaskCollectionService taskCollectionService)
        {
            _tasksCollectionService = taskCollectionService ?? throw new ArgumentNullException(nameof(TaskCollectionService));
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            List<TaskModel> tasks = await _tasksCollectionService.GetAll();
            return Ok(tasks);
        }

        [HttpPost]
        public IActionResult CreateTask([FromBody] TaskModel task)
        {
            if (task == null)
            {
                return BadRequest("Task cannot be null");
            }

            task.Id = Guid.NewGuid();
            _tasksCollectionService.Create(task);
            return Ok(task);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(Guid id, [FromBody] TaskModel task)
        {
            if (task == null)
            {
                return BadRequest("Task cannot be null");
            }

            _tasksCollectionService.Update(task.Id, task);

            return Ok($"Task with ID {id} has been updated successfully.");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(Guid id)
        {
            _tasksCollectionService.Delete(id);
            return Ok($"Task with ID {id} has been deleted successfully.");
        }
    }
}
