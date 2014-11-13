using CustomerManager.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CustomerManager.Repository
{
    public class CustomerRepository
    {
        CustomerManagerContext _Context;

        public CustomerRepository()
        {
            _Context = new CustomerManagerContext();

        }



        public List<Currencies> GetCurrencis()
        {
            return _Context.Currencies.OrderBy(s => s.currency).ToList();
        }

        public List<Transactions> GetTransactions()
        {
            return _Context.Transactions.OrderBy(t => t.ordertime).ToList();
        }

    }
      

     
}