import { useForm } from "react-hook-form";
import {
  LoginCredentials,
  LoginCredentialsSchema,
} from "@/models/schema/user-credentials.type.ts";
import { useServiceContext } from "@/context/ServiceContext.ts";
import underTheSea from "@/assets/images/under-the-sea.png";
import { Input } from "@/components/ui/input.tsx";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner.tsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(LoginCredentialsSchema),
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const authService = useServiceContext().authService;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (formData: LoginCredentials) => {
    setIsLoading(true);
    setError("");
    authService.login(formData.username, formData.password).then((res) => {
      if (res.error) {
        setError(res.error.message);
        setIsLoading(false);
        return;
      }

      setError("");
      setIsLoading(false);

      navigate("/");
    });
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-100"
      style={{
        backgroundImage: `url(${underTheSea})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-50 rounded-lg shadow-md backdrop-blur-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <Input
              id="username"
              type="text"
              {...register("username")}
              className={cn(
                "bg-white",
                errors.username
                  ? "border-destructive focus:ring-destructive"
                  : "border-gray-300 focus:ring-primary"
              )}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className={cn(
                "bg-white",
                errors.password
                  ? "border-destructive focus:ring-destructive"
                  : "border-gray-300 focus:ring-primary"
              )}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-destructive">{error}</p>}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            className="w-full flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading && <LoadingSpinner />}
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>

        <div className="flex items-center justify-center space-x-2">
          <hr className="w-full border-t border-gray-300" />
          <span className="text-sm text-gray-600">ou</span>
          <hr className="w-full border-t border-gray-300" />
        </div>

        <Button
          onClick={() => navigate("/register")}
          variant="secondary"
          className="w-full flex items-center justify-center gap-2"
        >
          Register
        </Button>
      </div>
    </div>
  );
}
