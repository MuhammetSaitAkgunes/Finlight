using Microsoft.AspNetCore.Mvc;

namespace Finlight.Web.Controllers;

public sealed class CashCalendarController : Controller
{
    public IActionResult Index() => View();
}
