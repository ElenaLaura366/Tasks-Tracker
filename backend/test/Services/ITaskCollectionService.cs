using test.Models;

namespace test.Services
{
    public interface ITaskCollectionService : ICollectionService<TaskModel>
    {
        List<TaskModel> GetTasksByStatus(string status);
    }
}
