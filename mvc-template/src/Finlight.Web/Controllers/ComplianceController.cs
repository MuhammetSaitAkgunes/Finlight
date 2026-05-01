using Microsoft.AspNetCore.Mvc;

namespace Finlight.Web.Controllers;

public sealed class ComplianceController : Controller
{
    public IActionResult Index() => View();
}
