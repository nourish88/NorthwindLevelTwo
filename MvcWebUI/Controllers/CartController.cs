
using Business.Abstract;
using Entities.Concrete;
using Microsoft.AspNetCore.Mvc;
using MvcWebUI.Base;
using MvcWebUI.Helpers;
using MvcWebUI.Models;

namespace MvcWebUI.Controllers
{
    public class CartController : BaseController
    {
     private   ICartService _cartService;
        private ICartSessionHelper _cartSessionHelper;
        private IProductService _productService;

        public CartController(ICartService cartService, ICartSessionHelper cartSessionHelper, IProductService productService)
        {
            _cartService = cartService;
            _cartSessionHelper = cartSessionHelper;
            _productService = productService;
        }
        public IActionResult AddToCart( int productId)
        {

            Product product = _productService.GetById(productId);
            var cart = _cartSessionHelper.GetCart("cart");
            _cartService.AddToCart(cart, product);
            _cartSessionHelper.SetCart("cart", cart);      
             ShowTimerMessage("Sepete eklendi", MessageType.Success);
            return RedirectToAction("Index", "Product");

        }
        public IActionResult RemoveFromCart(int productId)
        {

          
            var cart = _cartSessionHelper.GetCart("cart");
            _cartService.RemoveFromCart(cart,productId);
            _cartSessionHelper.SetCart("cart", cart);
            TempData.Add("mesaj", "Sepetten çıkarıldı.");
            return RedirectToAction("Index", "Cart");

        }
        public IActionResult Index()
        {

            var model = new CartListViewModel
            {
                Cart = _cartSessionHelper.GetCart("cart")
            };
            return View(model);

        }
        public IActionResult Complete()
        {

            var model = new ShippingDetailsViewModel();
            model.ShippingDetail = new ShippingDetail();
            return View(model);

        }
        [HttpPost]
        public IActionResult Complete(ShippingDetail shippingDetail)
        {

            if (!ModelState.IsValid)
            {
                return View();
            }
            ShowInlineMessage("Sipiraşiniz başarı ile teslim edildi.", MessageType.Success);
            _cartSessionHelper.Clear();
            return RedirectToAction("Index", "Cart");

        }
    }
}