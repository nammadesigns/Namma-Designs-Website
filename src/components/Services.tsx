import { Award, BarChart2, Instagram, Mail, Airplay, PlusCircle, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const iconMap: { [key: string]: any } = {
  "award": Award,
  "bar-chart-2": BarChart2,
  "instagram": Instagram,
  "mail": Mail,
  "airplay": Airplay,
  "plus-circle": PlusCircle,
};

const defaultServices = [
  {
    id: '1',
    title: 'Branding',
    description: 'Crafting unique brand identities that stand out and tell your story.',
    icon_name: 'award',
  },
  {
    id: '2',
    title: 'Marketing Design',
    description: 'Engaging designs for flyers, brochures, and ads that drive results.',
    icon_name: 'bar-chart-2',
  },
  {
    id: '3',
    title: 'Social Media',
    description: 'Eye-catching social media content that builds engagement.',
    icon_name: 'instagram',
  },
  {
    id: '4',
    title: 'Email Templates',
    description: 'Professional email designs that convert readers into customers.',
    icon_name: 'mail',
  },
  {
    id: '5',
    title: 'Digital Design',
    description: 'Modern digital designs for websites and mobile applications.',
    icon_name: 'airplay',
  },
  {
    id: '6',
    title: 'Custom Solutions',
    description: 'Tailored design solutions for your unique business needs.',
    icon_name: 'plus-circle',
  }
];

const Services = () => {

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultServices.map((service) => {
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
        
        <div className="text-center mt-12">
          <Link to="/offers">
            <Button size="lg" className="animate-fade-in transform hover:scale-105 transition-transform">
              <Tag className="mr-2" size={20} />
              View Special Offers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;