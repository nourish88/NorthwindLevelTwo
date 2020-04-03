using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Business.Abstract;
using MvcWebUI.Models;
using MvcWebUI.Base;

namespace MvcWebUI.Controllers
{
    public class CategoryController : BaseController
    {
        private ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
    
    }
}