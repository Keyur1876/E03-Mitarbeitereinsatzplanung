using API.Entities;

namespace API;

public class Project
{
    public int ProjectId { get; set; }
    public string ProjectName { get; set; }
    public string Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

      // Navigation property to represent the users associated with the project
    public List<AppUser> Users { get; set; } = new List<AppUser>();
}


