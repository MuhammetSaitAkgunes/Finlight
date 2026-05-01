using Microsoft.AspNetCore.Mvc;

namespace Finlight.Web.Controllers;

public sealed class AuthController : Controller
{
    [HttpGet]
    public IActionResult SignIn() => View();

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult SignIn(string email, string password, bool rememberMe = false)
    {
        return RedirectToAction(nameof(DashboardController.Index), "Dashboard");
    }

    [HttpGet]
    public IActionResult SignUp() => View();

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult SignUp(string fullName, string companyName, string email)
    {
        return RedirectToAction(nameof(DashboardController.Index), "Dashboard");
    }
}
