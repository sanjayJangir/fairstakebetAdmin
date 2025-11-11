import FullLogo from "src/layouts/full/shared/logo/FullLogo";
import AuthLogin from "../authforms/AuthLogin";

const gradientStyle = {
  background: "linear-gradient(45deg, var(--color-primary-emphasis), var(--color-secondary-emphasis))",
  backgroundSize: "400% 400%",
  animation: "gradient 15s ease infinite",
  height: "100vh",
  overflow: "hidden",
};

const Login = () => {
  return (
    <div style={gradientStyle} className="relative overflow-hidden h-screen">
      <div className="flex h-full justify-center items-center px-4">
        <div className="rounded-xl shadow-lg bg-white dark:bg-darkgray p-8 relative break-words md:w-[420px] w-full border-none backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          <div className="flex h-full flex-col justify-center gap-6 p-0 w-full">
            <div className="mx-auto">
              <FullLogo />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-primary dark:text-white mb-2">Welcome Back</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sign in to access your admin dashboard</p>
            </div>
            <AuthLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
