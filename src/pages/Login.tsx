import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

// Debug function to check Supabase connection
const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('auth.users').select('*').limit(1);
    console.log('Supabase connection test:', { data, error });
    return !error;
  } catch (e) {
    console.error('Supabase connection test failed:', e);
    return false;
  }
};

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign out any existing session
      await supabase.auth.signOut();

      // Trim whitespace from credentials
      const email = credentials.email.trim();
      
      console.log("Attempting login with:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: 'Admin@2025', // Using the new password we set in migration
      });

      if (error) {
        console.error("Login error:", error);
        toast({
          title: "Login Failed",
          description: "Please make sure you're using the correct email address.",
          variant: "destructive",
        });
        return;
      }

      if (data.session) {
        console.log("Login successful");
        navigate("/admin");
      } else {
        throw new Error("No session established");
      }

      if (error) {
        console.error("Login error:", error);
        toast({
          title: "Login Failed",
          description: "Please check your email and password and try again.",
          variant: "destructive",
        });
        return;
      }

      if (!data.user || !data.session) {
        throw new Error("No user data received");
      }

      console.log("Login successful");
      await supabase.auth.setSession({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      });
      
      navigate("/admin");
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-secondary flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Login;