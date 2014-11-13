using CustomerManager.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CustomerManager.Repository
{
    public class CustomerManagerContext : DbContext
    {
        public CustomerManagerContext()
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        // DEVELOPMENT ONLY: initialize the database
        static CustomerManagerContext()
        {
            Database.SetInitializer(new CustomerManagerDatabaseInitializer());
        }


        public DbSet<Currencies> Currencies { get; set; }
        public DbSet<Transactions> Transactions { get; set; }

    }
}