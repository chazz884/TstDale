using System;
using System.ComponentModel.DataAnnotations;

    public class User
    {
        [Key]
        [Required]
        [Display(Name="Username")]
        [StringLength(20, ErrorMessage = "El valor para {0} debe contener al menos {2} y máximo {1} caracteres de longitud.", MinimumLength = 6)]
        public int id { get; set; }
        public string rol { get; set; }
        public string username { get; set; }
		public string email { get; set; }

    }