using System;
using System.Collections.Generic;

namespace Application.DTOs.Folder
{
    public class FolderDto
    {
        public string Id { get; set; } = default!;
        public string Name { get; set; } = default!;
        public List<string> ProjectIds { get; set; } = new List<string>();
        public DateTime CreatedAt { get; set; }
    }

    public class CreateFolderRequest
    {
        public string Name { get; set; } = default!;
    }

    public class UpdateFolderRequest
    {
        public string Name { get; set; } = default!;
    }

    public class AddProjectsRequest
    {
        public List<string> ProjectIds { get; set; } = new List<string>();
    }
}
