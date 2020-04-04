using Business.Abstract;
using Core.Utilities.Results;
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
        public IResult AddToCart(Cart cart, Product product)
        {
            var cartline = cart.CartLines?.FirstOrDefault(x => x.Product.ProductId == product.ProductId);
            if (cartline != null)
            {
                cartline.Quantity++;
                return new SuccessResult();
            }

            cart.CartLines.Add(new CartLine { Product = product, Quantity = 1 });
            return new SuccessResult();
        }

        public IDataResult<List<CartLine>> list(Cart cart)
        {
            return   new SuccessDataResult<List<CartLine>> (cart.CartLines);
        }

        public IResult RemoveFromCart(Cart cart, int productId)
        {
            cart.CartLines.Remove(cart.CartLines.FirstOrDefault(x => x.Product.ProductId == productId));
            return new SuccessResult();
        }
    }
}
