using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.ProjectDto
{
    public class CreateProjectRequestDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = default!;

        public string? TemplateId { get; set; }

        public string? Type { get; set; }

        public int? DocumentWidth { get; set; }

        public int? DocumentHeight { get; set; }

    }
}
