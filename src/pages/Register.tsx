import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {useServiceContext} from "@/context/ServiceContext.ts";
import underTheSea from '@/assets/images/under-the-sea.png';
import {Input} from "@/components/ui/input.tsx";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {RegisterCredentials, RegisterCredentialsSchema} from "@/models/schema/user-credentials.type.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoadingSpinner} from "@/components/ui/loading-spinner.tsx";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterCredentials>({
    resolver: zodResolver(RegisterCredentialsSchema),
  });

  const [error, setError] = useState("");
  const authService = useServiceContext().authService;
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = (formData: RegisterCredentials) => {
    setIsLoading(true);
    setError("");
    authService.register(formData.username, formData.password).then((res) => {
      if (res.error) {
        setError(res.error.message);
        setIsLoading(false);
        return;
      }

      setError("");
      setIsLoading(false);

      window.location.href = "/login";
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
        <h2 className="text-2xl font-bold text-center text-gray-700">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
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
              <p className="mt-1 text-sm text-destructive">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
              <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          {/* Password confirmation */}
          <div>
            <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700">
              Password Confirmation
            </label>
            <Input
              id="passwordConfirmation"
              type="password"
              {...register("passwordConfirmation")}
              className={cn(
                "bg-white",
                errors.passwordConfirmation
                  ? "border-destructive focus:ring-destructive"
                  : "border-gray-300 focus:ring-primary"
              )}
            />
            {errors.passwordConfirmation && (
              <p className="mt-1 text-sm text-destructive">{errors.passwordConfirmation.message}</p>
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
            {isLoading && (<LoadingSpinner/>)}
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>

        <div className="flex items-center justify-center space-x-2">
          <hr className="w-full border-t border-gray-300"/>
          <span className="text-sm text-gray-600">ou</span>
          <hr className="w-full border-t border-gray-300"/>
        </div>

        <Button
          onClick={() => window.location.href = "/login"}
          variant="secondary"
          className="w-full flex items-center justify-center gap-2"
        >
          Login
        </Button>
      </div>
    </div>
  );
}