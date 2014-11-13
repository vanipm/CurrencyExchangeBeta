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
    public class Currencies
    {
        public int Id { get; set; }
        
        public string currency { get; set; }
        
        public decimal bid { get; set; }
    
        public decimal ask { get; set; }
        

    }

}