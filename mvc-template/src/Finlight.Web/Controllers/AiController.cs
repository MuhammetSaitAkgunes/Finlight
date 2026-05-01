using Microsoft.AspNetCore.Mvc;

namespace Finlight.Web.Controllers;

public sealed class AiController : Controller
{
    public IActionResult Index() => View();
}
