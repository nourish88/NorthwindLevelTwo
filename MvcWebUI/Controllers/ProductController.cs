﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business.Abstract;
using Microsoft.AspNetCore.Mvc;
using MvcWebUI.Base;
using MvcWebUI.Models;

namespace MvcWebUI.Controllers
{
    public class ProductController : BaseController
    {
        private IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }
        public IActionResult Index( int category)
        {
            var model = new ProductListViewmodel
            {
                Products = category > 0 ? _productService.GetByCategory(category).Data : _productService.GetAll().Data
            };
            return View(model);
        }
    }
}