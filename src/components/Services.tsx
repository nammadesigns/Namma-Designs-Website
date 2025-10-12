import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Award, BarChart2, Instagram, Mail, Airplay, PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const iconMap: { [key: string]: any } = {
  "award": Award,
  "bar-chart-2": BarChart2,
  "instagram": Instagram,
  "mail": Mail,
  "airplay": Airplay,
  "plus-circle": PlusCircle,
};

interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  display_order: number;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (!error && data) {
      setServices(data);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon_name] || PlusCircle;
            return (
              <Card key={service.id} className="hover:shadow-xl transition-shadow duration-300 border-border">
                <CardHeader className="text-center">
                  <Icon className="mx-auto h-12 w-12 text-primary mb-4" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{service.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;