using API.Controllers;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API;

[Authorize]
public class ProjectsController : BaseApiController
{
    private readonly DataContext _context;

    public ProjectsController(DataContext context) : base(context)
    {
        _context = context;
    }

    [HttpPost("create")]
    public async Task<ActionResult<Project>> CreateProject(Project project)
    {
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return Ok(project);
    }

    [HttpPost("addUserToProject/{projectId}")]
    public async Task<ActionResult> AddUserToProject(int projectId, [FromBody] string username)
    {
        var project = await _context.Projects.Include(p => p.Users).FirstOrDefaultAsync(p => p.ProjectId == projectId);
        if (project == null)
        {
            return NotFound("Project not found");
        }

        var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);
        if (user == null)
        {
            return NotFound("User not found");
        }

        // Add the user to the project
        project.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { Message = "User added to the project" });
    }
}
