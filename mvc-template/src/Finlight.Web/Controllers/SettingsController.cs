using Microsoft.AspNetCore.Mvc;

namespace Finlight.Web.Controllers;

public sealed class SettingsController : Controller
{
    public IActionResult Index() => View();
}
