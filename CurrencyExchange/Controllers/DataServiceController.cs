using CustomerManager.Model;
using CustomerManager.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace CustomerManager.Controllers
{
    public class DataServiceController : ApiController
    {
        CustomerRepository _Repository;

        public DataServiceController()
        {
            _Repository = new CustomerRepository();
        }


        [HttpGet]
        public HttpResponseMessage Currencies()
        {
            var currencies = _Repository.GetCurrencis();
            return Request.CreateResponse(HttpStatusCode.OK, currencies);
        }

        [HttpGet]
        public HttpResponseMessage Transactions()
        {
            var transactions = _Repository.GetTransactions();
            return Request.CreateResponse(HttpStatusCode.OK, transactions);
        }


        [HttpGet]
        public HttpResponseMessage CheckUnique(int id, string property, string value)
        {
            var opStatus = true;// _Repository.CheckUnique(id, property, value);
            return Request.CreateResponse(HttpStatusCode.OK, opStatus);
        }

        [HttpPost]
        public HttpResponseMessage Login([FromBody]UserLogin userLogin)
        {
            //Simulated login
            return Request.CreateResponse(HttpStatusCode.OK, new { status = true});
        }

        [HttpPost]
        public HttpResponseMessage Logout()
        {
            //Simulated logout
            return Request.CreateResponse(HttpStatusCode.OK, new { status = true });
        }



     
    }
}