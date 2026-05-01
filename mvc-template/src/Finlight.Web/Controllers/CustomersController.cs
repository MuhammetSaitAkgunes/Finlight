using Microsoft.AspNetCore.Mvc;

namespace Finlight.Web.Controllers;

public sealed class CustomersController : Controller
{
    public IActionResult Index() => View();
}
