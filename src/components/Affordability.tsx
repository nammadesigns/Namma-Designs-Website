import { DollarSign, TrendingDown, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Affordability = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Affordable Excellence
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional quality designs at prices that won't break the bank. 
            <span className="text-primary font-semibold"> Up to 50% cheaper</span> than other agencies!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <DollarSign className="mx-auto h-16 w-16 text-primary mb-4" />
              <CardTitle>Budget-Friendly Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Starting from just ₹500 for basic designs. Premium quality without premium prices.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingDown className="mx-auto h-16 w-16 text-primary mb-4" />
              <CardTitle>50% Lower Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Compare our rates with other agencies - you'll save significantly while getting the same quality.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <CheckCircle className="mx-auto h-16 w-16 text-primary mb-4" />
              <CardTitle>No Hidden Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                What you see is what you pay. Transparent pricing with no surprise charges.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Affordability;