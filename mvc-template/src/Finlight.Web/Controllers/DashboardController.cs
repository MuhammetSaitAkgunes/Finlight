using Microsoft.AspNetCore.Mvc;

namespace Finlight.Web.Controllers;

public sealed class DashboardController : Controller
{
    public IActionResult Index() => View();
}
