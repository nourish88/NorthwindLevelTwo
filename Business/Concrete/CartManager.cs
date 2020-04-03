using Business.Abstract;
using Entities.Concrete;
using Entities.DomainModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Business.Concrete
{
    public class CartManager : ICartService
    {
        public void AddToCart(Cart cart, Product product)
        {
            var cartline = cart.CartLines?.FirstOrDefault(x => x.Product.ProductId == product.ProductId);
            if (cartline != null)
            {
                cartline.Quantity++;
                return;
            }

            cart.CartLines.Add(new CartLine { Product = product, Quantity = 1 });

        }

        public List<CartLine> list(Cart cart)
        {
            return cart.CartLines;
        }

        public void RemoveFromCart(Cart cart, int productId)
        {
            cart.CartLines.Remove(cart.CartLines.FirstOrDefault(x => x.Product.ProductId == productId));
        }
    }
}
