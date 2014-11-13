using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CustomerManager.Model
{
    public class Transactions
    {
        public int Id { get; set; }
        
        public DateTime ordertime { get; set; }
        public string side { get; set; }
        public int amount { get; set; }
        public decimal price { get; set; }
        public string currency { get; set;}        
        

    };
}