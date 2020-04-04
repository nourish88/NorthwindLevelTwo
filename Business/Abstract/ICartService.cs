using Core.Utilities.Results;
using Entities.Concrete;
using Entities.DomainModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Abstract
{
   public  interface ICartService
    {
        IResult AddToCart(Cart cart, Product product);
        IResult RemoveFromCart(Cart cart, int productId);
        IDataResult<List<CartLine>> list(Cart cart);

    }
}
