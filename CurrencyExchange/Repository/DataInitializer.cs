using CustomerManager.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CustomerManager.Repository
{
    internal static class DataInitializer
    {
        internal static void Initialize(CustomerManagerContext context)
        {
            var random = new Random((int)DateTime.Now.Ticks);
            var randomOrder = new Random((int)DateTime.Now.Ticks);
            var randomQuantity = new Random((int)DateTime.Now.Ticks);

           
        
            foreach (var currency in currencies)
            {
                context.Currencies.Add(currency);
            }

            foreach(var transaction in transactions)
            {
                context.Transactions.Add(transaction);
            }

        }

        private static string[] SplitValue(string val)
        {
            return val.Split(',');
        }

        

       
        static List<Currencies> currencies = new List<Currencies>
        {
            new Currencies { currency = "USD/JPY", bid = 1.2456M, ask = 1.2656M  },
            new Currencies { currency = "AUD/JPY", bid = 4.2421M, ask = 4.2461M  },
            new Currencies { currency = "EUR/CAD", bid = 11.2367M, ask = 11.2661M  },
            new Currencies { currency = "USD/CNY", bid = 5.2656M, ask = 5.2782M  },
            new Currencies { currency = "CAD/CNY", bid = 2.1487M, ask = 2.1784M  },
            new Currencies { currency = "GBP/USD", bid = 7.2756M, ask = 7.2875M  }
        };


        static List<Transactions> transactions = new List<Transactions>
        {
            new Transactions { ordertime = DateTime.Now.AddDays(5), side = "BUY", amount = 20000 , price = 1.256M, currency = "USD/JPY" },
            new Transactions { ordertime = DateTime.Now.AddDays(5), side = "BUY", amount = 22000 , price = 1.264M, currency = "USD/JPY" },
            new Transactions { ordertime = DateTime.Now.AddDays(5), side = "SELL", amount = 20000 , price = 1.285M, currency = "USD/JPY" },
            new Transactions { ordertime = DateTime.Now.AddDays(5), side = "SELL", amount = 22000 , price = 1.286M, currency = "USD/JPY" },
            new Transactions { ordertime = DateTime.Now.AddDays(5), side = "BUY", amount = 40000 , price = 7.2625M, currency = "GBP/USD" },
            new Transactions { ordertime = DateTime.Now.AddDays(5), side = "BUY", amount = 40000 , price = 7.2875M, currency = "GBP/USD" },
            new Transactions { ordertime = DateTime.Now.AddDays(5), side = "BUY", amount = 35000 , price = 11.2365M, currency = "EUR/CAD" },
            new Transactions { ordertime = DateTime.Now.AddDays(5), side = "SELL", amount = 35000 , price = 11.4375M, currency = "EUR/CAD" }
        };
    }
}
