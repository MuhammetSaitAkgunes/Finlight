# Finlight MVC Frontend Template

Bu klasör, mevcut statik Finlight arayüzünün ASP.NET Core MVC (.NET 9) projesine taşınabilir şablon halidir.

## Hedef Mimari

- `Finlight.Web`: MVC sunum katmanı. Razor view, layout, partial ve static asset içerir.
- `Finlight.Application`: use case/query/command ve view model kaynakları burada üretilecek.
- `Finlight.Domain`: entity, value object, domain event ve domain servisleri.
- `Finlight.Infrastructure`: EF Core, dış servisler, GİB/banka/e-posta sağlayıcıları.

Bu şablonda sadece frontend/Razor tarafı vardır; backend implementation bilinçli olarak eklenmedi.

## MVC Kullanım Notları

- Proje: `src/Finlight.Web/Finlight.Web.csproj`
- Host: `src/Finlight.Web/Program.cs`
- Controllerlar: `src/Finlight.Web/Controllers`
- Layout: `Views/Shared/_Layout.cshtml`
- Auth layout: `Views/Shared/_AuthLayout.cshtml`
- Sol menü: `Views/Shared/_Sidebar.cshtml`
- Sayfa başlığı: `Views/Shared/_PageHeader.cshtml`
- Assetler: `wwwroot/css/finlight.css`, `wwwroot/css/auth.css`, `wwwroot/js/finlight.js`

## Doğrulama

```powershell
$env:DOTNET_CLI_HOME = (Resolve-Path .\mvc-template).Path
$env:NUGET_PACKAGES = Join-Path (Resolve-Path .\mvc-template).Path '.nuget\packages'
dotnet build .\mvc-template\src\Finlight.Web\Finlight.Web.csproj --configfile .\mvc-template\NuGet.Config -v minimal
```

Bu şablon son kontrolde `net9.0` hedefiyle 0 hata / 0 uyarı ile derlendi.

Controller action'larında şu `ViewData` alanları doldurulabilir:

```csharp
ViewData["Title"] = "Dashboard";
ViewData["ActiveNav"] = "Dashboard";
ViewData["PageKicker"] = "Bugünün finans aksiyonları";
ViewData["PageTitle"] = "Merhaba, Burak";
ViewData["PageDescription"] = "Para nerede, ne zaman gelecek, ne zaman çıkacak?";
```

## Temiz Mimari Sınırı

- Razor view'lar persistence entity bilmemeli.
- Controller action'ları Application katmanından view model almalı.
- View'larda iş kuralı değil, sadece sunum koşulları olmalı.
- Form POST akışlarında MVC için POST-Redirect-GET kullanılmalı.
