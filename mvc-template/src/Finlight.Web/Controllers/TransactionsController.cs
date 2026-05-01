using Microsoft.AspNetCore.Mvc;

namespace Finlight.Web.Controllers;

public sealed class TransactionsController : Controller
{
    public IActionResult Index() => View();
}
