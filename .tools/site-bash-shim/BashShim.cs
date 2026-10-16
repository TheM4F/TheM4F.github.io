using System;
using System.Diagnostics;

public static class BashShim
{
    public static int Main(string[] args)
    {
        if (args.Length < 3)
        {
            Console.Error.WriteLine("Site packaging shim requires script, project, and archive arguments.");
            return 64;
        }

        var wrapper = @"C:\Users\them4f\Desktop\Elmadagfoto\.tools\site-bash-shim\package-site-wrapper.ps1";
        var startInfo = new ProcessStartInfo
        {
            FileName = "powershell.exe",
            Arguments = "-NoProfile -ExecutionPolicy Bypass -File \"" + wrapper + "\" -Project \"" + args[1] + "\" -Archive \"" + args[2] + "\"",
            UseShellExecute = false
        };

        using (var process = Process.Start(startInfo))
        {
            process.WaitForExit();
            return process.ExitCode;
        }
    }
}
