import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button, TextInput, Label } from "flowbite-react";
import { useAdmin } from "src/context/AdminContext";
import { getApiUrl } from '../../../utils/environment';
// import { setAuthToken } from 'src/utils/auth';

const AuthLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useAdmin();

  // Get the intended destination from location state, or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = getApiUrl();
      
      const response = await fetch(`${apiUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim(), 
          password: password.trim() 
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store the token
        localStorage.setItem('admin_token', data.data.token);
        
        // Update admin context
        dispatch({
          type: 'SET_ADMIN',
          payload: {
            email: data.data.email,
            role: data.data.role,
          }
        });

        toast.success("Welcome to Admin Dashboard");
        
        // Redirect to the dashboard or intended destination
        navigate(from, { replace: true });
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="email" value="Email" className="mb-2" />
        <TextInput
          id="email"
          type="email"
          placeholder="admin@fairstakebet.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password" value="Password" className="mb-2" />
        <TextInput
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button 
        type="submit" 
        disabled={isLoading}
        className="mt-4"
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default AuthLogin;
