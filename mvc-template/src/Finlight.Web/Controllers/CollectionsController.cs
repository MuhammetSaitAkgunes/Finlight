using Microsoft.AspNetCore.Mvc;

namespace Finlight.Web.Controllers;

public sealed class CollectionsController : Controller
{
    public IActionResult Index() => View();
}
